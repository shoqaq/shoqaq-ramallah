// @ts-nocheck
import { useState } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Facebook, 
  Instagram, 
  Music2, // أيقونة بديلة فخمة للتيك توك
  LogOut,
  PlusCircle,
  LayoutDashboard
} from 'lucide-react';

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
      
      {/* منطقة الهوية */}
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
        <div style={adminPanel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LayoutDashboard size={18} /> لوحة التحكم
            </h2>
            <button onClick={() => setIsLoggedIn(false)} style={logoutBtn}>
              <LogOut size={18} />
            </button>
          </div>
          <button style={adminAction}><PlusCircle size={18} /> إضافة عقار جديد</button>
          <button style={adminAction}><LayoutDashboard size={18} /> إدارة القائمة</button>
        </div>
      ) : (
        /* أزرار التواصل - حجم أصغر (50px) وتصميم Lucide الرقيق */
        <div style={socialGrid}>
          
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" style={{...iconBox, background: '#25D366'}}>
            <MessageCircle size={24} color="white" strokeWidth={1.5} />
          </a>
          
          <a href="tel:+970594560056" style={{...iconBox, background: '#34A853'}}>
            <Phone size={24} color="white" strokeWidth={1.5} />
          </a>
          
          <a href="https://facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={{...iconBox, background: '#1877F2'}}>
            <Facebook size={24} color="white" strokeWidth={1.5} />
          </a>

          <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" rel="noreferrer" style={{...iconBox, background: 'linear-gradient(45deg, #f09433 0%, #e6683c 50%, #bc1888 100%)'}}>
            <Instagram size={24} color="white" strokeWidth={1.5} />
          </a>

          <a href="https://tiktok.com/@shoqaq.ramallah" target="_blank" rel="noreferrer" style={{...iconBox, background: '#000', border: '1px solid #333'}}>
            <Music2 size={24} color="white" strokeWidth={1.5} />
          </a>
        </div>
      )}

      <footer style={footerText}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

// التنسيقات (Styles)
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
  marginBottom: '15px',
  borderRadius: '24px', 
  overflow: 'hidden',
  display: 'inline-flex',
  boxShadow: '0 0 30px rgba(245, 158, 11, 0.1)',
  border: '1px solid rgba(255,255,255,0.05)'
};

const logoImg = { width: '100px', height: '100px', objectFit: 'cover' };

const mainTitle = { fontSize: '2.5rem', fontWeight: '900', margin: '10px 0 0 0' };
const subTitle = { color: '#555', marginTop: '5px', fontSize: '0.9rem', letterSpacing: '1px' };

const socialGrid = { 
  display: 'flex', 
  gap: '15px', 
  justifyContent: 'center',
  marginTop: '30px'
};

const iconBox = {
  width: '50px', // الحجم المثالي للفخامة
  height: '50px',
  borderRadius: '16px', // جعلنا الأيقونات مربعة بحواف منحنية لتطابق اللوجو
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'transform 0.2s ease',
  boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
};

const loginInput = {
  backgroundColor: '#0a0a0a',
  border: '1px solid #222',
  borderRadius: '12px',
  padding: '12px',
  color: '#f59e0b',
  textAlign: 'center',
  width: '180px',
  outline: 'none'
};

const adminPanel = {
  backgroundColor: '#050505',
  padding: '25px',
  borderRadius: '24px',
  width: '100%',
  maxWidth: '320px',
  border: '1px solid #111'
};

const adminAction = {
  width: '100%',
  padding: '12px 16px',
  marginBottom: '10px',
  borderRadius: '12px',
  backgroundColor: '#0a0a0a',
  border: '1px solid #222',
  color: 'white',
  textAlign: 'right',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '0.9rem'
};

const logoutBtn = { background: 'none', border: 'none', color: '#666', cursor: 'pointer' };

const footerText = { position: 'fixed', bottom: '20px', opacity: 0.1, fontSize: '9px', color: '#888' };

export default App;
