import React from 'react';
import { Phone, Instagram, Building2, ClipboardEdit, MessageCircle, ChevronLeft } from 'lucide-react';
import { s } from '../styles';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onLogoClick: () => void;
  theme: any;
  isDarkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onLogoClick, theme, isDarkMode }) => {
  
  const socialLinks = [
    { id: 'whatsapp', href: "https://wa.me/970594560056", icon: <MessageCircle size={22} color="#22c55e" /> },
    { id: 'phone', href: "tel:+970594560056", icon: <Phone size={20} color="#34A853" /> },
    { id: 'facebook', href: "https://facebook.com/shoqaq.store/", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
    { id: 'instagram', href: "https://instagram.com/shoqaq.ramallah/", icon: <Instagram size={20} color="#e1306c" /> },
    { id: 'tiktok', href: "https://tiktok.com/@shoqaq.ramallah", icon: <svg width="20" height="20" fill={isDarkMode ? '#fff' : '#000'} viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.89-2.9c.3 0 .6.05.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 1 0 15.86 16V9.01a8.16 8.16 0 0 0 4.77 1.52V7.13c-.35-.01-.7-.06-1.04-.14z" /></svg> },
  ];

  return (
    <div style={{ ...s.identity, userSelect: 'none', padding: '20px 10px' }}>

      {/* ===== Logo & Branding ===== */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <div
          onClick={onLogoClick}
          style={{
            ...s.logoWrap,
            margin: '0 auto 15px',
            border: `3px solid ${isDarkMode ? theme.accent : theme.border}`,
            boxShadow: isDarkMode ? `0 0 30px ${theme.accent}22` : '0 15px 45px rgba(0,0,0,0.1)',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
          onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
          onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img
            src="https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg"
            alt="Logo"
            style={{ ...s.logoImg, filter: isDarkMode ? 'brightness(0.9)' : 'none' }}
          />
        </div>
        <h1 style={{ ...s.title, color: theme.text, fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
          شقق <span style={{ color: theme.accent, fontWeight: '900' }}>رام الله</span>
        </h1>
        <p style={{ color: theme.text, opacity: 0.5, fontSize: '0.9rem', marginTop: '-15px' }}>
          خيارك الأول للعقارات في محافظة رام الله والبيرة
        </p>
      </div>

      {/* ===== Quick Social Actions ===== */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '12px', 
        marginBottom: '35px',
        width: '100%',
        maxWidth: '400px'
      }}>
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '45px',
              height: '45px',
              borderRadius: '14px',
              backgroundColor: isDarkMode ? '#1a1a1a' : '#fff', 
              border: `1px solid ${theme.border}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease'
            }}
            onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.85)'}
            onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {link.icon}
          </a>
        ))}
      </div>

      {/* ===== Main Services ===== */}
      <div style={{ ...s.services, width: '100%', maxWidth: '450px', gap: '15px' }}>
        
        {/* زر التصفح الرئيسي - التصميم العريض والبارز */}
        <button
          onClick={() => onNavigate('browse')}
          style={{
            ...s.serviceCard,
            padding: '20px',
            background: isDarkMode 
              ? `linear-gradient(135deg, ${theme.cardBg} 0%, #1a1a1a 100%)` 
              : '#fff',
            color: theme.text,
            border: `1px solid ${isDarkMode ? theme.accent + '44' : '#eee'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            boxShadow: isDarkMode ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 25px rgba(0,0,0,0.05)',
          }}
          onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
          onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            width: '55px',
            height: '55px',
            borderRadius: '16px',
            backgroundColor: `${theme.accent}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Building2 size={30} color={theme.accent} />
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', display: 'block' }}>تصفح العقارات</span>
            <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>اكتشف الشقق، الأراضي والمكاتب</span>
          </div>
          <ChevronLeft size={20} opacity={0.3} />
        </button>

        {/* زر تقديم الطلب - تصميم أنيق وبسيط */}
        <button
          style={{
            ...s.serviceCard,
            padding: '18px',
            background: 'transparent',
            color: theme.text,
            border: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
          }}
          onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
          onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            backgroundColor: isDarkMode ? '#222' : '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ClipboardEdit size={24} color={isDarkMode ? '#aaa' : '#666'} />
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: '700', display: 'block' }}>اطلب عقارك</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>اترك لنا تفاصيل ما تبحث عنه</span>
          </div>
        </button>

      </div>
      
      {/* ===== Footer ===== */}
      <div style={{ marginTop: 'auto', paddingTop: '40px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', opacity: 0.4, fontWeight: '700', letterSpacing: '1px' }}>
          نور الدين للوساطة العقارية
        </p>
        <div style={{ width: '30px', height: '2px', background: theme.accent, margin: '8px auto', opacity: 0.3 }} />
        <p style={{ fontSize: '0.65rem', opacity: 0.3 }}>RAMALLAH • 2026</p>
      </div>

    </div>
  );
};

export default HomePage;
