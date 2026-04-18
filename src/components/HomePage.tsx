import React, { useState } from 'react';
import { Phone, Building2, ClipboardEdit, MessageCircle, ChevronLeft, ShieldCheck } from 'lucide-react';
import { s } from '../styles';

const HomePage = ({ onNavigate, onLogoClick, theme, isDarkMode }) => {
  const [pressed, setPressed] = useState(null);

  const handlePress = (id) => {
    setPressed(id);
    setTimeout(() => setPressed(null), 150);
  };

  return (
    <div style={{ 
      ...s.identity, 
      backgroundColor: theme.bg, 
      color: theme.text,
      padding: '30px 20px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>

      {/* ===== Logo Section ===== */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div
          onClick={onLogoClick}
          style={{
            width: '100px',
            height: '100px',
            margin: '0 auto 20px',
            borderRadius: '24px',
            border: `2px solid ${theme.accent}`,
            padding: '5px',
            backgroundColor: theme.cardBg,
            boxShadow: isDarkMode ? `0 10px 30px rgba(0,0,0,0.5)` : `0 10px 30px rgba(0,0,0,0.05)`,
            cursor: 'pointer'
          }}
        >
          <img
            src="https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg"
            alt="Logo"
            style={{ width: '100%', height: '100%', borderRadius: '18px', objectFit: 'cover' }}
          />
        </div>
        
        <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 8px 0' }}>
          شقق <span style={{ color: theme.accent }}>رام الله</span>
        </h1>
        <div style={{ width: '40px', height: '3px', backgroundColor: theme.accent, margin: '0 auto 15px' }} />
        <p style={{ opacity: 0.7, fontSize: '0.95rem', fontWeight: '500' }}>
          دليلك العقاري الأول في فلسطين
        </p>
      </div>

      {/* ===== Action Buttons ===== */}
      <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* زر التصفح - الأهم والأوضح */}
        <button
          onClick={() => onNavigate('browse')}
          onPointerDown={() => handlePress('browse')}
          style={{
            ...s.serviceCard,
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: theme.accent,
            color: '#000', // نص أسود على ذهبي ليكون واضحاً جداً
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            transform: pressed === 'browse' ? 'scale(0.96)' : 'scale(1)',
            transition: '0.2s',
            fontWeight: '800',
            boxShadow: `0 10px 20px ${theme.accent}33`
          }}
        >
          <Building2 size={28} />
          <div style={{ flex: 1, textAlign: 'right' }}>
            <span style={{ fontSize: '1.2rem', display: 'block' }}>تصفح العقارات</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 'normal' }}>عرض كافة الشقق والأراضي المتاحة</span>
          </div>
          <ChevronLeft size={20} />
        </button>

        {/* زر الواتساب - واضح ومعروف */}
        <a
          href="https://wa.me/970594560056"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '18px',
            borderRadius: '20px',
            backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
            color: theme.text,
            border: `2px solid ${theme.border}`,
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.05rem',
            transition: '0.2s',
          }}
        >
          <MessageCircle size={22} color="#25D366" />
          تواصل معنا عبر واتساب
        </a>

        {/* زر طلب البحث - هادئ */}
        <button
          onClick={() => onNavigate('request')}
          style={{
            background: 'none',
            border: 'none',
            color: theme.text,
            opacity: 0.6,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '10px',
            cursor: 'pointer'
          }}
        >
          <ClipboardEdit size={18} />
          لم تجد طلبك؟ اترك مواصفاتك هنا
        </button>
      </div>

      {/* ===== Trust Signal ===== */}
      <div style={{ marginTop: 'auto', textAlign: 'center', paddingBottom: '20px' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 16px', 
          borderRadius: '100px', 
          backgroundColor: isDarkMode ? '#161b22' : '#f0f2f5',
          fontSize: '0.8rem',
          fontWeight: '600'
        }}>
          <ShieldCheck size={16} color={theme.accent} />
          عقارات موثقة ومحدثة يومياً
        </div>
        
        <p style={{ fontSize: '0.7rem', opacity: 0.3, marginTop: '20px', letterSpacing: '1px' }}>
          NOUR EL-DEEN REAL ESTATE • 2026
        </p>
      </div>

    </div>
  );
};

export default HomePage;
