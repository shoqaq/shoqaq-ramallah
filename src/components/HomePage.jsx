export const s = {
  container: { 
    minHeight: '100vh', 
    direction: 'rtl', 
    fontFamily: 'system-ui, sans-serif', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: '20px',
    boxSizing: 'border-box'
  },

  wrapper: { 
    width: '100%', 
    maxWidth: '400px', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center'
  },

  identity: { 
    textAlign: 'center', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '40px',
    width: '100%'
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
    transition: 'transform 0.2s'
  },

  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  title: {
    margin: '0',
    fontWeight: '800',
    letterSpacing: '-0.5px'
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
    transition: 'all 0.2s'
  },

  services: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%'
  },

  serviceCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    borderRadius: '20px',
    cursor: 'pointer',
    border: 'none',
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
    border: 'none'
  },

  loginBox: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100,
    width: '90%',
    maxWidth: '320px',
    padding: '25px',
    borderRadius: '25px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
  },

  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '12px',
    border: '1px solid #333',
    backgroundColor: 'transparent',
    color: 'inherit',
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
    cursor: 'pointer',
    marginTop: '10px'
  },

  menuBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px',
    borderRadius: '12px',
    border: '1px solid #333',
    backgroundColor: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'right'
  },

  footer: {
    position: 'absolute',
    bottom: '20px',
    fontSize: '0.7rem',
    letterSpacing: '2px'
  }
};
