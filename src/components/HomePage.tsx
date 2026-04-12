import React from 'react';
import { Phone, Instagram, Building2, ClipboardEdit } from 'lucide-react';
import { s } from '../styles';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onLogoClick: () => void;
  theme: any;
  isDarkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onLogoClick, theme, isDarkMode }) => (
  <div style={s.identity}>

    {/* ===== Logo ===== */}
    <div
      onClick={onLogoClick}
      style={{
        ...s.logoWrap,
        border: `2px solid ${theme.border}`,
        boxShadow: isDarkMode
          ? '0 12px 35px rgba(0,0,0,0.6)'
          : '0 12px 35px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s ease'
      }}
      onPointerDown={(e)=> e.currentTarget.style.transform='scale(0.96)'}
      onPointerUp={(e)=> e.currentTarget.style.transform='scale(1)'}
    >
      <img
        src="https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg"
        alt="Logo"
        style={s.logoImg}
      />
    </div>

    {/* ===== Title ===== */}
    <h1
      style={{
        ...s.title,
        color: theme.text
      }}
    >
      شقق <span style={{ color: theme.accent }}>رام الله</span>
    </h1>

    {/* ===== Social Icons ===== */}
    <div style={s.grid}>
     <a 
  href="https://wa.me/970594560056" 
  target="_blank" 
  rel="noopener noreferrer" 
  style={{ ...s.box, backgroundColor: theme.cardBg }}
>
<a 
  href="https://wa.me/970594560056" 
  target="_blank" 
  rel="noopener noreferrer" 
  style={{ ...s.box, backgroundColor: theme.cardBg }}
>
  <svg 
    viewBox="0 0 24 24" 
    width="28" 
    height="28" 
    stroke="#25D366" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M17.49 15.3c-.3.89-1.28 1.45-2.26 1.45-1.93 0-4.06-1.1-5.74-2.78-1.67-1.68-2.77-3.81-2.77-5.74 0-.98.56-1.96 1.45-2.26.89-.3 1.86.03 2.23.83l.73 1.58c.31.67.14 1.46-.43 1.94l-.62.53c.63 1.25 1.66 2.28 2.91 2.91l.53-.62c.48-.57 1.27-.74 1.94-.43l1.58.73c.8.37 1.13 1.34.83 2.23z" />
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L22 4l-2 5.5Z" />
  </svg>
</a>

      <a
        href="tel:+970594560056"
        style={{ ...s.box, backgroundColor: theme.cardBg }}
      >
        <Phone size={22} color="#34A853" />
      </a>

      <a
        href="https://facebook.com/shoqaq.store/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...s.box, backgroundColor: theme.cardBg }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </a>

      <a
        href="https://instagram.com/shoqaq.ramallah/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...s.box, backgroundColor: theme.cardBg }}
      >
        <Instagram size={22} color="#e1306c" />
      </a>

      <a
        href="https://tiktok.com/@shoqaq.ramallah"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...s.box, backgroundColor: theme.cardBg }}
      >
        <svg width="22" height="22" fill={isDarkMode ? '#fff' : '#000'} viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.89-2.9c.3 0 .6.05.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 1 0 15.86 16V9.01a8.16 8.16 0 0 0 4.77 1.52V7.13c-.35-.01-.7-.06-1.04-.14z" />
        </svg>
      </a>
    </div>

    {/* ===== Services ===== */}
    <div style={s.services}>
      <button
        onClick={() => onNavigate('browse')}
        style={{
          ...s.serviceCard,
          backgroundColor: theme.cardBg,
          color: theme.text
        }}
        onPointerDown={(e)=> e.currentTarget.style.transform='scale(0.97)'}
        onPointerUp={(e)=> e.currentTarget.style.transform='scale(1)'}
      >
        <Building2 size={28} color={theme.accent} />
        <span style={s.serviceText}>تصفح العقارات المتاحة</span>
      </button>

      <button
        style={{
          ...s.serviceCard,
          backgroundColor: theme.cardBg,
          color: theme.text
        }}
        onPointerDown={(e)=> e.currentTarget.style.transform='scale(0.97)'}
        onPointerUp={(e)=> e.currentTarget.style.transform='scale(1)'}
      >
        <ClipboardEdit size={28} color={theme.accent} />
        <span style={s.serviceText}>تقديم طلب بحث</span>
      </button>
    </div>
  </div>
);

export default HomePage;
