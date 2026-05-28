import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config/api'

const STATUS_COLORS = {
  pending:   'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const heroFileInputRef = useRef(null)
  const modalFileInputRef = useRef(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [appointments, setAppointments] = useState([])
  const [gallery, setGallery] = useState([])
  const [settings, setSettings] = useState({ clinicName: '', email: '', phone: '', city: '', address: '' })
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [settingsSaved, setSettingsSaved] = useState(null)
  const [toast, setToast] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [editingImage, setEditingImage] = useState(null)
  const [imageFormData, setImageFormData] = useState({ section: '', imageUrl: '', title: '', description: '' })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [editingApt, setEditingApt] = useState(null)
  const [editForm, setEditForm] = useState({ status: '', confirmedDate: '', confirmedTime: '', adminNote: '' })

  const imageSections = [
    // Home Page
    { id: 'home-hero-banner', label: 'Home Hero Banner', category: 'Home Page' },
    { id: 'clinic-image-1', label: 'Clinic Image 1', category: 'Home Page' },
    { id: 'clinic-image-2', label: 'Clinic Image 2', category: 'Home Page' },

    // Treatments Page
    { id: 'treatments-hero', label: 'Treatments Hero', category: 'Treatments Page' },
    { id: 'skin-treatment-before', label: 'Chemical Peels', category: 'Treatments Page' },
    { id: 'skin-treatment-after', label: 'Mesotherapy', category: 'Treatments Page' },
    { id: 'laser-treatment-1', label: 'Laser Hair Removal', category: 'Treatments Page' },
    { id: 'laser-treatment-2', label: 'Fractional Resurfacing', category: 'Treatments Page' },


    // Patient Results Page (Hair)
    { id: 'hair-result-1-before', label: 'Hair Result 1 (Before)', category: 'Patient Results Page' },
    { id: 'hair-result-1-after', label: 'Hair Result 1 (After)', category: 'Patient Results Page' },
    { id: 'hair-result-2-before', label: 'Hair Result 2 (Before)', category: 'Patient Results Page' },
    { id: 'hair-result-2-after', label: 'Hair Result 2 (After)', category: 'Patient Results Page' },
    { id: 'hair-result-3-before', label: 'Hair Result 3 (Before)', category: 'Patient Results Page' },
    { id: 'hair-result-3-after', label: 'Hair Result 3 (After)', category: 'Patient Results Page' },

    // Patient Results Page (Skin)
    { id: 'skin-result-1-before', label: 'Skin Result 1 (Before)', category: 'Patient Results Page' },
    { id: 'skin-result-1-after', label: 'Skin Result 1 (After)', category: 'Patient Results Page' },
    { id: 'skin-result-2-before', label: 'Skin Result 2 (Before)', category: 'Patient Results Page' },
    { id: 'skin-result-2-after', label: 'Skin Result 2 (After)', category: 'Patient Results Page' },
    { id: 'skin-result-3-before', label: 'Skin Result 3 (Before)', category: 'Patient Results Page' },
    { id: 'skin-result-3-after', label: 'Skin Result 3 (After)', category: 'Patient Results Page' },
    { id: 'skin-result-4-before', label: 'Skin Result 4 (Before)', category: 'Patient Results Page' },
    { id: 'skin-result-4-after', label: 'Skin Result 4 (After)', category: 'Patient Results Page' },
  ]

  const getToken = () => {
    try {
      const data = localStorage.getItem('authToken')
      return data ? JSON.parse(data).token : null
    } catch { return null }
  }

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  })

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/appointments`, { headers: authHeaders() })
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('authToken')
        navigate('/login')
        return
      }
      const data = await res.json()
      if (data.success) setAppointments(data.appointments || [])
    } catch (e) { console.error(e) }
  }, [])

  const fetchGallery = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/gallery`)
      const data = await res.json()
      if (data.success) setGallery(data.images || [])
    } catch (e) { console.error(e) }
  }, [])

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings`, { headers: authHeaders() })
      const data = await res.json()
      if (data.success && data.settings) setSettings(data.settings)
    } catch (e) { console.error(e) }
  }, [])

  const fetchMessages = useCallback(async () => {
    try {
      console.log('Fetching messages...');
      const res = await fetch(`${API_URL}/api/messages`, { headers: authHeaders() })
      const data = await res.json()
      console.log('Fetched messages data:', data);
      if (data.success) setMessages(data.messages || [])
    } catch (e) { console.error('Error fetching messages:', e) }
  }, [])

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await Promise.all([fetchAppointments(), fetchGallery(), fetchSettings(), fetchMessages()])
    setLoading(false)
  }, [fetchAppointments, fetchGallery, fetchSettings, fetchMessages])

  useEffect(() => { fetchAll() }, [fetchAll])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/api/appointments/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (data.success) {
        setAppointments(prev => prev.map(a => a._id === id ? data.appointment : a))
        showToast(`Appointment ${status}`)
      }
    } catch (e) { showToast('Failed to update', 'error') }
  }

  const openEditApt = (apt) => {
    setEditingApt(apt)
    setEditForm({
      status: apt.status,
      confirmedDate: apt.confirmedDate ? new Date(apt.confirmedDate).toISOString().split('T')[0] : '',
      confirmedTime: apt.confirmedTime || '',
      adminNote: apt.adminNote || '',
    })
  }

  const saveEditApt = async () => {
    if (!editingApt) return
    try {
      const res = await fetch(`${API_URL}/api/appointments/${editingApt._id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(editForm),
      })
      const data = await res.json()
      if (data.success) {
        setAppointments(prev => prev.map(a => a._id === editingApt._id ? data.appointment : a))
        showToast('Appointment updated!')
        setEditingApt(null)
      } else {
        showToast(data.message || 'Failed to update', 'error')
      }
    } catch (e) { showToast('Failed to update', 'error') }
  }

  const deleteAppointment = async (id) => {
    if (!window.confirm('Delete this appointment?')) return
    try {
      const res = await fetch(`${API_URL}/api/appointments/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      const data = await res.json()
      if (data.success) {
        setAppointments(prev => prev.filter(a => a._id !== id))
        showToast('Appointment deleted')
      }
    } catch (e) { showToast('Failed to delete', 'error') }
  }

  const markMessageRead = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/messages/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ status: 'read' })
      })
      const data = await res.json()
      if (data.success) {
        setMessages(prev => prev.map(m => m._id === id ? data.message : m))
        showToast('Message marked as read')
      }
    } catch (e) { showToast('Failed to update message', 'error') }
  }

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      const res = await fetch(`${API_URL}/api/messages/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      const data = await res.json()
      if (data.success) {
        setMessages(prev => prev.filter(m => m._id !== id))
        showToast('Message deleted')
      }
    } catch (e) { showToast('Failed to delete message', 'error') }
  }

  const saveSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(settings),
      })
      const data = await res.json()
      if (data.success) {
        showToast('Settings saved!')
        setSettingsSaved(true)
        setTimeout(() => setSettingsSaved(null), 2000)
      }
    } catch (e) { showToast('Failed to save settings', 'error') }
  }

  const openImageModal = (section = null) => {
    if (section) {
      setEditingImage(section)
      const existing = gallery.find(g => g.section === section.id)
      setImageFormData({
        section: section.id,
        imageUrl: existing?.imageUrl || '',
        title: existing?.title || section.label,
        description: existing?.description || ''
      })
    } else {
      setEditingImage(null)
      setImageFormData({ section: '', imageUrl: '', title: '', description: '' })
    }
    setIsImageModalOpen(true)
  }

  const closeImageModal = () => {
    setIsImageModalOpen(false)
    setEditingImage(null)
    setImageFormData({ section: '', imageUrl: '', title: '', description: '' })
    setUploadProgress(0)
  }

  const uploadImageFile = async (file) => {
    if (!file) {
      showToast('Please select an image file', 'error')
      return
    }

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size must be less than 5MB', 'error')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const xhr = new XMLHttpRequest()

      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100
          setUploadProgress(Math.round(progress))
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
          const data = JSON.parse(xhr.responseText)
          setImageFormData(prev => {
            if (prev.section === 'home-hero-banner' || prev.section === 'treatments-hero') {
              const currentUrls = prev.imageUrl ? prev.imageUrl.split(',').map(u => u.trim()).filter(Boolean) : []
              const newUrls = [...currentUrls, data.url].join(',')
              return {
                ...prev,
                imageUrl: newUrls
              }
            } else {
              return {
                ...prev,
                imageUrl: data.url
              }
            }
          })
          showToast('Image uploaded successfully!')
        } else {
          const error = JSON.parse(xhr.responseText)
          showToast(error.message || 'Upload failed', 'error')
        }
        setIsUploading(false)
        setUploadProgress(0)
      })

      xhr.addEventListener('error', () => {
        showToast('Upload failed', 'error')
        setIsUploading(false)
        setUploadProgress(0)
      })

      xhr.open('POST', `${API_URL}/api/media/upload`)
      xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`)
      xhr.send(formData)
    } catch (e) {
      showToast('Failed to upload image', 'error')
      setIsUploading(false)
      setUploadProgress(0)
      console.error(e)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadImageFile(file)
    }
  }

  const saveGalleryImage = async () => {
    if (!imageFormData.section || !imageFormData.imageUrl) {
      showToast('Section and Image URL are required', 'error')
      return
    }

    try {
      const res = await fetch(`${API_URL}/api/gallery/${imageFormData.section}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(imageFormData),
      })
      const data = await res.json()
      if (data.success) {
        showToast(editingImage ? 'Image updated!' : 'Image added!')
        fetchGallery()
        closeImageModal()
      } else {
        showToast(data.message || 'Failed to save image', 'error')
      }
    } catch (e) { 
      showToast('Failed to save image', 'error')
      console.error(e)
    }
  }

  const updateSliderImages = async (sectionId, urlsList) => {
    try {
      const res = await fetch(`${API_URL}/api/gallery/${sectionId}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({
          section: sectionId,
          imageUrl: urlsList.join(','),
          title: sectionId === 'home-hero-banner' ? 'Home Hero Banner' : 'Treatments Hero'
        }),
      })
      const data = await res.json()
      if (data.success) {
        showToast('Slider updated!')
        fetchGallery()
      } else {
        showToast(data.message || 'Failed to update slider', 'error')
      }
    } catch (e) {
      showToast('Failed to update slider', 'error')
      console.error(e)
    }
  }

  const deleteGalleryImage = async (section) => {
    if (!window.confirm('Delete this image?')) return
    try {
      const res = await fetch(`${API_URL}/api/gallery/${section}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      const data = await res.json()
      if (data.success) {
        showToast('Image deleted')
        fetchGallery()
      } else {
        showToast(data.message || 'Failed to delete image', 'error')
      }
    } catch (e) { 
      showToast('Failed to delete image', 'error')
      console.error(e)
    }
  }

  const filtered = appointments.filter(a => {
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus
    const matchesSearch = !searchTerm.trim() ||
      (a.fullName && a.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (a.phone && a.phone.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  const pending   = appointments.filter(a => a.status === 'pending').length
  const confirmed = appointments.filter(a => a.status === 'confirmed').length
  const total     = appointments.length

  const adminName = (() => {
    try { return JSON.parse(localStorage.getItem('authToken'))?.name || 'Admin' } catch { return 'Admin' }
  })()

  const navItems = [
    { id: 'dashboard',    label: 'Dashboard',           icon: 'dashboard' },
    { id: 'appointments', label: 'Patient Appointments', icon: 'calendar_month' },
    { id: 'content',      label: 'Content Management',  icon: 'edit_note' },
    { id: 'settings',     label: 'Settings',            icon: 'settings' },
  ]

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[999] px-6 py-3 rounded-xl shadow-lg text-white text-sm font-semibold transition
          ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.msg}
        </div>
      )}

      {/* Sidebar Overlay backdrop on Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 w-64 h-screen bg-white border-r border-outline-variant flex flex-col p-6 z-50 transition-transform duration-300 md:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">Care One</h1>
            <p className="text-xs text-on-surface-variant mt-1">Clinic Administration</p>
          </div>
          {/* Close button on Mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-on-surface-variant"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-primary/10 text-primary border-r-4 border-primary'
                  : 'text-on-surface-variant hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                {item.label}
              </div>
              {item.id === 'messages' && messages.filter(m => m.status === 'unread').length > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                  {messages.filter(m => m.status === 'unread').length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <button
          onClick={() => {
            handleLogout()
            setIsSidebarOpen(false)
          }}
          className="w-full flex items-center gap-2 bg-primary text-white py-3 px-4 rounded-lg hover:opacity-90 transition mt-4"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </aside>

      {/* Main */}
      <div className="ml-0 md:ml-64 flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-outline-variant h-16 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition md:hidden mr-2 text-on-surface-variant"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-primary">Care One Admin</h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchAll} title="Refresh" className="p-2 rounded-lg hover:bg-gray-100 transition">
              <span className="material-symbols-outlined text-on-surface-variant">refresh</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">{adminName}</p>
              <p className="text-xs text-on-surface-variant">Super Admin</p>
            </div>
          </div>
        </header>

        <main className="p-8 flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-on-surface-variant text-sm">Loading data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* ── DASHBOARD ── */}
              {activeTab === 'dashboard' && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-on-surface mb-1">Dashboard Overview</h3>
                    <p className="text-on-surface-variant">Welcome back, {adminName}! Here's your clinic overview.</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {[
                      { label: 'Total Appointments', value: total,     icon: 'calendar_month', color: 'text-primary' },
                      { label: 'Pending',            value: pending,   icon: 'pending_actions', color: 'text-yellow-600' },
                      { label: 'Confirmed',          value: confirmed, icon: 'check_circle', color: 'text-green-600' },
                      { label: 'Completed',          value: appointments.filter(a=>a.status==='completed').length, icon: 'emoji_events', color: 'text-blue-600' },
                    ].map((s, i) => (
                      <div key={i} className="bg-white rounded-xl border border-outline-variant p-4 sm:p-6 shadow-sm flex flex-col justify-between">
                        <span className={`material-symbols-outlined text-3xl mb-2 ${s.color}`}>{s.icon}</span>
                        <div>
                          <p className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</p>
                          <p className="text-xs text-on-surface-variant font-semibold">{s.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent appointments preview */}
                  <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-outline-variant flex items-center justify-between">
                      <h4 className="text-lg font-bold text-on-surface">Recent Appointments</h4>
                      <button onClick={() => setActiveTab('appointments')} className="text-primary text-sm font-semibold hover:underline">
                        View All →
                      </button>
                    </div>
                    {appointments.length === 0 ? (
                      <div className="p-8 text-center text-on-surface-variant">No appointments yet.</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-surface-container-low">
                            <tr>
                              {['Patient', 'Service', 'Date', 'Status'].map(h => (
                                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-outline-variant">
                            {appointments.slice(0, 5).map(apt => (
                              <tr key={apt._id} className="hover:bg-surface-container-low transition">
                                <td className="px-6 py-4">
                                  <p className="font-semibold text-on-surface text-sm">{apt.fullName}</p>
                                  {apt.bookingId && <p className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono font-bold inline-block mt-0.5">{apt.bookingId}</p>}
                                  <p className="text-xs text-on-surface-variant">{apt.phone}</p>
                                </td>
                                <td className="px-6 py-4 text-sm text-on-surface-variant">{apt.treatment}</td>
                                <td className="px-6 py-4 text-sm text-on-surface">{new Date(apt.preferredDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[apt.status] || 'bg-gray-100 text-gray-800'}`}>
                                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}



              {/* ── APPOINTMENTS ── */}
              {activeTab === 'appointments' && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-on-surface mb-1">Patient Appointments</h3>
                    <p className="text-on-surface-variant">Manage all incoming appointment requests.</p>
                  </div>

                  {/* Filter tabs and Search bar */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                      {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                        <button
                          key={s}
                          onClick={() => setFilterStatus(s)}
                          className={`px-4 py-2 rounded-full text-sm font-semibold transition capitalize ${
                            filterStatus === s ? 'bg-primary text-white' : 'bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-container-low'
                          }`}
                        >
                          {s === 'all' ? `All (${total})` : `${s} (${appointments.filter(a=>a.status===s).length})`}
                        </button>
                      ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-lg select-none">
                        search
                      </span>
                      <input
                        type="text"
                        placeholder="Search patient, phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 bg-white border border-outline-variant rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm placeholder:text-on-surface-variant/50 transition"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors duration-200"
                          title="Clear search"
                        >
                          <span className="material-symbols-outlined text-lg select-none">close</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                    {filtered.length === 0 ? (
                      <div className="p-12 text-center text-on-surface-variant">No appointments found.</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-surface-container-low">
                            <tr>
                              {['Patient', 'Contact', 'Service', 'Requested Schedule', 'Confirmed Schedule', 'Status', 'Actions'].map(h => (
                                <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-on-surface-variant uppercase">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-outline-variant">
                            {filtered.map(apt => (
                              <tr key={apt._id} className="hover:bg-surface-container-low transition">
                                <td className="px-5 py-4">
                                  <p className="font-semibold text-on-surface text-sm">{apt.fullName}</p>
                                  {apt.bookingId && <p className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono font-bold inline-block mt-0.5">{apt.bookingId}</p>}
                                  <p className="text-xs text-on-surface-variant">{apt.email}</p>
                                </td>
                                <td className="px-5 py-4 text-sm text-on-surface-variant">{apt.phone}</td>
                                <td className="px-5 py-4 text-sm text-on-surface">{apt.treatment}</td>
                                <td className="px-5 py-4">
                                  <p className="text-sm text-on-surface">{new Date(apt.preferredDate).toLocaleDateString()}</p>
                                  {apt.preferredTime && <p className="text-xs text-on-surface-variant mt-0.5">🕐 {apt.preferredTime}</p>}
                                </td>
                                <td className="px-5 py-4">
                                  {apt.confirmedDate ? (
                                    <div>
                                      <p className="text-sm font-semibold text-green-700">{new Date(apt.confirmedDate).toLocaleDateString()}</p>
                                      {apt.confirmedTime && <p className="text-xs text-green-600 mt-0.5">🕐 {apt.confirmedTime}</p>}
                                      {apt.adminNote && <p className="text-xs text-on-surface-variant mt-0.5 italic">{apt.adminNote}</p>}
                                    </div>
                                  ) : (
                                    <span className="text-xs text-on-surface-variant italic">Not set</span>
                                  )}
                                </td>
                                <td className="px-5 py-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[apt.status] || 'bg-gray-100 text-gray-800'}`}>
                                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-5 py-4">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <button
                                      onClick={() => openEditApt(apt)}
                                      className="bg-primary/10 text-primary hover:bg-primary/20 text-xs px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1"
                                    >
                                      <span className="material-symbols-outlined text-sm">edit</span> Edit
                                    </button>
                                    {apt.status === 'pending' && (
                                      <>
                                        <button
                                          onClick={() => updateStatus(apt._id, 'confirmed')}
                                          className="bg-green-100 text-green-700 hover:bg-green-200 text-xs px-3 py-1.5 rounded-lg font-semibold transition"
                                        >
                                          Confirm
                                        </button>
                                        <button
                                          onClick={() => updateStatus(apt._id, 'cancelled')}
                                          className="bg-red-100 text-red-700 hover:bg-red-200 text-xs px-3 py-1.5 rounded-lg font-semibold transition"
                                        >
                                          Cancel
                                        </button>
                                      </>
                                    )}
                                    {apt.status === 'confirmed' && (
                                      <button
                                        onClick={() => updateStatus(apt._id, 'completed')}
                                        className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs px-3 py-1.5 rounded-lg font-semibold transition"
                                      >
                                        Mark Complete
                                      </button>
                                    )}
                                    <button
                                      onClick={() => deleteAppointment(apt._id)}
                                      className="text-red-400 hover:text-red-600 transition"
                                      title="Delete"
                                    >
                                      <span className="material-symbols-outlined text-base">delete</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── EDIT APPOINTMENT MODAL ── */}
              {editingApt && (
                <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-outline/30">
                      <h3 className="text-lg font-bold text-on-surface">Edit Appointment</h3>
                      <button onClick={() => setEditingApt(null)} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-on-surface-variant font-bold transition">✕</button>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="bg-surface-container-low rounded-lg p-3 text-sm">
                        <p className="font-semibold text-on-surface">{editingApt.fullName}</p>
                        <p className="text-on-surface-variant">{editingApt.treatment} — Requested: {new Date(editingApt.preferredDate).toLocaleDateString()} {editingApt.preferredTime && `at ${editingApt.preferredTime}`}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Status</label>
                        <select
                          value={editForm.status}
                          onChange={e => setEditForm(f => ({...f, status: e.target.value}))}
                          className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary"
                        >
                          {['pending','confirmed','completed','cancelled'].map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Confirmed Date</label>
                          <input
                            type="date"
                            value={editForm.confirmedDate}
                            onChange={e => setEditForm(f => ({...f, confirmedDate: e.target.value}))}
                            className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Confirmed Time</label>
                          <input
                            type="time"
                            value={editForm.confirmedTime}
                            onChange={e => setEditForm(f => ({...f, confirmedTime: e.target.value}))}
                            className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Note to Patient <span className="text-on-surface-variant font-normal">(optional)</span></label>
                        <textarea
                          value={editForm.adminNote}
                          onChange={e => setEditForm(f => ({...f, adminNote: e.target.value}))}
                          placeholder="e.g. Please arrive 10 minutes early..."
                          className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary h-20 resize-none"
                        />
                      </div>
                    </div>
                    <div className="px-6 pb-6 flex gap-3">
                      <button onClick={() => setEditingApt(null)} className="flex-1 border border-outline py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Cancel</button>
                      <button onClick={saveEditApt} className="flex-1 bg-primary text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition">Save Changes</button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── CONTENT ── */}
              {activeTab === 'content' && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-on-surface mb-1">Image Gallery Management</h3>
                    <p className="text-on-surface-variant">Manage images displayed across your website.</p>
                  </div>

                  {/* ═══════════════ Dedicated Home Hero Banner Slider Section ═══════════════ */}
                  <div className="mb-10 bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-xl font-bold text-on-surface flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-2xl">home_repair_service</span>
                          Home Hero Banner Slider
                        </h4>
                        <p className="text-sm text-on-surface-variant mt-1">Manage multiple slides displayed in the Home page main hero section.</p>
                      </div>
                      <button
                        onClick={() => openImageModal(imageSections.find(s => s.id === 'home-hero-banner'))}
                        className="bg-primary text-white hover:opacity-90 px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">add</span>
                        Add Image to Home Banner
                      </button>
                    </div>

                    {/* Slides Grid */}
                    {(() => {
                      const imgObj = gallery.find(g => g.section === 'home-hero-banner')
                      const urls = imgObj?.imageUrl ? imgObj.imageUrl.split(',').map(u => u.trim()).filter(Boolean) : []
                      if (urls.length === 0) {
                        return (
                          <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-outline-variant text-on-surface-variant italic">
                            No custom images added yet. The home banner is currently displaying default fallback slides.
                          </div>
                        )
                      }
                      return (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          {urls.map((url, idx) => (
                            <div key={idx} className="relative group h-32 border border-outline-variant rounded-xl overflow-hidden bg-gray-50 shadow-sm hover:shadow transition">
                              <img src={url} alt={`Home Slide ${idx + 1}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  onClick={() => {
                                    if (window.confirm('Remove this slide from the Home banner?')) {
                                      const filtered = urls.filter((_, i) => i !== idx)
                                      updateSliderImages('home-hero-banner', filtered)
                                    }
                                  }}
                                  className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-all"
                                  title="Remove Slide"
                                >
                                  <span className="material-symbols-outlined text-sm font-bold">delete</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    })()}
                  </div>

                  {/* ═══════════════ Dedicated Treatments Hero Banner Slider Section ═══════════════ */}
                  <div className="mb-10 bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-xl font-bold text-on-surface flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-2xl">content_cut</span>
                          Treatments Hero Banner Slider
                        </h4>
                        <p className="text-sm text-on-surface-variant mt-1">Manage multiple slides displayed in the Treatments page main hero section.</p>
                      </div>
                      <button
                        onClick={() => openImageModal(imageSections.find(s => s.id === 'treatments-hero'))}
                        className="bg-primary text-white hover:opacity-90 px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">add</span>
                        Add Image to Treatments Banner
                      </button>
                    </div>

                    {/* Slides Grid */}
                    {(() => {
                      const imgObj = gallery.find(g => g.section === 'treatments-hero')
                      const urls = imgObj?.imageUrl ? imgObj.imageUrl.split(',').map(u => u.trim()).filter(Boolean) : []
                      if (urls.length === 0) {
                        return (
                          <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-outline-variant text-on-surface-variant italic">
                            No custom images added yet. The treatments banner is currently displaying default fallback slides.
                          </div>
                        )
                      }
                      return (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          {urls.map((url, idx) => (
                            <div key={idx} className="relative group h-32 border border-outline-variant rounded-xl overflow-hidden bg-gray-50 shadow-sm hover:shadow transition">
                              <img src={url} alt={`Treatments Slide ${idx + 1}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                  onClick={() => {
                                    if (window.confirm('Remove this slide from the Treatments banner?')) {
                                      const filtered = urls.filter((_, i) => i !== idx)
                                      updateSliderImages('treatments-hero', filtered)
                                    }
                                  }}
                                  className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow hover:scale-105 active:scale-95 transition-all"
                                  title="Remove Slide"
                                >
                                  <span className="material-symbols-outlined text-sm font-bold">delete</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    })()}
                  </div>

                  {/* Group standard images by category (excluding hero sliders) */}
                  {['Home Page', 'Treatments Page', 'Patient Results Page'].map(category => {
                    const categoryImages = imageSections.filter(s => s.category === category && s.id !== 'home-hero-banner' && s.id !== 'treatments-hero')
                    if (categoryImages.length === 0) return null
                    return (
                      <div key={category} className="mb-12">
                        <h4 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
                          <span className="h-1 w-6 bg-primary rounded-full"></span>
                          Static Images: {category}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {categoryImages.map(section => {
                            const image = gallery.find(g => g.section === section.id)
                            return (
                              <div key={section.id} className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden hover:shadow-md transition">
                                {/* Image Preview */}
                                <div className="relative h-48 bg-surface-container-low overflow-hidden flex items-center justify-center bg-gray-50">
                                  {image?.imageUrl ? (
                                    <img src={image.imageUrl} alt={section.label} className="w-full h-full object-contain" />
                                  ) : (
                                    <div className="text-center text-on-surface-variant">
                                      <span className="material-symbols-outlined text-5xl mb-2 block opacity-50">image_not_supported</span>
                                      <p className="text-sm">No image set</p>
                                    </div>
                                  )}
                                </div>

                                {/* Image Info */}
                                <div className="p-4 border-t border-outline-variant">
                                  <p className="text-sm font-semibold text-on-surface mb-1">{section.label}</p>
                                  <p className="text-xs text-on-surface-variant mb-3">{section.id}</p>
                                  {image?.description && (
                                    <p className="text-xs text-on-surface-variant mb-3 line-clamp-2">{image.description}</p>
                                  )}
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => openImageModal(section)}
                                      className="flex-1 bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs px-3 py-1.5 rounded-lg font-semibold transition"
                                    >
                                      Edit
                                    </button>
                                    {image && (
                                      <button
                                        onClick={() => deleteGalleryImage(section.id)}
                                        className="text-red-400 hover:text-red-600 transition px-3 py-1.5"
                                        title="Delete"
                                      >
                                        <span className="material-symbols-outlined text-base">delete</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}



              {/* ── SETTINGS ── */}
              {activeTab === 'settings' && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-on-surface mb-1">Settings</h3>
                    <p className="text-on-surface-variant">Manage clinic configuration and preferences.</p>
                  </div>

                  <div className="max-w-2xl space-y-6">
                    <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
                      <h4 className="text-lg font-bold text-on-surface mb-6">Clinic Information</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { label: 'Clinic Name', field: 'clinicName', type: 'text' },
                          { label: 'Contact Email', field: 'email', type: 'email' },
                          { label: 'Phone Number', field: 'phone', type: 'tel' },
                          { label: 'City', field: 'city', type: 'text' },
                        ].map(({ label, field, type }) => (
                          <div key={field}>
                            <label htmlFor={field} className="block text-sm font-semibold text-on-surface mb-2">{label}</label>
                            <input
                              id={field}
                              type={type}
                              value={settings[field] || ''}
                              onChange={e => setSettings(prev => ({ ...prev, [field]: e.target.value }))}
                              className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            />
                          </div>
                        ))}
                        <div className="md:col-span-2">
                          <label htmlFor="address" className="block text-sm font-semibold text-on-surface mb-2">Address</label>
                          <input
                            id="address"
                            type="text"
                            value={settings.address || ''}
                            onChange={e => setSettings(prev => ({ ...prev, address: e.target.value }))}
                            className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          />
                        </div>
                      </div>
                      <button
                        onClick={saveSettings}
                        className={`mt-6 px-8 py-2.5 rounded-lg font-semibold text-sm transition ${
                          settingsSaved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:opacity-90'
                        }`}
                      >
                        {settingsSaved ? 'Saved!' : 'Save Changes'}
                      </button>
                    </div>

                    <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
                      <h4 className="font-bold text-on-surface mb-2">Admin Account</h4>
                      <p className="text-sm text-on-surface-variant mb-1">Email: <span className="font-semibold">admin@careone.com</span></p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Image Management Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-outline-variant sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-on-surface">
                Edit Image: {editingImage?.label}
              </h3>
              <button
                onClick={closeImageModal}
                className="text-on-surface-variant hover:text-on-surface transition"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-3">Upload Image *</label>
                <div 
                  className="relative border-2 border-dashed border-outline-variant rounded-lg p-8 text-center bg-surface-container-low hover:bg-surface-container-high transition cursor-pointer"
                  onClick={() => modalFileInputRef.current?.click()}
                >
                  <input
                    ref={modalFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isUploading}
                  />
                  
                  {isUploading ? (
                    <div className="space-y-3">
                      <div className="material-symbols-outlined text-4xl text-primary mx-auto animate-pulse">cloud_upload</div>
                      <p className="text-sm font-semibold text-on-surface">Uploading... {uploadProgress}%</p>
                      <div className="w-full bg-outline-variant rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-primary h-full transition-all duration-300" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : imageFormData.imageUrl ? (
                    <div className="space-y-2">
                      <span className="material-symbols-outlined text-4xl text-green-600 mx-auto block">check_circle</span>
                      <p className="text-sm font-semibold text-green-600">Image uploaded successfully</p>
                      <p className="text-xs text-on-surface-variant">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <span className="material-symbols-outlined text-4xl text-on-surface-variant mx-auto block">cloud_upload</span>
                      <p className="text-sm font-semibold text-on-surface">Click to upload or drag & drop</p>
                      <p className="text-xs text-on-surface-variant">PNG, JPG, GIF (max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="imageTitle" className="block text-sm font-semibold text-on-surface mb-2">Title</label>
                <input
                  id="imageTitle"
                  type="text"
                  value={imageFormData.title}
                  onChange={e => setImageFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Home Hero Banner"
                  className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="imageDesc" className="block text-sm font-semibold text-on-surface mb-2">Description</label>
                <textarea
                  id="imageDesc"
                  value={imageFormData.description}
                  onChange={e => setImageFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Optional description for this image"
                  className="w-full px-4 py-2.5 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  rows="3"
                />
              </div>

              {/* Image Preview & Slider Management */}
              {imageFormData.imageUrl && (
                <div className="mt-4 space-y-4">
                  {imageFormData.section === 'home-hero-banner' || imageFormData.section === 'treatments-hero' ? (
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-on-surface">
                        Banner Slider Images ({imageFormData.imageUrl.split(',').map(u => u.trim()).filter(Boolean).length})
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {imageFormData.imageUrl.split(',').map(u => u.trim()).filter(Boolean).map((url, idx) => (
                          <div key={idx} className="relative group h-24 border border-outline-variant rounded-lg overflow-hidden bg-gray-50 shadow-sm">
                            <img src={url} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                const urls = imageFormData.imageUrl.split(',').map(u => u.trim()).filter(Boolean)
                                const filtered = urls.filter((_, i) => i !== idx)
                                setImageFormData(prev => ({
                                  ...prev,
                                  imageUrl: filtered.join(',')
                                }))
                              }}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-600/90 text-white rounded-full flex items-center justify-center hover:bg-red-700 hover:scale-105 active:scale-95 transition-all shadow-md"
                              title="Delete Slide"
                            >
                              <span className="material-symbols-outlined text-[14px] font-bold">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-on-surface mb-2">Preview</label>
                      <img src={imageFormData.imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-outline-variant" />
                    </div>
                  )}
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                <p className="font-semibold mb-1">Tips:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  {imageFormData.section === 'home-hero-banner' || imageFormData.section === 'treatments-hero' ? (
                    <>
                      <li>You can upload multiple images to append them to the banner slider</li>
                      <li>Click the "✕" button on any slide thumbnail above to remove it from the slider</li>
                      <li>Use landscape 16:9 high-resolution images for the best visual aesthetics</li>
                    </>
                  ) : (
                    <>
                      <li>Use high-quality images for best appearance</li>
                      <li>Recommended sizes: Hero 1200x600px, Other 800x600px</li>
                      <li>Supported formats: PNG, JPG, GIF (max 5MB)</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-outline-variant bg-surface-container-low sticky bottom-0">
              <button
                onClick={closeImageModal}
                disabled={isUploading}
                className="px-6 py-2.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-low transition text-sm font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={saveGalleryImage}
                disabled={isUploading || !imageFormData.imageUrl}
                className="px-6 py-2.5 rounded-lg bg-primary text-white hover:opacity-90 transition text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Save Image'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
