import React, { useState, useEffect, useRef } from 'react';
import { Shield, Mail, CheckCircle, ChevronRight, User, Send, ArrowLeft, Lock, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';


/* ── Section heading ── */
const Sec = ({ title, children }) => (
  <div style={{ marginBottom: 40 }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 14, paddingBottom: 10, borderBottom: '2px solid #e5e7eb' }}>{title}</h2>
    <div style={{ color: '#374151', fontSize: 15, lineHeight: 1.85 }}>{children}</div>
  </div>
);

const Sub = ({ title }) => (
  <p style={{ fontWeight: 600, color: '#1f2937', marginBottom: 6, marginTop: 16, fontSize: 15 }}>{title}</p>
);

const UL = ({ items }) => (
  <ul style={{ paddingLeft: 0, listStyle: 'none', margin: '10px 0 0', display: 'flex', flexDirection: 'column', gap: 7 }}>
    {items.map((it, i) => (
      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#374151', fontSize: 15, lineHeight: 1.75 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#004792', marginTop: 10, flexShrink: 0 }} />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

/* ── T&C sub-section ── */
const TCSec = ({ title, children }) => (
  <div style={{ marginBottom: 28 }}>
    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#004792', marginBottom: 10, paddingBottom: 6, borderBottom: '1px solid #dbeafe' }}>{title}</h3>
    <div style={{ color: '#374151', fontSize: 15, lineHeight: 1.85 }}>{children}</div>
  </div>
);


/* ── Step progress bar ── */
function StepBar({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '32px 24px 24px', background: '#fff', borderBottom: '1px solid #f3f4f6' }}>
      {['Privacy Policy', 'Inquiry Form'].map((label, i) => {
        const n = i + 1;
        const active = current === n;
        const done = current > n;
        return (
          <React.Fragment key={n}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: done || active ? '#004792' : '#e5e7eb',
                color: done || active ? '#fff' : '#9ca3af',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 16,
                boxShadow: active ? '0 0 0 6px rgba(0,71,146,.18)' : 'none',
                transition: 'all .4s',
              }}>
                {done ? <Check size={20} /> : n}
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: done || active ? '#004792' : '#9ca3af', letterSpacing: '0.02em' }}>{label}</span>
            </div>
            {i === 0 && (
              <div style={{ width: 80, height: 3, background: done ? '#004792' : '#e5e7eb', borderRadius: 3, margin: '0 16px', marginBottom: 22, transition: 'background .4s' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Form field ── */
function Field({ label, icon, type, placeholder, value, onChange }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: focus ? '#004792' : '#9ca3af', transition: 'color .2s', display: 'flex' }}>{icon}</span>
        <input
          required type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ width: '100%', padding: '14px 16px 14px 48px', border: `2px solid ${focus ? '#004792' : '#e5e7eb'}`, borderRadius: 14, fontSize: 15, color: '#111827', outline: 'none', background: '#f9fafb', fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color .2s' }}
        />
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <span style={{ width: 18, height: 18, border: '2.5px solid rgba(255,255,255,.35)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin .8s linear infinite', marginRight: 8, flexShrink: 0 }} />
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function PrivacypolicyHRMS() {
  const [step, setStep] = useState(1);
  const [reached, setReached] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const bottomRef = useRef(null);

  // Scroll to top whenever step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step]);

  useEffect(() => {
    if (step !== 1) return;
    setReached(false);
    setAccepted(false);
    setScrollPct(0);

    const onScroll = () => {
      const el = bottomRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight || document.documentElement.clientHeight;
      // reached = bottom element is visible in viewport
      if (rect.top <= windowH + 80) {
        setReached(true);
      }
      // scroll percentage for progress bar
      const docH = document.documentElement.scrollHeight - windowH;
      setScrollPct(docH > 0 ? Math.min(100, Math.round((window.scrollY / docH) * 100)) : 100);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, [step]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendError('');
    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          to_name:    'NDA Technology Solutions',
          message:    `New inquiry from ${form.name} (${form.email}) via the Privacy Policy & Inquiry Form.`,
          reply_to:   form.email,
        }
      );
      console.log('EmailJS success:', result);
      setDone(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setSendError(`Error: ${err?.text || err?.message || JSON.stringify(err)}`);
    } finally {
      setSending(false);
    }
  };

  /* ════════════ STEP 2 — FORM ════════════ */
  if (step === 2) return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      {/* Hero */}
      <div style={hero2Style}>
        <p style={badgeStyle}><Mail size={14} style={{ marginRight: 6 }} /> Step 2 of 2</p>
        <h1 style={titleStyle}>Send an Inquiry</h1>
        <p style={subStyle}>Fill in your details and our team will reach out within 24 hours.</p>
      </div>

      <StepBar current={2} />

      {/* Form */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px 80px' }}>
        <button onClick={() => { setStep(1); setAccepted(false); }} style={backBtnStyle}>
          <ArrowLeft size={15} style={{ marginRight: 6 }} /> Back to Privacy Policy
        </button>

        {!done ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 28 }}>
            {/* <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#4338ca', background: '#eef2ff', padding: '14px 18px', borderRadius: 14, border: '1px solid #c7d2fe' }}>
              <Shield size={16} color="#004792" style={{ flexShrink: 0, marginTop: 1 }} />
              <span>You've accepted our Privacy Policy. Please fill in your details below.</span>
            </div> */}

            <Field label="Full Name" icon={<User size={17} />} type="text" placeholder="Enter your full name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
            <Field label="Email Address" icon={<Mail size={17} />} type="email" placeholder="Enter your email address" value={form.email} onChange={v => setForm({ ...form, email: v })} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6b7280', background: '#f0fdf4', padding: '10px 14px', borderRadius: 10, border: '1px solid #bbf7d0' }}>
              <Lock size={13} color="#16a34a" /><span>Your information is secured per our Privacy Policy.</span>
            </div>

            <button type="submit" disabled={sending} style={primaryBtnStyle}>
              {sending ? <><Spinner />Sending...</> : <><Send size={17} style={{ marginRight: 8 }} />Send Inquiry</>}
            </button>

            {sendError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#dc2626', lineHeight: 1.6 }}>
                <strong>❌ Send failed:</strong> {sendError}
                <br /><span style={{ color: '#6b7280' }}>Please share this error or email directly: <strong>info@ndatechsolutions.com</strong></span>
              </div>
            )}
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 48, gap: 18, textAlign: 'center' }}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 14px rgba(22,163,74,.07)' }}>
              <CheckCircle size={52} color="#16a34a" />
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: '#111827', margin: 0 }}>Inquiry Sent!</h3>
            <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.7, maxWidth: 380, margin: 0 }}>
              Hi <strong>{form.name}</strong>! We'll respond to <strong>{form.email}</strong> within 24 hours.
            </p>
            <button style={primaryBtnStyle} onClick={() => { setStep(1); setAccepted(false); setDone(false); setForm({ name: '', email: '' }); }}>
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );

  /* ════════════ STEP 1 — PRIVACY POLICY ════════════ */
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Inter','Segoe UI',sans-serif" }}>

      {/* ── Hero Banner ── */}
      <div style={hero1Style}>
        <p style={badgeStyle}><Shield size={14} style={{ marginRight: 6 }} /> Step 1 of 2</p>
        <h1 style={titleStyle}>Privacy Policy</h1>
        <p style={subStyle}>This Privacy Policy outlines how we collect, use, share, and protect your information on our platform and services.</p>
      </div>

      {/* ── Step bar ── */}
      <StepBar current={1} />

      {/* ── Policy content — full width page ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 48px 80px' }}>

        {/* ══ TERMS & CONDITIONS ══ */}
        <div style={{ marginTop: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: '#e0eaff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={22} color="#004792" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: '#004792' }}>Terms &amp; Conditions</h2>
              <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>NDA Technology Solutions — Please read carefully</p>
            </div>
          </div>

          <TCSec title="Payment Terms">
            <UL items={[
              'The customer shall pay 100% of the total software cost in advance at the time of order confirmation.',
              'In case of delay in payment, the company reserves the right to suspend services, restrict access, or charge late payment penalties as applicable.',
              'All payments made are non-refundable, unless otherwise agreed in writing.',
            ]} />
          </TCSec>

          <TCSec title="Delivery & Installation">
            <UL items={[
              'Software will be delivered via download link, email, or physical media.',
              'Installation support may be provided if included in the agreement.',
            ]} />
          </TCSec>

          <TCSec title="Usage Rights / Data Responsibility">
            <UL items={[
              'The Client is responsible for maintaining proper data backup.',
              'The Company is not liable for any data loss due to misuse, hardware failure, or external issues.',
              'The software is for use by the purchaser only.',
              'Sharing, sublicensing, or reselling without permission is strictly prohibited.',
            ]} />
          </TCSec>

          <TCSec title="Restrictions">
            <p style={{ marginBottom: 8, color: '#374151', fontSize: 15 }}>The customer shall not:</p>
            <UL items={[
              'Copy, modify, or distribute the software',
              'Reverse engineer or decompile',
              'Use the software for illegal purposes',
            ]} />
          </TCSec>

          <TCSec title="Limitation of Liability & Confidentiality">
            <UL items={[
              'Both parties agree to keep all business and technical information confidential.',
              'The company shall not be responsible for any loss of data, profit, or business interruption due to use of the software.',
            ]} />
          </TCSec>

          <TCSec title="Termination">
            <UL items={[
              'The Company reserves the right to suspend or terminate services if payment terms are not fulfilled. No refund will be provided after project initiation.',
              'The license may be terminated if terms are violated. Upon termination, the user must stop using the software immediately.',
            ]} />
          </TCSec>

          <TCSec title="Changes to Terms">
            <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.8 }}>The company reserves the right to update these terms at any time.</p>
          </TCSec>

          <TCSec title="Features, Modules & Support">
            <UL items={[
              'Any new features, enhancements, or additional modules requested after the initial purchase shall be chargeable separately. The cost and timeline will be mutually agreed upon in writing.',
              'In case of any software issue, error, or bug, the company will make reasonable efforts to resolve the issue within 48 working hours, excluding weekly offs (Saturday and Sunday) and public holidays.',
              'The resolution timeline may vary depending on the complexity of the issue, and the company will keep the customer informed in such cases.',
            ]} />
          </TCSec>

          <TCSec title="Data Security & Backup">
            <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.8 }}>The company will take reasonable measures to secure customer data and maintain regular backups. However, the client is also advised to keep backup copies of critical data.</p>
          </TCSec>

          <TCSec title="AMC (Annual Maintenance Contract)">
            <UL items={[
              'The Annual Maintenance Contract (AMC) is optional and applicable after the warranty/support period.',
              '₹8,500/- per year for one software system.',
              '₹15,000/- per year for two software systems.',
            ]} />
            <p style={{ marginTop: 12, fontWeight: 600, color: '#1f2937', fontSize: 15 }}>AMC Includes:</p>
            <UL items={['Regular maintenance and basic support', 'Bug fixing and issue resolution', 'Minor updates (if applicable)']} />
            <p style={{ marginTop: 12, fontWeight: 600, color: '#1f2937', fontSize: 15 }}>AMC Does Not Include:</p>
            <UL items={['New features or additional modules (chargeable separately)', 'Major upgrades or customization work']} />
            <p style={{ marginTop: 10, color: '#374151', fontSize: 15, lineHeight: 1.8 }}>AMC payment must be made in advance for the full year to continue uninterrupted support services.</p>
          </TCSec>

          <TCSec title="Governing Law / Jurisdiction">
            <UL items={[
              'This Agreement shall be governed by the laws of Rajkot, Gujarat, India.',
              'This agreement is governed by the laws of India.',
            ]} />
          </TCSec>

          <TCSec title="Limitation of Liability">
            <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.8 }}>The company shall not be liable for indirect losses, data loss, business interruption, or damages arising from use of the software.</p>
          </TCSec>

          {/* Acceptance box */}
          {/* <div style={{ marginTop: 28, padding: '20px 24px', background: '#e0eaff', borderRadius: 16, border: '2px solid #004792' }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: '#004792', marginBottom: 8 }}>Acceptance Of Terms &amp; Conditions</p>
            <p style={{ margin: 0, color: '#374151', fontSize: 14, lineHeight: 1.8 }}>
              We have read all the Terms &amp; Conditions mentioned in the attached document and accept all the terms and conditions.
            </p>
          </div> */}
        </div>

        {/* ── Accept Terms — bottom of page ── */}
        <div ref={bottomRef} style={{ marginTop: 56, paddingTop: 40, borderTop: '2px solid #e5e7eb' }}>
          <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)', borderRadius: 20, padding: '32px 36px', border: '1px solid #e0e7ff' }}>

            {/* Scroll progress
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#6b7280' }}>Reading progress</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: scrollPct >= 90 ? '#16a34a' : '#004792' }}>{scrollPct}%</span>
              </div>
              <div style={{ height: 8, background: '#e5e7eb', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${scrollPct}%`, background: scrollPct >= 90 ? 'linear-gradient(90deg,#16a34a,#22c55e)' : 'linear-gradient(90deg,#004792,#0066cc)', borderRadius: 99, transition: 'width .3s, background .4s' }} />
              </div>
            </div> */}

            {/* <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Lock size={20} color="#004792" />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: '#111827' }}>Terms &amp; Conditions Agreement</p>
                <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>Please read the full policy before accepting</p>
              </div>
            </div> */}

            {/* {!reached && (
              <div style={{ fontSize: 13, color: '#b45309', fontWeight: 600, background: '#fef3c7', padding: '10px 16px', borderRadius: 10, border: '1px solid #fde68a', marginBottom: 18 }}>
                ⬇ Please scroll down a bit more to enable acceptance ({scrollPct}% read)
              </div>
            )}
            {reached && (
              <div style={{ fontSize: 13, color: '#15803d', fontWeight: 600, background: '#f0fdf4', padding: '10px 16px', borderRadius: 10, border: '1px solid #bbf7d0', marginBottom: 18 }}>
                ✅ You've reached the end of the policy. You can now accept below.
              </div>
            )} */}

            {/* ── REAL checkbox — always clickable once reached ── */}
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 14, cursor: reached ? 'pointer' : 'not-allowed', opacity: reached ? 1 : 0.45, transition: 'opacity .3s', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={accepted}
                disabled={!reached}
                onChange={e => setAccepted(e.target.checked)}
                style={{
                  width: 22, height: 22,
                  accentColor: '#004792',
                  cursor: reached ? 'pointer' : 'not-allowed',
                  flexShrink: 0,
                  marginTop: 2,
                }}
              />
              <span style={{ fontSize: 15, color: '#374151', lineHeight: 1.65 }}>
                I have carefully read and agree to the{' '}
                <strong style={{ color: '#004792' }}>Terms &amp; Conditions</strong>{' '}
                and{' '}
                <strong style={{ color: '#004792' }}>Privacy Policy</strong>{' '}
                of NDA Technology Solutions.
              </span>
            </label>

            <button
              onClick={() => accepted && setStep(2)}
              disabled={!accepted}
              style={{
                ...primaryBtnStyle,
                marginTop: 24,
                opacity: accepted ? 1 : 0.4,
                cursor: accepted ? 'pointer' : 'not-allowed',
                backgroundColor: '#004792',
              }}
            >
              Continue to Inquiry Form <ChevronRight size={18} style={{ marginLeft: 6 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Shared styles ── */
const hero1Style = {
  background: 'linear-gradient(135deg, #ede9fe 0%, #dbeafe 60%, #e0e7ff 100%)',
  padding: '72px 24px 64px',
  textAlign: 'center',
};

const hero2Style = {
  background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 60%, #e0e7ff 100%)',
  padding: '72px 24px 64px',
  textAlign: 'center',
};

const badgeStyle = {
  display: 'inline-flex', alignItems: 'center',
  padding: '6px 18px',
  background: 'rgba(0,71,146,.10)',
  color: '#004792',
  borderRadius: 50,
  fontSize: 13, fontWeight: 700,
  marginBottom: 20,
  border: '1px solid rgba(0,71,146,.2)',
};

const titleStyle = {
  fontSize: 44, fontWeight: 900, color: '#004792',
  margin: '0 0 16px',
  letterSpacing: '-0.03em',
};

const subStyle = {
  fontSize: 16, color: '#4b5563', lineHeight: 1.7,
  maxWidth: 540, margin: '0 auto',
};

const primaryBtnStyle = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  padding: '15px 36px',
  background: '#004792',
  color: '#fff',
  border: 'none',
  borderRadius: 50,
  fontWeight: 700, fontSize: 16,
  cursor: 'pointer',
  boxShadow: '0 8px 24px rgba(0,71,146,.3)',
  fontFamily: 'inherit',
  transition: 'all .3s',
};

const backBtnStyle = {
  display: 'inline-flex', alignItems: 'center',
  fontSize: 14, fontWeight: 600, color: '#6b7280',
  background: '#f3f4f6', border: '1px solid #e5e7eb',
  padding: '9px 18px', borderRadius: 50,
  cursor: 'pointer', fontFamily: 'inherit',
};