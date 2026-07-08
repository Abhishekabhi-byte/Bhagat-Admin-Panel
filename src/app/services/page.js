// app/admin/page.js
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
  FolderKanban,
  Tag,
  FileText,
  Layers
} from 'lucide-react';

export default function AdminPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Summer Collection Launch',
      description: 'Introducing our new summer collection with vibrant colors and sustainable materials.',
      images: [
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250'
      ],
      category: 'Fashion',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      title: 'Tech Innovation Summit',
      description: 'Annual technology conference featuring industry leaders and innovative startups.',
      images: [
        'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250'
      ],
      category: 'Technology',
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      title: 'Art Exhibition 2024',
      description: 'Modern art exhibition showcasing contemporary artists from around the world.',
      images: [
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=250'
      ],
      category: '',
      createdAt: '2026-07-06'
    },
    {
      id: 4,
      title: 'Sustainable Living Workshop',
      description: 'Learn about sustainable living practices and eco-friendly lifestyle choices.',
      images: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250'
      ],
      category: 'Education',
      createdAt: '2026-07-07'
    },
    {
      id: 5,
      title: 'Product Launch Event',
      description: 'Exclusive product launch event for our latest innovation in smart home technology.',
      images: [
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250',
        'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250'
      ],
      category: 'Products',
      createdAt: '2026-07-08'
    },
    {
      id: 6,
      title: 'Community Outreach Program',
      description: 'Community engagement program focusing on education and skill development.',
      images: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250'
      ],
      category: 'Community',
      createdAt: '2026-07-09'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [category, setCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filter items based on search
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Ensure current page is always valid after filter changes
  useEffect(() => {
    if (filteredItems.length === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredItems.length, totalPages]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImageUrls = files.map(file => URL.createObjectURL(file));
      setImages([...images, ...files]);
      setPreviewUrls([...previewUrls, ...newImageUrls]);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  const handleCreateItem = (e) => {
    e.preventDefault();
    if (previewUrls.length === 0) return alert('Please select at least one image.');
    if (!title.trim()) return alert('Please enter a title.');

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      images: previewUrls,
      category: category.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setItems([newItem, ...items]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setPreviewUrls(item.images);
    setCategory(item.category);
    setIsModalOpen(true);
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    if (previewUrls.length === 0) return alert('Please select at least one image.');
    if (!title.trim()) return alert('Please enter a title.');

    const updatedItems = items.map(item =>
      item.id === editingId
        ? {
            ...item,
            title: title.trim(),
            description: description.trim(),
            images: previewUrls,
            category: category.trim()
          }
        : item
    );

    setItems(updatedItems);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
    }
  };

  const handleView = (item) => {
    setViewingItem(item);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImages([]);
    setPreviewUrls([]);
    setCategory('');
    setEditingId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const truncateText = (text, maxLength = 80) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '…';
  };

  return (
    <div className="space-y-5 bg-[#7d3431] p-8 min-h-screen max-w-7xl mx-auto  shadow-xl">
      
      {/* Integrated Title / Control Section */}
      <div className="bg-white rounded-xl border border-[#cb8c89]/40 shadow-md overflow-hidden flex flex-col justify-between">
        
        {/* Table Header with Search and Integrated Add Button */}
        <div className="p-6 border-b border-[#7d3431]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-white to-[#7d3431]/5">
          <div className="flex flex-1 items-center gap-4 w-full sm:max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7d3431]/60" />
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-2.5 border border-[#cb8c89]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d3431]/20 focus:border-[#7d3431] text-sm text-black bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-[#7d3431]/30 hover:brightness-110 transition-all duration-300 shrink-0"
            >
              <Plus className="w-4 h-4" /> Add New Item
            </button>
          </div>
          <div className="text-sm font-medium text-[#7d3431]">
            Total: <span className="font-bold">{filteredItems.length}</span> Items
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#7d3431]/10 to-[#cb8c89]/10 border-b border-[#cb8c89]/40 text-[#7d3431] font-bold uppercase text-xs tracking-wider">
                <th className="px-6 py-4 w-[140px]">Images</th>
                <th className="px-6 py-4 w-[180px]">Title</th>
                <th className="px-6 py-4 min-w-[200px]">Description</th>
                <th className="px-6 py-4 w-[140px]">Category</th>
                <th className="px-6 py-4 w-[130px]">Created</th>
                <th className="px-6 py-4 w-[160px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#7d3431]/10">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-[#7d3431]/40">
                    <FolderKanban className="w-12 h-12 mx-auto opacity-30 mb-2 text-[#7d3431]" />
                    <p className="font-semibold text-sm">No items found matching search</p>
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#7d3431]/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {item.images.slice(0, 3).map((img, idx) => (
                          <div key={idx} className="w-12 h-12 rounded-lg bg-slate-50 overflow-hidden border border-[#cb8c89]/40 shadow-xs flex items-center justify-center">
                            <img src={img} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {item.images.length > 3 && (
                          <div className="w-12 h-12 rounded-lg bg-[#7d3431]/10 border border-[#cb8c89]/40 flex items-center justify-center text-xs font-bold text-[#7d3431]">
                            +{item.images.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className="font-bold text-black block max-w-xs truncate">{item.title}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-black/70 block max-w-md truncate">{truncateText(item.description, 30)}</span>
                    </td>

                    <td className="px-6 py-4">
                      {item.category ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border bg-[#7d3431]/5 border-[#cb8c89]/40 text-[#7d3431]">
                          <Tag className="w-3 h-3" />
                          {item.category}
                        </span>
                      ) : (
                        <span className="text-xs italic text-black/40">Not specified</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-black/60 font-medium text-xs">
                      {item.createdAt}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => handleView(item)}
                          title="View Details" 
                          className="p-2 text-[#7d3431]/60 rounded-lg hover:text-[#7d3431] hover:bg-[#7d3431]/10 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(item)}
                          title="Edit" 
                          className="p-2 text-[#cb8c89] rounded-lg hover:text-[#7d3431] hover:bg-[#cb8c89]/10 transition-all duration-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
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
        {filteredItems.length > 0 && (
          <div className="px-6 py-4 border-t border-[#7d3431]/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-[#7d3431]/5 to-[#cb8c89]/5">
            <span className="font-medium text-black/70 text-sm">
              Showing <span className="text-[#7d3431] font-bold">{indexOfFirstItem + 1}</span> to{' '}
              <span className="text-[#7d3431] font-bold">
                {Math.min(indexOfLastItem, filteredItems.length)}
              </span>{' '}
              of <span className="text-[#7d3431] font-bold">{filteredItems.length}</span> records
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
          <div className="bg-white rounded-xl w-full max-w-2xl p-8 shadow-2xl border-2 border-[#7d3431]/20 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#7d3431]/10">
              <h3 className="text-xl font-bold text-[#7d3431]">
                {editingId ? 'Edit Item Details' : 'Add New Item'}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-2 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingId ? handleUpdateItem : handleCreateItem} className="space-y-5 text-sm">
              {/* Multiple Image Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-2">
                  Images (Multiple) *
                </label>
                {previewUrls.length > 0 ? (
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative w-full h-28 rounded-lg overflow-hidden border-2 border-[#7d3431]/30 shadow-inner bg-slate-50">
                        <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1.5 right-1.5 p-1 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full shadow-md hover:brightness-110 transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <label className="w-full h-28 rounded-lg border-2 border-dashed border-[#cb8c89] rounded-lg cursor-pointer hover:bg-[#7d3431]/5 transition-all duration-200 hover:border-[#7d3431] flex items-center justify-center">
                      <Upload className="w-7 h-7 text-[#7d3431]/50" />
                      <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#cb8c89] rounded-lg cursor-pointer hover:bg-[#7d3431]/5 transition-all duration-200 hover:border-[#7d3431]">
                    <Upload className="w-10 h-10 text-[#7d3431]/50 mb-3" />
                    <span className="text-sm font-semibold text-black">Click to upload images</span>
                    <span className="text-xs text-black/40 mt-1">PNG, JPG, JPEG up to 5MB each</span>
                    <span className="text-xs text-black/30 mt-0.5">You can select multiple images</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-2">
                  Title *
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Summer Collection Launch"
                  className="w-full px-4 py-3 rounded-lg border border-[#cb8c89]/60 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-2">
                  Description
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your item in detail..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-[#cb8c89]/60 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all resize-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-2">
                  Category (Optional)
                </label>
                <textarea 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter category name (e.g., Fashion, Technology, Education)"
                  rows="2"
                  className="w-full px-4 py-3 rounded-lg border border-[#cb8c89]/60 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all resize-none bg-white"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-[#7d3431]/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 border border-[#cb8c89] rounded-lg font-bold text-[#7d3431] hover:bg-[#7d3431]/5 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#7d3431]/30 hover:brightness-110 transition-all duration-300"
                >
                  {editingId ? 'Update Item' : 'Save Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {isViewModalOpen && viewingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl p-8 shadow-2xl border-2 border-[#7d3431]/20 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#7d3431]/10">
              <h3 className="text-xl font-bold text-[#7d3431]">Item Details</h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingItem(null);
                }}
                className="p-2 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Image Gallery */}
              <div className="grid grid-cols-3 gap-3">
                {viewingItem.images.map((img, idx) => (
                  <div key={idx} className="w-full h-36 rounded-lg overflow-hidden border-2 border-[#cb8c89]/40 shadow-sm bg-slate-50">
                    <img src={img} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 bg-[#7d3431]/5 p-5 rounded-xl border border-[#cb8c89]/20">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Title</p>
                  <p className="text-base font-bold text-black mt-1">{viewingItem.title}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Description</p>
                  <p className="text-sm text-black/80 mt-1 leading-relaxed">{viewingItem.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Category</p>
                    {viewingItem.category ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border mt-1.5 bg-[#7d3431]/5 border-[#cb8c89]/40 text-[#7d3431]">
                        <Tag className="w-3 h-3" />
                        {viewingItem.category}
                      </span>
                    ) : (
                      <p className="text-sm text-black/40 italic mt-1.5">Not specified</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Created Date</p>
                    <p className="text-sm font-semibold text-black mt-1.5">{viewingItem.createdAt}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Total Images</p>
                  <p className="text-sm font-semibold text-black mt-1">{viewingItem.images.length} images</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingItem(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#7d3431]/30 hover:brightness-110 transition-all duration-300"
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