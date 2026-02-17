import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            
            <div className="min-h-screen bg-gray-100">
                {/* Navbar */}
                <nav className="bg-white shadow">
                    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                        {/* Logo */}
                        <div>
                            <a href="/" className="text-2xl font-bold text-gray-800">
                                <img src="/images/DKMSU Revamped.png" alt="Logo" className="h-12" />
                            </a>
                        </div>

                        {/* Menu */}
                        <div className="flex items-center space-x-4">
                            <a href={route('dashboard')} className="text-gray-700 hover:text-primary-green">
                                Dashboard
                            </a>
                            <form method="POST" action={route('logout')} className="inline">
                                <button 
                                    type="submit"
                                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-gray-600 mt-1">Selamat datang di dashboard admin</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Donasi</p>
                                    <h3 className="text-2xl font-bold text-gray-800 mt-1">0</h3>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Program Aktif</p>
                                    <h3 className="text-2xl font-bold text-gray-800 mt-1">0</h3>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Donatur</p>
                                    <h3 className="text-2xl font-bold text-gray-800 mt-1">0</h3>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Menu Utama</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Kelola Donasi */}
                            <a href="/" className="block p-6 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                                <div className="flex flex-col items-center text-center">
                                    <svg className="w-12 h-12 text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="font-semibold text-gray-800">Kelola Donasi</h3>
                                    <p className="text-sm text-gray-600 mt-1">Tambah & kelola program donasi</p>
                                </div>
                            </a>

                            {/* Kelola Carousel */}
                            <a href={route('carousels.index')} className="block p-6 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                                <div className="flex flex-col items-center text-center">
                                    <svg className="w-12 h-12 text-blue-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <h3 className="font-semibold text-gray-800">Kelola Carousel</h3>
                                    <p className="text-sm text-gray-600 mt-1">Kelola banner carousel</p>
                                </div>
                            </a>

                            {/* Laporan */}
                            <a href="#" className="block p-6 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 transition-colors">
                                <div className="flex flex-col items-center text-center">
                                    <svg className="w-12 h-12 text-yellow-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="font-semibold text-gray-800">Laporan</h3>
                                    <p className="text-sm text-gray-600 mt-1">Lihat laporan donasi</p>
                                </div>
                            </a>

                            {/* Settings */}
                            <a href="#" className="block p-6 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
                                <div className="flex flex-col items-center text-center">
                                    <svg className="w-12 h-12 text-purple-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <h3 className="font-semibold text-gray-800">Pengaturan</h3>
                                    <p className="text-sm text-gray-600 mt-1">Atur konfigurasi sistem</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}