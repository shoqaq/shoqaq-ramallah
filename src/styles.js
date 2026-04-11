// styles.js - Mobile First UI

export const s = {
  /* ====== App Layout ====== */
  container: {
    minHeight: '100vh',
    direction: 'rtl',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f4f6f8',
    color: '#111827'
  },

  wrapper: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '0 14px'
  },

  /* ====== Identity ====== */
  identity: {
    textAlign: 'center',
    padding: '28px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  logoWrap: {
    width: '92px',
    height: '92px',
    borderRadius: '26px',
    overflow: 'hidden',
    marginBottom: '14px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  title: {
    fontSize: '1.9rem',
    fontWeight: '900',
    marginBottom: '22px'
  },

  /* ====== Social Icons ====== */
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap'
  },

  box: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.2s'
  },

  /* ====== Services ====== */
  services: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },

  serviceCard: {
    width: '100%',
    minHeight: '74px',
    borderRadius: '22px',
    padding: '18px',
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
  },

  serviceText: {
    fontSize: '1.05rem',
    fontWeight: '700'
  },

  /* ====== Property Grid ====== */
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },

  backBtn: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '14px',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },

  gridDisplay: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '14px'
  },

  miniCard: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '16px',
    boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
    cursor: 'pointer'
  },

  miniStatus: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    position: 'absolute',
    top: '14px',
    left: '14px'
  },

  miniPrice: {
    fontSize: '1.3rem',
    fontWeight: '900',
    color: '#f59e0b'
  },

  miniTitle: {
    fontSize: '1rem',
    fontWeight: '700'
  },

  miniSub: {
    fontSize: '0.9rem',
    opacity: 0.7
  },

  expandIcon: {
    position: 'absolute',
    bottom: '14px',
    left: '14px',
    opacity: 0.4
  },

  /* ====== Modal ====== */
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    display: 'flex',
    alignItems: 'flex-end',
    zIndex: 100
  },

  modalContent: {
    width: '100%',
    maxHeight: '92vh',
    backgroundColor: '#fff',
    borderRadius: '28px 28px 0 0',
    padding: '20px',
    overflowY: 'auto'
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },

  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },

  priceTagLarge: {
    fontSize: '1.6rem',
    fontWeight: '900',
    color: '#f59e0b'
  },

  statusBadge: {
    padding: '6px 14px',
    borderRadius: '999px',
    border: '1px solid',
    fontSize: '0.9rem',
    fontWeight: '700'
  },

  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },

  descBox: {
    backgroundColor: '#f9fafb',
    borderRadius: '16px',
    padding: '14px',
    fontSize: '0.95rem',
    lineHeight: '1.6'
  },

  modalLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },

  actionLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '700'
  },

  callAction: {
    marginTop: '10px',
    width: '100%',
    padding: '15px',
    borderRadius: '18px',
    backgroundColor: '#22c55e',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '900',
    textAlign: 'center'
  },

  /* ====== Footer ====== */
  footer: {
    textAlign: 'center',
    padding: '18px',
    fontSize: '0.8rem',
    opacity: 0.6
  }
};

/* ====== Theme ====== */
export const theme = {
  primary: '#1f2937',
  accent: '#f59e0b',
  success: '#22c55e',
  danger: '#ef4444',
  bg: '#f4f6f8',
  cardBg: '#ffffff',
  border: '#e5e7eb',
  text: '#111827'
};
