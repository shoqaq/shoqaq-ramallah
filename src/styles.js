// styles.js - Modern & Premium Mobile UI (Final Optimized)

export const s = {
  /* ====== App Layout ====== */
  container: {
    minHeight: '100vh',
    direction: 'rtl',
    textAlign: 'right',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f8fafc',
    color: '#1e293b',
    WebkitTapHighlightColor: 'transparent',
    paddingBottom: 'env(safe-area-inset-bottom)' // Safe area
  },

  wrapper: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '0 16px'
  },

  /* ====== Identity ====== */
  identity: {
    textAlign: 'center',
    padding: '32px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  logoWrap: {
    width: '96px',
    height: '96px',
    borderRadius: '30px',
    overflow: 'hidden',
    marginBottom: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '4px solid #fff'
  },

  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  title: {
    fontSize: '2.1rem',
    fontWeight: '900',
    letterSpacing: '-0.02em',
    marginBottom: '24px'
  },

  /* ====== Social Icons ====== */
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '36px',
    flexWrap: 'wrap'
  },

  box: {
    width: '52px',
    height: '52px',
    borderRadius: '16px',
    backgroundColor: '#fff',
    border: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
    cursor: 'pointer',
    minHeight: '48px' // Accessibility
  },

  /* ====== Services ====== */
  services: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },

  serviceCard: {
    minHeight: '80px',
    borderRadius: '24px',
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    transition: 'transform 0.15s ease',
    cursor: 'pointer'
  },

  serviceCardActive: {
    transform: 'scale(0.97)'
  },

  serviceText: {
    fontSize: '1.1rem',
    fontWeight: '700'
  },

  /* ====== Property Grid ====== */
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px'
  },

  backBtn: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
    minHeight: '48px'
  },

  gridDisplay: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    paddingBottom: '80px'
  },

  miniCard: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '24px',
    padding: '20px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
    transition: 'transform 0.15s ease',
    cursor: 'pointer'
  },

  miniCardActive: {
    transform: 'scale(0.97)'
  },

  miniStatus: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    position: 'absolute',
    top: '20px',
    left: '20px'
  },

  miniPrice: {
    fontSize: '1.45rem',
    fontWeight: '900',
    color: '#f59e0b'
  },

  miniTitle: {
    fontSize: '1.1rem',
    fontWeight: '800'
  },

  miniSub: {
    fontSize: '0.95rem',
    color: '#64748b'
  },

  expandIcon: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    opacity: 0.3
  },

  /* ====== Modal ====== */
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(15,23,42,0.75)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'flex-end',
    zIndex: 1000
  },

  modalContent: {
    width: '100%',
    maxHeight: '94vh',
    backgroundColor: '#fff',
    borderRadius: '32px 32px 0 0',
    padding: '24px',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    boxShadow: '0 -20px 50px rgba(0,0,0,0.15)'
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },

  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },

  priceTagLarge: {
    fontSize: '1.8rem',
    fontWeight: '900',
    color: '#f59e0b'
  },

  descBox: {
    backgroundColor: '#f8fafc',
    borderRadius: '20px',
    padding: '18px',
    lineHeight: '1.7'
  },

  modalLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  actionLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '700',
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: '#f8fafc'
  },

  callAction: {
    position: 'sticky',
    bottom: '10px',
    width: '100%',
    padding: '18px',
    borderRadius: '20px',
    backgroundColor: '#10b981',
    color: '#fff',
    fontSize: '1.15rem',
    fontWeight: '900',
    textAlign: 'center',
    minHeight: '48px',
    boxShadow: '0 10px 25px rgba(16,185,129,0.3)'
  },

  footer: {
    textAlign: 'center',
    padding: '24px',
    fontSize: '0.85rem',
    color: '#94a3b8'
  }
};

export const theme = {
  primary: '#0f172a',
  accent: '#f59e0b',
  success: '#10b981',
  danger: '#ef4444',
  bg: '#f8fafc',
  cardBg: '#ffffff',
  border: '#f1f5f9',
  text: '#1e293b',
  subText: '#64748b'
};

export const s = {
  // ... ستايلاتك القديمة
  menuBtn: {
    width: '100%',
    padding: '15px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '1.05rem',
    fontWeight: '600',
    marginBottom: '10px',
    transition: 'all 0.2s',
    textAlign: 'right'
  },
  saveBtn: {
    padding: '15px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1.1rem'
  }
};
