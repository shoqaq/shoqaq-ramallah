// @ts-nocheck
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  
  const whatsappNumber = "970594560056"; 
  // استخدام ملف logo.jpg الخاص بك
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
      
      {/* منطقة الهوية - اللوجو بشكل مربع بحواف منحنية احترافية */}
      <div style={identitySection}>
        <div onClick={() => { setShowLogin(!showLogin); setPassword(""); }} style={logoWrapper}>
          <img src={logoUrl} alt="Logo" style={logoImg} />
        </div>
        
        <h1 style={mainTitle}>
          شقق <span style={{ color: '#f59e0b', textShadow: '0 0 10px rgba(245, 158, 11, 0.3)' }}>رام الله</span>
        </h1>
        <p style={subTitle}>دليلك العقاري الأول في فلسطين</p>
      </div>

      {/* حقل الكود السري (للمشرف) */}
      {showLogin && !isLoggedIn && (
        <div style={{ marginBottom: '30px' }}>
          <input
            type="password"
            placeholder="كود الوصول..."
            value={password}
            onChange={(e) => handleLogin(e.target.value)}
            style={loginInput}
            autoFocus
          />
        </div>
      )}

      {isLoggedIn ? (
        /* لوحة التحكم */
        <div style={adminPanel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#f59e0b' }}>إعدادات المشرف</h2>
            <button onClick={() => setIsLoggedIn(false)} style={logoutBtn}>خروج</button>
          </div>
          <button style={adminAction}>+ إضافة عقار جديد</button>
          <button style={adminAction}>📋 إدارة العقارات</button>
        </div>
      ) : (
        /* أزرار التواصل - دائرية وملونة */
        <div style={socialGrid}>
          
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" style={{...iconBox, background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'}}>
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/></svg>
          </a>
          
          <a href="tel:+970594560056" style={{...iconBox, background: 'linear-gradient(135deg, #34A853 0%, #1F7236 100%)'}}>
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          </a>
          
          <a href="https://facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={{...iconBox, background: 'linear-gradient(135deg, #1877F2 0%, #0E5ACF 100%)'}}>
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>

          <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" rel="noreferrer" style={{...iconBox, background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'}}>
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014 3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>

          <a href="https://tiktok.com/@shoqaq.ramallah" target="_blank" rel="noreferrer" style={{...iconBox, background: 'linear-gradient(135deg, #222 0%, #000 100%)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.74.47-1.13 1.34-1.14 2.22 0 .52.12 1.07.49 1.45.39.42.98.6 1.52.54.49-.03.96-.28 1.25-.67.31-.41.44-.93.44-1.44.02-4.43-.01-8.86.01-13.29z"/></svg>
          </a>
        </div>
      )}

      <footer style={footerText}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

// التنسيقات
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

const identitySection = { textAlign: 'center', marginBottom: '40px' };

const logoWrapper = {
  cursor: 'pointer',
  marginBottom: '10px',
  // حواف منحنية للمربع
  borderRadius: '32px', 
  overflow: 'hidden',
  display: 'inline-flex',
  boxShadow: '0 0 30px rgba(245, 158, 11, 0.2)',
  border: '2px solid rgba(255,255,255,0.05)'
};

const logoImg = { 
  width: '120px', 
  height: '120px', 
  objectFit: 'cover' 
};

const mainTitle = { 
  fontSize: '3.2rem', 
  fontWeight: '900', 
  margin: '15px 0 0 0' 
};

const subTitle = { 
  color: '#888', 
  marginTop: '8px', 
  fontSize: '1.1rem' 
};

const loginInput = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid #f59e0b',
  borderRadius: '15px',
  padding: '15px',
  color: '#f59e0b',
  textAlign: 'center',
  width: '200px'
};

const adminPanel = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  padding: '30px',
  borderRadius: '30px',
  width: '100%',
  maxWidth: '380px',
  border: '1px solid rgba(255,255,255,0.1)'
};

const adminAction = {
  width: '100%',
  padding: '16px',
  marginBottom: '12px',
  borderRadius: '16px',
  backgroundColor: 'rgba(255,255,255,0.1)',
  border: 'none',
  color: 'white',
  textAlign: 'right',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const logoutBtn = { background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontWeight: 'bold' };

const socialGrid = { 
  display: 'flex', 
  gap: '15px', 
  flexWrap: 'wrap', 
  justifyContent: 'center' 
};

const iconBox = {
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  boxShadow: '0 5px 20px rgba(0,0,0,0.5)',
  transition: 'transform 0.2s ease'
};

const footerText = { 
  position: 'fixed', 
  bottom: '20px', 
  opacity: 0.1, 
  fontSize: '11px', 
  color: '#888' 
};

export default App;
