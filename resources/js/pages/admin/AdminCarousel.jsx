import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../layouts/AdminLayout';
import AdminIcons from '../../layouts/AdminIcons';

const AdminCarousel = ({ carousels, donationPrograms }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCarousel, setSelectedCarousel] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        foto: null,
        link: '',
    });

    const openModal = (carousel = null) => {
        setIsEditing(!!carousel);
        setSelectedCarousel(carousel);
        setPreviewImage(carousel ? `/images/carousel/${carousel.foto}` : null);

        setData({
            foto: null, // Always null for input file, we don't pre-fill file inputs
            link: carousel ? carousel.link : '',
        });
        clearErrors();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setPreviewImage(null);
        setSelectedCarousel(null);
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
            // For file uploads with PUT in Inertia/Laravel, we often need to use POST with _method: 'PUT'
            // But here let's try standard router.post with forceFormData if inertia supports it or the _method trick
            // standard useForm() put doesn't support files well in some versions.
            // Safer to use post with _method: 'PUT'
            router.post(route('carousels.update', selectedCarousel.id), {
                _method: 'put',
                foto: data.foto,
                link: data.link,
            }, {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('carousels.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (carousel) => {
        if (confirm('Are you sure you want to delete this carousel item?')) {
            destroy(route('carousels.destroy', carousel.id));
        }
    };

    return (
        <AdminLayout title="Kelola Carousel">
            <Head title="Admin Carousel" />

            {/* Header / Actions */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Daftar Carousel</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-[rgb(7,93,45)] text-white px-4 py-2 rounded-lg hover:bg-[rgb(5,73,35)] transition-colors flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Tambah Carousel
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase w-32">Image</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Link / Program</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {carousels.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                                        Belum ada data carousel.
                                    </td>
                                </tr>
                            ) : (
                                carousels.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden border border-gray-200">
                                                <img
                                                    src={`/images/carousel/${item.foto}`}
                                                    alt="Carousel"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {donationPrograms.find(p => p.value === item.link)?.label || item.link}
                                            <div className="text-xs text-gray-400 mt-1">{item.link}</div>
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
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-800">
                                {isEditing ? 'Edit Carousel' : 'Tambah Carousel Baru'}
                            </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <AdminIcons.X />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Image Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gambar Carousel
                                </label>

                                {/* Image Preview Area */}
                                <div className="mb-3">
                                    {previewImage ? (
                                        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <p className="text-white text-sm font-medium">Klik untuk ganti</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span> atau drag and drop</p>
                                                <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 2MB)</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                {errors.foto && <p className="text-red-500 text-xs mt-1">{errors.foto}</p>}
                            </div>

                            {/* Link Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Link / Tujuan Donasi
                                </label>
                                <div className="space-y-3">
                                    {/* Select Donation Program */}
                                    <select
                                        value={donationPrograms.some(p => p.value === data.link) ? data.link : ''}
                                        onChange={(e) => {
                                            if (e.target.value) setData('link', e.target.value);
                                        }}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(7,93,45)] focus:ring-[rgb(7,93,45)] sm:text-sm"
                                    >
                                        <option value="">-- Pilih Program Donasi --</option>
                                        {donationPrograms.map((program) => (
                                            <option key={program.value} value={program.value}>
                                                {program.label}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="px-2 bg-white text-xs text-gray-500">Atau input link manual</span>
                                        </div>
                                    </div>

                                    {/* Manual Input */}
                                    <input
                                        type="text"
                                        placeholder="Contoh: /donasi/1 atau https://google.com"
                                        value={data.link}
                                        onChange={(e) => setData('link', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[rgb(7,93,45)] focus:ring-[rgb(7,93,45)] sm:text-sm"
                                    />
                                </div>
                                {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="pt-4 flex justify-end gap-3">
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
                                    {processing ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Carousel')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminCarousel;