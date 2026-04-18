import React, { useState } from 'react';
import { Phone, Building2, ClipboardEdit, MessageCircle, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { s } from '../styles';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onLogoClick: () => void;
  theme: any;
  isDarkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onLogoClick, theme, isDarkMode }) => {

  const [pressed, setPressed] = useState<string | null>(null);

  const handlePress = (id: string) => {
    setPressed(id);
    setTimeout(() => setPressed(null), 150);
  };

  const socialLinks = [
    { id: 'whatsapp', href: "https://wa.me/970594560056", icon: <MessageCircle size={22} color="#22c55e" /> },
    { id: 'phone', href: "tel:+970594560056", icon: <Phone size={20} color="#34A853" /> },
  ];

  return (
    <div style={{ ...s.identity, userSelect: 'none', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* ===== Logo ===== */}
      <div style={{ marginBottom: '25px', textAlign: 'center' }}>
        <div
          onClick={onLogoClick}
          style={{
            ...s.logoWrap,
            margin: '0 auto 10px',
            border: `3px solid ${isDarkMode ? theme.accent : theme.border}`,
            boxShadow: isDarkMode ? `0 0 20px ${theme.accent}22` : '0 10px 30px rgba(0,0,0,0.05)',
            cursor: 'pointer',
          }}
        >
          <img
            src="https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg"
            alt="Logo"
            style={{ ...s.logoImg }}
          />
        </div>

        <h1 style={{ ...s.title, color: theme.text, fontSize: '1.8rem' }}>
          شقق <span style={{ color: theme.accent }}>رام الله</span>
        </h1>

        <p style={{ color: theme.text, opacity: 0.6, fontSize: '0.9rem', maxWidth: '300px', margin: '-10px auto 0' }}>
          منصتك الموثوقة للعقارات في رام الله والبيرة
        </p>
      </div>

      {/* ===== 1. Primary CTA: Browse ===== */}
      <button
        onClick={() => {
          handlePress('browse');
          onNavigate('browse');
        }}
        style={{
          ...s.serviceCard,
          width: '100%',
          maxWidth: '450px',
          margin: '0 auto 12px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          backgroundColor: isDarkMode ? theme.cardBg : '#fff',
          border: `1px solid ${isDarkMode ? theme.accent + '33' : '#eee'}`,
          transform: pressed === 'browse' ? 'scale(0.96)' : 'scale(1)',
          transition: '0.2s',
          boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '14px',
          backgroundColor: `${theme.accent}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Building2 size={28} color={theme.accent} />
        </div>

        <div style={{ flex: 1, textAlign: 'right' }}>
          <span style={{ fontSize: '1.15rem', fontWeight: '800', display: 'block' }}>
             تصفح العقارات المتاحة
          </span>
          <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>
            شقق، أراضي، مكاتب وتجاري
          </span>
        </div>

        <ChevronLeft size={18} opacity={0.3} />
      </button>

      {/* ===== 2. WhatsApp CTA: Direct Contact ===== */}
      <a
        href="https://wa.me/970594560056"
        target="_blank"
        rel="noopener noreferrer"
        onPointerDown={() => handlePress('whatsapp')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          width: '100%',
          maxWidth: '450px',
          margin: '0 auto 12px',
          padding: '16px',
          borderRadius: '15px',
          backgroundColor: '#22c55e',
          color: '#fff',
          fontWeight: '700',
          textDecoration: 'none',
          boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
          transform: pressed === 'whatsapp' ? 'scale(0.97)' : 'scale(1)',
          transition: '0.2s',
        }}
      >
        <MessageCircle size={22} />
        تواصل مباشرة عبر واتساب
      </a>

      {/* ===== 3. Secondary CTA: Request ===== */}
      <button
        onClick={() => {
          handlePress('request');
          onNavigate('request');
        }}
        style={{
          ...s.serviceCard,
          width: '100%',
          maxWidth: '450px',
          margin: '0 auto',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          background: 'transparent',
          border: `1px solid ${theme.border}`,
          transform: pressed === 'request' ? 'scale(0.96)' : 'scale(1)',
          transition: '0.2s',
        }}
      >
        <div style={{
          width: '45px',
          height: '45px',
          borderRadius: '12px',
          backgroundColor: isDarkMode ? '#222' : '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ClipboardEdit size={22} color={isDarkMode ? '#aaa' : '#666'} />
        </div>

        <div style={{ flex: 1, textAlign: 'right' }}>
          <span style={{ fontSize: '1rem', fontWeight: '700', display: 'block' }}>
            لم تجد طلبك؟
          </span>
          <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>
            اترك طلبك وسنبحث لك عن العقار المناسب
          </span>
        </div>
      </button>

      {/* ===== Trust Signals (Icons Version) ===== */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '15px', 
        marginTop: '30px', 
        fontSize: '0.8rem', 
        opacity: 0.7 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <CheckCircle2 size={14} color={theme.accent} /> تحديث يومي
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <CheckCircle2 size={14} color={theme.accent} /> خدمة مجانية
        </div>
      </div>

      {/* ===== Footer ===== */}
      <div style={{ marginTop: 'auto', paddingTop: '40px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', opacity: 0.4, fontWeight: '700' }}>
          نور الدين للوساطة العقارية
        </p>
        <p style={{ fontSize: '0.65rem', opacity: 0.3 }}>
          RAMALLAH • 2026
        </p>
      </div>

    </div>
  );
};

export default HomePage;
