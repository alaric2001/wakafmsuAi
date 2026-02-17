import { useEffect } from 'react';
import { Head, router} from '@inertiajs/react';
import UserLayout from '../../layouts/UserLayout';

export default function Pay({ order_donasi, snapToken, donasi }) {
    const { id_donasi, nama, phone, email, price, status } = order_donasi;

    // Format price to IDR currency
    const formatPrice = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Function to handle payment
    const handlePayment = () => {
        if (window.snap) {
            window.snap.pay(snapToken, {
                onSuccess: function(result) {
                    console.log('Payment success:', result);
                    // Redirect to success page
                    router.post('/payment/success', {
                        order_id: order_donasi.id,
                        transaction_id: result.transaction_id
                    });
                },
                onPending: function(result) {
                    console.log('Payment pending:', result);
                    router.post('/payment/pending', {
                        order_id: order_donasi.id,
                        transaction_id: result.transaction_id
                    });
                },
                onError: function(result) {
                    console.log('Payment error:', result);
                    alert('Pembayaran gagal. Silakan coba lagi.');
                },
                onClose: function() {
                    console.log('Payment popup closed');
                }
            });
        } else {
            console.error('Midtrans Snap.js not loaded');
        }
    };

    // Load Midtrans script dynamically
    useEffect(() => {
        // Add Midtrans script to head
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY || 'SET_YOUR_CLIENT_KEY_HERE');
        script.async = true;
        
        script.onload = () => {
            console.log('Midtrans Snap.js loaded');
        };
        
        script.onerror = () => {
            console.error('Failed to load Midtrans Snap.js');
        };

        document.head.appendChild(script);

        return () => {
            // Cleanup script on component unmount
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    // Auto trigger payment after component mounts
    useEffect(() => {
        if (window.snap && snapToken) {
            // Trigger payment automatically
            const timer = setTimeout(() => {
                handlePayment();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [window.snap, snapToken]);

    return (
        <UserLayout>
            <Head title="Pembayaran Donasi" />
            
            <div className="min-h-screen p-4 md:p-6 bg-gray-50">
                <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'rgb(7 93 45)' }}>
                            Pembayaran Donasi
                        </h1>
                        <p className="text-gray-600">Selesaikan pembayaran Anda untuk melanjutkan</p>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
                        <h2 className="text-lg font-semibold mb-4" style={{ color: 'rgb(7 93 45)' }}>
                            Rincian Donasi
                        </h2>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Nomor Transaksi</span>
                                <span className="font-medium">#{order_donasi.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Nama Donatur</span>
                                <span className="font-medium">{nama}</span>
                            </div>
                            {email && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Email</span>
                                    <span className="font-medium">{email}</span>
                                </div>
                            )}
                            {phone && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Nomor Telepon</span>
                                    <span className="font-medium">{phone}</span>
                                </div>
                            )}
                            <div className="pt-3 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Donasi</span>
                                    <span className="text-xl font-bold" style={{ color: 'rgb(7 93 45)' }}>
                                        {formatPrice(price)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Status */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="flex items-center">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 mr-3">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">Menunggu Pembayaran</p>
                                    <p className="text-sm text-gray-600">Selesaikan pembayaran sebelum waktu habis</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-4">
                            Klik tombol di bawah untuk membuka halaman pembayaran
                        </p>
                        <button
                            onClick={handlePayment}
                            className="px-8 py-4 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity w-full"
                            style={{ backgroundColor: 'rgb(7 93 45)' }}
                        >
                            Bayar Sekarang
                        </button>
                        <p className="text-xs text-gray-500 mt-3">
                            Anda akan dialihkan ke halaman pembayaran Midtrans
                        </p>
                    </div>

                    {/* Instructions */}
                    <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Petunjuk Pembayaran
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                            <li>Halaman pembayaran akan terbuka di popup baru</li>
                            <li>Pilih metode pembayaran yang Anda inginkan</li>
                            <li>Ikuti instruksi pada halaman pembayaran</li>
                            <li>Jangan tutup browser selama proses pembayaran</li>
                        </ul>
                    </div>

                    {/* Snap Container (hidden, for programmatic use) */}
                    <div id="snap-container" className="hidden"></div>
                </div>
            </div>
        </UserLayout>
    );
}