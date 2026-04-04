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
    <div style={{ backgroundColor: '#000', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', direction: 'rtl', fontFamily: 'Tajawal, sans-serif', padding: '20px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div 
          onClick={() => { setShowLogin(!showLogin); setPassword(""); }}
          style={{ 
            backgroundColor: '#f59e0b', padding: '25px', borderRadius: '35px', 
            marginBottom: '20px', display: 'inline-block', cursor: 'pointer',
            boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)'
          }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="black">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0' }}>
          شقق <span style={{ color: '#f59e0b' }}>رام الله</span>
        </h1>
      </div>

      {showLogin && !isLoggedIn && (
        <div style={{ marginBottom: '30px' }}>
          <input
            type="password"
            placeholder="كود الوصول..."
            value={password}
            onChange={(e) => handleLogin(e.target.value)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid #f59e0b',
              borderRadius: '15px', padding: '15px', color: '#f59e0b',
              textAlign: 'center', fontSize: '1.2rem', outline: 'none', width: '200px'
            }}
            autoFocus
          />
        </div>
      )}

      {isLoggedIn ? (
        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '30px', width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#f59e0b' }}>لوحة التحكم</h2>
            <button onClick={() => setIsLoggedIn(false)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontWeight: 'bold' }}>خروج</button>
          </div>
          <button style={adminButtonStyle}>+ إضافة عقار جديد</button>
          <button style={adminButtonStyle}>📋 إدارة طلبات الزبائن</button>
          <button style={adminButtonStyle}>⚙️ إعدادات الموقع</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
{/* زر واتساب - أيقونة محسنة */}
  {/* زر واتساب - الأيقونة الرسمية والحقيقية */}
<a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" style={socialButtonStyle}>
  <svg width="28" height="28" viewBox="0 0 448 512" fill="#25D366">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.6-27.6-16.5-14.7-27.6-32.8-30.8-38.4-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.6-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
</a>
          <a href="tel:+970594560056" style={socialButtonStyle}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
          <a href="https://www.facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={socialButtonStyle}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://www.instagram.com/shoqaq.ramallah/" target="_blank" rel="noreferrer" style={socialButtonStyle}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          {/* زر التيك توك */}
          <a href="https://www.tiktok.com/@shoqaq.ramallah" target="_blank" rel="noreferrer" style={socialButtonStyle}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
          </a>
        </div>
      )}

      <footer style={{ position: 'fixed', bottom: '20px', opacity: 0.2, fontSize: '12px', fontWeight: 'bold' }}>SHOQAQ.STORE 2026</footer>
    </div>
  );
}

const socialButtonStyle = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '15px',
  borderRadius: '20px',
  display: 'flex',
  textDecoration: 'none'
};

const adminButtonStyle = {
  width: '100%', padding: '15px', marginBottom: '10px', borderRadius: '15px',
  backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: 'white',
  textAlign: 'right' as const, cursor: 'pointer', fontWeight: 'bold'
};

export default App;