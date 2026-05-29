import React, { useState, useEffect } from 'react'
import API_URL from '../config/api'

export default function ContactPage() {
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

  const clinicName = settings?.clinicName || 'Care One'
  const email = settings?.email || 'support@careone.com'
  const phone = settings?.phone || '+1 (555) 890-3456'
  const address = settings?.address || '123 Clinical Way, Wellness District'
  const city = settings?.city || 'City Center, SC 56789'

  return (
    <main>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="min-h-[40vh] flex items-center bg-gradient-to-br from-[#004d4d] via-[#003333] to-[#004d4d] text-white relative overflow-hidden">
        {/* Ambient shapes */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-primary/15 to-secondary/15 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gradient-to-tr from-secondary/15 to-primary/15 rounded-full blur-2xl -z-10" />
        
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 lg:py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block bg-secondary/30 border border-secondary/50 text-[#f5ebd5] font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full">
              Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold drop-shadow-sm">Contact <span className="text-white">{clinicName}</span></h1>
            <p className="text-teal-100/80 text-base lg:text-xl leading-relaxed">
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {/* Card 1: Address */}
                <div className="bg-primary text-white rounded-3xl p-6 lg:p-8 border border-primary/10 shadow-sm flex items-start gap-5 hover:scale-[1.01] hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-2xl">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">Main Clinic Address</h4>
                    <p className="text-teal-100/90 text-sm mt-1 leading-relaxed">{address}, {city}</p>
                  </div>
                </div>

                {/* Card 2: Phone */}
                <div className="bg-primary text-white rounded-3xl p-6 lg:p-8 border border-primary/10 shadow-sm flex items-start gap-5 hover:scale-[1.01] hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-2xl">call</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">Phone &amp; Booking Support</h4>
                    <p className="text-teal-100/90 text-sm mt-1 leading-relaxed">{phone}</p>
                  </div>
                </div>

                {/* Card 3: Email */}
                <div className="bg-primary text-white rounded-3xl p-6 lg:p-8 border border-primary/10 shadow-sm flex items-start gap-5 hover:scale-[1.01] hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-2xl">mail</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white">Email Inquiries</h4>
                    <p className="text-teal-100/90 text-sm mt-1 leading-relaxed">{email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-3xl p-8 lg:p-10 border border-primary/10">
                <h3 className="text-xl font-bold text-on-surface mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  Clinic Opening Hours
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between items-center py-2.5">
                    <span className="text-on-surface-variant font-semibold text-sm sm:text-base">Serving You Every Day</span>
                    <strong className="text-primary font-extrabold text-sm sm:text-base">9:30 AM – 9:00 PM</strong>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Location & Google Maps redirection */}
            <div className="bg-white p-8 lg:p-10 rounded-3xl border border-outline-variant/30 shadow-sm space-y-6 flex flex-col justify-between min-h-[480px]">
              <div>
                <h3 className="text-2xl font-bold text-on-surface mb-2">Our Location</h3>
                <p className="text-on-surface-variant text-sm">Visit our clinical center of excellence. Click the map below to open directly in Google Maps.</p>
              </div>

              {/* Map Preview Container */}
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', ' + city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-2xl overflow-hidden border border-outline-variant/20 shadow-inner h-[260px] transition duration-300"
              >
                {/* Embedded dynamic iframe representing the location map */}
                <iframe
                  title="Care One Location Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(address + ', ' + city)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 absolute inset-0 pointer-events-none group-hover:scale-105 transition-all duration-700"
                  allowFullScreen
                  loading="lazy"
                />
                {/* Glass overlay that prompts click to redirect */}
                <div className="absolute inset-0 bg-[#004d4d]/10 group-hover:bg-transparent transition-all duration-300 flex items-center justify-center pointer-events-none">
                  <div className="bg-primary/95 text-white px-5 py-2.5 rounded-full shadow-lg text-sm font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    Open in Google Maps
                  </div>
                </div>
              </a>

              {/* Address detail */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <span className="text-sm sm:text-base font-medium text-on-surface">{address}, {city}</span>
                </div>
                
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', ' + city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 text-center flex items-center justify-center gap-2 text-base"
                >
                  <span className="material-symbols-outlined text-xl">map</span>
                  Get Directions on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
