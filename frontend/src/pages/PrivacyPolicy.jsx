import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <span className="text-secondary font-semibold uppercase tracking-wider">Patient Support</span>
      <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-8 text-on-surface">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none space-y-6 text-on-surface-variant leading-relaxed">
        <p className="text-lg">
          At <strong>Care One</strong>, we place the highest priority on the privacy and security of our patients' personal and medical data. This Privacy Policy describes how we collect, use, and protect your information.
        </p>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-on-surface mt-8">1. Information We Collect</h2>
          <p>
            We collect personal information necessary to deliver clinical excellence. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal details:</strong> Name, Date of Birth, Gender.</li>
            <li><strong>Contact details:</strong> Email address, Phone number, Mailing address.</li>
            <li><strong>Clinical data:</strong> Appointment history, medical conditions, treatment history, and clinical photos (only with your explicit consent).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-on-surface mt-8">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to provide medical skin and hair care services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Scheduling and managing your medical appointments.</li>
            <li>Providing clinical updates or schedule adjustments via SMS/email.</li>
            <li>Improving our treatments and client experiences.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-on-surface mt-8">3. Information Protection</h2>
          <p>
            We implement state-of-the-art security measures to protect your medical details and personal records against unauthorized access, disclosure, or alteration. All electronic health records (EHR) are encrypted and stored in compliance with top-tier medical privacy guidelines.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-on-surface mt-8">4. Sharing and Disclosure</h2>
          <p>
            Care One will <strong>never</strong> sell, trade, or rent your clinical or personal records to third parties. We only share details with external medical providers if explicitly requested by you for referrals or treatment continuity.
          </p>
        </section>

        <p className="text-xs text-on-surface-variant/70 pt-8 border-t border-outline-variant/30">
          Last Updated: May 25, 2026. For inquiries regarding your privacy, contact our support team at <strong>privacy@careone.com</strong>.
        </p>
      </div>
    </div>
  )
}
