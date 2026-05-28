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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-14">
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-3 inline-block">
            <img src="footer-logo.png.jpg" alt={`${clinicName} - Skin Hair Laser Clinic`} className="h-16 w-auto object-contain" />
          </div>
          <p className="text-teal-100/80 text-sm">Providing world-class clinical excellence in skin and hair care.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6">Treatments</h4>
          <ul className="space-y-3 text-sm text-teal-100/70">
            <li><Link to="/treatments#hair-restoration" className="hover:text-secondary transition">Hair Restoration</Link></li>
            <li><Link to="/treatments#skin-rejuvenation" className="hover:text-secondary transition">Skin Rejuvenation</Link></li>
            <li><Link to="/treatments#laser-therapy" className="hover:text-secondary transition">Laser Therapy</Link></li>
            <li><Link to="/treatments#skin-rejuvenation" className="hover:text-secondary transition">Advanced Aesthetics</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6">Support</h4>
          <ul className="space-y-3 text-sm text-teal-100/70">
            <li><Link to="/privacy" className="hover:text-secondary transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-secondary transition">Terms of Service</Link></li>
            <li><Link to="/faqs" className="hover:text-secondary transition">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-secondary transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6">Location</h4>
          <p className="text-xs text-teal-100/80 leading-relaxed">{address}<br/>{city}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center">
        <p className="text-xs text-teal-100/60">© {new Date().getFullYear()} {clinicName} Clinical Excellence. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default App
