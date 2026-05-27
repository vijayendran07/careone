import React, { useState } from 'react'
import API_URL from '../config/api'

export default function StatusCheckModal({ onClose }) {
  const [bookingId, setBookingId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [appointment, setAppointment] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!bookingId.trim()) return
    setLoading(true)
    setError(null)
    setAppointment(null)

    try {
      const res = await fetch(`${API_URL}/api/appointments/status/${bookingId.trim()}`)
      const data = await res.json()

      if (data.success && data.appointment) {
        setAppointment(data.appointment)
      } else {
        setError(data.message || 'Appointment not found. Please verify your Booking ID.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Modal Container: Landscape side-by-side layout */}
      <div className="bg-white w-full max-w-[750px] rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-outline-variant/20 max-h-[95vh] md:max-h-[85vh]">
        
        {/* Left Column Sidebar */}
        <div className="bg-gradient-to-br from-[#004d4d] via-[#003c3c] to-[#002626] text-white p-5 md:p-8 flex flex-col justify-between w-[35%] md:w-[38%] shrink-0">
          <div>
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-white/50">Schedule Status</span>
            </div>

            <h2 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight mb-2 md:mb-4 leading-tight">
              Track Your Appointment
            </h2>
            <p className="text-white/80 text-[10px] sm:text-xs md:text-sm leading-relaxed">
              No registration needed. Simply enter your Booking ID to view your confirmed scheduling times.
            </p>
          </div>

          <div className="hidden md:block">
            <span className="material-symbols-outlined text-5xl text-white/20">event_available</span>
          </div>
        </div>

        {/* Right Column Form or Schedule Results */}
        <div className="flex-1 p-5 md:p-8 flex flex-col justify-between overflow-y-auto bg-surface-container-lowest">
          
          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30 mb-4 shrink-0">
            <span className="text-[10px] md:text-xs font-extrabold text-on-surface-variant uppercase tracking-wider">Search Status</span>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs transition"
              aria-label="Close modal"
            >✕</button>
          </div>

          {/* Form / Lookup body */}
          <div className="flex-1 space-y-4">
            {!appointment ? (
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label htmlFor="bookingId" className="block text-[10px] md:text-xs font-bold text-on-surface-variant uppercase mb-2">Enter Booking ID</label>
                  <input 
                    type="text" 
                    id="bookingId" 
                    value={bookingId} 
                    onChange={e => setBookingId(e.target.value)}
                    required
                    placeholder="e.g. C1-ANGA-1234-893"
                    className="w-full border border-outline-variant/60 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-xs md:text-sm bg-surface font-semibold tracking-wider" 
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs font-bold">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-xl font-extrabold hover:opacity-95 transition disabled:opacity-50 text-xs uppercase tracking-wider"
                >
                  {loading ? 'Searching...' : 'Find Schedule'}
                </button>
              </form>
            ) : (
              // Results Presentation
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">Booking ID: <code className="text-primary font-mono">{appointment.bookingId}</code></h3>
                    <p className="text-xs text-on-surface-variant mt-0.5">Patient: <strong className="text-on-surface">{appointment.fullName}</strong></p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800 border border-green-200' :
                    appointment.status === 'cancelled' ? 'bg-red-100 text-red-800 border border-red-200' :
                    appointment.status === 'completed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                    'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  }`}>
                    {appointment.status}
                  </span>
                </div>

                <div className="border-t border-outline-variant/30 pt-3 space-y-2 text-xs leading-relaxed text-on-surface-variant">
                  <p>💆 Treatment Type: <strong className="text-on-surface">{appointment.treatment}</strong></p>
                  <p>📅 Requested Preference: <strong className="text-on-surface">{new Date(appointment.preferredDate).toLocaleDateString()} at {appointment.preferredTime || 'Any Time'}</strong></p>
                </div>

                {/* Confirmed Schedule Detail Card */}
                {appointment.status === 'confirmed' && appointment.confirmedDate && appointment.confirmedTime ? (
                  <div className="p-4 bg-green-50 rounded-2xl border border-green-200 text-green-900 space-y-2">
                    <p className="font-extrabold text-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-green-700">event_available</span>
                      Your Confirmed Slot:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-green-700 uppercase font-bold block">Confirmed Date</span>
                        <strong className="text-green-950">{new Date(appointment.confirmedDate).toLocaleDateString()}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-green-700 uppercase font-bold block">Confirmed Time</span>
                        <strong className="text-green-950">{appointment.confirmedTime}</strong>
                      </div>
                    </div>
                    {appointment.adminNote && (
                      <div className="mt-2 pt-2 border-t border-green-200/50">
                        <span className="text-[10px] text-green-700 uppercase font-bold block">Doctor Notes</span>
                        <p className="italic text-green-950">"{appointment.adminNote}"</p>
                      </div>
                    )}
                  </div>
                ) : appointment.status === 'pending' ? (
                  <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200 text-yellow-900 flex items-start gap-2">
                    <span className="material-symbols-outlined text-yellow-600 animate-spin shrink-0">sync</span>
                    <div className="text-xs">
                      <strong className="block text-yellow-950">Schedule Pending</strong>
                      Our clinical team is currently coordinating the doctor schedule. Check back in a few hours!
                    </div>
                  </div>
                ) : appointment.status === 'cancelled' ? (
                  <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-red-900 space-y-1">
                    <p className="font-extrabold text-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-red-700">cancel</span>
                      Cancelled
                    </p>
                    {appointment.adminNote && (
                      <p className="italic text-xs text-red-950 mt-1">Reason: "{appointment.adminNote}"</p>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-blue-900 flex items-start gap-2">
                    <span className="material-symbols-outlined text-blue-600 shrink-0">verified</span>
                    <div className="text-xs">
                      <strong className="block text-blue-950">Treatment Completed</strong>
                      We hope you had an excellent experience with us!
                    </div>
                  </div>
                )}

                <div className="pt-2 flex gap-3">
                  <button 
                    onClick={() => {
                      setAppointment(null)
                      setBookingId('')
                    }}
                    className="flex-1 border border-outline-variant/60 text-on-surface py-2.5 rounded-xl font-bold hover:bg-surface-container transition text-xs uppercase tracking-wider"
                  >
                    Check Another
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold hover:opacity-95 transition text-xs uppercase tracking-wider"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
