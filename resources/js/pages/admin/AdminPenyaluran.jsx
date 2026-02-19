import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../layouts/AdminLayout';
import AdminIcons from '../../layouts/AdminIcons';

const AdminPenyaluran = ({ penyaluran, donasiPrograms }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPenyaluran, setSelectedPenyaluran] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        id_donasi: '',
        judul: '',
        deskripsi: '',
        foto: null,
    });

    const openModal = (item = null) => {
        setIsEditing(!!item);
        setSelectedPenyaluran(item);
        setPreviewImage(item && item.foto ? `/images/penyaluran/${item.foto}` : null);

        if (item) {
            setData({
                id_donasi: item.id_donasi,
                judul: item.judul,
                deskripsi: item.deskripsi,
                foto: null,
            });
        } else {
            reset();
            setPreviewImage(null);
        }
        clearErrors();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setPreviewImage(null);
        setSelectedPenyaluran(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('foto', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            router.post(route('admin.penyaluran.index', selectedPenyaluran.id), { // Verify route name for update if using resource or manual
                // Wait, I defined standard routes in controller but not named routes for update/store in web.php
                // Actually I only defined admin.penyaluran.index in web.php. 
                // I need to use the controller action or define more routes.
                // Let's assume I need to add more routes or use a resource controller structure for admin.
                // For now, I will use manual routes matching the controller methods if I added them.
                // Re-checking web.php... I only added get /admin-penyaluran.
                // I need to add post /admin-penyaluran/store, put /admin-penyaluran/{id}, delete /admin-penyaluran/{id}
                // OR use a resource route.
                // Let's stick to the plan and add the routes in web.php if they are missing.
                // I'll assume they will be:
                // store: POST /admin-penyaluran
                // update: POST /admin-penyaluran/{id} with _method=PUT (Inertia style)
                // destroy: DELETE /admin-penyaluran/{id}

                _method: 'put',
                ...data,
                foto: data.foto,
            }, {
                onSuccess: () => closeModal(),
            });
        } else {
            router.post('/admin-penyaluran', data, { // Using URL if named route not yet fully consistent
                onSuccess: () => closeModal(),
            });
        }
    };

    // Correction: In the previous step I only added one route. I need to add the others to web.php.
    // I will write this file assuming the routes exist, then I will go back and fix web.php.
    // The routes should be:
    // store: route('admin.penyaluran.store')
    // update: route('admin.penyaluran.update', id)
    // destroy: route('admin.penyaluran.destroy', id)

    const handleSubmitFixed = (e) => {
        e.preventDefault();

        if (isEditing) {
            router.post(route('penyaluran.update', selectedPenyaluran.id), {
                _method: 'put',
                ...data,
                foto: data.foto,
            }, {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('penyaluran.store'), {
                onSuccess: () => closeModal(),
            });
        }
    }


    const handleDelete = (item) => {
        if (confirm('Are you sure you want to delete this distribution record?')) {
            destroy(route('penyaluran.destroy', item.id));
        }
    };

    return (
        <AdminLayout title="Kelola Penyaluran Donasi">
            <Head title="Admin Penyaluran" />

            {/* Header / Actions */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Daftar Penyaluran Donasi</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-[rgb(7,93,45)] text-white px-4 py-2 rounded-lg hover:bg-[rgb(5,73,35)] transition-colors flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Tambah Penyaluran
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase w-24">Image</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Judul Kegiatan</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Program Donasi</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {penyaluran.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                        Belum ada data penyaluran donasi.
                                    </td>
                                </tr>
                            ) : (
                                penyaluran.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden border border-gray-200">
                                                {item.foto ? (
                                                    <img
                                                        src={`/images/penyaluran/${item.foto}`}
                                                        alt={item.judul}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
                                                )}

                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                                            {item.judul}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {item.donasi ? item.donasi.nama : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => openModal(item)}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-800">
                                {isEditing ? 'Edit Penyaluran Donasi' : 'Tambah Penyaluran Donasi'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <AdminIcons.X />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitFixed} className="p-6 space-y-4">
                            {/* Form Grid */}
                            <div className="grid grid-cols-1 gap-4">

                                {/* Program Donasi Select */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Program Donasi</label>
                                    <select
                                        value={data.id_donasi}
                                        onChange={e => setData('id_donasi', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(7,93,45)] focus:ring-[rgb(7,93,45)] sm:text-sm"
                                    >
                                        <option value="">-- Pilih Program Donasi --</option>
                                        {donasiPrograms.map((program) => (
                                            <option key={program.id} value={program.id}>
                                                {program.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_donasi && <p className="text-red-500 text-xs mt-1">{errors.id_donasi}</p>}
                                </div>

                                {/* Judul */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul Kegiatan</label>
                                    <input
                                        type="text"
                                        value={data.judul}
                                        onChange={e => setData('judul', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(7,93,45)] focus:ring-[rgb(7,93,45)] sm:text-sm"
                                        placeholder="Judul kegiatan penyaluran"
                                    />
                                    {errors.judul && <p className="text-red-500 text-xs mt-1">{errors.judul}</p>}
                                </div>

                                {/* Deskripsi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Kegiatan</label>
                                    <textarea
                                        rows="4"
                                        value={data.deskripsi}
                                        onChange={e => setData('deskripsi', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(7,93,45)] focus:ring-[rgb(7,93,45)] sm:text-sm"
                                        placeholder="Deskripsi penyaluran dana..."
                                    ></textarea>
                                    {errors.deskripsi && <p className="text-red-500 text-xs mt-1">{errors.deskripsi}</p>}
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Dokumentasi Foto</label>
                                    <div className="flex items-start gap-4">
                                        <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                            {previewImage ? (
                                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs p-2 text-center">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-full file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-[rgb(7,93,45)] file:text-white
                                                    hover:file:bg-[rgb(5,73,35)]
                                                "
                                            />
                                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF max 2MB</p>
                                            {errors.foto && <p className="text-red-500 text-xs mt-1">{errors.foto}</p>}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Buttons */}
                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(7,93,45)]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm font-medium text-white bg-[rgb(7,93,45)] border border-transparent rounded-lg hover:bg-[rgb(5,73,35)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(7,93,45)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Penyaluran')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminPenyaluran;
