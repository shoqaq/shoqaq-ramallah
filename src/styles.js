export const s = {
  container: { 
    width: '100%', 
    minHeight: '100vh', 
    direction: 'rtl', 
    display: 'flex', 
    flexDirection: 'column',
    backgroundColor: 'inherit', // يعتمد على الثيم الممرر من App.js
    overflowX: 'hidden' // منع التمرير الجانبي المزعج في الموبايل
  },
  wrapper: { 
    maxWidth: '450px', // أفضل عرض لشاشات الموبايل
    margin: '0 auto', 
    width: '100%', 
    padding: '15px', 
    boxSizing: 'border-box',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  topNav: { 
    display: 'flex', 
    justifyContent: 'flex-end', 
    padding: '10px 5px' 
  },
  themeBtn: { 
    padding: '10px', 
    borderRadius: '50%', 
    cursor: 'pointer', 
    border: '1px solid rgba(128,128,128,0.2)', 
    display: 'flex', 
    alignItems: 'center',
    transition: 'all 0.3s ease'
  },
  
  // الهوية - تم ضبطها لتكون متناسقة جداً
  identity: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    padding: '10px 0 20px' 
  },
  logoWrap: { 
    width: '80px', 
    height: '80px', 
    borderRadius: '20px', 
    overflow: 'hidden', 
    marginBottom: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    border: '2px solid rgba(245, 158, 11, 0.2)' // إطار خفيف بلون الـ accent
  },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { 
    fontSize: '1.5rem', 
    fontWeight: '800', 
    margin: '0', 
    textAlign: 'center',
    letterSpacing: '-0.5px'
  },

  // شبكة التواصل - أزرار دائرية مريحة للإبهام
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(5, 1fr)', 
    gap: '12px', 
    width: '100%',
    marginBottom: '30px' 
  },
  box: { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    aspectRatio: '1/1', // يضمن بقاء الزر مربعاً أو دائرياً
    borderRadius: '16px', 
    textDecoration: 'none',
    transition: 'transform 0.1s active'
  },

  // الخدمات - كروت عريضة سهلة الضغط
  services: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '15px',
    width: '100%'
  },
  serviceCard: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '15px', 
    padding: '20px', 
    borderRadius: '20px', 
    border: '1px solid rgba(128,128,128,0.1)', 
    cursor: 'pointer', 
    fontSize: '1.05rem', 
    fontWeight: '700',
    textAlign: 'right',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  serviceText: { flex: 1 },

  // عرض العقارات - كرتين في كل صف بشكل مرتب
  gridDisplay: { 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gap: '12px',
    paddingBottom: '40px'
  },
  miniCard: { 
    position: 'relative', 
    padding: '12px', 
    borderRadius: '18px', 
    border: '1px solid',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    minHeight: '120px',
    justifyContent: 'flex-end'
  },
  
  // المدخلات - مريحة للكتابة من الكيبورد
  input: { 
    width: '100%', 
    padding: '16px', 
    borderRadius: '14px', 
    border: '1px solid #ddd', 
    marginBottom: '12px', 
    boxSizing: 'border-box', 
    fontSize: '1rem',
    backgroundColor: 'rgba(128,128,128,0.05)'
  }
};
