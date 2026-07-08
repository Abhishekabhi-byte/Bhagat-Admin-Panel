// app/logo/page.js
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
  Search,
  Building2
} from 'lucide-react';

export default function LogoPage() {
  const [logos, setLogos] = useState([
    { 
      id: 1, 
      title: 'Company Main Logo', 
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      createdAt: '2026-07-01'
    },
    { 
      id: 2, 
      title: '', 
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250',
      createdAt: '2026-07-05'
    },
    { 
      id: 3, 
      title: 'Brand Icon', 
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=250',
      createdAt: '2026-07-06'
    },
    { 
      id: 4, 
      title: 'Secondary Logo', 
      imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
      createdAt: '2026-07-07'
    },
    { 
      id: 5, 
      title: '', 
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250',
      createdAt: '2026-07-08'
    },
    { 
      id: 6, 
      title: 'Partner Logo', 
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250',
      createdAt: '2026-07-09'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingLogo, setViewingLogo] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filter logos based on search
  const filteredLogos = logos.filter(logo =>
    logo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLogos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogos = filteredLogos.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Ensure current page is always valid after filter changes
  useEffect(() => {
    if (filteredLogos.length === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredLogos.length, totalPages]);

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

  const handleCreateLogo = (e) => {
    e.preventDefault();
    if (!previewUrl) return alert('Please select an image.');

    const newLogo = {
      id: Date.now(),
      title: title.trim(),
      imageUrl: previewUrl,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLogos([newLogo, ...logos]);
    setCurrentPage(1);
    setTitle('');
    setImage(null);
    setPreviewUrl('');
    setIsModalOpen(false);
  };

  const handleEdit = (logo) => {
    setEditingId(logo.id);
    setTitle(logo.title);
    setPreviewUrl(logo.imageUrl);
    setIsModalOpen(true);
  };

  const handleUpdateLogo = (e) => {
    e.preventDefault();
    if (!previewUrl) return alert('Please select an image.');

    const updatedLogos = logos.map(logo =>
      logo.id === editingId
        ? { ...logo, title: title.trim(), imageUrl: previewUrl }
        : logo
    );

    setLogos(updatedLogos);
    setTitle('');
    setImage(null);
    setPreviewUrl('');
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this logo?')) {
      const updatedLogos = logos.filter(logo => logo.id !== id);
      setLogos(updatedLogos);
    }
  };

  const handleView = (logo) => {
    setViewingLogo(logo);
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
    <div className="space-y-5 bg-[#7d3431] p-6 min-h-screen max-w-7xl mx-auto  shadow-xl">
      
      {/* Integrated Title / Control Section */}
      <div className="bg-white rounded-xl border border-[#cb8c89]/40 shadow-md overflow-hidden flex flex-col justify-between">
        
        {/* Table Header with Search and Integrated Add Button */}
        <div className="p-5 border-b border-[#7d3431]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-white to-[#7d3431]/5">
          <div className="flex flex-1 items-center gap-3 w-full sm:max-w-xl">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7d3431]/60" />
              <input
                type="text"
                placeholder="Search logos..."
                className="w-full pl-10 pr-4 py-2 border border-[#cb8c89]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d3431]/20 focus:border-[#7d3431] text-sm text-black bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-[#7d3431]/30 hover:brightness-110 transition-all duration-300 shrink-0"
            >
              <Plus className="w-4 h-4" /> Add New Logo
            </button>
          </div>
          <div className="text-sm font-medium text-[#7d3431]">
            Total: <span className="font-bold">{filteredLogos.length}</span> Logos
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#7d3431]/10 to-[#cb8c89]/10 border-b border-[#cb8c89]/40 text-[#7d3431] font-bold uppercase text-xs tracking-wider">
                <th className="px-6 py-4 w-[100px]">Logo</th>
                <th className="px-6 py-4 text-center">Title</th>
                <th className="px-6 py-4 w-[160px] text-center">Created Date</th>
                <th className="px-6 py-4 w-[180px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#7d3431]/10">
              {currentLogos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-16 text-[#7d3431]/40">
                    <Building2 className="w-12 h-12 mx-auto opacity-30 mb-2 text-[#7d3431]" />
                    <p className="font-semibold text-sm">No logos found matching search</p>
                  </td>
                </tr>
              ) : (
                currentLogos.map((logo) => (
                  <tr key={logo.id} className="hover:bg-[#7d3431]/5 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="w-14 h-14 rounded-lg bg-slate-50 overflow-hidden border border-[#cb8c89]/40 shadow-xs flex items-center justify-center p-1.5 mx-auto">
                        <img src={logo.imageUrl} alt={logo.title || 'Logo'} className="w-full h-full object-contain" />
                      </div>
                    </td>
                    
                    <td className="px-6 py-3.5 text-center">
                      {logo.title ? (
                        <span className="font-bold text-black block truncate">{logo.title}</span>
                      ) : (
                        <span className="text-xs italic text-[#7d3431] font-medium bg-[#7d3431]/5 px-2.5 py-1 rounded-md border border-[#cb8c89]/40">
                          Untitled Logo
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-3.5 text-black/60 font-medium text-center">
                      {logo.createdAt}
                    </td>

                    <td className="px-6 py-3.5 text-right">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => handleView(logo)}
                          title="View Details" 
                          className="p-2 text-[#7d3431]/60 rounded-lg hover:text-[#7d3431] hover:bg-[#7d3431]/10 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(logo)}
                          title="Edit" 
                          className="p-2 text-[#cb8c89] rounded-lg hover:text-[#7d3431] hover:bg-[#cb8c89]/10 transition-all duration-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(logo.id)}
                          title="Delete" 
                          className="p-2 text-black/40 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
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

        {/* Pagination Controls */}
        {filteredLogos.length > 0 && (
          <div className="px-6 py-4 border-t border-[#7d3431]/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-[#7d3431]/5 to-[#cb8c89]/5">
            <span className="font-medium text-black/70 text-sm">
              Showing <span className="text-[#7d3431] font-bold">{indexOfFirstItem + 1}</span> to{' '}
              <span className="text-[#7d3431] font-bold">
                {Math.min(indexOfLastItem, filteredLogos.length)}
              </span>{' '}
              of <span className="text-[#7d3431] font-bold">{filteredLogos.length}</span> records
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-[#cb8c89]/40 bg-white text-[#7d3431]/60 hover:bg-[#7d3431]/10 hover:border-[#7d3431] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
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
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white shadow-md shadow-[#7d3431]/30'
                        : 'bg-white border border-[#cb8c89]/40 text-black hover:bg-[#7d3431]/10 hover:border-[#7d3431]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-[#cb8c89]/40 bg-white text-[#7d3431]/60 hover:bg-[#7d3431]/10 hover:border-[#7d3431] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl border-2 border-[#7d3431]/20">
            <div className="flex justify-between items-center mb-5 pb-2 border-b border-[#7d3431]/10">
              <h3 className="text-lg font-bold text-[#7d3431]">
                {editingId ? 'Edit Logo Details' : 'Upload New Logo'}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-1.5 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingId ? handleUpdateLogo : handleCreateLogo} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-1.5">
                  Logo Image *
                </label>
                {previewUrl ? (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-[#7d3431]/30 shadow-inner bg-slate-50 flex items-center justify-center p-4">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl('');
                        setImage(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-full shadow-md hover:brightness-110 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#cb8c89] rounded-lg cursor-pointer hover:bg-[#7d3431]/5 transition-all duration-200 hover:border-[#7d3431]">
                    <Upload className="w-8 h-8 text-[#7d3431]/50 mb-2" />
                    <span className="text-sm font-semibold text-black">Click to upload logo</span>
                    <span className="text-xs text-black/40 mt-1">PNG, JPG, JPEG, SVG up to 5MB</span>
                    <span className="text-xs text-black/30 mt-0.5">Recommended: Transparent PNG</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-1.5">
                  Logo Title (Optional)
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Company Main Logo"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cb8c89]/60 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all bg-white"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-[#7d3431]/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-[#cb8c89] rounded-lg font-bold text-[#7d3431] hover:bg-[#7d3431]/5 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#7d3431]/30 hover:brightness-110 transition-all duration-300"
                >
                  {editingId ? 'Update Logo' : 'Save Logo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {isViewModalOpen && viewingLogo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl border-2 border-[#7d3431]/20">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#7d3431]/10">
              <h3 className="text-lg font-bold text-[#7d3431]">Logo Details</h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingLogo(null);
                }}
                className="p-1.5 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-full h-56 rounded-lg overflow-hidden border-2 border-[#cb8c89]/40 shadow-sm bg-slate-50 flex items-center justify-center p-6">
                <img src={viewingLogo.imageUrl} alt={viewingLogo.title || 'Logo'} className="w-full h-full object-contain" />
              </div>
              
              <div className="space-y-3.5 bg-[#7d3431]/5 p-4 rounded-xl border border-[#cb8c89]/20">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Logo Title</p>
                  <p className="text-base font-bold text-black mt-0.5">
                    {viewingLogo.title || <span className="text-black/40 italic">Untitled Logo</span>}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Uploaded Date</p>
                  <p className="text-sm font-semibold text-black mt-1.5">{viewingLogo.createdAt}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingLogo(null);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#7d3431]/30 hover:brightness-110 transition-all duration-300"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}