import React, { useState } from 'react'

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      q: 'How do I book an appointment and select my slot?',
      a: 'Simply click "Book Appointment" in the top header, select your desired treatment, choose a preferred date and time, and click confirm. The clinical admin will check the doctor schedules and send your confirmed time slot directly to your profile header notifications!'
    },
    {
      q: 'Where can I see the confirmation of my scheduled appointment?',
      a: 'Log in as a patient and check the bell notification icon in the top header. When the clinical admin updates your date or time slot, a live notification badge will appear with your confirmed slot and any specific doctor instructions!'
    },
    {
      q: 'What is the recovery downtime for Chemical Peels?',
      a: 'Downtime varies depending on the depth of the peel. Light enzymatic peels have zero downtime, while medium-depth TCA peels may result in mild skin flaking for 3 to 5 days. We provide comprehensive aftercare serums and instructions.'
    },
    {
      q: 'Is Laser Hair Removal permanent and safe for all skin tones?',
      a: 'Yes! Our state-of-the-art dual-wavelength laser system incorporates advanced cooling technologies and custom frequency wavelengths, making it fully FDA-approved, painless, and perfectly safe for all skin types and tones.'
    },
    {
      q: 'How many PRP sessions are typically required for hair restoration?',
      a: 'We generally recommend a starting series of 3 to 4 clinical sessions spaced 4 weeks apart. Maintenance treatments are recommended every 6 months to sustain hair density and follicular health.'
    }
  ]

  return (
    <main>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="min-h-[40vh] flex items-center bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 lg:py-0">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block bg-primary/10 text-primary font-semibold uppercase tracking-widest text-xs px-4 py-2 rounded-full">
              Help Center
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Frequently Asked Questions</h1>
            <p className="text-on-surface-variant text-base lg:text-xl leading-relaxed">
              Find rapid answers to appointments, schedules, clinical treatments, and aftercare.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ LIST ═══════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Context */}
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-5xl font-bold leading-tight">Everything You Need to Know</h2>
                <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed">
                  Can't find your answer? Contact our clinical team directly and we'll be happy to assist you.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: 'calendar_today', label: 'Easy Booking' },
                  { icon: 'medical_services', label: 'Expert Doctors' },
                  { icon: 'verified', label: 'FDA-Approved' },
                  { icon: 'support_agent', label: '24/7 Support' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-outline-variant/20">
                    <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                    <span className="text-sm font-semibold text-on-surface">{item.label}</span>
                  </div>
                ))}
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 hover:-translate-y-1 transition-all duration-200 text-base"
              >
                Contact Our Team
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>

            {/* Right: FAQ Accordion */}
            <div className="space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? 'border-primary/30 shadow-md' : 'border-outline-variant/20'}`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full px-6 py-5 text-left font-bold text-on-surface flex justify-between items-center hover:bg-gray-50 transition text-sm lg:text-base bg-white"
                    >
                      <span>{faq.q}</span>
                      <span className={`material-symbols-outlined text-primary transform transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-60' : 'max-h-0'
                      }`}
                    >
                      <div className="px-6 pb-5 pt-3 text-on-surface-variant text-sm lg:text-base leading-relaxed border-t border-outline-variant/10 bg-gray-50/50">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
