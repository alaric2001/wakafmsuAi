<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Midtrans\Snap;
use Midtrans\Config;
use App\Models\Donasi;
use App\Models\DonasiPayment;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function checkout(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'nominal' => 'required|numeric|min:10000',
            'nama' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'donasi_id' => 'required|exists:donasi,id',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors()->toArray());
        }
        // Simpan ke database
        $order_donasi = DonasiPayment::create([
            'id_donasi' => $request->donasi_id,
            'nama' => $request->nama,
            'email' => $request->email,
            'phone' => $request->phone,
            'price' => $request->nominal,
            'status' => 'unpaid',
        ]);

        // Set konfigurasi
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = false;
        // Config::$isProduction = config('midtrans.is_production', false);
        Config::$isSanitized = true;
        Config::$is3ds = true;

        $params = [
            'transaction_details' => [
                'order_id' => $order_donasi->id,
                'gross_amount' => $order_donasi->price,
            ],
            'customer_details' => [
                'first_name' => $order_donasi->nama,
                'email' => $order_donasi->email,
                'phone' => $order_donasi->phone,
            ],
            // 'item_details' => [
            //     [
            //         'id' => $order_donasi->donasi_id,
            //         'price' => $order_donasi->price,
            //         'name' => 'Donasi untuk ' . Donasi::find($order_donasi->id_donasi)->nama
            //     ]
            // ]
        ];
        $snapToken = Snap::getSnapToken($params);

        return Inertia::render('user/Pay', [
            'snapToken' => $snapToken,
            'order_donasi' => $order_donasi,
        ]);

        // try {
        //     $snapToken = Snap::getSnapToken($params);
            
        //     return Inertia::render('user/Pay', [
        //         'snapToken' => $snapToken,
        //         'order_donasi' => $order_donasi,
        //     ]);
        // } catch (\Exception $e) {
        //     return back()->withErrors(['payment' => 'Gagal membuat transaksi: ' . $e->getMessage()]);
        // }
    }

    public function success(Request $request)
    {
        // Update payment status to success
        $payment = DonasiPayment::find($request->order_id);
        $payment->update([
            'status' => 'paid',
            'id' => $request->transaction_id
        ]);
        
        return Inertia::render('/');
    }

    public function pending(Request $request)
    {
        // Update payment status to pending
        $payment = DonasiPayment::find($request->order_id);
        $payment->update([
            'status' => 'pending',
            'transaction_id' => $request->transaction_id
        ]);
        
        return Inertia::render('user/PaymentPending');
    }
}