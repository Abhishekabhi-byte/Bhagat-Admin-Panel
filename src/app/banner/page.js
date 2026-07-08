'use client';

import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search
} from 'lucide-react';

export default function BannerPage() {
  const [banners, setBanners] = useState([
    { id: 1, title: 'Summer Collection Sale', imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250', createdAt: '2026-07-01' },
    { id: 2, title: '', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250', createdAt: '2026-07-05' },
    { id: 3, title: 'Winter Clearance Event', imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=250', createdAt: '2026-07-06' },
    { id: 4, title: 'Tech Gadgets Promo', imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250', createdAt: '2026-07-07' },
    { id: 5, title: 'Minimalist Interior Design Banner', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250', createdAt: '2026-07-08' },
    { id: 6, title: 'Automotive Festival Show', imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250', createdAt: '2026-07-09' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingBanner, setViewingBanner] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filter banners based on search
  const filteredBanners = banners.filter(banner =>
    banner.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBanners = filteredBanners.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreateBanner = (e) => {
    e.preventDefault();
    if (!previewUrl) return alert('Please select an image.');

    const newBanner = {
      id: Date.now(),
      title: title.trim(),
      imageUrl: previewUrl,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBanners([newBanner, ...banners]);
    setCurrentPage(1);
    setTitle('');
    setImage(null);
    setPreviewUrl('');
    setIsModalOpen(false);
  };

  const handleEdit = (banner) => {
    setEditingId(banner.id);
    setTitle(banner.title);
    setPreviewUrl(banner.imageUrl);
    setIsModalOpen(true);
  };

  const handleUpdateBanner = (e) => {
    e.preventDefault();
    if (!previewUrl) return alert('Please select an image.');

    const updatedBanners = banners.map(banner =>
      banner.id === editingId
        ? { ...banner, title: title.trim(), imageUrl: previewUrl }
        : banner
    );

    setBanners(updatedBanners);
    setTitle('');
    setImage(null);
    setPreviewUrl('');
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      const updatedBanners = banners.filter(banner => banner.id !== id);
      setBanners(updatedBanners);
      const newTotalPages = Math.ceil(updatedBanners.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleView = (banner) => {
    setViewingBanner(banner);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setImage(null);
    setPreviewUrl('');
    setEditingId(null);
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto bg-red-50/40 py-6 px-6 min-h-screen transition-all">
      
      {/* Table Card wrapper */}
      <div className="bg-white rounded-xl border border-red-200/60 shadow-sm overflow-hidden flex flex-col justify-between">
        
        {/* Table Header with Search and Add Button inline */}
        <div className="p-4 border-b border-red-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
          
          {/* Left Side: Search Bar & Add Button Side-by-Side */}
       <div className="flex justify-end w-full">
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl w-full sm:w-auto">
    <div className="relative sm:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
      <input
        type="text"
        placeholder="Search banners..."
        className="w-full pl-10 pr-4 py-2 text-black border  border-red-200 rounded-lg"
      />
    </div>

    <button
      onClick={() => setIsModalOpen(true)}
      className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl whitespace-nowrap"
    >
      <Plus className="w-4 h-4" />
      Add New Banner
    </button>
  </div>
</div>
            

        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-red-50/50 border-b border-red-200 text-red-600 font-extrabold uppercase text-xs tracking-wider">
                <th className="px-6 py-3.5 w-[160px]">Banner Preview</th>
                <th className="px-6 py-3.5 text-center">Banner Title</th>
                <th className="px-6 py-3.5 w-[160px] text-center">Created Date</th>
                <th className="px-6 py-3.5 w-[180px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {currentBanners.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-black/40">
                    <ImageIcon className="w-10 h-10 mx-auto opacity-20 mb-2 text-red-600" />
                    <p className="font-medium text-sm">No banners found</p>
                  </td>
                </tr>
              ) : (
                currentBanners.map((banner) => (
                  <tr key={banner.id} className="hover:bg-red-50/40 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-28 h-16 rounded-lg bg-white overflow-hidden border border-red-200 shadow-sm">
                        <img src={banner.imageUrl} alt="Banner" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    
                    <td className="px-6 py-3 text-center">
                      {banner.title ? (
                        <span className="font-bold text-black block">{banner.title}</span>
                      ) : (
                        <span className="text-xs italic text-black/50 bg-black/5 px-2.5 py-1 rounded-md border border-red-200">
                          Untitled Banner
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-3 text-black/70 font-semibold text-center">
                      {banner.createdAt}
                    </td>

                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => handleView(banner)}
                          title="View" 
                          className="p-2 text-black/40 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(banner)}
                          title="Edit" 
                          className="p-2 text-black/40 rounded-lg hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(banner.id)}
                          title="Delete" 
                          className="p-2 text-black/40 rounded-lg hover:text-red-700 hover:bg-red-100 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBanners.length > 0 && (
          <div className="px-6 py-3.5 border-t border-red-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-red-50/30">
            <span className="font-medium text-black/70 text-sm">
              Showing <span className="text-black font-semibold">{indexOfFirstItem + 1}</span> to{' '}
              <span className="text-black font-semibold">
                {indexOfLastItem > filteredBanners.length ? filteredBanners.length : indexOfLastItem}
              </span>{' '}
              of <span className="text-black font-semibold">{filteredBanners.length}</span> entries
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-red-200 bg-white text-black/60 hover:bg-red-50 hover:border-red-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;
                const isSelected = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-black transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md shadow-red-600/20'
                        : 'bg-white border border-red-200 text-black hover:bg-red-50 hover:border-red-400'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-red-200 bg-white text-black/60 hover:bg-red-50 hover:border-red-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black text-black">
                {editingId ? 'Edit Banner' : 'Upload Banner'}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-2 rounded-lg text-black/40 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingId ? handleUpdateBanner : handleCreateBanner} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-red-600 mb-1.5">
                  Banner Image *
                </label>
                {previewUrl ? (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-red-200">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl('');
                        setImage(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full shadow-lg hover:shadow-red-600/30 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50/50 transition-all duration-200 hover:border-red-500">
                    <Upload className="w-8 h-8 text-red-500/60 mb-2" />
                    <span className="text-sm font-bold text-black">Click to upload banner</span>
                    <span className="text-xs text-black/50 mt-1">PNG, JPG, GIF up to 5MB</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-red-600 mb-1.5">
                  Banner Title (Optional)
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Summer Special Offer"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-red-200 text-sm text-black focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-red-200 rounded-lg font-bold text-black/70 hover:bg-red-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/20 transition-all duration-200"
                >
                  {editingId ? 'Update Banner' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingBanner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setIsViewModalOpen(false);
          setViewingBanner(null);
        }}>
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black text-black">Banner Preview</h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingBanner(null);
                }}
                className="p-2 rounded-lg text-black/40 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-full h-56 rounded-lg overflow-hidden border-2 border-red-200">
                <img src={viewingBanner.imageUrl} alt={viewingBanner.title || 'Banner'} className="w-full h-full object-cover" />
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-black/50">Title</p>
                  <div className="text-sm font-bold text-black bg-red-50/20 px-3 py-2 rounded-lg border border-red-100">
                    {viewingBanner.title || <span className="text-black/40 italic">Untitled Banner</span>}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-black/50">Created Date</p>
                  <p className="text-sm font-semibold text-black/80 bg-red-50/20 px-3 py-2 rounded-lg border border-red-100">{viewingBanner.createdAt}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingBanner(null);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/20 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}