import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Treatments from './pages/Treatments'
import AboutUs from './pages/AboutUs'
import PatientResults from './pages/PatientResults'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import BookingModal from './components/BookingModal'
import StatusCheckModal from './components/StatusCheckModal'
import API_URL from './config/api'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import FAQs from './pages/FAQs'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

function AppContent() {
  const [showBooking, setShowBooking] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/api/settings`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.settings) {
          setSettings(data.settings)
        }
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  // Don't show header/footer on login and admin pages
  const isAdminPage = location.pathname.startsWith('/admin')
  const isLoginPage = location.pathname === '/login'

  if (isLoginPage) {
    return <Login />
  }

  if (isAdminPage) {
    return (
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen bg-mesh text-on-surface font-body-md flex flex-col">
      <Header onBookClick={() => setShowBooking(true)} onStatusCheckClick={() => setShowStatusModal(true)} navigate={navigate} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onBookClick={() => setShowBooking(true)} />} />
          <Route path="/treatments" element={<Treatments onBookClick={() => setShowBooking(true)} />} />
          <Route path="/about" element={<AboutUs onBookClick={() => setShowBooking(true)} />} />
          <Route path="/patient-results" element={<PatientResults onBookClick={() => setShowBooking(true)} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer settings={settings} />
      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
      {showStatusModal && <StatusCheckModal onClose={() => setShowStatusModal(false)} />}
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
        aria-label="Chat with us on WhatsApp"
      >
        {/* "We are online" tooltip */}
        <span className="bg-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap border border-gray-100">
          We are online
        </span>

        {/* WhatsApp icon button */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
          <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.428a.75.75 0 0 0 .916.916l5.638-1.474A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.52-5.168-1.427l-.371-.22-3.847 1.006 1.028-3.742-.242-.389A9.947 9.947 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </div>
        </div>
      </a>
    </div>
  )
}

function Header({ onBookClick, onStatusCheckClick, navigate }) {
  const { user } = useAuth()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [myAppointments, setMyAppointments] = useState([])
  const [isNotifOpen, setIsNotifOpen] = useState(false)

  const [readNotifs, setReadNotifs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('read_notifications') || '[]')
    } catch {
      return []
    }
  })
  const [deletedNotifs, setDeletedNotifs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('deleted_notifications') || '[]')
    } catch {
      return []
    }
  })

  const handleMarkRead = (id) => {
    if (readNotifs.includes(id)) return
    const updated = [...readNotifs, id]
    setReadNotifs(updated)
    localStorage.setItem('read_notifications', JSON.stringify(updated))
  }

  const handleDeleteNotif = (id) => {
    if (deletedNotifs.includes(id)) return
    const updated = [...deletedNotifs, id]
    setDeletedNotifs(updated)
    localStorage.setItem('deleted_notifications', JSON.stringify(updated))
  }

  const visibleNotifs = myAppointments.filter(apt => !deletedNotifs.includes(apt._id))
  const unreadNotifsCount = visibleNotifs.filter(apt => !readNotifs.includes(apt._id)).length

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/')
    window.location.reload()
  }

  useEffect(() => {
    if (user && user.type !== 'admin') {
      const fetchMyApts = async () => {
        try {
          const res = await fetch(`${API_URL}/api/appointments/my`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
          const data = await res.json()
          if (data.success) {
            setMyAppointments(data.appointments || [])
          }
        } catch (e) {
          console.error(e)
        }
      }
      fetchMyApts()
      const interval = setInterval(fetchMyApts, 10000)
      return () => clearInterval(interval)
    }
  }, [user])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-outline-variant/20">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-2 lg:py-3">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/logo.png" alt="Care One Skin & Hair Clinic Logo" className="h-10 lg:h-12 w-auto object-contain" />
        </Link>
        
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className={location.pathname === '/' ? "text-gray-900 border-b-2 border-primary pb-1 font-semibold" : "text-gray-600 hover:text-primary transition font-medium"}>Home</Link>
          <Link to="/treatments" className={location.pathname === '/treatments' ? "text-gray-900 border-b-2 border-primary pb-1 font-semibold" : "text-gray-600 hover:text-primary transition font-medium"}>Treatments</Link>
          <Link to="/patient-results" className={location.pathname === '/patient-results' ? "text-gray-900 border-b-2 border-primary pb-1 font-semibold" : "text-gray-600 hover:text-primary transition font-medium"}>Patient Results</Link>
          <Link to="/about" className={location.pathname === '/about' ? "text-gray-900 border-b-2 border-primary pb-1 font-semibold" : "text-gray-600 hover:text-primary transition font-medium"}>About us</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? "text-gray-900 border-b-2 border-primary pb-1 font-semibold" : "text-gray-600 hover:text-primary transition font-medium"}>Contact</Link>
        </div>

        {/* Right Action buttons and Hamburger Menu */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications Popover Toggle Button */}
          {user && user.type !== 'admin' && (
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-full hover:bg-surface-container-low transition text-on-surface-variant flex items-center justify-center"
                aria-label="View notifications"
              >
                <span className="material-symbols-outlined text-2xl">notifications</span>
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></span>
                )}
              </button>
 
              {/* High-end Notifications Dropdown */}
              {isNotifOpen && (
                <>
                  {/* Backdrop overlay to click away and close dropdown */}
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
                  
                  <div className="absolute right-[-60px] md:right-0 mt-3 w-[88vw] max-w-sm sm:w-96 bg-white rounded-2xl shadow-xl border border-outline-variant/30 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-outline-variant/30 bg-surface-container-low flex justify-between items-center">
                      <h4 className="font-bold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl text-primary">notifications</span>
                        Appointments Schedule
                      </h4>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
                        {visibleNotifs.length} Updates
                      </span>
                    </div>
 
                    <div className="max-h-96 overflow-y-auto divide-y divide-outline-variant/20">
                      {visibleNotifs.length === 0 ? (
                        <div className="p-8 text-center text-on-surface-variant text-sm flex flex-col items-center gap-2">
                          <span className="material-symbols-outlined text-4xl text-outline">calendar_today</span>
                          No updates at the moment.
                        </div>
                      ) : (
                        visibleNotifs.map(apt => {
                          const isUnread = !readNotifs.includes(apt._id);
                          const hasConfirmedSchedule = apt.confirmedDate && apt.confirmedTime;
                          return (
                            <div key={apt._id} className={`p-4 hover:bg-surface-container-lowest transition space-y-2 ${isUnread ? 'bg-primary/5' : ''}`}>
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-1.5">
                                  {isUnread && <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" title="Unread update"></span>}
                                  <span className="font-semibold text-sm text-on-surface truncate max-w-[120px] sm:max-w-[200px]">
                                    {apt.treatment}
                                  </span>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                  apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  apt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {apt.status}
                                </span>
                              </div>
 
                              <div className="text-xs text-on-surface-variant space-y-1">
                                <p><strong>Requested:</strong> {new Date(apt.preferredDate).toLocaleDateString()} {apt.preferredTime ? `at ${apt.preferredTime}` : ''}</p>
                                
                                {apt.status === 'confirmed' && hasConfirmedSchedule && (
                                  <div className="mt-2 p-2.5 bg-green-50 rounded-lg border border-green-100 text-green-900 space-y-1">
                                    <p className="font-bold flex items-center gap-1">
                                      <span className="material-symbols-outlined text-sm text-green-700">event_available</span>
                                      Confirmed Slot:
                                    </p>
                                    <p><strong>Date:</strong> {new Date(apt.confirmedDate).toLocaleDateString()}</p>
                                    <p><strong>Time:</strong> {apt.confirmedTime}</p>
                                    {apt.adminNote && <p className="mt-1 text-[11px] italic text-green-800">"{apt.adminNote}"</p>}
                                  </div>
                                )}
 
                                {apt.status === 'cancelled' && (
                                  <div className="mt-2 p-2.5 bg-red-50 rounded-lg border border-red-100 text-red-900">
                                    <p className="font-bold flex items-center gap-1">
                                      <span className="material-symbols-outlined text-sm text-red-700">cancel</span>
                                      Cancelled by Clinic
                                    </p>
                                    {apt.adminNote && <p className="mt-1 text-[11px] italic text-red-800">Reason: "{apt.adminNote}"</p>}
                                  </div>
                                )}
 
                                {apt.status === 'pending' && (
                                  <p className="text-[11px] text-yellow-800 italic mt-1 bg-yellow-50 p-2 rounded-lg border border-yellow-100 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm animate-spin text-yellow-600">sync</span>
                                    Waiting for slot confirmation from clinic...
                                  </p>
                                )}
                              </div>

                              <div className="flex justify-end items-center gap-3 pt-2 mt-1 border-t border-outline-variant/10">
                                {isUnread && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleMarkRead(apt._id);
                                    }}
                                    className="flex items-center gap-0.5 text-[11px] font-semibold text-primary hover:text-primary-dark transition"
                                    title="Mark as read"
                                  >
                                    <span className="material-symbols-outlined text-sm">done</span>
                                    Mark read
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteNotif(apt._id);
                                  }}
                                  className="flex items-center gap-0.5 text-[11px] font-semibold text-red-500 hover:text-red-700 transition"
                                  title="Delete update notification"
                                >
                                  <span className="material-symbols-outlined text-sm">delete</span>
                                  Delete
                                </button>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Desktop Only Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user && user.type === 'admin' && (
              <Link to="/admin/dashboard" className="text-primary font-semibold hover:underline">
                Admin Panel
              </Link>
            )}
            {(!user || user.type !== 'admin') && (
              <div className="flex items-center gap-3">
                <button
                  onClick={onStatusCheckClick}
                  className="text-primary border border-primary px-4 py-2.5 rounded-lg hover:bg-primary/5 transition font-semibold text-sm"
                >
                  Check Booking Status
                </button>
                <button
                  onClick={onBookClick}
                  className="bg-[#29a89d] text-white px-8 py-2.5 rounded-lg hover:opacity-90 transition font-medium"
                >
                  Appointment
                </button>
              </div>
            )}
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-on-surface-variant">Hi, {user.name.split(' ')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="bg-error/10 text-error px-4 py-2 rounded-lg hover:bg-error/20 transition text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-container-low transition text-on-surface-variant"
            aria-label="Open navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[100] md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Drawer Content */}
          <div className="fixed right-0 top-0 h-screen w-80 bg-white shadow-2xl z-[101] p-6 flex flex-col md:hidden transition duration-300 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <img src="/logo.png" alt="Care One Skin & Hair Clinic Logo" className="h-9 w-auto object-contain" />
            </Link>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-surface-container-low transition"
                aria-label="Close navigation menu"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 mb-6">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={location.pathname === '/' ? "text-primary text-lg font-semibold" : "text-on-surface-variant text-lg hover:text-primary transition"}
              >
                Home
              </Link>
              <Link 
                to="/treatments" 
                onClick={() => setIsMenuOpen(false)}
                className={location.pathname === '/treatments' ? "text-primary text-lg font-semibold" : "text-on-surface-variant text-lg hover:text-primary transition"}
              >
                Treatments
              </Link>
              <Link 
                to="/patient-results" 
                onClick={() => setIsMenuOpen(false)}
                className={location.pathname === '/patient-results' ? "text-primary text-lg font-semibold" : "text-on-surface-variant text-lg hover:text-primary transition"}
              >
                Patient Results
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                className={location.pathname === '/about' ? "text-primary text-lg font-semibold" : "text-on-surface-variant text-lg hover:text-primary transition"}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className={location.pathname === '/contact' ? "text-primary text-lg font-semibold" : "text-on-surface-variant text-lg hover:text-primary transition"}
              >
                Contact
              </Link>
            </nav>
            
            <div className="border-t border-outline-variant/20 pt-6 space-y-4">
              {user && user.type === 'admin' && (
                <Link 
                  to="/admin/dashboard" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center text-primary font-semibold border border-primary px-4 py-3 rounded-lg hover:bg-primary/5 transition"
                >
                  Admin Panel
                </Link>
              )}
              {(!user || user.type !== 'admin') && (
                <div className="flex flex-col gap-3 w-full">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      onStatusCheckClick()
                    }}
                    className="w-full text-center text-primary border border-primary py-3 rounded-xl hover:bg-primary/5 transition font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">event_available</span>
                    Check Booking Status
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      onBookClick()
                    }}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition shadow-sm flex items-center justify-center gap-2 text-sm"
                  >
                    <span className="material-symbols-outlined text-lg">calendar_month</span>
                    Book Appointment
                  </button>
                </div>
              )}
              {user && (
                <div className="space-y-3">
                  <p className="text-sm text-on-surface-variant text-center font-medium">Signed in as <span className="text-on-surface font-semibold">{user.name}</span></p>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      handleLogout()
                    }}
                    className="w-full bg-error/10 text-error py-3 rounded-lg hover:bg-error/20 transition text-sm font-semibold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  )
}

function Footer({ settings }) {
  const clinicName = settings?.clinicName || 'Care One'
  const address = settings?.address || '123 Clinical Way, Wellness District'
  const city = settings?.city || 'City Center, SC 56789'

  return (
    <footer className="bg-gradient-to-br from-[#004d4d] via-[#003333] to-[#004d4d] text-white border-t border-teal-950/50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-3 inline-block">
              <img src="/footer-logo.jpg" alt={`${clinicName} - Skin Hair Laser Clinic`} className="h-16 w-auto object-contain" />
            </div>
            <p className="text-teal-100/75 text-sm leading-relaxed">
              Providing world-class clinical excellence in skin and hair care.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-1">
              {/* Instagram */}
              <a href="https://www.instagram.com/careone_clinic" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E1306C] flex items-center justify-center transition-all duration-200 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/careoneclinic" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-200 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@careoneclinic" target="_blank" rel="noopener noreferrer" aria-label="Watch us on YouTube"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF0000] flex items-center justify-center transition-all duration-200 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-all duration-200 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.428a.75.75 0 0 0 .916.916l5.638-1.474A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.52-5.168-1.427l-.371-.22-3.847 1.006 1.028-3.742-.242-.389A9.947 9.947 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Treatments */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">Treatments</h4>
            <ul className="space-y-3 text-sm text-teal-100/70">
              <li><Link to="/treatments#hair-restoration" className="hover:text-secondary transition">Hair Restoration</Link></li>
              <li><Link to="/treatments#skin-rejuvenation" className="hover:text-secondary transition">Skin Rejuvenation</Link></li>
              <li><Link to="/treatments#laser-therapy" className="hover:text-secondary transition">Laser Therapy</Link></li>
              <li><Link to="/treatments#skin-rejuvenation" className="hover:text-secondary transition">Advanced Aesthetics</Link></li>
            </ul>
          </div>

          {/* Column 3 — Support */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">Support</h4>
            <ul className="space-y-3 text-sm text-teal-100/70">
              <li><Link to="/privacy" className="hover:text-secondary transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-secondary transition">Terms of Service</Link></li>
              <li><Link to="/faqs" className="hover:text-secondary transition">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4 — Location & Hours */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">Location</h4>
            <p className="text-sm text-teal-100/80 leading-relaxed mb-4">
              {address}<br />{city}
            </p>
            <div className="border-t border-white/10 pt-4">
              <p className="font-bold text-white text-sm uppercase tracking-widest mb-5">Working Hours</p>
              <p className="text-sm text-teal-100/90 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-secondary">schedule</span>
                Serving You Every Day &bull; 9:30 AM – 9:00 PM
              </p>
            </div>
          </div>

        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center">
        <p className="text-xs text-teal-100/50">© {new Date().getFullYear()} {clinicName} Clinical Excellence. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default App
