// تأكد من وجود تعريف واحد فقط لـ s
export const s = {
  // ... كل الستايلات القديمة الخاصة بك (container, wrapper, card, إلخ) ...
  // تأكد من بقاء الستايلات القديمة هنا ولا تحذفها
  
  container: {
    width: '100%',
    minHeight: '100vh',
    padding: '20px',
    boxSizing: 'border-box'
  },

  // أضف الستايلات الجديدة هنا في النهاية (قبل إغلاق القوس الأخير)
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
    textAlign: 'right',
    backgroundColor: '#f3f4f6', // لون افتراضي، سيتغير حسب الثيم
    color: '#111827'
  },

  saveBtn: {
    width: '100%',
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
    fontSize: '1.1rem',
    backgroundColor: '#f59e0b'
  },

  topNav: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px'
  },

  themeBtn: {
    padding: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}; // تأكد من وجود هذا القوس مرة واحدة فقط في نهاية الملف
