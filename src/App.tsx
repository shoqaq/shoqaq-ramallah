// @ts-nocheck
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  
  const whatsappNumber = "970594560056"; 
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
      
      {/* الهوية */}
      <div style={identitySection}>
        <div onClick={() => { setShowLogin(!showLogin); setPassword(""); }} style={logoWrapper}>
          <img src={logoUrl} alt="Logo" style={logoImg} />
        </div>
        <h1 style={mainTitle}>
          شقق <span style={{ color: '#f59e0b' }}>رام الله</span>
        </h1>
        <p style={subTitle}>دليلك العقاري الأول في فلسطين</p>
      </div>

      {showLogin && !isLoggedIn && (
        <div style={{ marginBottom: '30px' }}>
          <input type="password" placeholder="كود الوصول..." value={password} onChange={(e) => handleLogin(e.target.value)} style={loginInput} autoFocus />
        </div>
      )}

      {isLoggedIn ? (
        <div style={adminPanel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#f59e0b' }}>المشرف</h2>
            <button onClick={() => setIsLoggedIn(false)} style={logoutBtn}>خروج</button>
          </div>
          <button style={adminAction}>+ إضافة عقار</button>
          <button style={adminAction}>📋 إدارة العقارات</button>
        </div>
      ) : (
        /* شبكة التواصل - أيقونات أصغر وأكثر أناقة */
        <div style={socialGrid}>
          
          {/* واتساب */}
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" style={{...iconBox, background: '#25D366'}}>
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/></svg>
          </a>
          
          {/* اتصال */}
          <a href="tel:+970594560056" style={{...iconBox, background: '#34A853'}}>
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          </a>
          
          {/* فيسبوك */}
          <a href="https://facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={{...iconBox, background: '#1877F2'}}>
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>

          {/* تيك توك الجديد (تصميم بسيط وفخم) */}
          <a href="https://tiktok.com/@shoqaq.ramallah" target="_blank" rel="noreferrer" style={{...iconBox, background: '#000', border: '1px solid #333'}}>
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
            </svg>
          </a>
        </div>
      )}

      <footer style={footerText}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

// التنسيقات المعدلة
const containerStyle = {
  backgroundColor: '#000',
  color: 'white',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  direction: 'rtl',
  fontFamily: 'system-ui, sans-serif',
  padding: '20px'
};

const identitySection = { textAlign: 'center', marginBottom: '35px' };

const logoWrapper = {
  cursor: 'pointer',
  marginBottom: '12px',
  borderRadius: '28px', 
  overflow: 'hidden',
  display: 'inline-flex',
  boxShadow: '0 0 25px rgba(245, 158, 11, 0.15)',
  border: '1px solid rgba(255,255,255,0.1)'
};

const logoImg = { width: '110px', height: '110px', objectFit: 'cover' };

const mainTitle = { fontSize: '2.8rem', fontWeight: '900', margin: '10px 0 0 0' };
const subTitle = { color: '#666', marginTop: '5px', fontSize: '1rem', letterSpacing: '0.5px' };

const socialGrid = { 
  display: 'flex', 
  gap: '12px', 
  flexWrap: 'wrap', 
  justifyContent: 'center',
  marginTop: '20px'
};

const iconBox = {
  width: '60px', // تصغير الحجم من 70 لـ 60
  height: '60px', // تصغير الحجم من 70 لـ 60
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
  transition: 'all 0.3s ease'
};

const loginInput = {
  backgroundColor: '#111',
  border: '1px solid #333',
  borderRadius: '12px',
  padding: '12px',
  color: '#f59e0b',
  textAlign: 'center',
  width: '180px'
};

const adminPanel = {
  backgroundColor: '#0a0a0a',
  padding: '25px',
  borderRadius: '24px',
  width: '100%',
  maxWidth: '350px',
  border: '1px solid #222'
};

const adminAction = {
  width: '100%',
  padding: '14px',
  marginBottom: '10px',
  borderRadius: '12px',
  backgroundColor: '#111',
  border: '1px solid #222',
  color: 'white',
  textAlign: 'right',
  cursor: 'pointer'
};

const logoutBtn = { background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '0.9rem' };

const footerText = { position: 'fixed', bottom: '20px', opacity: 0.1, fontSize: '10px', color: '#888' };

export default App;
