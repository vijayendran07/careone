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
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14">
      <div className="text-center mb-8">
        <span className="text-secondary font-semibold uppercase tracking-wider text-sm md:text-base">Help Center</span>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2 text-on-surface">Frequently Asked Questions</h1>
        <p className="text-sm md:text-base text-on-surface-variant mt-2 md:mt-3 max-w-xl mx-auto">
          Find rapid answers to appointments, schedules, clinical treatments, and aftercare.
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i
          return (
            <div 
              key={i} 
              className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full px-4 md:px-6 py-4 md:py-5 text-left font-bold text-on-surface flex justify-between items-center hover:bg-surface-container-low transition text-sm md:text-base"
              >
                <span>{faq.q}</span>
                <span className={`material-symbols-outlined transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-60 border-t border-outline-variant/20 py-4 md:py-5 px-4 md:px-6' : 'max-h-0 py-0 px-4 md:px-6'
                } overflow-hidden text-on-surface-variant text-xs md:text-sm leading-relaxed bg-surface-container-lowest`}
              >
                {faq.a}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
