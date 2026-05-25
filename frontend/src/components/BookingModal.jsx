import React from 'react'
import { useState } from 'react'
import API_URL from '../config/api'

export default function BookingModal({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Hair Restoration',
    date: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const services = ['Hair Restoration', 'Laser Therapy', 'Skin Rejuvenation', 'Chemical Peels', 'Micro-needling']

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

      setStatus({ type: 'success', message: '✅ Appointment booked! We\'ll contact you soon.' })
      setTimeout(() => onClose(), 2000)
    } catch (error) {
      setStatus({ type: 'error', message: `❌ ${error.message}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Modal container — slides up from bottom on mobile, centered on desktop */}
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl shadow-xl flex flex-col rounded-t-2xl max-h-[92vh] sm:max-h-[90vh]">

        {/* ── Sticky Header (always visible) ── */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-outline/30 shrink-0">
          <h2 className="text-xl font-bold text-on-surface">Book Appointment</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-on-surface-variant text-lg font-bold transition"
            aria-label="Close modal"
          >✕</button>
        </div>

        {/* ── Scrollable Form Body ── */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
              <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required
                className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required
                className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone</label>
              <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} required
                className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary" />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-semibold mb-2">Service</label>
              <select id="service" name="service" value={form.service} onChange={handleChange}
                className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary">
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="date" className="block text-sm font-semibold mb-2">Preferred Date</label>
                <input type="date" id="date" name="date" value={form.date} onChange={handleChange}
                  className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-semibold mb-2">Preferred Time</label>
                <input type="time" id="time" name="time" value={form.time} onChange={handleChange}
                  className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2">Message (optional)</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange}
                className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary h-24"></textarea>
            </div>

            {status && (
              <div className={`p-3 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
                {status.message}
              </div>
            )}
          </div>

          {/* ── Sticky Footer — Submit always visible ── */}
          <div className="px-6 py-4 border-t border-outline/30 shrink-0 bg-white">
            <button type="submit" disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition text-base">
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
