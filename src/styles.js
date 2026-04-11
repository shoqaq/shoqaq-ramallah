// تم تحويل التنسيقات إلى Object لضمان التوافق مع Vite وإصلاح خطأ الـ Build
export const s = {
  container: {
    minHeight: '100vh',
    direction: 'rtl',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f8f9fa',
    color: '#333'
  },
  
  wrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },

  identity: {
    textAlign: 'center',
    padding: '40px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  logoWrap: {
    width: '100px',
    height: '100px',
    borderRadius: '28px',
    overflow: 'hidden',
    marginBottom: '15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },

  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  title: {
    fontSize: '2rem',
    fontWeight: '800',
    margin: '0 0 25px 0'
  },

  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '40px',
    width: '100%'
  },

  box: {
    width: '45px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    textDecoration: 'none',
    transition: 'all 0.2s',
    backgroundColor: '#ffffff',
    border: '1.5px solid #E5E7EB'
  },

  services: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto'
  },

  serviceCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    borderRadius: '20px',
    cursor: 'pointer',
    border: '2px solid #E5E7EB',
    backgroundColor: '#ffffff',
    textAlign: 'right',
    transition: 'all 0.2s',
    width: '100%'
  },

  serviceText: {
    fontSize: '1.1rem',
    fontWeight: '600'
  },

  topNav: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 10
  },

  themeBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '1px solid #E5E7EB',
    backgroundColor: '#ffffff'
  },

  // أضفنا قسم الإدارة بناءً على احتياج مشروعك
  adminPanel: {
    padding: '20px',
    borderRadius: '25px',
    width: '100%'
  },

  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '12px',
    border: '1px solid #ddd',
    boxSizing: 'border-box'
  },

  saveBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#f59e0b',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer'
  },

  footer: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '0.8rem',
    opacity: 0.6
  }
};

export const theme = {
  primary: '#2c3e50',
  secondary: '#27ae60',
  accent: '#f59e0b',
  light: '#ffffff',
  gray: '#95a5a6'
};
