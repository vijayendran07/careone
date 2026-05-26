import React, { useState, useEffect } from 'react'
import API_URL from '../config/api'

export default function PatientResults({ onBookClick }) {
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
      <section className="min-h-[60vh] flex items-center bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 lg:py-0">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <span className="inline-block bg-primary/10 text-primary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full">
              Real Transformations
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              See the Difference{' '}
              <span className="text-primary">Care One Makes</span>
            </h1>
            <p className="text-base lg:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
              Real patients, real results. These transformative outcomes speak to our commitment to excellence and your trust in us.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ HAIR RESULTS ═══════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block bg-primary/10 text-primary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">Hair Care Results</span>
            <h2 className="text-3xl lg:text-5xl font-bold">Hair Restoration Results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                before: getImage('hair-result-1-before', 'https://images.unsplash.com/photo-1599599810694-f3f415eaf82f?auto=format&fit=crop&w=400&q=80'),
                after: getImage('hair-result-1-after', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                name: 'Rahul M.',
                treatment: 'PRP Hair Therapy · 6 months',
                result: 'Significant hair density improvement'
              },
              {
                before: getImage('hair-result-2-before', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'),
                after: getImage('hair-result-2-after', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                name: 'Arjun K.',
                treatment: 'Follicular Restoration · 8 months',
                result: 'Natural hair regrowth pattern'
              },
              {
                before: getImage('hair-result-3-before', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                after: getImage('hair-result-3-after', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'),
                name: 'Vikram S.',
                treatment: 'Scalp Micro-needling · 4 months',
                result: 'Visible follicle rejuvenation'
              }
            ].map((result, idx) => (
              <div key={idx} className="rounded-3xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
                <div className="flex gap-1">
                  <div className="flex-1">
                    <p className="text-xs text-center font-bold text-on-surface-variant bg-gray-100 py-2">Before</p>
                    <img src={result.before} alt="Before" className="w-full h-52 lg:h-64 object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-center font-bold text-on-surface-variant bg-primary/10 py-2 text-primary">After</p>
                    <img src={result.after} alt="After" className="w-full h-52 lg:h-64 object-cover" />
                  </div>
                </div>
                <div className="p-5 lg:p-6">
                  <h3 className="font-bold text-on-surface text-base mb-1">{result.name}</h3>
                  <p className="text-xs text-primary font-semibold mb-2">{result.treatment}</p>
                  <p className="text-xs text-on-surface-variant">{result.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SKIN RESULTS ═══════════════ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block bg-secondary/10 text-secondary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">Skin Results</span>
            <h2 className="text-3xl lg:text-5xl font-bold">Skin Rejuvenation &amp; Chemical Peels</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {[
              {
                before: getImage('skin-result-1-before', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'),
                after: getImage('skin-result-1-after', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                name: 'Sneha P.',
                treatment: 'Medical Grade Chemical Peels · 3 months',
                description: 'Dramatic improvement in skin texture and pigmentation. Patient reported noticeable glow and refined pores.'
              },
              {
                before: getImage('skin-result-2-before', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'),
                after: getImage('skin-result-2-after', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                name: 'Kavya R.',
                treatment: 'Advanced Mesotherapy · 6 sessions',
                description: 'Skin hydration levels increased dramatically. Fine lines softened and overall radiance enhanced.'
              },
              {
                before: getImage('skin-result-3-before', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                after: getImage('skin-result-3-after', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'),
                name: 'Deepti M.',
                treatment: 'Combination Protocol · 4 months',
                description: 'Multi-modality approach resulted in comprehensive skin rejuvenation and natural-looking results.'
              },
              {
                before: getImage('skin-result-4-before', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'),
                after: getImage('skin-result-4-after', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                name: 'Neha S.',
                treatment: 'Anti-Aging Protocol · 6 months',
                description: 'Significant reduction in fine lines and age spots. Patient regained youthful glow and skin elasticity.'
              }
            ].map((result, idx) => (
              <div key={idx} className="rounded-3xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
                <div className="flex gap-1">
                  <div className="flex-1">
                    <p className="text-xs text-center font-bold text-on-surface-variant bg-gray-100 py-2">Before</p>
                    <img src={result.before} alt="Before" className="w-full h-52 lg:h-64 object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-center font-bold text-on-surface-variant bg-primary/10 py-2 text-primary">After</p>
                    <img src={result.after} alt="After" className="w-full h-52 lg:h-64 object-cover" />
                  </div>
                </div>
                <div className="p-5 lg:p-6">
                  <h3 className="font-bold text-on-surface text-base mb-1">{result.name}</h3>
                  <p className="text-xs text-primary font-semibold mb-2">{result.treatment}</p>
                  <p className="text-xs text-on-surface-variant">{result.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ LASER RESULTS ═══════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block bg-primary/10 text-primary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full mb-4">Laser Results</span>
            <h2 className="text-3xl lg:text-5xl font-bold">Laser Hair Removal &amp; Resurfacing</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {[
              {
                icon: '✨',
                title: 'Laser Hair Removal',
                results: ['95% hair reduction after 6 sessions', 'Permanent results in all body areas', 'Works on all skin tones', 'Fast sessions (15-45 min)', 'No scarring or burns']
              },
              {
                icon: '🌟',
                title: 'Fractional Resurfacing',
                results: ['Significant acne scar improvement', 'Smoother skin texture', 'Reduced fine lines and wrinkles', 'Improved skin tone uniformity', 'Collagen remodeling continues for months']
              }
            ].map((treatment, idx) => (
              <div key={idx} className="p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-5xl mb-5">{treatment.icon}</div>
                <h3 className="text-2xl lg:text-3xl font-bold text-on-surface mb-6">{treatment.title}</h3>
                <ul className="space-y-4">
                  {treatment.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm lg:text-base">
                      <span className="text-primary font-bold mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-on-surface-variant">{result}</span>
                    </li>
                  ))}
                </ul>
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
              <h2 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">Ready for Your Transformation?</h2>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                Book your consultation today and discover how Care One can help you achieve your aesthetic goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <button
                onClick={onBookClick}
                className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 text-base"
              >
                Schedule Your Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
