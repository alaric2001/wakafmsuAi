import UserLayout from "../../layouts/UserLayout";
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function DetailDonasi({donasi, errors = {}}) {
    
    // Destructure properties from the 'donasi' prop
    const {
        id,
        nama,
        target_donasi,
        open_donasi,
        deskripsi,
        foto,
        penyaluran_donasi, // Dapatkan data penyaluran donasi dari relasi yang di-load
        // Assuming you pass a 'collected' and 'updates' array as well
        collected = 5000000
    } = donasi;

    // Calculations for the progress bar
    const progress = (collected / target_donasi) * 100;
    const formattedCollected = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(collected);
    const formattedTarget = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(target_donasi);

    // Calculate days left
    const today = new Date();
    const endDate = new Date(open_donasi);
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    //payment
    const [showDonationForm, setShowDonationForm] = useState(false);
    const [formData, setFormData] = useState({
        nominal: '',
        nama: '',
        email: '',
        phone: '',
        donasi_id: id, // Tambahkan donasi_id
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/checkout', formData, {
            onSuccess: () => {
                setShowDonationForm(false);
                setFormData({
                    nominal: '',
                    nama: '',
                    email: '',
                    phone: '',
                    donasi_id: id
                });
            }
        });
    };

    return(
        <>
        
            <UserLayout>
                <div className="container mx-auto px-4 py-4">
                    <div className="bg-white rounded-lg shadow-md p-6 lg:p-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{nama}</h1>
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Main Content (Left Column on larger screens) */}
                            <div className="w-full lg:w-2/3">
                                {/* <h1 className="text-3xl font-bold text-gray-800 mb-4">{nama}</h1> */}
                                <img 
                                    src={`/images/donasi/${foto}`} 
                                    alt={nama} 
                                    className="w-full h-80 object-cover rounded-lg mb-6" 
                                />
                                <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: deskripsi }} />

                                {/* Updates / Photo Gallery Section */}
                                {/* Section untuk Penyaluran Donasi */}
                                {penyaluran_donasi && penyaluran_donasi.length > 0 && (
                                    <div className="mt-8">
                                        <h2 className="text-2xl font-semibold text-primary-green mb-4">Kabar Terbaru</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {penyaluran_donasi.map((item) => (
                                                <div key={item.id} className="bg-gray-100 rounded-lg shadow-sm overflow-hidden">
                                                    <img src={`/images/penyaluran/${item.foto}`} alt={`penyaluran donasi-${item.id}`} className="w-full h-40 object-cover" />
                                                    <div className="p-4">
                                                        <h4 className="font-semibold text-lg text-gray-800 mb-2">{item.judul}</h4>
                                                        <p className="text-sm text-gray-600">{item.deskripsi}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar (Right Column on larger screens) */}
                            <div className="w-full lg:w-1/3">
                                <div className="sticky top-28 bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Dana Donasi</h3>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                        <div
                                            className="bg-primary-green h-2.5 rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-sm mb-4">
                                        <p className="text-primary-green font-bold">{formattedCollected}</p>
                                        <p className="text-gray-600 font-bold">{formattedTarget}</p>
                                    </div>

                                    {/* Progress Info */}
                                    <p className="text-sm text-gray-700 mb-4">
                                        <span className="font-medium">{Math.round(progress)}%</span>
                                        {` tercapai dari target`}
                                    </p>
                                    
                                    {/* Days Left Info */}
                                    {open_donasi && daysLeft > 0 && (
                                        <p className="text-sm text-gray-500 mb-4">
                                            Sisa hari: <span className="font-medium text-gray-700">{daysLeft} Hari</span>
                                        </p>
                                    )}
                                    {open_donasi === null && (
                                        <p className="text-sm text-gray-500 mb-4">Donasi dibuka tanpa batas waktu</p>
                                    )}
                                    {open_donasi && daysLeft <= 0 && (
                                        <p className="text-sm text-gray-500 mb-4">Donasi telah berakhir</p>
                                    )}

                                    {/* Donation Button */}
                                    {!showDonationForm ? (
                                        <button
                                            onClick={() => setShowDonationForm(true)}
                                            className={`block w-full text-center py-3 px-4 rounded-md font-semibold transition-colors duration-200
                                                ${open_donasi && daysLeft <= 0 
                                                    ? 'bg-gray-400 cursor-not-allowed' 
                                                    : 'bg-primary-green text-white hover:bg-opacity-90'
                                                }`}
                                            disabled={open_donasi && daysLeft <= 0}
                                        >
                                            {open_donasi && daysLeft <= 0 ? 'Donasi Telah Berakhir' : 'Donasi Sekarang'}
                                        </button>
                                    ) : (
                                        <div className="mt-6">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Form Donasi</h4>
                                            
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Nominal Donasi (Rp)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="nominal"
                                                        value={formData.nominal}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                                        placeholder="Contoh: 100000"
                                                        required
                                                    />
                                                    {errors.nominal && (
                                                        <p className="text-red-500 text-xs mt-1">{errors.nominal}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Nama Lengkap
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="nama"
                                                        value={formData.nama}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                                        placeholder="Nama Anda"
                                                        required
                                                    />
                                                    {errors.nama && (
                                                        <p className="text-red-500 text-xs mt-1">{errors.nama}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Email (Opsional)
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                                        placeholder="email@contoh.com"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Nomor WhatsApp (Opsional)
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                                        placeholder="081234567890"
                                                    />
                                                </div>

                                                <div className="pt-4 flex gap-3">
                                                    <button
                                                        type="submit"
                                                        className="flex-1 bg-primary-green text-white py-2 px-4 rounded-md hover:bg-[rgba(4,62,30,0.8)] transition-colors font-medium"
                                                    >
                                                        Lanjutkan Pembayaran
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowDonationForm(false)}
                                                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors font-medium"
                                                    >
                                                        Batal
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </UserLayout>
            
        </>
    )
    
};
