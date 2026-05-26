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

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      title: 'Founder & Chief Dermatologist',
      expertise: 'Advanced Hair Restoration, Laser Therapy',
      image: getImage('doctor-image-1', 'https://images.unsplash.com/photo-1537368310025-700d6d9b22d3?auto=format&fit=crop&w=400&q=80')
    },
    {
      name: 'Dr. Priya Sharma',
      title: 'Senior Aesthetician',
      expertise: 'Chemical Peels, Skin Rejuvenation',
      image: getImage('doctor-image-2', 'https://images.unsplash.com/photo-1527529482379-91f2883627e9?auto=format&fit=crop&w=400&q=80')
    },
    {
      name: 'Dr. Amit Patel',
      title: 'Laser Specialist',
      expertise: 'Fractional Resurfacing, Hair Removal',
      image: getImage('doctor-image-3', 'https://images.unsplash.com/photo-1535713566543-ab7e9c2b5908?auto=format&fit=crop&w=400&q=80')
    }
  ]

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="py-10 md:py-14 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-container-max mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <div className="text-label-md text-primary mb-2">About Care One</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-4 font-headline-xl">
              Your Trusted Partner in Clinical Excellence
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
              Since 2015, Care One has been pioneering advanced dermatological treatments with a commitment to excellence, safety, and patient transformation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8">
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/20 text-center sm:text-left">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
              <p className="text-sm md:text-base text-on-surface-variant">Successful Treatments Monthly</p>
            </div>
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/20 text-center sm:text-left">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">98%</div>
              <p className="text-sm md:text-base text-on-surface-variant">Patient Satisfaction Rate</p>
            </div>
            <div className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/20 text-center sm:text-left">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">2000+</div>
              <p className="text-sm md:text-base text-on-surface-variant">Happy Patients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-container-max mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4 font-headline-xl">Our Story</h2>
            <p className="text-sm md:text-base text-on-surface-variant mb-4 leading-relaxed">
              Founded in 2015, Care One emerged from a vision to bring world-class dermatological treatments to our community. Our founder, Dr. Rajesh Kumar, spent years in advanced training with leading clinics internationally before establishing this center of excellence.
            </p>
            <p className="text-sm md:text-base text-on-surface-variant mb-4 leading-relaxed">
              What started as a single clinic with 3 staff members has grown into a comprehensive aesthetic and dermatological center with cutting-edge technology and a team of 15+ specialists.
            </p>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
              Today, we're proud to serve over 2,000 satisfied patients and maintain the highest standards of clinical care, patient safety, and aesthetic outcomes.
            </p>
          </div>
          <img 
            src={getImage('about-story-image', 'https://images.unsplash.com/photo-1576091160695-112396e5fc4f?auto=format&fit=crop&w=500&q=80')} 
            alt="Our Clinic" 
            className="rounded-2xl shadow-lg w-full h-64 md:h-80 object-cover"
          />
        </div>
      </section>

      {/* Our Team */}
      <section className="py-10 md:py-14 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3 font-headline-xl">Meet Our Expert Team</h2>
            <p className="text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto">
              Our dermatologists and aestheticians bring decades of combined experience and passion for transforming lives.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-surface rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-md transition">
                <img src={member.image} alt={member.name} className="w-full h-56 md:h-64 object-cover" />
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-on-surface mb-1">{member.name}</h3>
                  <p className="text-primary text-xs md:text-sm font-semibold mb-2">{member.title}</p>
                  <p className="text-on-surface-variant text-xs md:text-sm">{member.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-container-max mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-8 text-center font-headline-xl">Our Core Values</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: '✓', title: 'Excellence', desc: 'Highest standards in every treatment' },
              { icon: '❤', title: 'Compassion', desc: 'Patient-centered care always' },
              { icon: '🔬', title: 'Innovation', desc: 'Latest technologies and techniques' },
              { icon: '🛡️', title: 'Safety', desc: 'Rigorous protocols and certification' }
            ].map((value, idx) => (
              <div key={idx} className="text-center p-4 md:p-6 rounded-xl hover:bg-primary/5 transition border border-outline-variant/10">
                <div className="text-3xl md:text-4xl mb-3">{value.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-on-surface mb-1 md:mb-2">{value.title}</h3>
                <p className="text-xs md:text-sm text-on-surface-variant">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-container-max mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 font-headline-xl">Ready to Experience Care One?</h2>
          <p className="text-white/90 mb-6 md:mb-8 text-sm md:text-lg max-w-2xl mx-auto">
            Schedule your consultation with one of our experts and discover how we can help you look and feel your best.
          </p>
          <button 
            onClick={onBookClick}
            className="bg-white text-primary px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-sm md:text-base w-full sm:w-auto"
          >
            Book Your Consultation
          </button>
        </div>
      </section>
    </main>
  )
}
