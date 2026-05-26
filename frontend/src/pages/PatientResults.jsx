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
    <main className="flex-1">
      {/* Hero */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <div className="text-label-md text-primary mb-2">Real Transformations</div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-4 md:mb-6 font-headline-xl">
            See the Difference Care One Makes
          </h1>
          <p className="text-base md:text-xl text-on-surface-variant max-w-2xl mx-auto">
            Real patients, real results. These transformative outcomes speak to our commitment to excellence and your trust in us.
          </p>
        </div>
      </section>

      {/* Before & After Gallery */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-8 md:mb-12 text-center font-headline-xl">Hair Restoration Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                before: getImage('hair-result-1-before', 'https://images.unsplash.com/photo-1599599810694-f3f415eaf82f?auto=format&fit=crop&w=400&q=80'),
                after: getImage('hair-result-1-after', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                name: 'Rahul M.',
                treatment: 'PRP Hair Therapy - 6 months',
                result: 'Significant hair density improvement'
              },
              {
                before: getImage('hair-result-2-before', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'),
                after: getImage('hair-result-2-after', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                name: 'Arjun K.',
                treatment: 'Follicular Restoration - 8 months',
                result: 'Natural hair regrowth pattern'
              },
              {
                before: getImage('hair-result-3-before', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                after: getImage('hair-result-3-after', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'),
                name: 'Vikram S.',
                treatment: 'Scalp Micro-needling - 4 months',
                result: 'Visible follicle rejuvenation'
              }
            ].map((result, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20">
                <div className="space-y-1 md:space-y-2">
                  <div className="flex gap-1 md:gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-on-surface-variant px-2 py-1 md:px-3 md:py-2 bg-surface-container-low text-center font-semibold">Before</p>
                      <img src={result.before} alt="Before" className="w-full h-48 md:h-64 object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-on-surface-variant px-2 py-1 md:px-3 md:py-2 bg-surface-container-low text-center font-semibold">After</p>
                      <img src={result.after} alt="After" className="w-full h-48 md:h-64 object-cover" />
                    </div>
                  </div>
                </div>
                <div className="p-4 md:p-6 bg-surface">
                  <h3 className="font-bold text-on-surface mb-1">{result.name}</h3>
                  <p className="text-xs md:text-sm text-primary mb-2">{result.treatment}</p>
                  <p className="text-xs md:text-sm text-on-surface-variant">{result.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skin Rejuvenation Results */}
      <section className="py-10 md:py-14 bg-surface-container-low">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-8 md:mb-12 text-center font-headline-xl">Skin Rejuvenation & Chemical Peels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                before: getImage('skin-result-1-before', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'),
                after: getImage('skin-result-1-after', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                name: 'Sneha P.',
                treatment: 'Medical Grade Chemical Peels - 3 months',
                description: 'Dramatic improvement in skin texture and pigmentation. Patient reported noticeable glow and refined pores.'
              },
              {
                before: getImage('skin-result-2-before', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'),
                after: getImage('skin-result-2-after', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                name: 'Kavya R.',
                treatment: 'Advanced Mesotherapy - 6 sessions',
                description: 'Skin hydration levels increased dramatically. Fine lines softened and overall radiance enhanced.'
              },
              {
                before: getImage('skin-result-3-before', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                after: getImage('skin-result-3-after', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'),
                name: 'Deepti M.',
                treatment: 'Combination Protocol - 4 months',
                description: 'Multi-modality approach resulted in comprehensive skin rejuvenation and natural-looking results.'
              },
              {
                before: getImage('skin-result-4-before', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'),
                after: getImage('skin-result-4-after', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'),
                name: 'Neha S.',
                treatment: 'Anti-Aging Protocol - 6 months',
                description: 'Significant reduction in fine lines and age spots. Patient regained youthful glow and skin elasticity.'
              }
            ].map((result, idx) => (
              <div key={idx} className="bg-surface rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-md transition">
                <div className="flex gap-2 md:gap-3 p-2 md:p-3 bg-surface-container-highest">
                  <img src={result.before} alt="Before" className="w-1/2 h-24 md:h-32 object-cover rounded-lg" />
                  <img src={result.after} alt="After" className="w-1/2 h-24 md:h-32 object-cover rounded-lg" />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-on-surface mb-1">{result.name}</h3>
                  <p className="text-primary text-xs md:text-sm font-semibold mb-2 md:mb-3">{result.treatment}</p>
                  <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">{result.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Therapy Results */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-8 md:mb-12 text-center font-headline-xl">Laser Hair Removal & Resurfacing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                icon: '✨',
                title: 'Laser Hair Removal',
                results: [
                  '95% hair reduction after 6 sessions',
                  'Permanent results in all body areas',
                  'Works on all skin tones',
                  'Fast sessions (15-45 min)',
                  'No scarring or burns'
                ]
              },
              {
                icon: '🌟',
                title: 'Fractional Resurfacing',
                results: [
                  'Significant acne scar improvement',
                  'Smoother skin texture',
                  'Reduced fine lines and wrinkles',
                  'Improved skin tone uniformity',
                  'Collagen remodeling continues for months'
                ]
              }
            ].map((treatment, idx) => (
              <div key={idx} className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{treatment.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-4 md:mb-6">{treatment.title}</h3>
                <ul className="space-y-2 md:space-y-3">
                  {treatment.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-2 md:gap-3 text-sm md:text-base">
                      <span className="text-primary font-bold mt-0.5 md:mt-1">✓</span>
                      <span className="text-on-surface-variant">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 font-headline-xl">Ready for Your Transformation?</h2>
          <p className="text-white/90 mb-6 md:mb-8 text-sm md:text-lg max-w-2xl mx-auto">
            Book your consultation today and discover how Care One can help you achieve your aesthetic goals.
          </p>
          <button 
            onClick={onBookClick}
            className="bg-white text-primary px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-sm md:text-base w-full sm:w-auto"
          >
            Schedule Your Consultation
          </button>
        </div>
      </section>
    </main>
  )
}
