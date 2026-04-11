// ابحث عن هذه القيم في ملف styles.js وقم بتحديثها:

  container: { 
    minHeight: '100vh', 
    direction: 'rtl', 
    fontFamily: 'system-ui, sans-serif', 
    display: 'flex',        // أضفنا هذا
    alignItems: 'center',    // توسيط عمودي
    justifyContent: 'center', // توسيط أفقي
    padding: '20px',
    boxSizing: 'border-box'
  },

  wrapper: { 
    width: '100%', 
    maxWidth: '400px', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center' // يضمن بقاء العناصر في المنتصف داخل الـ wrapper
  },

  identity: { 
    textAlign: 'center', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '40px', // زيادة المسافة قليلاً للراحة
    width: '100%'
  },

  logoWrap: { 
    width: '100px', // كبّرنا اللوجو قليلاً ليعطي هيبة للموقع
    height: '100px', 
    borderRadius: '28px', // حواف أنعم
    overflow: 'hidden', 
    marginBottom: '15px', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s' // تأثير خفيف عند الضغط
  },

  grid: { 
    display: 'flex', 
    justifyContent: 'center', // توسيط أيقونات التواصل
    gap: '15px', 
    marginBottom: '40px',
    width: '100%'
  },
