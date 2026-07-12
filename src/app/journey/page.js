'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Calendar,
  Tag,
  Users,
  Zap,
  Wrench,
  Building,
  Train,
  Award,
  BookOpen
} from 'lucide-react';

export default function JourneyPage() {
  const [journeyEntries, setJourneyEntries] = useState([
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      title: 'Company Foundation & Early Growth',
      description: 'Established our company with a vision to deliver excellence in electrical and industrial services.',
      startDate: '2018-06-01',
      endDate: '2020-12-31',
      isPresent: false,
      category: 'our-team'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250',
      title: 'Major Electrical Installation Projects',
      description: 'Successfully completed large-scale electrical installations for commercial and industrial clients.',
      startDate: '2020-01-01',
      endDate: '2021-12-31',
      isPresent: false,
      category: 'electrical-installations'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=250',
      title: 'Transformer Service & Maintenance',
      description: 'Launched specialized transformer maintenance and repair services for power utilities.',
      startDate: '2021-01-01',
      endDate: '2022-12-31',
      isPresent: false,
      category: 'transformer-service'
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
      title: 'Industrial Infrastructure Development',
      description: 'Developed industrial infrastructure solutions for manufacturing and heavy industries.',
      startDate: '2022-01-01',
      endDate: '2023-12-31',
      isPresent: false,
      category: 'industrial-infrastructure'
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250',
      title: 'Railway Electrification Projects',
      description: 'Played a key role in railway electrification and infrastructure modernization.',
      startDate: '2023-01-01',
      endDate: '2024-12-31',
      isPresent: false,
      category: 'railway-project'
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250',
      title: 'Industry Awards & Achievements',
      description: 'Received multiple industry awards for innovation, safety, and service excellence.',
      startDate: '2024-01-01',
      endDate: '',
      isPresent: true,
      category: 'events-achievements'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isPresent, setIsPresent] = useState(false);
  const [category, setCategory] = useState('our-team');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingEntry, setViewingEntry] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Category options
  const categories = [
    { value: 'our-team', label: 'Our Team', icon: Users },
    { value: 'electrical-installations', label: 'Electrical Installations', icon: Zap },
    { value: 'transformer-service', label: 'Transformer Service', icon: Wrench },
    { value: 'industrial-infrastructure', label: 'Industrial Infrastructure', icon: Building },
    { value: 'railway-project', label: 'Railway Project', icon: Train },
    { value: 'events-achievements', label: 'Events & Achievements', icon: Award },
  ];

  const getCategoryLabel = (value) => {
    const found = categories.find(cat => cat.value === value);
    return found ? found.label : value;
  };

  const getCategoryIcon = (value) => {
    const found = categories.find(cat => cat.value === value);
    return found ? found.icon : Tag;
  };

  const getCategoryColor = (value) => {
    switch(value) {
      case 'our-team': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'electrical-installations': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'transformer-service': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'industrial-infrastructure': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'railway-project': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'events-achievements': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Filter entries based on search
  const filteredEntries = journeyEntries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCategoryLabel(entry.category).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Ensure current page is always valid after filter changes
  useEffect(() => {
    if (filteredEntries.length === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredEntries.length, totalPages]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    e.target.value = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB.');
      return;
    }

    if (previewUrl && !previewUrl.startsWith('http')) {
      URL.revokeObjectURL(previewUrl);
    }

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCreateEntry = (e) => {
    e.preventDefault();
    if (!previewUrl) return alert('Please select an image.');
    if (!title.trim()) return alert('Please enter a title.');
    if (!description.trim()) return alert('Please enter a description.');
    if (!startDate) return alert('Please select a start date.');

    if (!isPresent && !endDate) {
      return alert('Please select an end date or check "Present".');
    }

    if (!isPresent && endDate && startDate > endDate) {
      return alert('Start date cannot be later than end date.');
    }

    const newEntry = {
      id: Date.now(),
      imageUrl: previewUrl,
      title: title.trim(),
      description: description.trim(),
      startDate: startDate,
      endDate: isPresent ? '' : endDate,
      isPresent: isPresent,
      category: category
    };

    setJourneyEntries([newEntry, ...journeyEntries]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setPreviewUrl(entry.imageUrl);
    setTitle(entry.title);
    setDescription(entry.description);
    setStartDate(entry.startDate);
    setEndDate(entry.endDate);
    setIsPresent(entry.isPresent);
    setCategory(entry.category);
    setIsModalOpen(true);
  };

  const handleUpdateEntry = (e) => {
    e.preventDefault();
    if (!previewUrl) return alert('Please select an image.');
    if (!title.trim()) return alert('Please enter a title.');
    if (!description.trim()) return alert('Please enter a description.');
    if (!startDate) return alert('Please select a start date.');

    if (!isPresent && !endDate) {
      return alert('Please select an end date or check "Present".');
    }

    if (!isPresent && endDate && startDate > endDate) {
      return alert('Start date cannot be later than end date.');
    }

    const updatedEntries = journeyEntries.map(entry =>
      entry.id === editingId
        ? {
            ...entry,
            imageUrl: previewUrl,
            title: title.trim(),
            description: description.trim(),
            startDate: startDate,
            endDate: isPresent ? '' : endDate,
            isPresent: isPresent,
            category: category
          }
        : entry
    );

    setJourneyEntries(updatedEntries);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this journey entry?')) {
      const updatedEntries = journeyEntries.filter(entry => entry.id !== id);
      setJourneyEntries(updatedEntries);
    }
  };

  const handleView = (entry) => {
    setViewingEntry(entry);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    if (previewUrl && !previewUrl.startsWith('http')) {
      URL.revokeObjectURL(previewUrl);
    }
    setImage(null);
    setPreviewUrl('');
    setTitle('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setIsPresent(false);
    setCategory('our-team');
    setEditingId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '…';
  };

  const formatDateRange = (entry) => {
    const start = entry.startDate ? new Date(entry.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
    const end = entry.isPresent ? 'Present' : (entry.endDate ? new Date(entry.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
    return `${start} — ${end}`;
  };

  const getDuration = (entry) => {
    if (!entry.startDate) return 0;
    const start = new Date(entry.startDate);
    const end = entry.isPresent ? new Date() : new Date(entry.endDate || new Date());
    const diffTime = Math.abs(end - start);
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    return Math.round(diffYears) || 1; 
  };

  return (
    <div className="space-y-5 bg-[#7d3431] p-6 min-h-screen max-w-7xl mx-auto  shadow-xl">
      
      {/* Integrated Title / Control Section */}
      <div className="bg-white rounded-xl p-4 border border-[#cb8c89]/40 shadow-md overflow-hidden flex flex-col justify-between">
        
        {/* Table Header with Search and Integrated Add Button */}
      <div className="mb-4 flex justify-end">
  <div className="flex items-center gap-3">
    <div className="relative w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
      <input
        type="text"
        placeholder="Search our journeys..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full text-black pl-10 pr-4 py-2 border border-red-200 rounded-lg"
      />
    </div>

    <button
      onClick={() => setIsModalOpen(true)}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl whitespace-nowrap"
    >
      <Plus className="w-4 h-4" />
      Add Our Journey
    </button>
  </div>
</div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#7d3431]/10 to-[#cb8c89]/10 border-b border-[#cb8c89]/40 text-[#7d3431] font-bold uppercase text-xs tracking-wider">
                <th className="px-6 py-4 w-[100px]">Image</th>
                <th className="px-6 py-4 w-[220px]">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 w-[140px]">Date Range</th>
                <th className="px-6 py-4 w-[150px]">Category</th>
                <th className="px-6 py-4 w-[110px]">Duration</th>
                <th className="px-6 py-4 w-[150px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#7d3431]/10">
              {currentEntries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-[#7d3431]/40">
                    <Clock className="w-12 h-12 mx-auto opacity-30 mb-2 text-[#7d3431]" />
                    <p className="font-semibold text-sm">No journey entries found matching search</p>
                  </td>
                </tr>
              ) : (
                currentEntries.map((entry) => {
                  const CategoryIcon = getCategoryIcon(entry.category);
                  return (
                    <tr key={entry.id} className="hover:bg-[#7d3431]/5 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="w-14 h-14 rounded-lg bg-slate-50 overflow-hidden border border-[#cb8c89]/40 shadow-xs">
                          <img src={entry.imageUrl} alt={entry.title} className="w-full h-full object-cover" />
                        </div>
                      </td>

                      <td className="px-6 py-3.5">
                        <span className="font-bold text-black block truncate max-w-[200px]">{entry.title}</span>
                      </td>

                      <td className="px-3 py-3.5">
                        <span className="text-black/70 block max-w-xs xl:max-w-md truncate">{truncateText(entry.description, 15)}</span>
                      </td>

                      <td className="px-6 py-3.5 text-black/60 font-medium whitespace-nowrap text-xs">
                        {formatDateRange(entry)}
                      </td>

                      <td className="px-6 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(entry.category)}`}>
                          <CategoryIcon className="w-3 h-3 flex-shrink-0" />
                          {getCategoryLabel(entry.category)}
                        </span>
                      </td>

                      <td className="px-6 py-3.5 text-black/70 font-medium whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 bg-[#7d3431]/5 px-2.5 py-1 rounded-lg border border-[#cb8c89]/40 text-xs">
                          <Clock className="w-3 h-3 text-[#7d3431]/60" />
                          {getDuration(entry)} {getDuration(entry) === 1 ? 'year' : 'years'}
                        </span>
                      </td>

                      <td className="px-6 py-3.5 text-right">
                        <div className="flex justify-end gap-1">
                          <button 
                            onClick={() => handleView(entry)}
                            title="View Details" 
                            className="p-2 text-[#7d3431]/60 rounded-lg hover:text-[#7d3431] hover:bg-[#7d3431]/10 transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEdit(entry)}
                            title="Edit" 
                            className="p-2 text-[#cb8c89] rounded-lg hover:text-[#7d3431] hover:bg-[#cb8c89]/10 transition-all duration-200"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(entry.id)}
                            title="Delete" 
                            className="p-2 text-black/40 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredEntries.length > 0 && (
          <div className="px-6 py-4 border-t border-[#7d3431]/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-[#7d3431]/5 to-[#cb8c89]/5">
            <span className="font-medium text-black/70 text-sm">
              Showing <span className="text-[#7d3431] font-bold">{indexOfFirstItem + 1}</span> to{' '}
              <span className="text-[#7d3431] font-bold">
                {Math.min(indexOfLastItem, filteredEntries.length)}
              </span>{' '}
              of <span className="text-[#7d3431] font-bold">{filteredEntries.length}</span> records
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
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl border-2 border-[#7d3431]/20 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5 pb-2 border-b border-[#7d3431]/10">
              <h3 className="text-lg font-bold text-[#7d3431]">
                {editingId ? 'Edit Journey Milestone' : 'Add New Journey Milestone'}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-1.5 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingId ? handleUpdateEntry : handleCreateEntry} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-1.5">
                  Milestone Image *
                </label>
                {previewUrl ? (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-[#7d3431]/30 shadow-inner">
                    <img 
                      key={previewUrl} 
                      src={previewUrl} 
                      alt="Preview Source" 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (previewUrl && !previewUrl.startsWith('http')) {
                          URL.revokeObjectURL(previewUrl);
                        }
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
                    <span className="text-sm font-semibold text-black">Click to upload milestone photo</span>
                    <span className="text-xs text-black/40 mt-1">PNG, JPG, JPEG up to 5MB</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange} 
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-1.5">
                  Title *
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Infrastructure Modernization"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cb8c89]/60 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-1.5">
                  Description *
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide precise execution summaries or achievements..."
                  rows="3"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cb8c89]/60 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all resize-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cb8c89]/60 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-1.5">
                    Start Date *
                  </label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#cb8c89]/60 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-1.5">
                    End Date
                  </label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    disabled={isPresent}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all bg-white ${
                      isPresent ? 'bg-gray-100 border-gray-200 cursor-not-allowed' : 'border-[#cb8c89]/60'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPresent"
                  checked={isPresent}
                  onChange={(e) => {
                    setIsPresent(e.target.checked);
                    if (e.target.checked) {
                      setEndDate('');
                    }
                  }}
                  className="w-4 h-4 rounded border-[#7d3431]/30 text-[#7d3431] focus:ring-[#7d3431]/20"
                />
                <label htmlFor="isPresent" className="text-sm font-medium text-black/70">
                  Present (ongoing task)
                </label>
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
                  {editingId ? 'Update Milestone' : 'Save Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {isViewModalOpen && viewingEntry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl border-2 border-[#7d3431]/20">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#7d3431]/10">
              <h3 className="text-lg font-bold text-[#7d3431]">Milestone Specification Overview</h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingEntry(null);
                }}
                className="p-1.5 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-[#cb8c89]/40 shadow-sm">
                <img 
                  src={viewingEntry.imageUrl} 
                  alt={viewingEntry.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="space-y-3.5 bg-[#7d3431]/5 p-4 rounded-xl border border-[#cb8c89]/20">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Milestone Title</p>
                  <p className="text-base font-bold text-black mt-0.5">{viewingEntry.title}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Full Description</p>
                  <p className="text-sm text-black/80 mt-0.5 leading-relaxed">{viewingEntry.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Category</p>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border mt-1.5 ${getCategoryColor(viewingEntry.category)}`}>
                      {React.createElement(getCategoryIcon(viewingEntry.category), { className: 'w-3 h-3 flex-shrink-0' })}
                      {getCategoryLabel(viewingEntry.category)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Duration</p>
                    <p className="text-sm font-semibold text-black mt-1.5">
                      {getDuration(viewingEntry)} {getDuration(viewingEntry) === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Active Timelines</p>
                  <p className="text-sm font-semibold text-black mt-0.5">{formatDateRange(viewingEntry)}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingEntry(null);
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