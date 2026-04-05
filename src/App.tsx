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
      
      {/* منطقة الهوية - لوجو مربع بحواف منحنية (كما طلبت) */}
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
        <div style={{ marginBottom: '30px', animation: 'fadeIn 0.5s' }}>
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
        /* لوحة التحكم للمشرف */
        <div style={adminPanel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#f59e0b' }}>إعدادات المشرف</h2>
            <button onClick={() => setIsLoggedIn(false)} style={logoutBtn}>خروج</button>
          </div>
          <button style={adminAction}>+ إضافة عقار جديد</button>
          <button style={adminAction}>📋 إدارة العقارات</button>
        </div>
      ) : (
        /* أزرار التواصل - دائرية وملونة (تصميم Premium) */
        <div style={socialGrid}>
          
          {/* واتساب */}
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" style={{...iconBox, background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'}} title="واتساب">
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/></svg>
          </a>
          
          {/* اتصال */}
          <a href="tel:+970594560056" style={{...iconBox, background: 'linear-gradient(135deg, #34A853 0%, #1F7236 100%)'}} title="اتصال">
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          </a>
          
          {/* فيسبوك */}
          <a href="https://facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={{...iconBox, background: 'linear-gradient(135deg, #1877F2 0%, #0E5ACF 100%)'}} title="فيسبوك">
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>

          {/* إنستغرام */}
          <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" rel="noreferrer" style={{...iconBox, background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'}} title="إنستغرام">
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4
