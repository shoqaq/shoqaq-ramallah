import { useState } from 'react';

function App() {
  // الحالات البرمجية الخاصة بك - لا تقم بتغييرها
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const whatsappNumber = "970594560056"; // رقمك الخاص

  // دالة التحقق من الكود السري (749329)
  const handleLogin = (val: string) => {
    setPassword(val);
    if (val === "749329") {
      setIsLoggedIn(true);
      setShowLogin(false);
    }
  };

  return (
    // التنسيق الرئيسي - خلفية سوداء وتوسيع المحتوى
    <div style={containerStyle}>
      
      {/* 1. منطقة الهوية (اللوغو واسم الصفحة) */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        {/* النقر على اللوغو يفتح حقل الكود السرّي */}
        <div 
          onClick={() => { setShowLogin(!showLogin); setPassword(""); }}
          style={logoContainerStyle}
        >
          {/* أيقونة منزل بسيطة كلوغو */}
          <svg width="60" height="60" viewBox="0 0 24 24" fill="black">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </div>
        
        {/* اسم الصفحة: شقق رام الله */}
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0' }}>
          شقق <span style={{ color: '#f59e0b' }}>رام الله</span>
        </h1>
      </div>

      {/* 2. حقل إدخال كود المشرف (يظهر عند النقر على اللوغو) */}
      {showLogin && !isLoggedIn && (
        <div style={{ marginBottom: '30px', animation: 'fadeIn 0.5s' }}>
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

      {/* 3. لوحة التحكم للمشرف (تظهر بعد إدخال الكود الصحيح) */}
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
        /* 4. أزرار التواصل للزبائن (التصميم النهائي والثابت) */
        <div style={socialButtonGroupStyle}>
          
          {/* 1. زر الواتساب (الشعار الأصلي والحقيقي) */}
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" style={socialButtonStyle} title="تواصل عبر الواتساب">
            <div style={whatsappLogoOuter}>
              <div style={whatsappLogoInner}></div>
            </div>
          </a>
          
          {/* 2. زر الاتصال الهاتفي */}
          <a href="tel:+970594560056" style={socialButtonStyle} title="اتصال هاتفي">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
          
          {/* 3. زر الفيسبوك */}
          <a href="https://www.facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={socialButtonStyle} title="فيسبوك">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          
          {/* 4. زر الإنستغرام */}
          <a href="https://www.instagram.com/shoqaq.ramallah/" target="_blank" rel="noreferrer" style={socialButtonStyle} title="إنستغرام">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          
          {/* 5. زر التيك توك */}
          <a href="https://www.tiktok.com/@shoqaq.ramallah" target="_blank" rel="noreferrer" style={socialButtonStyle} title="تيك توك">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
          </a>
        </div>
      )}

      {/* حقوق الصفحة (في الأسفل) */}
      <footer style={footerStyle}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

// -----------------------------------------------------------
// كود الـ CSS (Styles) - تم تجميعه هنا لضمان عدم حدوث مشاكل
// -----------------------------------------------------------

// التنسيق الرئيسي للصفحة
const containerStyle = {
  backgroundColor: '#000',
  color: 'white',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  direction: 'rtl' as const,
  fontFamily: 'Tajawal, sans-serif',
  padding: '20px'
};

// تنسيق حاوية اللوغو
const logoContainerStyle = {
  backgroundColor: '#f59e0b',
  padding: '25px',
  borderRadius: '35px',
  marginBottom: '20px',
  display: 'inline-block',
  cursor: 'pointer',
  boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)',
  transition: 'transform 0.3s ease'
};

// تنسيق حقل إدخال كود المشرف
const loginInputStyle = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid #f59e0b',
  borderRadius: '15px',
  padding: '15px',
  color: '#f59e0b',
  textAlign: 'center' as const,
  fontSize: '1.2rem',
  outline: 'none',
  width: '200px'
};

// تنسيق لوحة التحكم
const adminPanelStyle = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  padding: '30px',
  borderRadius: '30px',
  width: '100%',
  maxWidth: '400px',
  border: '1px solid rgba(255,255,255,0.1)'
};

// تنسيق أزرار لوحة التحكم
const adminActionButtonStyle = {
  width: '100%',
  padding: '15px',
  marginBottom: '10px',
  borderRadius: '15px',
  backgroundColor: 'rgba(255,255,255,0.1)',
  border: 'none',
  color: 'white',
  textAlign: 'right' as const,
  cursor: 'pointer',
  fontWeight: 'bold' as const
};

// زر الخروج من لوحة التحكم
const logoutButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#ff4444',
  cursor: 'pointer',
  fontWeight: 'bold' as const
};

// حاوية أزرار التواصل الاجتماعي
const socialButtonGroupStyle = {
  display: 'flex',
  gap: '15px',
  flexWrap: 'wrap' as const,
  justifyContent: 'center'
};

// تنسيق زر التواصل (بشكل عام)
const socialButtonStyle = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '15px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.3s ease',
  textDecoration: 'none'
};

// -----------------------------------------------------------
// كود CSS الخاص بشعار الواتساب الأصلي (السمّاعة والفقاعة)
// -----------------------------------------------------------

const whatsappLogoOuter = {
  width: '28px',
  height: '28px',
  backgroundColor: '#25D366', // اللون الأخضر الرسمي
  borderRadius: '50%', // دائرة
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative' as const
};

// السمّاعة البيضاء (باستخدام لغة CSS فقط)
const whatsappLogoInner = {
  width: '14px',
  height: '14px',
  border: '3px solid white', // لون السمّاعة
  borderRadius: '50% 50% 50% 0', // شكل السمّاعة
  transform: 'rotate(-45deg)', // تدوير السمّاعة
  position: 'absolute' as const
};

// تنسيق حقوق الصفحة
const footerStyle = {
  position: 'fixed' as const,
  bottom: '20px',
  opacity: 0.2,
  fontSize: '12px',
  letterSpacing: '2px',
  fontWeight: 'bold' as const
};

export default App;
