import React, { useState, useEffect } from 'react'
import API_URL from '../config/api'

export default function AboutUs({ onBookClick }) {
  const [gallery, setGallery] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGallery(data.images)
        }
      })
      .catch(console.error)
  }, [])

  const getImage = (sectionId, fallback) => {
    const img = gallery.find(g => g.section === sectionId)
    return img?.imageUrl || fallback
  }

  return (
    <main>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="min-h-[55vh] flex items-center bg-gradient-to-br from-[#004d4d] via-[#003333] to-[#004d4d] text-white relative overflow-hidden">
        {/* Abstract shapes for premium depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-secondary/15 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-secondary/15 to-primary/15 rounded-full blur-2xl -z-10" />
        
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-secondary/30 border border-secondary/50 text-[#f5ebd5] font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full">
                About Care One
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-sm">
                Your Trusted Partner in <span className="text-white">Clinical Excellence</span>
              </h1>
              <p className="text-base lg:text-xl text-teal-100/80 leading-relaxed">
                Since 2015, Care One has been pioneering advanced dermatological treatments with a commitment to excellence, safety, and patient transformation.
              </p>
              <button
                onClick={onBookClick}
                className="bg-[#008080] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#006a6a] hover:-translate-y-1 hover:shadow-lg transition-all duration-200 text-base"
              >
                Book a Consultation
              </button>
            </div>
            {/* Stats - Premium Glassmorphism */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {[
                { value: '500+', label: 'Monthly Treatments' },
                { value: '100%', label: 'Results' },
                { value: '2000+', label: 'Happy Patients' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-lg border border-white/10 text-center hover:scale-105 transition-all duration-300">
                  <div className="text-3xl lg:text-4xl font-extrabold text-white mb-2">{stat.value}</div>
                  <p className="text-xs sm:text-sm text-teal-50/80 font-medium leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ OUR STORY ═══════════════ */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block bg-secondary/10 text-secondary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full">
              Our Story
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight text-on-surface">A Decade of Transforming Lives</h2>
            <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed">
              Founded in 2025, Care One emerged from a vision to bring world-class dermatological treatments to our community. Our founder, Dr. Rajesh Kumar, spent years in advanced training with leading clinics internationally before establishing this center of excellence.
            </p>
            <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed">
              What started as a single clinic with 3 staff members has grown into a comprehensive aesthetic and dermatological center with cutting-edge technology and a team of 15+ specialists.
            </p>
            <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed">
              Today, we're proud to serve over 2,000 satisfied patients and maintain the highest standards of clinical care, patient safety, and aesthetic outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ OUR TEAM (DOCTORS) ═══════════════ */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Column */}
            <div className="relative h-[380px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl group hover:scale-[1.01] transition-transform duration-300">
              <img 
                src={getImage('doctor-image-1', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000')} 
                alt="Our Expert Doctors" 
                className="w-full h-full object-cover object-center" 
              />
            </div>
            
            {/* Content Column */}
            <div className="space-y-6">
              <span className="inline-block bg-white/20 border border-white/30 text-[#f5ebd5] font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full">
                Our Doctors
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
                Dermatology Led by Board-Certified Experts
              </h2>
              <p className="text-teal-100/80 text-base lg:text-lg leading-relaxed">
                Our clinic is staffed by highly qualified dermatologists and clinical specialists who bring years of advanced training and international experience to every treatment.Expert Skin & Hair
Care You Can Trust
Reclaim your confidence with advanced, dermatologist-led treatments customized for your unique skin and hair goals.
              </p>
              
              {/* Doctor Cards */}
             
              
              <button
                onClick={onBookClick}
                className="bg-secondary text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary/90 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 text-base"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ VALUES ═══════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-on-surface">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: '✓', title: 'Excellence', desc: 'Highest standards in every treatment we provide' },
              { icon: '❤', title: 'Compassion', desc: 'Patient-centered care in everything we do' },
              { icon: '🔬', title: 'Innovation', desc: 'Latest technologies and cutting-edge techniques' },
              { icon: '🛡️', title: 'Safety', desc: 'Rigorous protocols and full clinical certification' }
            ].map((value, idx) => (
              <div key={idx} className="text-center p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 border border-outline-variant/30 shadow-sm hover:shadow-xl hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 hover:border-primary/30 transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">{value.icon}</div>
                <h3 className="text-lg lg:text-xl font-bold text-on-surface mb-2">{value.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">Ready to Experience Care One?</h2>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                Schedule your consultation with one of our experts and discover how we can help you look and feel your best.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <button
                onClick={onBookClick}
                className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 text-base"
              >
                Book Your Consultation
              </button>
              <a
                href="/contact"
                className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-base text-center hover:bg-white/10 transition-all duration-200 flex items-center justify-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
