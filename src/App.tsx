// @ts-nocheck
import { useState } from 'react';
import { Phone, Instagram, LogOut, PlusCircle, LayoutDashboard, Building2, ClipboardEdit, Plus, Sun, Moon } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true); 
  
  const whatsappLink = "https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d"; 
  const logoUrl = "https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg";

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogin = (val: string) => {
    setPassword(val);
    if (val === "749329") { setIsLoggedIn(true); setShowLogin(false); }
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827', 
    subText: isDarkMode ? '#9CA3AF' : '#6B7280', 
    border: isDarkMode ? '#262626' : '#E5E7EB', 
    cardBg: isDarkMode ? '#0A0A0A' : '#FFFFFF', 
    iconBox: isDarkMode ? '#0A0A0A' : '#F9FAFB', 
    shadow: isDarkMode ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', 
  };

  return (
    <div style={{...s.container, backgroundColor: theme.bg, color: theme.text}}>
      
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
        /* أيقونات التواصل - أصبحت أقرب للهوية البصرية */
        <div style={s.grid}>
          <a href={whatsappLink} target="_blank" rel="noreferrer" style={{...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}>
            <svg width="20" height="20" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/></svg>
          </a>
          <a href="tel:+970594560056" style={{...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}><Phone size={20} color="#34A853" strokeWidth={1.5} /></a>
          <a href="https://facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={{...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" rel="noreferrer" style={{...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}><Instagram size={20} color="#e1306c" strokeWidth={1.5} /></a>
          <a href="https://tiktok.com/@shoqaq.ramallah" target="_blank" rel="noreferrer" style={{...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}>
            <svg width="20" height="20" fill={isDarkMode ? "white" : "#111827"} viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
          </a>
        </div>
      )}

      {showLogin && !isLoggedIn && (
        <div style={{ marginBottom: '25px' }}>
          <input type="password" placeholder="..." value={password} onChange={(e) => handleLogin(e.target.value)} style={s.input} autoFocus />
        </div>
      )}

      {isLoggedIn ? (
        <div style={{...s.admin, border: `1.5px solid ${theme.border}`, backgroundColor: theme.cardBg}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '1rem', color: '#f59e0b' }}>لوحة التحكم</h2>
            <button onClick={() => setIsLoggedIn(false)} style={s.logoutBtn}><LogOut size={18} /></button>
          </div>
          <button style={{...s.adminAction, color: theme.text, borderColor: theme.border}}><PlusCircle size={16} /> إضافة عقار جديد</button>
          <button style={{...s.adminAction, color: theme.text, borderColor: theme.border}}><LayoutDashboard size={16} /> إدارة القائمة</button>
        </div>
      ) : (
        <div style={s.services}>
          <button style={{...s.serviceCard, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}>
            <Building2 size={26} color="#f59e0b" strokeWidth={1.7} />
            <span style={{...s.serviceText, color: theme.text}}>عرض الشقق المتوفرة</span>
          </button>
          <button style={{...s.serviceCard, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}>
            <ClipboardEdit size={26} color="#f59e0b" strokeWidth={1.7} />
            <span style={{...s.serviceText, color: theme.text}}>تقديم طلب</span>
          </button>
          <button style={{...s.serviceCard, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow}}>
            <Plus size={26} color="#f59e0b" strokeWidth={1.7} />
            <span style={{...s.serviceText, color: theme.text}}>عرض عقار على الصفحة</span>
          </button>
        </div>
      )}

      <footer style={{...s.footer, color: theme.subText}}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

const s = {
  container: { 
    minHeight: '100vh', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', // توسيط عمودي
    direction: 'rtl', 
    fontFamily: 'system-ui, -apple-system, sans-serif', 
    padding: '20px', 
    transition: 'background-color 0.3s ease, color 0.3s ease',
    boxSizing: 'border-box'
  },
  themeToggleWrap: { position: 'absolute', top: '20px', left: '20px' }, 
  themeBtn: { border: 'none', cursor: 'pointer', borderRadius: '12px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' },
  identity: { textAlign: 'center', marginBottom: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }, // تقليل الهامش السفلي
  logoWrap: { cursor: 'pointer', marginBottom: '12px', borderRadius: '20px', overflow: 'hidden', width: '80px', height: '80px', transition: '0.2s' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '1.5rem', fontWeight: '800', margin: '0', letterSpacing: '-0.5px' },
  sub: { marginTop: '4px', fontSize: '1rem', fontWeight: '500' },
  grid: { display: 'flex', gap: '10px', marginBottom: '35px' }, // الأيقونات أصبحت أقرب بسبب الهوامش السابقة
  box: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' },
  services: { display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '340px' },
  serviceCard: { display: 'flex', alignItems: 'center', gap: '15px', padding: '18px 20px', borderRadius: '14px', cursor: 'pointer', textAlign: 'right', outline: 'none', transition: '0.2s' },
  serviceText: { fontSize: '1rem', fontWeight: '600' },
  input: { backgroundColor: 'transparent', border: '1px solid #ccc', borderRadius: '8px', padding: '8px', textAlign: 'center', width: '140px', outline: 'none' },
  admin: { padding: '20px', borderRadius: '20px', width: '280px', transition: '0.3s' },
  adminAction: { width: '100%', padding: '10px', marginBottom: '8px', borderRadius: '10px', backgroundColor: 'transparent', border: '1px solid', textAlign: 'right', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  logoutBtn: { background: 'none', border: 'none', color: '#999', cursor: 'pointer' },
  footer: { position: 'fixed', bottom: '15px', opacity: 0.6, fontSize: '9px', fontWeight: '600', letterSpacing: '1px' }
};
