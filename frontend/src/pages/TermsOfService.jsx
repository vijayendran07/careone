import React from 'react'

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <span className="text-secondary font-semibold uppercase tracking-wider">Patient Support</span>
      <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-8 text-on-surface">Terms of Service</h1>
      
      <div className="prose prose-slate max-w-none space-y-6 text-on-surface-variant leading-relaxed">
        <p className="text-lg">
          Welcome to <strong>Care One</strong>. By using our website and scheduling treatments with us, you agree to comply with the following clinical guidelines and terms of service.
        </p>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-on-surface mt-8">1. Appointment Booking & Cancellations</h2>
          <p>
            To maintain our high standards of clinical excellence, all patients must provide accurate contact and preferred timing details. 
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cancellation Policy:</strong> Please notify us at least 24 hours in advance if you need to reschedule or cancel your appointment.</li>
            <li><strong>No-Show Policy:</strong> Repeated no-shows without notification may lead to restrictions on future scheduling.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-on-surface mt-8">2. Medical Consultations & Consent</h2>
          <p>
            All advanced treatments (including Laser, PRP, and Chemical Peels) require a thorough initial medical consultation to determine candidacy and safety.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You agree to provide complete and accurate medical history details during booking and consultation.</li>
            <li>Informed consent forms must be read and signed before any aesthetic or clinical procedure begins.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-on-surface mt-8">3. Treatment Outcomes</h2>
          <p>
            Aesthetic and dermatological results vary individually based on skin type, health history, and compliance with recommended aftercare protocols. Care One provides clinical guidance, but does not guarantee identical results across all patients.
          </p>
        </section>

        <p className="text-xs text-on-surface-variant/70 pt-8 border-t border-outline-variant/30">
          Last Updated: May 25, 2026. For inquiries regarding our terms, contact our support team at <strong>legal@careone.com</strong>.
        </p>
      </div>
    </div>
  )
}
