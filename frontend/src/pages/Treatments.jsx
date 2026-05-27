import React, { useState, useEffect } from 'react'
import API_URL from '../config/api'

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
      desc: "Platelet-Rich Plasma therapy uses your body's own growth factors to stimulate dormant follicles.",
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
      {/* ═══════════════ HERO BANNER ═══════════════ */}
      <section className="relative w-full aspect-square sm:aspect-auto sm:min-h-[60vh] lg:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background image, fully displayed */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center lg:justify-end">
          <img
            src={getImage('treatments-hero', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZSjr9ffFKDccUSvb4gr1uFpIOgSxF4OjsSKoQsmPGtNUKTyHPUTV5GTa9lUcQmhge3sEH29AH1yUlOZgZal6M84EzaAtb7mUrQKFqI9WOa-UVekJU6uTQLD7IlYIWOX9C0c0UWMl7aUyTvGlw4qTms_4-ssQfzRFvXrszjHMm8sxGJ9nyKMMtTXKBGPyIsmilPVo8JFCRbUN5X9ce5whW9SpUKlWStYDhaNU6EkMXHOsBmui0_Nbpch70KR7Tyd7ACd-dMK7wCw')}
            alt="Treatments Hero"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-white/60 sm:bg-white/50" />

        {/* Centered text content */}
        <div className="relative z-10 w-full text-center px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-16">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 drop-shadow-sm">
              Advanced Clinical Solutions for <br className="hidden sm:block" />
              Skin &amp; <span className="text-primary">Hair</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto font-medium">
              Discover our comprehensive range of medical-grade treatments designed to restore confidence through science-led precision.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ HAIR RESTORATION ═══════════════ */}
      <section id="hair-restoration" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="mb-12">
            <span className="inline-block bg-primary/10 text-primary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">
              Hair Care
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Hair Restoration &amp; Vitality</h2>
            <p className="text-on-surface-variant text-base lg:text-lg max-w-2xl">Advanced therapeutic interventions to combat thinning and promote robust follicular health.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {hairTreatments.map((t, i) => (
              <div key={i} className={`p-8 rounded-2xl flex flex-col border transition-all hover:shadow-xl hover:-translate-y-1 duration-300 ${t.featured ? 'bg-primary text-white border-primary shadow-lg scale-105' : 'bg-white border-outline-variant/20'}`}>
                {t.featured && <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 w-fit">Most Popular</span>}
                <h3 className="text-xl lg:text-2xl font-bold mb-4">{t.title}</h3>
                <p className={`mb-6 flex-grow leading-relaxed text-sm lg:text-base ${t.featured ? 'text-white/90' : 'text-on-surface-variant'}`}>{t.desc}</p>
                <div className="space-y-3 mb-8">
                  {t.benefits.map((b, j) => (
                    <div key={j} className="flex gap-3 text-sm">
                      <span className={`material-symbols-outlined text-base flex-shrink-0 ${t.featured ? 'text-white' : 'text-primary'}`}>check_circle</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onBookClick}
                  className={`w-full py-3 rounded-xl font-semibold transition text-sm ${t.featured ? 'bg-white text-primary hover:bg-gray-100' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}
                >
                  Book Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SKIN REJUVENATION ═══════════════ */}
      <section id="skin-rejuvenation" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="grid grid-cols-2 gap-4 h-[380px] lg:h-[480px]">
              {skinTreatments.map((t, i) => (
                <img key={i} src={t.image} alt={t.title} className="rounded-2xl w-full h-full object-cover" />
              ))}
            </div>
            <div className="space-y-6">
              <span className="inline-block bg-secondary/10 text-secondary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full">
                Skin Science
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight">Skin Rejuvenation &amp; Chemical Peels</h2>
              <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed">
                Our dermatological experts craft bespoke peel protocols and rejuvenation cycles to address pigmentation and signs of aging.
              </p>
              <div className="space-y-4">
                {skinTreatments.map((t, i) => (
                  <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-outline-variant/20 hover:border-primary/30 hover:bg-primary/5 transition-all">
                    <h4 className="text-base lg:text-lg font-bold mb-2">{t.title}</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={onBookClick}
                className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 hover:-translate-y-1 transition-all duration-200 text-base"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ LASER THERAPY ═══════════════ */}
      <section id="laser-therapy" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block bg-primary/10 text-primary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">
              Laser Treatments
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold">Next-Gen Laser Therapy</h2>
            <p className="text-on-surface-variant text-base lg:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Utilizing world-class laser platforms for permanent hair reduction and non-surgical skin resurfacing.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {laserTreatments.map((t, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-56 lg:h-72 overflow-hidden">
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white">{t.title}</h3>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <p className="text-on-surface-variant mb-6 leading-relaxed text-sm lg:text-base">{t.desc}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {t.benefits.map((b, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm bg-primary/5 rounded-xl p-3">
                        <span className="material-symbols-outlined text-primary text-base">bolt</span>
                        <span className="font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={onBookClick}
                    className="w-full border-2 border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS ═══════════════ */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">Your Path to Renewed Confidence</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {['Book Appointment', 'Expert Consultation', 'Tailored Treatment', 'Glowing Results'].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-5 border-2 border-white/30 hover:bg-white/30 transition-colors">
                  <span className="text-xl lg:text-2xl font-bold">0{i + 1}</span>
                </div>
                <h4 className="font-bold text-base lg:text-lg">{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
