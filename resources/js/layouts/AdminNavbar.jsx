import React from 'react';

const AdminNavbar = ({ title }) => {
    return (
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-8 sticky top-0 z-40">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">Admin MSU</p>
                    <p className="text-xs text-gray-500">Super Admin</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-[rgb(7,93,45)] flex items-center justify-center text-white font-bold">
                    A
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
