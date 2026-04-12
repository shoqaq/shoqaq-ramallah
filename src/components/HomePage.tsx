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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 24 24"
  >
    {/* الفقاعة الخارجية: إطار نحيف مفرغ */}
    <path
      d="M20.5 11.5a8.5 8.5 0 0 1-12.9 7.3L3 21l1.9-4.7A8.5 8.5 0 1 1 20.5 11.5z"
      fill="none"
      stroke="#22c55e"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* السماعة: ممتلئة (Solid) وبحجم مثالي في المنتصف */}
    <path
      fill="#22c55e"
      d="M16.4 14.3c-.2.5-.7.8-1.2.9-.3.1-.7.1-1 0-.6-.2-1-.4-1.5-.7-.8-.6-1.5-1.2-2.1-2-.6-.7-1.1-1.5-1.4-2.4-.2-.4-.3-.8-.3-1.3 0-.4.1-.7.2-1.1.3-.6.8-1 1.4-1.2.3-.1.6-.1.9 0 .3.1.5.3.6.5l.7 1.4c.2.4.2.7 0 1.1l-.4.5c-.1.1-.1.2-.1.3 0 .1.1.2.1.3.4.6.8 1.1 1.3 1.6.5.5 1 .8 1.6 1.1.1 0 .2.1.3.1.1 0 .2 0 .3-.1l.5-.4c.4-.3.8-.3 1.1 0l1.4.7c.3.2.4.4.5.6.1.2.1.5 0 .8z"
    />
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
