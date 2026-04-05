// @ts-nocheck
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const whatsappNumber = "970594560056"; 

  const handleLogin = (val: string) => {
    setPassword(val);
    if (val === "749329") {
      setIsLoggedIn(true);
      setShowLogin(false);
    }
  };

  return (
    <div style={containerStyle}>
      
      {/* منطقة الهوية - الثيم الأبيض */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div 
          onClick={() => { setShowLogin(!showLogin); setPassword(""); }}
          style={logoContainerStyle}
        >
          <svg width="50" height="50" viewBox="0 0 24 24" fill="white">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </div>
        
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0', color: '#1a1a1a' }}>
          شقق <span style={{ color: '#f59e0b' }}>رام الله</span>
        </h1>
        <p style={{ color: '#666', marginTop: '10px', fontSize: '1.1rem' }}>دليلك العقاري الأول في فلسطين</p>
      </div>

      {/* حقل إدخال الكود */}
      {showLogin && !isLoggedIn && (
        <div style={{ marginBottom: '30px' }}>
          <input
            type="password"
            placeholder="كود الوصول..."
            value={password}
            onChange={(e) => handleLogin(e.target.value)}
            style={loginInputStyle}
            autoFocus
          />
        </div>
      )}

      {isLoggedIn ? (
        <div style={adminPanelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#f59e0b' }}>لوحة التحكم</h2>
            <button onClick={() => setIsLoggedIn(false)} style={logoutButtonStyle}>خروج</button>
          </div>
          <button style={adminActionButtonStyle}>+ إضافة عقار جديد</button>
          <button style={adminActionButtonStyle}>📋 إدارة العقارات</button>
          <button style={adminActionButtonStyle}>⚙️ إعدادات الموقع</button>
        </div>
      ) : (
        <div style={socialButtonGroupStyle}>
          
          {/* زر الواتساب الرسمي */}
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" style={socialButtonStyle} title="واتساب">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/>
            </svg>
          </a>
          
          <a href="tel:+970594560056" style={socialButtonStyle} title="اتصال">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
          
          <a href="https://www.facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={socialButtonStyle}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>

          <a href="https://www.instagram.com/shoqaq.ramallah/" target="_blank" rel="noreferrer" style={socialButtonStyle}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>

          <a href="https://www.tiktok.com/@shoqaq.ramallah" target="_blank" rel="noreferrer" style={socialButtonStyle}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
          </a>
        </div>
      )}

      <footer style={footerStyle}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

// --- التنسيقات المعدلة للثيم الأبيض ---

const containerStyle = {
  backgroundColor: '#ffffff', // خلفية بيضاء صافية
  color: '#333',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  direction: 'rtl',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  padding: '20px'
};

const logoContainerStyle = {
  backgroundColor: '#1a1a1a', // لوغو غامق ليعطي تباين جميل
  padding: '25px',
  borderRadius: '35px',
  marginBottom: '20px',
  display: 'inline-block',
  cursor: 'pointer',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease'
};

const loginInputStyle = {
  backgroundColor: '#f9f9f9',
  border: '2px solid #f59e0b',
  borderRadius: '15px',
  padding: '15px',
  color: '#1a1a1a',
  textAlign: 'center',
  fontSize: '1.2rem',
  outline: 'none',
  width: '220px'
};

const adminPanelStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '30px',
  width: '100%',
  maxWidth: '400px',
  border: '1px solid #eee',
  boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
};

const adminActionButtonStyle = {
  width: '100%',
  padding: '16px',
  marginBottom: '12px',
  borderRadius: '16px',
  backgroundColor: '#f5f5f5',
  border: 'none',
  color: '#1a1a1a',
  textAlign: 'right',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem'
};

const logoutButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#ff4444',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const socialButtonGroupStyle = {
  display: 'flex',
  gap: '15px',
  flexWrap: 'wrap',
  justifyContent: 'center'
};

const socialButtonStyle = {
  backgroundColor: '#fff',
  border: '1px solid #eee',
  padding: '18px',
  borderRadius: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  transition: 'all 0.2s ease'
};

const footerStyle = {
  position: 'fixed',
  bottom: '20px',
  opacity: 0.4,
  fontSize: '12px',
  letterSpacing: '2px',
  fontWeight: 'bold',
  color: '#999'
};

export default App;
