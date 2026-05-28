import React, { useState, useEffect } from 'react'
import API_URL from '../config/api'

export default function Home({ onBookClick }) {
  const [gallery, setGallery] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

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

  const heroSlides = (() => {
    const raw = getImage('home-hero-banner', '')
    if (raw) {
      const urls = raw.split(',').map(u => u.trim()).filter(Boolean)
      if (urls.length > 0) return urls
    }
    return [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjnO3uC-FfZyaEEJXGXSzK6vHlgDY6f6tf1FuwLUuMADRuwP9WHwuj7qYxODS7LCBn7vQD67_iOSrZ_mXdvW3-PchasnWJOuyt7qa7lQ95tvIdXtnDxqSFaDNzLicEfc9H1TZ30oCrapvu7DB72n50JZN87LSpdk2dTRIOAV_NIA_SFrdOL8kpKJAQUnA7CtTFSUrDfS8AIxb9UAM8gFx9HnvBsN4zR0cFa2HYlGiZCUXMuWYDpoPvN7tqo95aLTldWj-3AogarA',
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1600',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600'
    ]
  })()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const nextSlide = (e) => {
    e.stopPropagation()
    setCurrentSlide(prev => (prev + 1) % heroSlides.length)
  }

  const prevSlide = (e) => {
    e.stopPropagation()
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const services = [
    {
      icon: 'content_cut',
      title: 'Hair Restoration',
      desc: 'Advanced follicular treatments and regenerative therapies for natural hair growth.'
    },
    {
      icon: 'flare',
      title: 'Laser Therapy',
      desc: 'Targeted FDA-approved laser solutions for skin tightening and blemish removal.'
    },
    {
      icon: 'face_6',
      title: 'Skin Rejuvenation',
      desc: 'Deep hydration, chemical peels, and non-surgical anti-aging procedures.'
    }
  ]

  const steps = ['Book Appointment', 'Expert Consultation', 'Tailored Treatment', 'Glowing Results']

  return (
    <main>
      {/* ═══════════════ HERO BANNER ═══════════════ */}
      <section className="relative w-full aspect-square sm:aspect-auto sm:min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden">
        {/* Full-width background images with premium cross-fade transition */}
        {heroSlides.map((slideUrl, idx) => (
          <img
            key={idx}
            src={slideUrl}
            alt={`Care One Hero Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${currentSlide === idx ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
          />
        ))}

        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/70 hover:bg-white text-gray-800 hover:text-primary rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Previous Slide"
        >
          <span className="material-symbols-outlined font-bold text-lg md:text-xl">arrow_back_ios_new</span>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/70 hover:bg-white text-gray-800 hover:text-primary rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Next Slide"
        >
          <span className="material-symbols-outlined font-bold text-lg md:text-xl">arrow_forward_ios</span>
        </button>

        {/* Slide Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-primary w-6' : 'bg-gray-400/60 hover:bg-gray-400'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-white/60 sm:bg-white/50 z-10 pointer-events-none" />

        {/* Centered text content */}
        <div className="relative z-10 w-full text-center px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-16">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900 drop-shadow-sm">
              Expert Skin &amp; Hair{' '}
              <br className="hidden sm:block" />
              Care You Can <span className="text-primary">Trust</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-black-600 leading-relaxed max-w-xl mx-auto font-medium">
              Reclaim your confidence with advanced, dermatologist-led treatments customized for your unique skin and hair goals.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {[
              { value: '2000+', label: 'Happy Patients' },
              { value: '500+', label: 'Monthly Treatments' },
              { value: '100%', label: 'Results' },
              { value: '10+', label: 'Years Experience' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl lg:text-4xl font-bold">{stat.value}</div>
                <div className="text-white/80 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT SECTION ═══════════════ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-4 h-[400px] lg:h-[520px]">
              <img
                src={getImage('clinic-image-1', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWopbgodzo31C0vS93ZTpWwmR3CuQNUg_7DjYmgYPk_WyO__AB9ECXXYg1px_kJl8vYct0MXuDODaqzGN2FA9vaaMZSpZU0D7czEoB_UrHS3Fg-a3dgRNnVofTUHa60xGlZD6N8qD8j7hus6tZUL4JjKTuTyUBgfU4O4E9igai1n1v6P9JxAYJiq5DVtFLYjfqBq2sCeYRoGfbCSRlLrZJfKmR_xbbBEymrNlM6rDj4NQOTEB8591FX_7xLKvqu7qLtYjeMO49dQ')}
                alt="Clinic"
                className="rounded-2xl w-full h-full object-cover col-span-1 row-span-2"
              />
              <img
                src={getImage('clinic-image-2', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_-8LJ54u7vn5LYdwg64DJVDtBw1XSzm6lHSNNhTLcpEK9xcrssn2lK5Kwo6dcR3yHSOx7xXOymysFzPPqw4huTAA4l93z4daceiw0cP37h4bRzI28FNynyBKagDHsMfZJGj8ZUu-mq49SZyXpNNQem0Qgyvocc6TUDoKjs7NoL6fvtH8WYXSpHDSgmcfc_bxMtEMx4LdZ9ApMpPJrz5cBK_PTzACYlverAZ-llcqB7_uXQOx1wrG3OJz-yOj8Lx12SX8lJ_WKzA')}
                alt="Treatment"
                className="rounded-2xl w-full h-full object-cover"
              />
              <div className="rounded-2xl bg-primary flex items-center justify-center p-6">
                <div className="text-white text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-white/80 mt-1">RESULTS</div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="space-y-6">
              <span className="inline-block bg-primary/10 text-primary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full">
                About Care One
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
                Your trusted partner for{' '}
                <span className="text-primary">transformative care.</span>
              </h2>
              <p className="text-base lg:text-lg text-on-surface-variant leading-relaxed">
                We blend cutting-edge technology with expert dermatology to ensure you leave feeling rejuvenated and empowered. Founded in 2025, we've helped thousands achieve their aesthetic goals.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['FDA-Approved', 'Custom Plans', 'Expert Staff', 'Post-Care Support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-outline-variant/20">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                    <span className="font-semibold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES SECTION ═══════════════ */}
      <section id="services" className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block bg-white/10 text-white font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">
              Our Services
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold">Transformative Solutions for Your Best Self</h2>
            <div className="h-1 w-20 bg-secondary mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl group hover:bg-secondary transition-all duration-300 transform hover:-translate-y-2 text-on-surface hover:text-white shadow-sm hover:shadow-xl">
                <span className="material-symbols-outlined text-primary text-5xl group-hover:text-white mb-5 block transition-colors">
                  {service.icon}
                </span>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-on-surface-variant group-hover:text-white/90 mb-6 leading-relaxed text-sm">{service.desc}</p>
                <a href={`/treatments#${service.title.toLowerCase().replace(' ', '-')}`} className="text-primary group-hover:text-white font-bold flex items-center gap-2 text-sm">
                  View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS SECTION ═══════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block bg-secondary/10 text-secondary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">
              Our Process
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold">Your path to renewed confidence</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {steps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                  <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors">0{i + 1}</span>
                </div>
                <h4 className="font-bold text-base lg:text-lg mb-2">{step}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {i === 0 && 'Schedule your visit easily online or by phone.'}
                  {i === 1 && 'Discuss your unique goals with our dermatology experts.'}
                  {i === 2 && 'Experience bespoke care designed for your specific skin type.'}
                  {i === 3 && 'Leave with radiant skin and newfound confidence.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">Ready to Start Your Transformation?</h2>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                Book your consultation today with one of our expert dermatologists and take the first step toward the skin and hair you deserve.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <button
                onClick={onBookClick}
                className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-base hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                Book Free Consultation
              </button>
              <a
                href="/contact"
                className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-base text-center hover:bg-white/10 transition-all duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ SECTION ═══════════════ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="inline-block bg-primary/10 text-primary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">
                FAQ
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-4">Frequently Asked Questions</h2>
              <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed">
                Get answers to the most common questions about our treatments, procedures, and care protocols.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { q: 'What makes Care One different?', a: 'We combine board-certified expertise with FDA-approved technologies and a highly personalized care approach for every patient.' },
                { q: 'Are treatments permanent?', a: 'Many of our treatments are designed for long-term permanence. Hair restoration and laser therapy provide lasting results.' },
                { q: "What's the recovery time?", a: 'Most procedures have minimal downtime. You can typically return to your daily routine immediately after your session.' }
              ].map((faq, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm">
                  <summary className="flex justify-between items-center font-semibold text-base p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform flex-shrink-0 ml-4">expand_more</span>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/10 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
