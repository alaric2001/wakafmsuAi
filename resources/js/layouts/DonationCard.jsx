import { Link } from '@inertiajs/react';

export default function DonationCard({ kegiatan }) {
    const {
        id,
        foto,
        nama,
        collected = 3250000,
        target_donasi,
        open_donasi, // Bisa null/undefined untuk "unlimited"
        status_post,
    } = kegiatan;

    // Pastikan 'collected' tidak lebih dari 'target_donasi' untuk perhitungan progres
    const safeCollected = collected > target_donasi ? target_donasi : collected;
    const progress = (safeCollected / target_donasi) * 100;

    // Memformat jumlah uang ke mata uang Rupiah (IDR)
    const formattedCollected = new Intl.NumberFormat('id-ID', { 
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(safeCollected);
    const formattedtarget_donasi = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(target_donasi);


    // Hitung sisa hari dari tanggal 'open_donasi'
    const today = new Date();
    const endDate = new Date(open_donasi);
    const timeDifference = endDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 
        ${status_post === 'hide' ? 'hidden' : ''}`}>
            {/* Gambar Program Donasi */}
            <img
                src={`images/donasi/${foto}`}
                alt={`foto donasi-${foto}`}
                className="w-full h-48 object-cover object-center"
            />

            <div className="p-4">
                {/* Nama Program Donasi */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {nama}
                </h3>

                {/* Dana Terkumpul */}
                <p className="text-gray-600 text-sm mb-3">
                    Terkumpul: <span className="font-bold text-primary-green">{formattedCollected}</span>
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div
                        className="bg-primary-green h-2.5 rounded-full"
                        style={{ width: `${Math.min(progress, 100)}%` }} // Pastikan tidak lebih dari 100%
                    ></div>
                </div>

                {/* Keterangan Progress */}
                <p className="text-sm text-gray-700 mb-3">
                    <span className="font-medium">{Math.round(progress)}%</span> dari {formattedtarget_donasi}
                </p>

                {/* Sisa Hari Donasi (Opsional) */}
                {/* Hanya tampilkan jika open_donasi bukan null dan sisa hari > 0 */}
                {open_donasi && daysLeft > 0 && (
                    <p className="text-sm text-gray-500 mb-4">
                        Sisa hari: <span className="font-medium text-gray-700">{daysLeft} Hari</span>
                    </p>
                )}
                {/* Tampilkan 'tanpa batas waktu' jika open_donasi adalah null */}
                {open_donasi === null && (
                    <p className="text-sm text-gray-500 mb-4">
                        Donasi dibuka tanpa batas waktu
                    </p>
                )}
                 {/* Tampilkan 'telah berakhir' jika sisa hari <= 0 */}
                 {open_donasi && daysLeft <= 0 && (
                    <p className="text-sm text-gray-500 mb-4">
                        Donasi telah berakhir
                    </p>
                )}

                {/* Tombol Donasi Sekarang */}
                {open_donasi && daysLeft <= 0 ? (
                    <Link
                        href='#'
                        className="block w-full text-center py-2 px-4 rounded-md 
                        text-white font-semibold hover:bg-opacity-90 transition-colors 
                        duration-200 bg-gray-400 cursor-not-allowed"
                    >
                        Donasi Telah Berakhir
                    </Link>
                ):(
                    <Link
                        href={`/donasi/${id}`}
                        className="block w-full text-center py-2 px-4 rounded-md bg-primary-green text-white font-semibold hover:bg-opacity-90 transition-colors duration-200"
                    >
                        Donasi Sekarang
                    </Link>
                )}
            </div>
        </div>
    );
}