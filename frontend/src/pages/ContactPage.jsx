import React, { useState, useEffect } from 'react'
import API_URL from '../config/api'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
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
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
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
    <main>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="min-h-[40vh] flex items-center bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 lg:py-0">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block bg-primary/10 text-primary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Contact {clinicName}</h1>
            <p className="text-on-surface-variant text-base lg:text-xl leading-relaxed">
              Reach out to our clinical reception, dermatological consultants, or medical specialists today.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT CONTENT ═══════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: Info */}
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-3xl p-8 lg:p-10 border border-outline-variant/20">
                <h3 className="text-2xl font-bold text-on-surface mb-6">Clinic Information</h3>
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                    </div>
                    <div>
                      <p className="font-semibold text-on-surface">Main Clinic Address</p>
                      <p className="text-sm text-on-surface-variant mt-1">{address}, {city}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">call</span>
                    </div>
                    <div>
                      <p className="font-semibold text-on-surface">Phone &amp; Booking Support</p>
                      <p className="text-sm text-on-surface-variant mt-1">{phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">mail</span>
                    </div>
                    <div>
                      <p className="font-semibold text-on-surface">Email Inquiries</p>
                      <p className="text-sm text-on-surface-variant mt-1">{email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-3xl p-8 lg:p-10 border border-primary/10">
                <h3 className="text-xl font-bold text-on-surface mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  Clinic Opening Hours
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center py-2 border-b border-primary/10">
                    <span className="text-on-surface-variant">Monday – Friday</span>
                    <strong className="text-on-surface">9:00 AM – 7:00 PM</strong>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-primary/10">
                    <span className="text-on-surface-variant">Saturday</span>
                    <strong className="text-on-surface">10:00 AM – 4:00 PM</strong>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="text-on-surface-variant">Sunday</span>
                    <strong className="text-primary">Closed</strong>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-10 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-on-surface mb-2">Send a Message</h3>
                <p className="text-on-surface-variant text-sm">We'll get back to you within 24 hours.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-on-surface">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full border border-outline-variant/50 p-3.5 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-on-surface">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full border border-outline-variant/50 p-3.5 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-on-surface">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="Your mobile number"
                    className="w-full border border-outline-variant/50 p-3.5 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-on-surface">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="How can we help?"
                    className="w-full border border-outline-variant/50 p-3.5 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-on-surface">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us about your concerns or desired treatment..."
                  className="w-full border border-outline-variant/50 p-3.5 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm resize-none transition-all"
                />
              </div>

              {status && (
                <div className={`p-4 rounded-xl text-sm font-semibold ${
                  status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 text-base"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
