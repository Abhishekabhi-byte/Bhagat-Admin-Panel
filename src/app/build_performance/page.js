// app/projects/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { 
  FolderKanban, 
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
  User
} from 'lucide-react';

export default function Build_Performance() {
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      title: 'E-Commerce Website Redesign', 
      description: 'Complete redesign of the e-commerce platform ',
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      createdAt: '2026-07-01',
      status: 'In Progress'
    },
    { 
      id: 2, 
      title: 'Mobile App Development', 
      description: 'Cross-platform mobile application for fitness tracking with real-time analytics.',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250',
      createdAt: '2026-07-05',
      status: 'Completed'
    },
    { 
      id: 3, 
      title: 'Brand Identity Design', 
      description: 'Complete brand identity including logo, color palette, typography, and brand guidelines.',
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=250',
      createdAt: '2026-07-06',
      status: 'Planning'
    },
    { 
      id: 4, 
      title: 'AI Chatbot Development', 
      description: 'Intelligent chatbot powered by AI for customer support automation.',
      imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
      createdAt: '2026-07-07',
      status: 'In Progress'
    },
    { 
      id: 5, 
      title: 'Data Analytics Dashboard', 
      description: 'Real-time data analytics dashboard with interactive charts and reports.',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250',
      createdAt: '2026-07-08',
      status: 'Completed'
    },
    { 
      id: 6, 
      title: 'Cloud Migration Project', 
      description: 'Migration of on-premise infrastructure to cloud with zero downtime.',
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250',
      createdAt: '2026-07-09',
      status: 'Planning'
    },
    { 
      id: 7, 
      title: 'Marketing Campaign Website', 
      description: 'Landing page for digital marketing campaign with lead generation forms.',
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      createdAt: '2026-07-10',
      status: 'In Progress'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [status, setStatus] = useState('Planning');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filter projects based on search
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Ensure current page is always valid after filter changes
  useEffect(() => {
    if (filteredProjects.length === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredProjects.length, totalPages]);

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

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!previewUrl) return alert('Please select an image.');
    if (!title.trim()) return alert('Please enter a project title.');

    const newProject = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      imageUrl: previewUrl,
      status: status,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProjects([newProject, ...projects]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setPreviewUrl(project.imageUrl);
    setStatus(project.status);
    setIsModalOpen(true);
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    if (!previewUrl) return alert('Please select an image.');
    if (!title.trim()) return alert('Please enter a project title.');

    const updatedProjects = projects.map(project =>
      project.id === editingId
        ? { 
            ...project, 
            title: title.trim(), 
            description: description.trim(),
            imageUrl: previewUrl,
            status: status
          }
        : project
    );

    setProjects(updatedProjects);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(project => project.id !== id);
      setProjects(updatedProjects);
    }
  };

  const handleView = (project) => {
    setViewingProject(project);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImage(null);
    setPreviewUrl('');
    setStatus('Planning');
    setEditingId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Planning':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-5 bg-[#7d3431] p-6 min-h-screen max-w-7xl mx-auto  shadow-xl">
      
      {/* Integrated Title / Control Section */}
      <div className="bg-white rounded-xl border border-[#cb8c89]/40 shadow-md overflow-hidden flex flex-col justify-between">
        
        {/* Table Header with Search and Integrated Add Button */}
           <div className="flex justify-end w-full">
        <div className="flex flex-col sm:flex-row items-stretch p-4 sm:items-center gap-3 max-w-xl w-full sm:w-auto">
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
            Add  Performance
          </button>
        </div>
      </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#7d3431]/10 to-[#cb8c89]/10 border-b border-[#cb8c89]/40 text-[#7d3431] font-bold uppercase text-xs tracking-wider">
                <th className="px-6 py-4 w-[120px]">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 w-[120px]">Status</th>
                <th className="px-6 py-4 w-[160px]">Created Date</th>
                <th className="px-6 py-4 w-[180px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#7d3431]/10">
              {currentProjects.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-[#7d3431]/40">
                    <FolderKanban className="w-12 h-12 mx-auto opacity-30 mb-2 text-[#7d3431]" />
                    <p className="font-semibold text-sm">No projects found matching search</p>
                  </td>
                </tr>
              ) : (
                currentProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-[#7d3431]/5 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="w-16 h-16 rounded-lg bg-slate-50 overflow-hidden border border-[#cb8c89]/40 shadow-xs">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    
                    <td className="px-6 py-3.5">
                      <span className="font-bold text-black block max-w-xs truncate">{project.title}</span>
                    </td>

                    <td className="px-6 py-3.5">
                      <span className="text-black/70 block max-w-sm truncate">{project.description}</span>
                    </td>

                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                          ${project.status === 'In Progress' ? 'bg-blue-500' : ''}
                          ${project.status === 'Completed' ? 'bg-emerald-500' : ''}
                          ${project.status === 'Planning' ? 'bg-amber-500' : ''}
                        `} />
                        {project.status}
                      </span>
                    </td>

                    <td className="px-6 py-3.5 text-black/60 font-medium">
                      {project.createdAt}
                    </td>

                    <td className="px-6 py-3.5 text-right">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => handleView(project)}
                          title="View Details" 
                          className="p-2 text-[#7d3431]/60 rounded-lg hover:text-[#7d3431] hover:bg-[#7d3431]/10 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(project)}
                          title="Edit" 
                          className="p-2 text-[#cb8c89] rounded-lg hover:text-[#7d3431] hover:bg-[#cb8c89]/10 transition-all duration-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(project.id)}
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
        {filteredProjects.length > 0 && (
          <div className="px-6 py-4 border-t border-[#7d3431]/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-[#7d3431]/5 to-[#cb8c89]/5">
            <span className="font-medium text-black/70 text-sm">
              Showing <span className="text-[#7d3431] font-bold">{indexOfFirstItem + 1}</span> to{' '}
              <span className="text-[#7d3431] font-bold">
                {indexOfLastItem > filteredProjects.length ? filteredProjects.length : indexOfLastItem}
              </span>{' '}
              of <span className="text-[#7d3431] font-bold">{filteredProjects.length}</span> records
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
                {editingId ? 'Edit Project Details' : 'Create New Project'}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-1.5 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingId ? handleUpdateProject : handleCreateProject} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-1.5">
                  Project Image *
                </label>
                {previewUrl ? (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-[#7d3431]/30 shadow-inner">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
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
                    <span className="text-sm font-semibold text-black">Click to upload image</span>
                    <span className="text-xs text-black/40 mt-1">PNG, JPG, JPEG up to 5MB</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-1.5">
                  Project Title *
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. E-Commerce Website Redesign"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cb8c89]/60 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-1.5">
                  Description
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project..."
                  rows="3"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cb8c89]/60 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all resize-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7d3431] mb-1.5">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cb8c89]/60 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all bg-white"
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
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
                  {editingId ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {isViewModalOpen && viewingProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl border-2 border-[#7d3431]/20">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#7d3431]/10">
              <h3 className="text-lg font-bold text-[#7d3431]">Project Details</h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingProject(null);
                }}
                className="p-1.5 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-full h-52 rounded-lg overflow-hidden border-2 border-[#cb8c89]/40 shadow-sm">
                <img src={viewingProject.imageUrl} alt={viewingProject.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="space-y-3.5 bg-[#7d3431]/5 p-4 rounded-xl border border-[#cb8c89]/20">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Project Title</p>
                  <p className="text-base font-bold text-black mt-0.5">{viewingProject.title}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Description</p>
                  <p className="text-sm text-black/80 mt-0.5 leading-relaxed">{viewingProject.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border mt-1.5 ${getStatusColor(viewingProject.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                        ${viewingProject.status === 'In Progress' ? 'bg-blue-500' : ''}
                        ${viewingProject.status === 'Completed' ? 'bg-emerald-500' : ''}
                        ${viewingProject.status === 'Planning' ? 'bg-amber-500' : ''}
                      `} />
                      {viewingProject.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#7d3431]">Created Date</p>
                    <p className="text-sm font-semibold text-black mt-1.5">{viewingProject.createdAt}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingProject(null);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-lg font-bold hover:shadow-lg hover:shadow-[#7d3431]/30 hover:brightness-110 transition-all duration-300"
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