// @ts-nocheck
import { useState } from 'react';
import { Phone, Instagram, LogOut, PlusCircle, LayoutDashboard, Building2, ClipboardEdit, Plus } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  
  const whatsappChannelLink = "https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d"; 
  const logoUrl = "https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg";

  const handleLogin = (val: string) => {
    setPassword(val);
    if (val === "749329") {
      setIsLoggedIn(true);
      setShowLogin(false);
    }
  };

  return (
    <div style={containerStyle}>
      {/* القسم العلوي: الهوية البصرية */}
      <div style={identitySection}>
        <div onClick={() => { setShowLogin(!showLogin); setPassword(""); }} style={logoWrapper}>
          <img src={logoUrl} alt="Logo" style={logoImg} />
        </div>
        <h1 style={mainTitle}>
          أهلاً بكم في <span style={{ color: '#f59e0b' }}>شقق رام الله</span>
        </h1>
        <p style={subTitle}>تابعونا ليصلكم كل جديد</p>
      </div>

      {!isLoggedIn && (
        /* قسم مواقع التواصل: أيقونات سادة ومفرغة على خلفية سوداء بحدود سميكة */
        <div style={socialGrid}>
          
          {/* واتساب - شعار رسمي سادة ومفرغ */}
          <a href={whatsappChannelLink} target="_blank" rel="noreferrer" style={iconBoxStyle}>
            <svg width="22" height="22" fill="#25D366" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/>
            </svg>
          </a>
          
          {/* اتصال - أيقونة مفرغة */}
          <a href="tel:+970594560056" style={iconBoxStyle}>
            <Phone size={22} color="#34A853" strokeWidth={1.5} />
          </a>
          
          {/* فيسبوك - شعار رسمي سادة ومفرغ (تم التحديث ليتطابق مع باقي الأيقونات) */}
          <a href="https://facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={iconBoxStyle}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>

          {/* انستغرام - أيقونة مفرغة */}
          <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" rel="noreferrer" style={iconBoxStyle}>
            <Instagram size={22} color="#e1306c" strokeWidth={1.5} />
          </a>

          {/* تيك توك - أيقونة سادة ومفرغة */}
          <a href="https://tiktok.com/@shoqaq.ramallah" target="_blank" rel="noreferrer" style={iconBoxStyle}>
            <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
            </svg>
          </a>
        </div>
      )}

      {showLogin && !isLoggedIn && (
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="password" 
            placeholder="..." 
            value={password} 
            onChange={(e) => handleLogin(e.target.value)} 
            style={loginInputStyle} 
            autoFocus 
          />
        </div>
      )}

      {/* قسم الخدمات: بطاقات كبيرة سوداء بحدود سميكة */}
      {isLoggedIn ? (
        <div style={adminPanelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '1rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px' }}>
               لوحة التحكم
            </h2>
            <button onClick={() => setIsLoggedIn(false)} style={logoutBtnStyle}>
              <LogOut size={18} />
            </button>
          </div>
          <button style={adminActionBtnStyle}><PlusCircle size={16} /> إضافة عقار جديد</button>
          <button style={adminActionBtnStyle}><LayoutDashboard size={16} /> إدارة القائمة</button>
        </div>
      ) : (
        <div style={servicesSectionStyle}>
          
          <button style={serviceCardStyle}>
            <Building2 size={32} color="#f59e0b" strokeWidth={1.5} />
            <span style={serviceTextStyle}>عرض الشقق المتوفرة</span>
          </button>
          
          <button style={serviceCardStyle}>
            <ClipboardEdit size={32} color="#f59e0b" strokeWidth={1.5} />
            <span style={serviceTextStyle}>تقديم طلب</span>
          </button>

          <button style={serviceCardStyle}>
            <Plus size={32} color="#f59e0b" strokeWidth={1.5} />
            <span style={serviceTextStyle}>عرض عقار على الصفحة</span>
          </button>
        </div>
      )}

      <footer style={footerTextStyle}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

// التنسيقات (Styles) - تصميم الثيم الأسود الفخم (كما في الصورة)
const containerStyle = {
  backgroundColor: '#000', // أسود عميق
  color: 'white',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  direction: 'rtl',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  padding: '20px',
  margin: '0',
  boxSizing: 'border-box'
};

const identitySection = {
  textAlign: 'center',
  marginBottom: '20px', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const logoWrapper = {
  cursor: 'pointer',
  marginBottom: '15px',
  borderRadius: '18px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid #222', 
  width: '90px',
  height: '90px'
};

const logoImg = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block'
};

const mainTitle = {
  fontSize: '1.7rem',
  fontWeight: '900',
  margin: '5px 0 0 0',
  letterSpacing: '-1px'
};

const subTitle = {
  color: '#888', 
  marginTop: '8px',
  fontSize: '1.2rem',
  fontWeight: '500'
};

const socialGrid = { 
  display: 'flex', 
  gap: '10px', 
  justifyContent: 'center',
  marginBottom: '35px'
};

const iconBoxStyle = {
  width: '42px',
  height: '42px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  backgroundColor: '#000', 
  border: '2px solid #222' 
};

const servicesSectionStyle = { 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '15px', 
  width: '100%', 
  maxWidth: '360px'
};

const serviceCardStyle = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '20px', 
  padding: '22px 25px', 
  backgroundColor: '#000', 
  border: '2.5px solid #222', 
  borderRadius: '18px',
  cursor: 'pointer', 
  textAlign: 'right', 
  width: '100%', 
  outline: 'none'
};

const serviceTextStyle = { 
  color: '#fff', 
  fontSize: '1.15rem', 
  fontWeight: '600' 
};

const loginInputStyle = {
  backgroundColor: '#050505',
  border: '1.5px solid #111',
  borderRadius: '8px',
  padding: '8px',
  color: '#f59e0b',
  textAlign: 'center',
  width: '140px'
};

const adminPanelStyle = {
  backgroundColor: '#000',
  padding: '20px',
  borderRadius: '20px',
  width: '280px',
  border: '2px solid #222',
  marginTop: '20px'
};

const adminActionBtnStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '8px',
  borderRadius: '10px',
  backgroundColor: '#0a0a0a',
  border: '1.5px solid #111',
  color: 'white',
  textAlign: 'right',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '0.9rem'
};

const logoutBtnStyle = { background: 'none', border: 'none', color: '#333', cursor: 'pointer' };

const footerTextStyle = { position: 'fixed', bottom: '15px', opacity: 0.05, fontSize: '8px', color: '#888' };
