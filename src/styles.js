export const s = {
  container: { minHeight: '100vh', direction: 'rtl', fontFamily: 'system-ui, sans-serif', padding: '20px' },
  homeContainer: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', // هذا يضمن توسيط المحتوى أفقياً
    justifyContent: 'center', 
    width: '100%' 
  },
  wrapper: { width: '100%', maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  topNav: { position: 'absolute', top: '20px', left: '20px' },
  themeBtn: { width: '40px', height: '40px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
identity: { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // يضمن بقاء اللوجو والعنوان في المنتصف
    textAlign: 'center', 
    marginBottom: '30px',
    width: '100%'
  },
  logoWrap: { 
    width: '85px', 
    height: '85px', 
    borderRadius: '22px', 
    overflow: 'hidden', 
    marginBottom: '10px', 
    cursor: 'pointer',
    display: 'flex',        // أضفنا هذا
    alignItems: 'center',    // أضفنا هذا لضمان توسيط الصورة داخل المربع نفسه
    justifyContent: 'center' // أضفنا هذا
  },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '1.8rem', fontWeight: '800', margin: 0 },
  grid: { display: 'flex', gap: '10px', marginBottom: '30px' },
  box: { width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  services: { width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' },
  serviceCard: { display: 'flex', alignItems: 'center', gap: '15px', padding: '22px', borderRadius: '24px', cursor: 'pointer', fontWeight: '700' },
  serviceText: { fontSize: '1.1rem' },
  fullWidth: { width: '100%' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  backBtn: { background: 'rgba(245, 158, 11, 0.1)', border: 'none', color: '#f59e0b', padding: '6px 12px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' },
  gridDisplay: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  miniCard: { padding: '15px', borderRadius: '20px', position: 'relative', cursor: 'pointer', textAlign: 'center' },
  miniStatus: { position: 'absolute', top: '10px', right: '10px', width: '7px', height: '7px', borderRadius: '50%' },
  miniPrice: { fontSize: '0.95rem', fontWeight: '900', color: '#f59e0b' },
  miniTitle: { fontSize: '0.8rem', fontWeight: 'bold', marginTop: '4px' },
  miniSub: { fontSize: '0.7rem', opacity: 0.6 },
  expandIcon: { position: 'absolute', bottom: '8px', left: '8px', opacity: 0.2 },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' },
  modalContent: { width: '100%', maxWidth: '380px', borderRadius: '30px', padding: '25px' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  priceTagLarge: { fontSize: '1.4rem', fontWeight: '900', color: '#f59e0b' },
  statusBadge: { fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid', padding: '2px 8px', borderRadius: '6px' },
  detailRow: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', margin: '10px 0' },
  descBox: { padding: '15px', background: 'rgba(128,128,128,0.05)', borderRadius: '18px', fontSize: '0.95rem', lineHeight: '1.6', margin: '15px 0', minHeight: '80px' },
  modalLinks: { display: 'flex', flexDirection: 'column', gap: '8px' },
  actionLink: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '14px', border: '1.5px solid #f59e0b', color: '#f59e0b', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem' },
  callAction: { padding: '14px', borderRadius: '14px', backgroundColor: '#34A853', color: '#fff', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold' },
  loginBox: { width: '100%', padding: '25px', borderRadius: '22px' },
  input: { width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #ddd', background: 'rgba(255,255,255,0.05)', color: 'inherit', boxSizing: 'border-box' },
  saveBtn: { padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#f59e0b', color: '#fff', fontWeight: 'bold', cursor: 'pointer', width: '100%' },
  footer: { position: 'fixed', bottom: '15px', fontSize: '10px', opacity: 0.5, fontWeight: '700' },
  menuBtn: { 
    padding: '16px', 
    borderRadius: '16px', 
    border: '1px solid #ddd', 
    background: 'none', 
    color: 'inherit', 
    fontWeight: 'bold', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    cursor: 'pointer',
    width: '100%',
    textAlign: 'right'
  }
};
