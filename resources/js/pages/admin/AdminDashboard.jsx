import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../layouts/AdminLayout';
import AdminIcons from '../../layouts/AdminIcons';

// Komponen Utama Dashboard Admin
const App = () => {
    const dashboardStats = [
        { label: 'Total Donasi', value: 'Rp 152.000.000', icon: AdminIcons.Wallet, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Donasi Aktif', value: '24 Program', icon: AdminIcons.Donasi, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Total Donatur', value: '1.240 User', icon: AdminIcons.Users, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Dana Tersalurkan', value: 'Rp 89.000.000', icon: AdminIcons.Penyaluran, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <AdminLayout title="Ringkasan Dashboard">
            <Head title="Admin Dashboard" />

            {/* Statistik Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dashboardStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Aktivitas Terakhir */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">Transaksi Terakhir</h3>
                        <Link href="#" className="text-sm text-[rgb(7,93,45)] hover:underline">Lihat Semua</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Donatur</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Program</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Jumlah</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <tr key={item} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">Donatur #{item}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">Pendidikan Anak Yatim</td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">Rp 250.000</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Berhasil</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Ringkasan Program */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-800 mb-6">Program Terpopuler</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded bg-gray-200 flex-shrink-0 overflow-hidden">
                                    <img src={`https://picsum.photos/100?random=${item}`} alt="img" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-800 leading-tight mb-1">Pembangunan Masjid MSU Tahap {item}</p>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1">
                                        <div className="bg-[rgb(7,93,45)] h-1.5 rounded-full" style={{ width: '70%' }}></div>
                                    </div>
                                    <p className="text-[11px] text-gray-500">Terkumpul 70% dari Rp 50jt</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default App;