import React, { useState, useEffect } from 'react'
import API_URL from '../config/api'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()

      if (data.success) {
        setStatus({ type: 'success', message: '✅ Message sent! Our team will contact you shortly.' })
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ type: 'error', message: data.message || '❌ Failed to send message. Please try again.' })
      }
    } catch (error) {
      console.error(error)
      setStatus({ type: 'error', message: '❌ An error occurred. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  const clinicName = settings?.clinicName || 'Care One'
  const email = settings?.email || 'support@careone.com'
  const phone = settings?.phone || '+1 (555) 890-3456'
  const address = settings?.address || '123 Clinical Way, Wellness District'
  const city = settings?.city || 'City Center, SC 56789'

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <span className="text-secondary font-semibold uppercase tracking-wider">Get In Touch</span>
        <h1 className="text-4xl sm:text-5xl font-bold mt-2 text-on-surface">Contact {clinicName}</h1>
        <p className="text-on-surface-variant mt-3 max-w-xl mx-auto">
          Reach out to our clinical reception, dermatological consultants, or medical specialists today.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8 bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30">
          <div>
            <h3 className="text-xl font-bold text-on-surface mb-4">Clinic Information</h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <div>
                  <p className="font-semibold text-on-surface">Main Clinic Address</p>
                  <p className="text-sm text-on-surface-variant">{address}, {city}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary">call</span>
                <div>
                  <p className="font-semibold text-on-surface">Phone & Booking Support</p>
                  <p className="text-sm text-on-surface-variant">{phone}</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary">mail</span>
                <div>
                  <p className="font-semibold text-on-surface">Email Inquiries</p>
                  <p className="text-sm text-on-surface-variant">{email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-outline-variant/20 pt-6">
            <h3 className="text-xl font-bold text-on-surface mb-4">Clinic Opening Hours</h3>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li className="flex justify-between"><span>Monday - Friday</span> <strong>9:00 AM - 7:00 PM</strong></li>
              <li className="flex justify-between"><span>Saturday</span> <strong>10:00 AM - 4:00 PM</strong></li>
              <li className="flex justify-between"><span>Sunday</span> <strong className="text-primary">Closed</strong></li>
            </ul>
          </div>
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-on-surface">Send a Message</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Subject</label>
            <input
              type="text"
              required
              value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Message</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary text-sm resize-none"
            />
          </div>

          {status && (
            <div className={`p-3 rounded-lg text-sm font-semibold ${
              status.type === 'success' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'
            }`}>
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 text-sm"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}
