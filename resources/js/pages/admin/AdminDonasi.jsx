import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../layouts/AdminLayout';
import AdminIcons from '../../layouts/AdminIcons';

const AdminDonasi = ({ donasi }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedDonasi, setSelectedDonasi] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        nama: '',
        target_donasi: '',
        open_donasi: '',
        deskripsi: '',
        foto: null,
        status_post: 'post',
    });

    const openModal = (item = null) => {
        setIsEditing(!!item);
        setSelectedDonasi(item);
        setPreviewImage(item && item.foto ? `/images/donasi/${item.foto}` : null);

        if (item) {
            setData({
                nama: item.nama,
                target_donasi: item.target_donasi,
                open_donasi: item.open_donasi || '',
                deskripsi: item.deskripsi,
                foto: null,
                status_post: item.status_post,
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
        setSelectedDonasi(null);
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
            router.post(route('donasi.update', selectedDonasi.id), {
                _method: 'put',
                ...data,
                foto: data.foto,
            }, {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('donasi.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (item) => {
        if (confirm('Are you sure you want to delete this donation item?')) {
            destroy(route('donasi.destroy', item.id));
        }
    };

    // Helper formatter for currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    return (
        <AdminLayout title="Kelola Donasi">
            <Head title="Admin Donasi" />

            {/* Header / Actions */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Daftar Donasi</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-[rgb(7,93,45)] text-white px-4 py-2 rounded-lg hover:bg-[rgb(5,73,35)] transition-colors flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Tambah Donasi
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase w-24">Image</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Nama Program</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Target</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Deadline</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {donasi.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        Belum ada data donasi.
                                    </td>
                                </tr>
                            ) : (
                                donasi.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden border border-gray-200">
                                                {item.foto ? (
                                                    <img
                                                        src={`/images/donasi/${item.foto}`}
                                                        alt={item.nama}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
                                                )}

                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                                            {item.nama}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {formatCurrency(item.target_donasi)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {item.open_donasi || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status_post === 'post'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {item.status_post.toUpperCase()}
                                            </span>
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
                                {isEditing ? 'Edit Program Donasi' : 'Tambah Program Donasi'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <AdminIcons.X />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Nama Program */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Program</label>
                                    <input
                                        type="text"
                                        value={data.nama}
                                        onChange={e => setData('nama', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(7,93,45)] focus:ring-[rgb(7,93,45)] sm:text-sm"
                                        placeholder="Nama program donasi"
                                    />
                                    {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                                </div>

                                {/* Target Donasi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Target (Rp)</label>
                                    <input
                                        type="number"
                                        value={data.target_donasi}
                                        onChange={e => setData('target_donasi', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(7,93,45)] focus:ring-[rgb(7,93,45)] sm:text-sm"
                                        placeholder="0"
                                    />
                                    {errors.target_donasi && <p className="text-red-500 text-xs mt-1">{errors.target_donasi}</p>}
                                </div>

                                {/* Open Donasi Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Batas Waktu</label>
                                    <input
                                        type="date"
                                        value={data.open_donasi}
                                        onChange={e => setData('open_donasi', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(7,93,45)] focus:ring-[rgb(7,93,45)] sm:text-sm"
                                    />
                                    {errors.open_donasi && <p className="text-red-500 text-xs mt-1">{errors.open_donasi}</p>}
                                </div>

                                {/* Deskripsi */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                    <textarea
                                        rows="4"
                                        value={data.deskripsi}
                                        onChange={e => setData('deskripsi', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(7,93,45)] focus:ring-[rgb(7,93,45)] sm:text-sm"
                                        placeholder="Deskripsi program..."
                                    ></textarea>
                                    {errors.deskripsi && <p className="text-red-500 text-xs mt-1">{errors.deskripsi}</p>}
                                </div>

                                {/* Status Post */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status Publikasi</label>
                                    <select
                                        value={data.status_post}
                                        onChange={e => setData('status_post', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(7,93,45)] focus:ring-[rgb(7,93,45)] sm:text-sm"
                                    >
                                        <option value="post">Post (Tampilkan)</option>
                                        <option value="hide">Hide (Sembunyikan)</option>
                                    </select>
                                    {errors.status_post && <p className="text-red-500 text-xs mt-1">{errors.status_post}</p>}
                                </div>

                                {/* Image Upload */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Program</label>
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
                                    {processing ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Program')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminDonasi;
