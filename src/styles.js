export const s = {
  container: { 
    width: '100%', 
    minHeight: '100vh', 
    direction: 'rtl', 
    display: 'flex', 
    flexDirection: 'column',
    transition: 'all 0.3s ease'
  },
  wrapper: { 
    maxWidth: '480px', 
    margin: '0 auto', 
    width: '100%', 
    padding: '10px 16px 30px', 
    boxSizing: 'border-box', 
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
  
  // الهوية - الشعار بحجم مثالي
  identity: { 
    display: 'flex', 
    flexDirection: 'column', 
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
    border: '2px solid #f59e0b' // إطار ذهبي لكسر السواد
  },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { 
    fontSize: '1.6rem', 
    fontWeight: '900', 
    margin: '0', 
    textAlign: 'center',
    color: 'inherit' 
  },

  // أزرار السوشيال ميديا - ألوان لكسر السواد
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
    backgroundColor: 'rgba(255,255,255,0.05)' // شفافية بسيطة خلف الأيقونات
  },

  // الخدمات - كروت واضحة بحدود
  services: { 
    display: 'flex', 
    flexDirection: 'column', 
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
    textAlign: 'right',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease'
  },
  serviceText: { flex: 1 },

  // عرض العقارات - تنسيق البطاقات الصغيرة
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
    flexDirection: 'column', 
    gap: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },

  // النوافذ والمدخلات
  modalOverlay: { 
    position: 'fixed', 
    inset: 0, 
    backgroundColor: 'rgba(0,0,0,0.85)', 
    backdropFilter: 'blur(8px)', // تمويه الخلفية لجمالية أكثر
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
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)' 
  },
  input: { 
    width: '100%', 
    padding: '16px', 
    borderRadius: '15px', 
    border: '1px solid rgba(128,128,128,0.3)', 
    marginBottom: '15px', 
    boxSizing: 'border-box', 
    fontSize: '1rem',
    textAlign: 'right',
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.03)',
    color: 'inherit'
  }
};
