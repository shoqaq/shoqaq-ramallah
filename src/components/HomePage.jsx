import React from 'react';
import { Phone, Instagram, Building2, ClipboardEdit } from 'lucide-react';
import { s } from '../styles';

const HomePage = ({ onNavigate, onLogoClick, theme, isDarkMode }) => (
  <div style={s.identity}>
    {/* 1. اللوجو */}
    <div 
      onClick={onLogoClick} 
      style={{ ...s.logoWrap, border: `2px solid ${theme.border}`, boxShadow: isDarkMode ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.1)' }}
    >
      <img src="https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg" alt="Logo" style={s.logoImg} />
    </div>

    {/* 2. العنوان */}
    <h1 style={{ ...s.title, fontSize: '2rem', marginBottom: '25px', color: theme.text }}>
      شقق <span style={{ color: theme.accent }}>رام الله</span>
    </h1>

    {/* 3. أيقونات التواصل */}
    <div style={s.grid}>
      {/* واتساب */}
      <a href="https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d" target="_blank" rel="noopener noreferrer" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="#25D366">
          <path d="M12.004 2C6.48 2 2.004 6.477 2.004 12C2.004 13.593 2.379 15.097 3.037 16.425L2.004 22L7.696 21.011C8.988 21.67 10.453 22 12.004 22C17.528 22 22.004 17.523 22.004 12C22.004 6.477 17.528 2 12.004 2ZM17.14 15.525C16.929 16.12 16.143 16.634 15.541 16.764C14.94 16.894 14.154 16.994 11.5 15.903C8.846 14.812 7.151 12.091 7.018 11.916C6.885 11.741 5.9 10.428 5.9 9.068C5.9 7.708 6.582 7.049 6.864 6.766C7.146 6.483 7.609 6.368 8.04 6.368C8.256 6.368 8.455 6.368 8.621 6.383C8.87 6.398 9.003 6.413 9.169 6.811C9.384 7.325 9.897 8.59 9.963 8.723C10.029 8.856 10.096 9.038 10.013 9.204C9.93 9.37 9.864 9.486 9.732 9.635C9.6 9.784 9.483 9.897 9.351 10.063C9.234 10.212 9.102 10.378 9.251 10.643C9.4 10.908 9.914 11.753 10.675 12.433C11.652 13.311 12.447 13.593 12.746 13.726C13.045 13.859 13.227 13.826 13.409 13.611C13.591 13.396 14.188 12.699 14.387 12.417C14.586 12.135 14.785 12.184 15.066 12.284C15.347 12.384 16.838 13.13 17.137 13.279C17.436 13.428 17.635 13.511 17.701 13.627C17.767 13.743 17.767 14.307 17.552 14.903C17.337 15.499 17.14 15.525 17.14 15.525Z" />
        </svg>
      </a>
      {/* اتصال */}
      <a href="tel:+970594560056" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}><Phone size={22} color="#34A853" /></a>
      {/* فيسبوك */}
      <a href="https://facebook.com/shoqaq.store/" target="_blank" rel="noopener noreferrer" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
      {/* انستجرام */}
      <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" rel="noopener noreferrer" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}><Instagram size={22} color="#e1306c" /></a>
      {/* تيك توك */}
      <a href="https://tiktok.com/@shoqaq.ramallah" target="_blank" rel="noopener noreferrer" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
        <svg width="22" height="22" fill={isDarkMode ? "white" : "black"} viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
      </a>
    </div>

    {/* 4. أزرار الخدمات */}
    <div style={s.services}>
      <button onClick={() => onNavigate('browse')} style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
        <Building2 size={28} color={theme.accent} /> 
        <span style={s.serviceText}>تصفح العقارات المتاحة</span>
      </button>
      
      <button style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text, marginTop: '10px' }}>
        <ClipboardEdit size={28} color={theme.accent} /> 
        <span style={s.serviceText}>تقديم طلب بحث</span>
      </button>
    </div>
  </div>
);

export default HomePage;
