export const s = {
  container: { 
    width: '100%', 
    minHeight: '100vh', 
    direction: 'rtl' as const, 
    display: 'flex', 
    flexDirection: 'column' as const,
    transition: 'all 0.3s ease'
  },
  wrapper: { 
    maxWidth: '480px', 
    margin: '0 auto', 
    width: '100%', 
    padding: '10px 16px 30px', 
    boxSizing: 'border-box' as const, 
    flex: 1 
  },
  topNav: { 
    display: 'flex', 
    justifyContent: 'flex-end', 
    padding: '10px 0' 
  },
  themeBtn: { 
    padding: '10px', 
    borderRadius: '50%', 
    cursor: 'pointer', 
    border: '1px solid rgba(128,128,128,0.3)', 
    display: 'flex', 
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  
  identity: { 
    display: 'flex', 
    flexDirection: 'column' as const, 
    alignItems: 'center', 
    padding: '10px 0 25px' 
  },
  logoWrap: { 
    width: '85px', 
    height: '85px', 
    borderRadius: '24px', 
    overflow: 'hidden', 
    marginBottom: '15px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
    border: '2px solid #f59e0b',
    cursor: 'pointer'
  },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' as const },
  title: { 
    fontSize: '1.6rem', 
    fontWeight: '900', 
    margin: '0', 
    textAlign: 'center' as const,
    color: 'inherit' 
  },

  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(5, 1fr)', 
    gap: '12px', 
    width: '100%',
    marginBottom: '35px' 
  },
  box: { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    aspectRatio: '1/1', 
    borderRadius: '16px', 
    textDecoration: 'none',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)' 
  },

  services: { 
    display: 'flex', 
    flexDirection: 'column' as const, 
    gap: '15px' 
  },
  serviceCard: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '15px', 
    padding: '22px', 
    borderRadius: '22px', 
    border: '1px solid rgba(128,128,128,0.2)', 
    cursor: 'pointer', 
    fontSize: '1.1rem', 
    fontWeight: '700',
    textAlign: 'right' as const,
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease',
    width: '100%',
    background: 'none'
  },
  serviceText: { flex: 1 },

  gridDisplay: { 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gap: '14px' 
  },
  miniCard: { 
    borderRadius: '20px', 
    padding: '15px', 
    border: '1px solid rgba(128,128,128,0.2)', 
    display: 'flex', 
    flexDirection: 'column' as const, 
    gap: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    position: 'relative' as const,
    cursor: 'pointer'
  },
  miniStatus: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    position: 'absolute' as const,
    top: '12px',
    right: '12px'
  },
  miniPrice: { fontWeight: 'bold', fontSize: '1.1rem' },
  miniTitle: { fontSize: '0.9rem', opacity: 0.8 },
  miniSub: { fontSize: '0.8rem', opacity: 0.6 },
  expandIcon: { alignSelf: 'flex-end', opacity: 0.5 },

  modalOverlay: { 
    position: 'fixed' as const, 
    inset: 0, 
    backgroundColor: 'rgba(0,0,0,0.85)', 
    backdropFilter: 'blur(8px)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 2000 
  },
  modalContent: { 
    width: '90%', 
    maxWidth: '400px', 
    borderRadius: '30px', 
    padding: '35px 25px', 
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    position: 'relative' as const
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px'
  },
  priceTagLarge: { fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '99px',
    border: '1px solid',
    fontSize: '0.8rem'
  },
  detailRow: { display: 'flex', alignItems: 'center', gap: '8px', margin: 0 },
  descBox: { 
    padding: '15px', 
    backgroundColor: 'rgba(128,128,128,0.1)', 
    borderRadius: '15px', 
    fontSize: '0.9rem',
    lineHeight: '1.6'
  },
  modalLinks: { display: 'flex', flexDirection: 'column' as const, gap: '10px', marginTop: '10px' },
  actionLink: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    textDecoration: 'none', 
    color: 'inherit',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  callAction: {
    width: '100%',
    padding: '14px',
    borderRadius: '15px',
    backgroundColor: '#f59e0b',
    color: '#fff',
    textAlign: 'center' as const,
    textDecoration: 'none',
    fontWeight: 'bold',
    marginTop: '10px'
  },

  input: { 
    width: '100%', 
    padding: '16px', 
    borderRadius: '15px', 
    border: '1px solid rgba(128,128,128,0.3)', 
    marginBottom: '15px', 
    boxSizing: 'border-box' as const, 
    fontSize: '1rem',
    textAlign: 'right' as const,
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.03)',
    color: 'inherit'
  },
  menuBtn: {
    width: '100%',
    padding: '18px',
    borderRadius: '15px',
    border: '1px solid rgba(128,128,128,0.2)',
    backgroundColor: 'rgba(128,128,128,0.05)',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'right' as const
  },
  saveBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '15px',
    backgroundColor: '#f59e0b',
    color: '#fff',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px'
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};
