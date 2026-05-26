import React, { useState, useEffect } from 'react'
import API_URL from '../config/api'
import { Link } from 'react-router-dom'

export default function Treatments({ onBookClick }) {
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

  const hairTreatments = [
    {
      title: 'PRP Hair Therapy',
      desc: 'Platelet-Rich Plasma therapy uses your body\'s own growth factors to stimulate dormant follicles.',
      benefits: ['Thickens existing hair', '45 min session, minimal downtime'],
      featured: false
    },
    {
      title: 'Follicular Restoration',
      desc: 'Multi-modality approach combining laser stimulation with advanced pharmaceutical serums.',
      benefits: ['Reverses early thinning', 'Relaxing clinical environment'],
      featured: true
    },
    {
      title: 'Scalp Micro-Needling',
      desc: 'Precision micro-channels for enhanced delivery of growth factors directly to the dermal papilla.',
      benefits: ['Improved absorption', 'Slight redness for 24 hours'],
      featured: false
    }
  ]

  const skinTreatments = [
    {
      title: 'Medical Grade Chemical Peels',
      desc: 'From light enzymatic refreshes to deep TCA corrective peels for transformative results.',
      image: getImage('skin-treatment-before', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPBqEvQptr3pKvODigatvP3HOHDIbcEnTzdppYuNn9PfYKimm8IznfS1rdbsSpW7JFxyCsWe18emspDQVpSFflJOnMUFJ_UM1b4ESo7UysrSCUIqjwOFwbULK6YmSkPYM6ZS4OnXFhDvpn5_MNMyx3qxHTaVfT1w4-1RepJVmXS8Zt-MK8JBaTj7s__DuX2DrIXyVZ6vHCdauHEY9UmhpHrUZ4_tZ8tYH5hazxKSpD-qj6Xf2BSuDzRcNTPQ8B-gbL3paD70llRw')
    },
    {
      title: 'Advanced Mesotherapy',
      desc: 'Targeted vitamin and antioxidant infusions to instantly brighten and hydrate from within.',
      image: getImage('skin-treatment-after', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqeOINbC80x4g4MdFhXsOz--8EuLZq_IFmlvAf2nWDtFT30omuFOkP6Nwxu5EuLZpuEP5G6rF2cJebQsrhgRa4hmxhi1kLb1-h_SWaIrjRUuiNij57uR_zzEEV7f9MvQtFSXMi8jbf1DRauKbhS2wBr6ReIRLEDlzOMEyFPpJUQA-ZzcBUsrKRCqqwpblVEInJ8tEHurrgCV9DBmThLEmUhEs3LsBekdWYsv0kXRghdWY_aA2cTpK-t3Nd4MlftmfjAOYzBGe9yQ')
    }
  ]

  const laserTreatments = [
    {
      title: 'Laser Hair Removal',
      desc: 'Painless, permanent reduction of unwanted hair across all skin types using dual-wavelength laser.',
      benefits: ['Cooling Technology', 'All Skin Tones', 'Rapid Session', 'FDA Approved'],
      image: getImage('laser-treatment-1', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiKRDhrOmj-pvD2Gp534gTYHpsIhwm0Xxlwe0vN7IT3--twJnM7-UwQUQN3crVp7uy190AwVNbkzjs7Jv4e-S1tIyuymGDSg0xdOw_4CLEVSzsqLHt0dUuCa6CGAEKUk0MqHm22GOOqYpiXmW3BFQX2YPsj-yn47ETZnq1uZQWDVVwofIDBO2YGCk7wBTVbg5PdfdB3avZPCgU50tR1Pwn62KINBkAesUslMWsGZi5jl1OVhgCFfSF05kwDdKIxuHKFrH3tswvVQ')
    },
    {
      title: 'Fractional Resurfacing',
      desc: 'Targeted laser energy stimulates collagen production for smooth fine lines and acne scars.',
      benefits: ['Scar Reduction', 'Collagen Boost', 'Tone Correction', 'Tightening'],
      image: getImage('laser-treatment-2', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSWX_rQalCEP9qn3exowVH5xQMTA9iDZuXvmmX62osqVC8KxDtI3KOG16FwbwwQDwTasQMXFsz7OdQH8OU8yTGwsTj5tlnX-ucE1U6FW0E3rUjELlT9B8nrhlx9YBMPouHCjytMm3E08VVAEuBYKro6xvHHXJVP5zXbyxC98IL122NGG8zdIjem0FiPncwSgLKJUlmw2iXAc6CCyPU96wjQNWjeZWHl0yIgIwPGkn6WPB-EDOTEk54nQheL9PcqrxFuANgxtWF6g')
    }
  ]

  return (
    <main>
      {/* Hero */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div>
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm md:text-base">Clinical Excellence</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 md:mt-4 mb-4 md:mb-6">Advanced Clinical Solutions for Skin & Hair</h1>
            <p className="text-base md:text-lg text-on-surface-variant mb-6 md:mb-8">
              Discover our comprehensive range of medical-grade treatments designed to restore confidence through science-led precision.
            </p>
            <a href="#hair-restoration" className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:opacity-90 inline-flex items-center gap-2 text-sm md:text-base">
              Explore Treatments ↓
            </a>
          </div>
          <img src={getImage('treatments-hero', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZSjr9ffFKDccUSvb4gr1uFpIOgSxF4OjsSKoQsmPGtNUKTyHPUTV5GTa9lUcQmhge3sEH29AH1yUlOZgZal6M84EzaAtb7mUrQKFqI9WOa-UVekJU6uTQLD7IlYIWOX9C0c0UWMl7aUyTvGlw4qTms_4-ssQfzRFvXrszjHMm8sxGJ9nyKMMtTXKBGPyIsmilPVo8JFCRbUN5X9ce5whW9SpUKlWStYDhaNU6EkMXHOsBmui0_Nbpch70KR7Tyd7ACd-dMK7wCw')} alt="Treatments" className="rounded-xl shadow-lg w-full h-48 md:h-auto object-cover" />
        </div>
      </section>

      {/* Hair Restoration */}
      <section id="hair-restoration" className="py-10 md:py-14 bg-surface-container-low">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Hair Restoration & Vitality</h2>
            <p className="text-sm md:text-base text-on-surface-variant max-w-2xl">Advanced therapeutic interventions to combat thinning and promote robust follicular health.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {hairTreatments.map((t, i) => (
              <div key={i} className={`p-6 md:p-8 rounded-xl flex flex-col h-full border ${t.featured ? 'bg-primary text-white border-primary shadow-lg md:-translate-y-2' : 'bg-white border-outline-variant/20'}`}>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{t.title}</h3>
                <p className={`mb-4 md:mb-6 flex-grow text-sm md:text-base ${t.featured ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>{t.desc}</p>
                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {t.benefits.map((b, j) => (
                    <div key={j} className="flex gap-2 text-xs md:text-sm">
                      <span className="material-symbols-outlined scale-75">check_circle</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <button onClick={onBookClick} className={`w-full py-2.5 md:py-3 rounded-lg font-semibold transition text-sm md:text-base ${t.featured ? 'bg-white text-primary hover:bg-secondary-fixed' : 'border border-primary text-primary hover:bg-primary hover:text-white'}`}>
                  Book Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skin Rejuvenation */}
      <section id="skin-rejuvenation" className="py-10 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="space-y-3 md:space-y-4 order-2 md:order-1">
            {skinTreatments.map((t, i) => (
              <img key={i} src={t.image} alt={t.title} className="rounded-xl w-full h-40 sm:h-64 object-cover" />
            ))}
          </div>
          <div className="order-1 md:order-2">
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm md:text-base">Skin Science</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 md:mt-4 mb-4 md:mb-6">Skin Rejuvenation & Chemical Peels</h2>
            <p className="text-sm md:text-base text-on-surface-variant mb-6 md:mb-8">
              Our dermatological experts craft bespoke peel protocols and rejuvenation cycles to address pigmentation and signs of aging.
            </p>
            {skinTreatments.map((t, i) => (
              <div key={i} className="border-b border-outline-variant/30 pb-3 md:pb-4 mb-3 md:mb-4">
                <h4 className="text-base md:text-lg font-bold mb-1 md:mb-2">{t.title}</h4>
                <p className="text-on-surface-variant text-xs md:text-sm">{t.desc}</p>
              </div>
            ))}
            <button onClick={onBookClick} className="bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:opacity-90 mt-4 md:mt-8 text-sm md:text-base">
              Book Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Laser Therapy */}
      <section id="laser-therapy" className="py-10 md:py-14 bg-surface-container-low">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Next-Gen Laser Therapy</h2>
            <p className="text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto">
              Utilizing world-class laser platforms for permanent hair reduction and non-surgical skin resurfacing.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {laserTreatments.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20">
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white">{t.title}</h3>
                  </div>
                </div>
                <div className="p-4 md:p-8">
                  <p className="text-sm md:text-base text-on-surface-variant mb-4 md:mb-6">{t.desc}</p>
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-8">
                    {t.benefits.map((b, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs md:text-sm">
                        <span className="material-symbols-outlined scale-75 text-primary">bolt</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Your Path to Renewed Confidence</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {['Book Appointment', 'Expert Consultation', 'Tailored Treatment', 'Glowing Results'].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-surface-container rounded-full mx-auto flex items-center justify-center mb-4 border-2 md:border-4 border-secondary hover:scale-110 transition">
                  <span className="text-xl md:text-2xl font-bold text-secondary">0{i + 1}</span>
                </div>
                <h4 className="font-bold text-sm md:text-lg mb-2">{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
