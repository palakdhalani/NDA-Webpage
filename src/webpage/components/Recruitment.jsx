import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, BadgePercent, FileCheck, RefreshCw, ShieldCheck,
  Clock, Building2, ChevronDown, ChevronUp, Briefcase, Star, Award
} from 'lucide-react';

const faqs = [
  {
    q: 'What is NDA Technology\'s recruitment fee structure?',
    a: 'NDA Technology charges 7.33% of the annual CTC (Cost to Company) of the candidate selected through us. GST will be charged extra as per government rules at the time of invoice.',
  },
  {
    q: 'What does CTC include?',
    a: 'CTC includes Basic Salary, HRA, PF, Superannuation Fund, Medical Reimbursement, Insurance (employer paid), Petrol Allowance, Driver Salary, Education Allowance, LTA, Entertainment Reimbursement, Uniform Allowance, Book Allowance, Commission, and other benefits.',
  },
  {
    q: 'What is the replacement guarantee policy?',
    a: 'If any candidate placed by NDA Technology leaves within 60 days of joining, we provide one free replacement — provided: (A) official resignation/relieving letter is shared, (B) appointment letter was shared at hiring, (C) NDA Technology is informed within 3 days of the candidate leaving, and (D) candidates are not provided on trial or training basis.',
  },
  {
    q: 'What are the payment terms?',
    a: 'Payment must be made within 7 days from the candidate\'s joining date against our invoice. Cheque/DD should be in favor of NDA Technology – Rajkot. Late payment charges may apply for delayed payments. All payments are non-refundable.',
  },
  {
    q: 'What is NDA Technology\'s scope of responsibility?',
    a: 'Our responsibility is to provide suitable candidates and arrange interviews. Your organization is responsible for checking candidate suitability, explaining company rules, collecting & verifying documents, and managing all HR-related matters after placement.',
  },
  {
    q: 'Does the agreement apply across company branches?',
    a: 'Yes. This agreement applies to all branches, plants, regional offices, and zonal offices of your organization across India. If a candidate is hired by your parent, associate, or group company, professional fees will still apply.',
  },
];

const highlights = [
  {
    icon: BadgePercent,
    title: '7.33% of Annual CTC',
    desc: 'Transparent, competitive fee — charged only on successful placement.',
    color: 'bg-blue-50 text-[#004792]',
  },
  {
    icon: RefreshCw,
    title: '60-Day Replacement Guarantee',
    desc: 'Free replacement if a placed candidate leaves within 60 days (conditions apply).',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Clock,
    title: '7-Day Payment Terms',
    desc: 'Invoice raised on joining date. Payment due within 7 working days.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Building2,
    title: 'Pan-India Coverage',
    desc: 'Agreement covers all branches, plants, regional & zonal offices across India.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: FileCheck,
    title: 'Appointment Letter Required',
    desc: 'A copy of the appointment letter must be shared with NDA Technology for records.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: ShieldCheck,
    title: 'One-Year Resume Validity',
    desc: 'If any shared resume is hired within one year, professional charges apply.',
    color: 'bg-teal-50 text-teal-600',
  },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'border-[#004792] shadow-md shadow-blue-100' : 'border-slate-200 hover:border-blue-200'}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white"
      >
        <span className="font-semibold text-slate-800 text-base pr-4">{q}</span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${open ? 'bg-[#004792] text-white' : 'bg-slate-100 text-slate-500'}`}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 bg-blue-50/40 border-t border-blue-100">
          <p className="text-slate-600 leading-relaxed pt-4 text-sm">{a}</p>
        </div>
      )}
    </motion.div>
  );
}

const Recruitment = () => {
  return (
    <section id="recruitment" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-40 -z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100 rounded-full blur-[100px] opacity-30 -z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-blue-100 text-[#004792] font-semibold text-sm">
              <Briefcase size={15} /> Recruitment Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Hire Smarter with <span className="text-[#004792]">NDA Technology</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              NDA Technology offers end-to-end recruitment solutions — connecting the right talent to the right organizations with transparent terms, guaranteed replacements, and pan-India reach.
            </p>
          </motion.div>
        </div>

        {/* ── Highlight Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${h.color} flex items-center justify-center mb-4`}>
                <h.icon size={22} />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-2">{h.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Divider with label ── */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-slate-200" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 text-sm font-semibold shadow-sm">
            <Star size={14} className="text-amber-400 fill-amber-400" /> Terms &amp; Conditions — FAQ
          </div>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* ── FAQ Accordion ── */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} index={i} />)}
        </div>

        {/* ── CTA Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 rounded-3xl bg-gradient-to-br from-[#004792] to-[#0066cc] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-200"
        >
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <Award size={20} className="text-blue-200" />
              <span className="text-blue-200 text-sm font-semibold uppercase tracking-widest">Trusted Recruitment Partner</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
              Ready to Find Your Next<br />Great Hire?
            </h3>
            <p className="text-blue-100 text-base max-w-lg leading-relaxed">
              Partner with NDA Technology and let us handle the talent search — so you can focus on growing your business. Transparent pricing, guaranteed results.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="mailto:info@ndatechsolutions.com?subject=Recruitment Inquiry"
              className="px-8 py-4 bg-white text-[#004792] font-bold rounded-full text-sm hover:bg-blue-50 transition-all duration-300 shadow-lg text-center whitespace-nowrap"
            >
              Send Inquiry
            </a>
            <a
              href="tel:+91XXXXXXXXXX"
              className="px-8 py-4 bg-white/10 border border-white/30 text-white font-bold rounded-full text-sm hover:bg-white/20 transition-all duration-300 text-center whitespace-nowrap backdrop-blur-sm"
            >
              Call Us Now
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Recruitment;
