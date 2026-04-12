export const s = {
  container: { 
    width: '100%', 
    minHeight: '100vh', 
    direction: 'rtl', 
    display: 'flex', 
    flexDirection: 'column',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  wrapper: { maxWidth: '500px', margin: '0 auto', width: '100%', padding: '20px', flex: 1 },
  topNav: { display: 'flex', justifyContent: 'flex-end', padding: '10px' },
  themeBtn: { padding: '8px', borderRadius: '50%', cursor: 'pointer', border: '1px solid #ddd', display: 'flex', alignItems: 'center' },
  
  // الهوية - الشعار المعدل
  identity: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px 0' },
  logoWrap: { 
    width: '85px', 
    height: '85px', 
    borderRadius: '20px', 
    overflow: 'hidden', 
    marginBottom: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
  },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '1.4rem', fontWeight: '800', marginBottom: '25px' },

  // الشبكة والأزرار
  grid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '30px' },
  box: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', borderRadius: '15px', textDecoration: 'none' },
  services: { display: 'flex', flexDirection: 'column', gap: '12px' },
  serviceCard: { display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', borderRadius: '18px', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' },
  
  // المدخلات وأزرار الإدارة
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '10px', boxSizing: 'border-box', textAlign: 'right' },
  menuBtn: { width: '100%', padding: '16px', borderRadius: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '10px' },
  saveBtn: { width: '100%', padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer', color: 'white', fontWeight: 'bold', backgroundColor: '#f59e0b' },
  
  // عرض العقارات
  gridDisplay: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  miniCard: { position: 'relative', padding: '15px', borderRadius: '15px', cursor: 'pointer', border: '1px solid' },
  modalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-end', zIndex: 1000 },
  modalContent: { width: '100%', borderTopLeftRadius: '25px', borderTopRightRadius: '25px', padding: '25px', maxHeight: '90vh', overflowY: 'auto' }
};
