// @ts-nocheck
import { useState } from 'react';
import { Phone, Instagram, LogOut, PlusCircle, LayoutDashboard, Building2, ClipboardEdit, Plus, Sun, Moon } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); // الثيم الأساسي هو الأسود
  
  const whatsappLink = "https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d"; 
  const logoUrl = "https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg";

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogin = (val: string) => {
    setPassword(val);
    if (val === "749329") { setIsLoggedIn(true); setShowLogin(false); }
  };

  // إعدادات الألوان المبنية على أبحاث تجربة المستخدم (UX/UI)
  const theme = {
    bg: isDarkMode ? '#000000' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827', // رمادي داكن جداً مريح للعين في الأبيض
    subText: isDarkMode ? '#9CA3AF' : '#6B7280', // رمادي متناسق للنصوص الفرعية
    border: isDarkMode ? '#262626' : '#E5E7EB', // حدود فضية ناعمة في الثيم الفاتح
    cardBg: isDarkMode ? '#0A0A0A' : '#FFFFFF', // البطاقات بيضاء في الفاتح، وأسود فاتح جدا في المظلم لتميزها
    iconBox: isDarkMode ? '#0A0A0A' : '#F9FAFB', // خلفية ثلجية للأيقونات في الفاتح لتبرز
    shadow: isDarkMode ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', // ظل احترافي ناعم
  };

  return (
    <div style={{...s.container, backgroundColor: theme.bg, color: theme.text}}>
      
      {/* زر التبديل العلوي */}
      <div style={s.themeToggleWrap}>
        <button onClick={toggleTheme} style={{...s.themeBtn, border: `1.5px solid ${theme.border}`, color: theme.text, backgroundColor: theme.iconBox}}>
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* الهوية البصرية */}
      <div style={s.identity}>
        <div onClick={() => { setShowLogin(!showLogin); setPassword(""); }} style={{...s.logoWrap, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}>
          <img src={logoUrl} alt="Logo" style={s.logoImg} />
        </div>
        <h1 style={s.title}>
          أهلاً بكم في <span style={{ color: '#f59e0b' }}>شقق رام الله</span>
        </h1>
        <p style={{...s.sub, color: theme.subText}}>تابعونا ليصلكم كل جديد</p>
      </div>

      {!isLoggedIn && (
        /* أيقونات التواصل الاجتماعي */
        <div style={s.grid}>
          <a href={whatsappLink} target="_blank" rel="noreferrer" style={{...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}>
            <svg width="22" height="22" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/></svg>
          </a>
          <a href="tel:+970594560056" style={{...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}><Phone size={22} color="#34A853" strokeWidth={1.5} /></a>
          <a href="https://facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={{...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" rel="noreferrer" style={{...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}><Instagram size={22} color="#e1306c" strokeWidth={1.5} /></a>
          <a href="https://tiktok.com/@shoqaq.ramallah" target="_blank" rel="noreferrer" style={{...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}>
            <svg width="22" height="22" fill={isDarkMode ? "white" : "#111827"} viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5
