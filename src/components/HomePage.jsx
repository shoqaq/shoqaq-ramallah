import React from 'react';
import { Phone, Instagram, Building2, ClipboardEdit } from 'lucide-react';
import { s } from '../styles';

const HomePage = ({ onNavigate, onLogoClick, theme, isDarkMode }) => (
  <>
    <div style={s.identity}>
      <div onClick={onLogoClick} style={{ ...s.logoWrap, border: `2px solid ${theme.border}` }}>
        <img src="https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg" alt="Logo" style={s.logoImg} />
      </div>
      <h1 style={s.title}>شقق <span style={{ color: theme.accent }}>رام الله</span></h1>
    </div>

    <div style={s.grid}>
      <a href="https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d" target="_blank" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
        <svg width="24" height="24" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/></svg>
      </a>
      <a href="tel:+970594560056" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}><Phone size={24} color="#34A853" /></a>
      <a href="https://facebook.com/shoqaq.store/" target="_blank" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
      <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}><Instagram size={24} color="#e1306c" /></a>
      <a href="https://tiktok.com/@shoqaq.ramallah" target="_blank" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
        <svg width="24" height="24" fill={isDarkMode ? "white" : "black"} viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
      </a>
    </div>

    <div style={s.services}>
      <button onClick={() => onNavigate('browse')} style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
        <Building2 size={32} color={theme.accent} /> <span style={s.serviceText}>تصفح العقارات المتاحة</span>
      </button>
      <button style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
        <ClipboardEdit size={32} color={theme.accent} /> <span style={s.serviceText}>تقديم طلب بحث</span>
      </button>
    </div>
  </>
);

export default HomePage;
