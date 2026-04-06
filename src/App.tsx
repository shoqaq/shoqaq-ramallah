<input
  type="tel" // يفتح لوحة الأرقام في معظم الهواتف
  inputMode="numeric" // تأكيد إضافي للمتصفحات الحديثة لإظهار الأرقام
  placeholder="كلمة المرور"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
  style={{
    ...s.input,
    backgroundColor: theme.iconBox,
    border: `1px solid ${theme.border}`,
    color: theme.text,
    WebkitTextSecurity: 'disc' // هذا السطر ضروري لجعل الأرقام تظهر كنقاط (مثل كلمة المرور)
  }}
  autoFocus
/>
