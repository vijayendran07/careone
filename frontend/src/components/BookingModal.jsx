import React, { useState } from 'react'
import API_URL from '../config/api'

export default function BookingModal({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Hair',
    date: '',
    time: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [bookedAppointment, setBookedAppointment] = useState(null)

  const services = ['Hair', 'laser', 'Skin', 'Botox', 'Fillers']

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const payload = {
        fullName: form.name,
        email: form.email,
        phone: form.phone,
        treatment: form.service,
        preferredDate: form.date,
        preferredTime: form.time,
        notes: form.message
      }
      
      const response = await fetch(`${API_URL}/api/appointments`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')).token : ''}`
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.message || 'Failed to book')

      setBookedAppointment(data.appointment)
      setStatus({ type: 'success', message: '✅ Appointment booked successfully!' })
    } catch (error) {
      setStatus({ type: 'error', message: `❌ ${error.message}` })
    } finally {
      setLoading(false)
    }
  }

  if (bookedAppointment) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-[700px] rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-outline-variant/20 max-h-none md:max-h-[85vh]">
          {/* Left Column Accent */}
          <div className="bg-gradient-to-br from-[#004d4d] via-[#003c3c] to-[#002626] text-white p-6 md:p-8 hidden md:flex flex-col justify-between md:w-[35%] shrink-0 text-left">
            <div>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-white/50">Confirmed</span>
              <h2 className="text-base sm:text-xl md:text-2xl font-black mt-2 leading-tight">Thank You!</h2>
            </div>
            <div className="mt-8">
              <span className="material-symbols-outlined text-4xl text-white/20">verified</span>
            </div>
          </div>
          {/* Right Column Success Details */}
          <div className="flex-1 p-5 md:p-8 space-y-4 text-left bg-surface-container-lowest flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 border border-green-200">
                  <span className="material-symbols-outlined text-xl font-bold">check_circle</span>
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-black text-on-surface">Booking Successful</h3>
                <p className="text-[11px] text-on-surface-variant mt-0.5">Your appointment request has been logged successfully.</p>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 p-3.5 rounded-2xl space-y-2">
                <span className="text-[9px] uppercase font-extrabold text-primary tracking-wider block">Your Unique Booking ID</span>
                <div className="flex items-center justify-between gap-3 bg-white border border-outline-variant/40 px-3 py-1.5 rounded-xl">
                  <code className="text-xs md:text-sm font-mono font-bold text-on-surface tracking-wider">{bookedAppointment.bookingId}</code>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(bookedAppointment.bookingId)
                      alert('Booking ID copied to clipboard!')
                    }}
                    className="text-primary hover:text-[#003c3c] font-bold text-[10px] flex items-center gap-1 shrink-0"
                  >
                    <span className="material-symbols-outlined text-xs">content_copy</span>
                    Copy
                  </button>
                </div>
                <p className="text-[10px] font-bold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">info</span>
                  Note: Copy this Booking ID to check your booking status
                </p>
              </div>

              <div className="text-[11px] text-on-surface-variant leading-normal space-y-1 bg-surface-container-low/50 p-3 rounded-xl border border-outline-variant/30">
                <p> Treatment: <strong className="text-on-surface font-semibold">{bookedAppointment.treatment}</strong></p>
                <p> Date Preference: <strong className="text-on-surface font-semibold">{new Date(bookedAppointment.preferredDate).toLocaleDateString()} {bookedAppointment.preferredTime ? `at ${bookedAppointment.preferredTime}` : ''}</strong></p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-primary text-white py-2.5 md:py-3 rounded-xl font-extrabold hover:opacity-95 transition-all text-xs uppercase tracking-wider mt-4"
            >
              Done & Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Modal Container: Strict landscape side-by-side layout on both Mobile and Web */}
      <div className="bg-white w-full max-w-[850px] rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-outline-variant/20 max-h-none md:max-h-[85vh]">
        
        {/* Left Column: Brand Colored sidebar (Always side-by-side with form) */}
        <div className="bg-gradient-to-br from-[#004d4d] via-[#003c3c] to-[#002626] text-white p-5 md:p-10 hidden md:flex flex-col justify-between md:w-[38%] shrink-0">
          <div>
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-white/50">Clinical Center</span>
            </div>

            <h2 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight mb-2 md:mb-4 leading-tight">
              Book Your Appointment
            </h2>
            <p className="text-white/80 text-[10px] sm:text-xs md:text-sm leading-relaxed mb-4">
              Take the first step toward personalized hair & skin rejuvenation with our medical expert team.
            </p>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="material-symbols-outlined text-sm md:text-lg text-white/70">schedule</span>
              <div className="text-[9px] sm:text-xs leading-tight text-white/90">
                <p className="font-semibold">Mon – Fri: 9am – 7pm</p>
                <p>Sat: 10am – 4pm</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              <span className="material-symbols-outlined text-sm md:text-lg text-white/70">location_on</span>
              <span className="text-[9px] sm:text-xs text-white/90">Wellness Center</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form fields in responsive clean grids */}
        <form onSubmit={handleSubmit} className="flex-1 p-5 md:p-8 flex flex-col justify-between overflow-y-auto bg-surface-container-lowest">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30 mb-3 shrink-0">
            <span className="text-[10px] md:text-xs font-extrabold text-on-surface-variant uppercase tracking-wider">Schedule Consultation</span>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs transition"
              aria-label="Close modal"
            >✕</button>
          </div>

          <div className="space-y-3 flex-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block text-[9px] md:text-[11px] font-bold text-on-surface-variant uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required
                  placeholder="Your Name"
                  className="w-full border border-outline-variant/60 px-3 py-1.5 md:py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs md:text-sm bg-surface" 
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[9px] md:text-[11px] font-bold text-on-surface-variant uppercase mb-1">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  required
                  placeholder="1234567890"
                  className="w-full border border-outline-variant/60 px-3 py-1.5 md:py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs md:text-sm bg-surface" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="email" className="block text-[9px] md:text-[11px] font-bold text-on-surface-variant uppercase mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required
                  placeholder="your@email.com"
                  className="w-full border border-outline-variant/60 px-3 py-1.5 md:py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs md:text-sm bg-surface" 
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-[9px] md:text-[11px] font-bold text-on-surface-variant uppercase mb-1">Service</label>
                <select 
                  id="service" 
                  name="service" 
                  value={form.service} 
                  onChange={handleChange}
                  className="w-full border border-outline-variant/60 px-2 py-1.5 md:py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs md:text-sm bg-surface font-semibold"
                >
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="date" className="block text-[9px] md:text-[11px] font-bold text-on-surface-variant uppercase mb-1">Date</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={form.date} 
                  onChange={handleChange}
                  className="w-full border border-outline-variant/60 px-2 py-1.5 md:py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs md:text-sm bg-surface" 
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-[9px] md:text-[11px] font-bold text-on-surface-variant uppercase mb-1">Time</label>
                <input 
                  type="time" 
                  id="time" 
                  name="time" 
                  value={form.time} 
                  onChange={handleChange}
                  className="w-full border border-outline-variant/60 px-2 py-1.5 md:py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs md:text-sm bg-surface" 
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-[9px] md:text-[11px] font-bold text-on-surface-variant uppercase mb-1">Message (optional)</label>
              <textarea 
                id="message" 
                name="message" 
                value={form.message} 
                onChange={handleChange}
                placeholder="Details or specific concerns..."
                className="w-full border border-outline-variant/60 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary h-12 text-xs md:text-sm bg-surface resize-none"
              />
            </div>

            {status && (
              <div className={`p-2.5 rounded-xl text-xs font-bold leading-normal transition-all ${
                status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {status.message}
              </div>
            )}
          </div>

          <div className="pt-3 shrink-0">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white py-2.5 md:py-3.5 rounded-xl font-extrabold hover:opacity-95 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 text-xs md:text-sm uppercase tracking-wider"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
