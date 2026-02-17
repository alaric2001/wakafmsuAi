import { Head } from '@inertiajs/react';

export default function UserLayout({ children }) {
    return (
    <>
        <Head>
            <title>Donasi MSU</title>
        </Head>
        <div className="min-h-screen bg-gray-100 font-sans antialiased">
            {/* Navbar */}
            <nav className="fixed w-full top-0 bg-white shadow z-50">
                {/*Isi konten Nav Atas*/}
                <div className=" bg-gray-200 px-4 py-1">
                    <div className="flex justify-between">
                        {/* Kiri:  informasi sosmed */}
                        <div className="flex items-center gap-[8px]">
                            <p className="text-[14px] text-gray-600">Ikuti Kami di</p>
                            {/*Logo-logo Sosial Media */}
                            <div className="flex space-x-2">
                                <a href="https://www.instagram.com/syamsululum.telkomuniversity/" target="_blank" rel="noopener noreferrer">
                                    <img src="https://img.icons8.com/color/24/000000/instagram-new--v1.png" alt="Instagram" className="h-6 w-6" />
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=100078773242372" target="_blank" rel="noopener noreferrer">
                                    <img src="https://img.icons8.com/color/24/000000/facebook-new.png" alt="Facebook" className="h-6 w-6" />
                                </a>
                                <a href="https://www.linkedin.com/company/syamsululum/" target="_blank" rel="noopener noreferrer">
                                    <img src="https://img.icons8.com/color/24/000000/linkedin.png" alt="LinkedIn" className="h-6 w-6" />
                                </a>
                            </div>
                        </div>

                        {/*Kanan: info lebih lanjut */}
                        <div className="flex items-center gap-[8px]">
                            {/* <p className="text-xl text-gray-400">|</p> */}
                            <p className="text-[14px] text-gray-600">Informasi Lebih Lanjut</p>
                            {/* Ikon WhatsApp */}
                            <a href="https://wa.me/6281214363477" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600">
                                <img src="https://img.icons8.com/color/32/000000/whatsapp--v1.png" alt="WhatsApp" className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Isi konten Nav bawah */}
                <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                    {/* Bagian Kiri: Logo */}
                    <div className="">
                        {/* Logo Utama */}
                        <a href="/" className="text-2xl font-bold text-gray-800">
                            <img src="/images/DKMSU Revamped.png" alt="Logo Perusahaan" className="h-12" />
                        </a>
                    </div>

                    {/* Bagian Kanan:Tombol Auth */}
                    <div className="flex items-center space-x-4">
                        {/* Tombol Login & Registrasi */}
                        <a href="/login" className="px-4 py-2 rounded-md bg-primary-green text-white hover:bg-green-700 transition-colors">
                            Login
                        </a>
                        <a href="/register" className="px-4 py-2 rounded-md border border-primary-green text-primary-green hover:bg-primary-green hover:text-white transition-colors">
                            Registrasi
                        </a>
                    </div>
                </div>
            </nav>

            {/* Konten Halaman */}
            <main className="pt-[100px]">
                {children}
            </main>

        </div>
    </>
    );
}

// export default function UserLayout({children}) {
//     return(
//         <>
//             <header>
//                <nav>
//                     <p>Donasi Masjid Syamsul 'Ulum</p>
//                </nav> 
//             </header>

//             <main>
//                 {children}
//             </main>
//         </>
//     );
    
// };
