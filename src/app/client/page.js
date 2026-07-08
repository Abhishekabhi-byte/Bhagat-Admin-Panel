'use client';

import React, { useState } from 'react';
import { 
  Building2, 
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

export default function FoundationPage() {
  const [foundations, setFoundations] = useState([
    { 
      id: 1, 
      title: 'Green Earth Foundation', 
      description: 'A non-profit organization dedicated to environmental conservation and sustainable development.',
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      createdAt: '2026-07-01',
      status: 'Active'
    },
    { 
      id: 2, 
      title: 'Education For All', 
      description: 'Providing quality education to underprivileged children across rural communities.',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250',
      createdAt: '2026-07-05',
      status: 'Active'
    },
    { 
      id: 3, 
      title: 'Healthcare Initiative', 
      description: 'Improving healthcare access and medical facilities in remote areas.',
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=250',
      createdAt: '2026-07-06',
      status: 'Inactive'
    },
    { 
      id: 4, 
      title: 'Women Empowerment Trust', 
      description: 'Empowering women through skill development, education, and entrepreneurship programs.',
      imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
      createdAt: '2026-07-07',
      status: 'Active'
    },
    { 
      id: 5, 
      title: 'Clean Water Project', 
      description: 'Providing clean drinking water to communities through sustainable water purification systems.',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250',
      createdAt: '2026-07-08',
      status: 'Active'
    },
    { 
      id: 6, 
      title: 'Animal Welfare Society', 
      description: 'Rescue, rehabilitation, and care for abandoned and injured animals.',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250',
      createdAt: '2026-07-09',
      status: 'Inactive'
    },
    { 
      id: 7, 
      title: 'Digital Literacy Mission', 
      description: 'Bridging the digital divide by providing technology education and access to digital resources.',
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      createdAt: '2026-07-10',
      status: 'Active'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [status, setStatus] = useState('Active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingFoundation, setViewingFoundation] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filter foundations based on search
  const filteredFoundations = foundations.filter(foundation =>
    foundation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    foundation.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFoundations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoundations = filteredFoundations.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  React.useEffect(() => {
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

  const handleCreateFoundation = (e) => {
    e.preventDefault();
    if (!previewUrl) {
      alert('Please select an image.');
      return;
    }
    if (!title.trim()) {
      alert('Please enter a foundation title.');
      return;
    }
    if (!description.trim()) {
      alert('Please enter a description.');
      return;
    }

    const newFoundation = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      imageUrl: previewUrl,
      status: status,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setFoundations([newFoundation, ...foundations]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (foundation) => {
    setEditingId(foundation.id);
    setTitle(foundation.title);
    setDescription(foundation.description);
    setPreviewUrl(foundation.imageUrl);
    setStatus(foundation.status);
    setIsModalOpen(true);
  };

  const handleUpdateFoundation = (e) => {
    e.preventDefault();
    if (!previewUrl) {
      alert('Please select an image.');
      return;
    }
    if (!title.trim()) {
      alert('Please enter a foundation title.');
      return;
    }
    if (!description.trim()) {
      alert('Please enter a description.');
      return;
    }

    const updatedFoundations = foundations.map(foundation =>
      foundation.id === editingId
        ? { 
            ...foundation, 
            title: title.trim(), 
            description: description.trim(),
            imageUrl: previewUrl,
            status: status
          }
        : foundation
    );

    setFoundations(updatedFoundations);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this foundation entry?')) {
      const updatedFoundations = foundations.filter(foundation => foundation.id !== id);
      setFoundations(updatedFoundations);
      const newTotalPages = Math.ceil(updatedFoundations.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleView = (foundation) => {
    setViewingFoundation(foundation);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImage(null);
    setPreviewUrl('');
    setStatus('Active');
    setEditingId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Inactive':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const truncateText = (text, maxLength = 60) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '…';
  };

  return (
    <div className="space-y-5 bg-red-500 p-6 min-h-screen max-w-7xl mx-auto  shadow-sm">
      
 

      {/* Integrated Control Section */}
      <div className="bg-white rounded-xl border border-red-100 p-4 shadow-md overflow-hidden flex flex-col justify-between">
        
        {/* Table Header with Search and Integrated Add Button */}
     <div className="mb-4 flex justify-end">
  <div className="flex items-center gap-3">
    <div className="relative w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
      <input
        type="text"
        placeholder="Search certificates..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-lg"
      />
    </div>

    <button
      onClick={() => setIsModalOpen(true)}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl whitespace-nowrap"
    >
      <Plus className="w-4 h-4" />
      Add Certificate
    </button>
  </div>
</div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-red-50/50 to-rose-50/50 border-b border-red-100 text-red-900 font-bold uppercase text-xs tracking-wider">
                <th className="px-6 py-4 w-[120px]">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 w-[120px]">Status</th>
                <th className="px-6 py-4 w-[160px]">Created Date</th>
                <th className="px-6 py-4 w-[180px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-50/60">
              {currentFoundations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-slate-400">
                    <Building2 className="w-12 h-12 mx-auto opacity-30 mb-2 text-red-500" />
                    <p className="font-semibold text-sm">No foundations found matching search</p>
                  </td>
                </tr>
              ) : (
                currentFoundations.map((foundation) => (
                  <tr key={foundation.id} className="hover:bg-red-50/10 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="w-16 h-16 rounded-lg bg-slate-50 overflow-hidden border border-red-100 shadow-xs">
                        <img src={foundation.imageUrl} alt={foundation.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    
                    <td className="px-6 py-3.5">
                      <span className="font-bold text-black block max-w-xs truncate">{foundation.title}</span>
                    </td>

                    <td className="px-6 py-3.5">
                      <span className="text-black/70 block max-w-sm leading-relaxed">
                        {truncateText(foundation.description)}
                      </span>
                    </td>

                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(foundation.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                          ${foundation.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}
                        `} />
                        {foundation.status}
                      </span>
                    </td>

                    <td className="px-6 py-3.5 text-black/60 font-medium">
                      {foundation.createdAt}
                    </td>

                    <td className="px-6 py-3.5 text-right">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => handleView(foundation)}
                          title="View Details" 
                          className="p-2 text-red-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(foundation)}
                          title="Edit" 
                          className="p-2 text-rose-400 rounded-lg hover:text-rose-600 hover:bg-rose-50 transition-all duration-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(foundation.id)}
                          title="Delete" 
                          className="p-2 text-slate-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
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
        {filteredFoundations.length > 0 && (
          <div className="px-6 py-4 border-t border-red-50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-red-50/10 to-rose-50/10">
            <span className="font-medium text-black/70 text-sm">
              Showing <span className="text-red-600 font-bold">{indexOfFirstItem + 1}</span> to{' '}
              <span className="text-red-600 font-bold">
                {indexOfLastItem > filteredFoundations.length ? filteredFoundations.length : indexOfLastItem}
              </span>{' '}
              of <span className="text-red-600 font-bold">{filteredFoundations.length}</span> records
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-red-100 bg-white text-red-600/60 hover:bg-red-50 hover:border-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
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
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/20'
                        : 'bg-white border border-red-100 text-black hover:bg-red-50 hover:border-red-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-red-100 bg-white text-red-600/60 hover:bg-red-50 hover:border-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
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
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl border border-red-50">
            <div className="flex justify-between items-center mb-5 pb-2 border-b border-red-50">
              <h3 className="text-lg font-bold text-red-900">
                {editingId ? 'Edit Foundation Details' : 'Create New Foundation'}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-1.5 rounded-lg text-black/40 hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingId ? handleUpdateFoundation : handleCreateFoundation} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-red-600 mb-1.5">
                  Foundation Image *
                </label>
                {previewUrl ? (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border border-red-100 shadow-inner">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl('');
                        setImage(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-full shadow-md hover:brightness-110 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-red-200 rounded-lg cursor-pointer hover:bg-red-50/50 transition-all duration-200 hover:border-red-400">
                    <Upload className="w-8 h-8 text-red-400 mb-2" />
                    <span className="text-sm font-semibold text-black">Click to upload image</span>
                    <span className="text-xs text-black/40 mt-1">PNG, JPG, JPEG up to 5MB</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-red-600 mb-1.5">
                  Foundation Title *
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Green Earth Foundation"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-red-200 text-sm text-black focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-red-600 mb-1.5">
                  Description *
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the foundation's mission and work..."
                  rows="3"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-red-200 text-sm text-black focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-red-600 mb-1.5">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-red-200 text-sm text-black focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3 border-t border-red-50">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-red-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/20 hover:brightness-110 transition-all duration-300"
                >
                  {editingId ? 'Update Foundation' : 'Save Foundation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {isViewModalOpen && viewingFoundation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl border border-red-50">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-red-50">
              <h3 className="text-lg font-bold text-red-900">Foundation File Details</h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingFoundation(null);
                }}
                className="p-1.5 rounded-lg text-black/40 hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-full h-52 rounded-lg overflow-hidden border border-red-100 shadow-sm">
                <img src={viewingFoundation.imageUrl} alt={viewingFoundation.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="space-y-3.5 bg-red-50/30 p-4 rounded-xl border border-red-50">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-red-500">Foundation Name</p>
                  <p className="text-base font-bold text-black mt-0.5">{viewingFoundation.title}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-red-500">Mission & Profile</p>
                  <p className="text-sm text-black/80 mt-0.5 leading-relaxed">{viewingFoundation.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-red-500">Current Status</p>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border mt-1.5 ${getStatusColor(viewingFoundation.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                        ${viewingFoundation.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}
                      `} />
                      {viewingFoundation.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-red-500">Registered Date</p>
                    <p className="text-sm font-semibold text-black mt-1.5">{viewingFoundation.createdAt}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingFoundation(null);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/20 hover:brightness-110 transition-all duration-300"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}