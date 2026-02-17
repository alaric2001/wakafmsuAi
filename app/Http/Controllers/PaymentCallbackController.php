<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Models\DonasiPayment;

class PaymentCallbackController extends Controller
{
    public function callback(Request $request)
    {
        $orderId = $request->order_id;
        $status = $request->transaction_status;

        $payment = DonasiPayment::where('order_id', $orderId)->first();

        if ($status == 'capture' || $status == 'settlement') {
            $payment->update(['status' => 'paid']);
        } elseif ($status == 'cancel' || $status == 'deny' || $status == 'expire') {
            $payment->update(['status' => 'failed']);
        }

        return response()->json(['success' => true]);
    }
}
