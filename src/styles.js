export const s = {
  container: {
    width: '100%',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  },
  wrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    flex: 1 // هذا يضمن أن المحتوى يأخذ مساحته ولا ينهار
  },
  menuBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '14px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '12px',
    textAlign: 'right',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  saveBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginTop: '10px'
  },
  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #eee',
    fontSize: '1rem',
    marginBottom: '10px',
    outline: 'none',
    boxSizing: 'border-box'
  }
};
