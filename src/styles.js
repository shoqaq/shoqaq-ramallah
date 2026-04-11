// styles.js - Modern & Premium UI

export const s = {
  /* ====== App Layout ====== */
  container: {
    minHeight: '100vh',
    direction: 'rtl',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f8fafc', // لون خلفية أهدأ وأكثر حداثة
    color: '#1e293b'
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
    borderRadius: '30px', // انحناء عصري أكثر (Squircle)
    overflow: 'hidden',
    marginBottom: '16px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxShadow: '0 20px 40px rgba(0,0,0,0.06)', // ظلال ناعمة وعميقة
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
    marginBottom: '24px',
    color: '#0f172a'
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
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
  },

  /* ====== Services ====== */
  services: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },

  serviceCard: {
    width: '100%',
    minHeight: '80px',
    borderRadius: '24px',
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },

  serviceText: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#334155'
  },

  /* ====== Property Grid ====== */
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    paddingTop: '10px'
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
    fontSize: '0.9rem',
    cursor: 'pointer'
  },

  gridDisplay: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    paddingBottom: '40px'
  },

  miniCard: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '24px',
    padding: '20px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    border: '1px solid #f8fafc',
    transition: 'all 0.3s ease'
  },

  miniStatus: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    position: 'absolute',
    top: '20px',
    left: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },

  miniPrice: {
    fontSize: '1.45rem',
    fontWeight: '900',
    color: '#f59e0b',
    marginBottom: '4px'
  },

  miniTitle: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: '4px'
  },

  miniSub: {
    fontSize: '0.95rem',
    color: '#64748b',
    fontWeight: '500'
  },

  expandIcon: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    opacity: 0.3
  },

  /* ====== Modal (Bottom Sheet Style) ====== */
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.75)', // تعتيم أغمق وأفخم
    backdropFilter: 'blur(8px)', // تأثير الضبابية للخلفية
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
    color: '#f59e0b',
    letterSpacing: '-0.02em'
  },

  statusBadge: {
    padding: '8px 16px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },

  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#475569',
    fontSize: '1rem',
    fontWeight: '500'
  },

  descBox: {
    backgroundColor: '#f8fafc',
    border: '1px solid #f1f5f9',
    borderRadius: '20px',
    padding: '18px',
    fontSize: '1rem',
    lineHeight: '1.7',
    color: '#334155'
  },

  modalLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '10px'
  },

  actionLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '700',
    color: '#475569',
    textDecoration: 'none',
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: '#f8fafc'
  },

  callAction: {
    marginTop: '15px',
    width: '100%',
    padding: '18px',
    borderRadius: '20px',
    backgroundColor: '#10b981',
    color: '#fff',
    fontSize: '1.15rem',
    fontWeight: '900',
    textAlign: 'center',
    border: 'none',
    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
    cursor: 'pointer'
  },

  /* ====== Footer ====== */
  footer: {
    textAlign: 'center',
    padding: '24px',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#94a3b8',
    letterSpacing: '0.05em'
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
