import React from 'react';
import { Phone, Instagram, Building2, ClipboardEdit, MessageCircle } from 'lucide-react';
import { s } from '../styles';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onLogoClick: () => void;
  theme: any;
  isDarkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onLogoClick, theme, isDarkMode }) => {
  
  // مصفوفة التواصل لتسهيل الإدارة وتجنب تكرار الكود
  const socialLinks = [
    { 
      id: 'whatsapp', 
      href: "https://wa.me/970594560056", 
      icon: <MessageCircle size={24} color="#22c55e" />,
      label: 'واتساب' 
    },
    { 
      id: 'phone', 
      href: "tel:+970594560056", 
      icon: <Phone size={22} color="#34A853" />,
      label: 'اتصال' 
    },
    { 
      id: 'facebook', 
      href: "https://facebook.com/shoqaq.store/", 
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
      label: 'فيسبوك' 
    },
    { 
      id: 'instagram', 
      href: "https://instagram.com/shoqaq.ramallah/", 
      icon: <Instagram size={22} color="#e1306c" />,
      label: 'إنستغرام' 
    },
    { 
      id: 'tiktok', 
      href: "https://tiktok.com/@shoqaq.ramallah", 
      icon: <svg width="22" height="22" fill={isDarkMode ? '#fff' : '#000'} viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.89-2.9c.3 0 .6.05.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 1 0 15.86 16V9.01a8.16 8.16 0 0 0 4.77 1.52V7.13c-.35-.01-.7-.06-1.04-.14z" /></svg>,
      label: 'تيك توك' 
    },
  ];

  return (
    <div style={{ ...s.identity, userSelect: 'none' }}>

      {/* ===== Logo Section ===== */}
      <div
        onClick={onLogoClick}
        style={{
          ...s.logoWrap,
          border: `2px solid ${isDarkMode ? theme.accent : theme.border}`,
          boxShadow: isDarkMode
            ? `0 0 20px ${theme.accent}33` // توهج خفيف بلون الـ accent في الوضع المظلم
            : '0 12px 35px rgba(0,0,0,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer'
        }}
        onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
        onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img
          src="https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg"
          alt="Logo"
          style={{ ...s.logoImg, filter: isDarkMode ? 'brightness(0.9)' : 'none' }}
        />
      </div>

      {/* ===== App Title ===== */}
      <h1 style={{ ...s.title, color: theme.text, marginBottom: '25px' }}>
        شقق <span style={{ color: theme.accent }}>رام الله</span>
      </h1>

      {/* ===== Social Grid (Optimized) ===== */}
      <div style={{ ...s.grid, gap: '10px' }}>
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              ...s.box, 
              backgroundColor: theme.cardBg, 
              border: `1px solid ${theme.border}`,
              transition: 'transform 0.1s ease'
            }}
            onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
            onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {link.icon}
          </a>
        ))}
      </div>

      {/* ===== Main Action Services ===== */}
      <div style={{ ...s.services, width: '100%' }}>
        
        {/* زر التصفح - جعلناه يبرز أكثر */}
        <button
          onClick={() => onNavigate('browse')}
          style={{
            ...s.serviceCard,
            backgroundColor: isDarkMode ? theme.cardBg : '#fff',
            color: theme.text,
            border: `1px solid ${isDarkMode ? theme.border : '#eee'}`,
            position: 'relative',
            overflow: 'hidden'
          }}
          onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
          onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: `${theme.accent}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Building2 size={26} color={theme.accent} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ ...s.serviceText, fontSize: '1.1rem', fontWeight: '800' }}>تصفح العقارات المتاحة</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 'normal' }}>شقق، أراضي، ومكاتب في رام الله</span>
          </div>
        </button>

        {/* زر تقديم الطلب */}
        <button
          style={{
            ...s.serviceCard,
            backgroundColor: isDarkMode ? 'transparent' : '#fff',
            color: theme.text,
            border: `1px solid ${theme.border}`,
          }}
          onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
          onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: isDarkMode ? '#222' : '#f9f9f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ClipboardEdit size={26} color={isDarkMode ? '#aaa' : '#666'} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ ...s.serviceText, fontSize: '1.1rem' }}>تقديم طلب بحث</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 'normal' }}>لم نجد طلبك؟ دعنا نبحث عنك</span>
          </div>
        </button>

      </div>
      
      {/* ===== Footer Info (Optional) ===== */}
      <p style={{ marginTop: '40px', fontSize: '0.75rem', opacity: 0.4, fontWeight: 'bold' }}>
        Nour El-Deen For Real Estate © 2026
      </p>

    </div>
  );
};

export default HomePage;
