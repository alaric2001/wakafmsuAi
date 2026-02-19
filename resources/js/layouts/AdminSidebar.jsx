import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AdminIcons from './AdminIcons';

const SidebarItem = ({ href, icon: Icon, label, active, isOpen }) => (
    <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${active
            ? 'bg-white text-[rgb(7,93,45)] font-bold shadow-md'
            : 'text-white hover:bg-[rgba(255,255,255,0.1)]'
            }`}
    >
        <Icon />
        {isOpen && <span>{label}</span>}
    </Link>
);

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { url } = usePage();

    return (
        <aside
            className={`${isSidebarOpen ? 'w-64' : 'w-20'
                } bg-[rgb(7,93,45)] transition-all duration-300 flex flex-col fixed inset-y-0 z-50`}
        >
            {/* Logo Section */}
            <div className="p-6 flex items-center justify-between border-b border-[rgba(255,255,255,0.1)]">
                {isSidebarOpen && (
                    <span className="text-white font-bold text-xl whitespace-nowrap">Admin MSU</span>
                )}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-white p-1 hover:bg-[rgba(255,255,255,0.1)] rounded"
                >
                    {isSidebarOpen ? <AdminIcons.X /> : <AdminIcons.Menu />}
                </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
                <SidebarItem
                    href="/admin-dashboard"
                    icon={AdminIcons.Dashboard}
                    label="Dashboard"
                    active={url.startsWith('/admin-dashboard')}
                    isOpen={isSidebarOpen}
                />
                <SidebarItem
                    href="/admin-donasi"
                    icon={AdminIcons.Donasi}
                    label="Donasi"
                    active={url.startsWith('/admin-donasi')}
                    isOpen={isSidebarOpen}
                />
                <SidebarItem
                    href="/admin-penyaluran"
                    icon={AdminIcons.Penyaluran}
                    label="Penyaluran Donasi"
                    active={url.startsWith('/admin-penyaluran')}
                    isOpen={isSidebarOpen}
                />
                <SidebarItem
                    href="#"
                    icon={AdminIcons.Transaksi}
                    label="Transaksi"
                    isOpen={isSidebarOpen}
                />
                <SidebarItem
                    href="/admin-carousel"
                    icon={AdminIcons.Carousel}
                    label="Carousel"
                    active={url.startsWith('/admin-carousel')}
                    isOpen={isSidebarOpen}
                />
            </nav>

            {/* Logout Section */}
            <div className="p-4 border-t border-[rgba(255,255,255,0.1)]">
                <Link
                    href="#"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-red-600 transition-all duration-200 w-full"
                >
                    <AdminIcons.Logout />
                    {isSidebarOpen && <span>Logout</span>}
                </Link>
            </div>
        </aside>
    );
};

export default AdminSidebar;
