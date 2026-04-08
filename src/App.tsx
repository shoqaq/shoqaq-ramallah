// @ts-nocheck
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Phone,
  Instagram,
  LogOut,
  PlusCircle,
  LayoutDashboard,
  Building2,
  ClipboardEdit,
  Plus,
  Sun,
  Moon,
  Lock,
  X,
  Trash2,
  Save
} from 'lucide-react';

// --- إعدادات الربط ---
const supabaseUrl = 'https://ohomklxgvyzwjexkvzfc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  // الحالات الأصلية من كودك
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // حالات الربط (المحرك الخلفي)
  const [adminView, setAdminView] = useState('main'); // main, add, list
  const [listings, setListings] = useState([]);
  const [newProperty, setNewProperty] = useState({ property_name: '', category: 'شقة' });

  const whatsappLink = 'https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d';
  const logoUrl = 'https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg';

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // جلب البيانات
  const fetchListings = async () => {
    const { data } = await supabase.from('listings').select('*').order('id', { ascending: false });
    if (data) setListings(data);
  };

  useEffect(() => { fetchListings(); }, []);

  const handleLogin = () => {
    if (password === '749329') {
      setIsLoggedIn(true);
      setShowLogin(false);
      setPassword('');
    }
  };

  const handleSave = async () => {
    if (!newProperty.property_name.trim()) return;
    const { error } = await supabase.from('listings').insert([newProperty]);
    if (!error) {
      setNewProperty({ property_name: '', category: 'شقة' });
      setAdminView('main');
      fetchListings();
    }
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    subText: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#262626' : '#E5E7EB',
    cardBg: isDarkMode ? '#0A0A0A' : '#FFFFFF',
    iconBox: isDarkMode ? '#0A0A0A' : '#F9FAFB',
    shadow: isDarkMode ? '0 8px 30px rgba(255,255,255,0.03)' : '0 10px 20px rgba(0,0,0,0.08)',
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      
      {/* زر الثيم */}
      <div style={s.themeToggleWrap}>
        <button onClick={toggleTheme} style={{ ...s.themeBtn, border: `1.5px solid ${theme.border}`, color: theme.text, backgroundColor: theme.iconBox }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.mainWrapper}>
        {/* الهوية البصرية */}
        <div style={s.identity}>
          <div onClick={() => { setShowLogin(!showLogin); setPassword(''); }} style={{ ...s.logoWrap, border: `2px solid ${theme.border}`, boxShadow: theme.shadow }}>
            <img src={logoUrl} alt="Logo" style={s.logoImg} />
          </div>
          <h1 style={s.title}>أهلاً بكم في <span style={{ color: '#f59e0b' }}>شقق رام الله</span></h1>
          <p style={{ ...s.sub, color: theme.subText }}>تابعونا ليصلكم كل جديد</p>
        </div>

        {/* أيكونات التواصل (كما في كودك الأصلي) */}
        {!isLoggedIn && !showLogin && (
          <div style={s.grid}>
            <a href={whatsappLink} target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
              <Phone size={24} color="#25D366" />
            </a>
            <a href="tel:+970594560056" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
              <Phone size={24} color="#34A853" />
            </a>
            <a href="https://facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
              <Instagram size={24} color="#e1306c" />
            </a>
          </div>
        )}

        {/* لوحة التحكم أو أزرار الخدمات */}
        {isLoggedIn ? (
          <div style={{ ...s.admin, border: `2px solid ${theme.border}`, backgroundColor: theme.cardBg, boxShadow: theme.shadow }}>
            {adminView === 'main' ? (
              <>
                <div style={s.adminHeader}>
                  <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#f59e0b' }}>لوحة التحكم</h2>
                  <button onClick={() => setIsLoggedIn(false)} style={{ ...s.logoutBtn, color: theme.subText }}><LogOut size={22} /></button>
                </div>
                <button onClick={() => setAdminView('add')} style={{ ...s.adminAction, color: theme.text, borderColor: theme.border }}><PlusCircle size={20} /> إضافة عقار جديد</button>
                <button onClick={() => setAdminView('list')} style={{ ...s.adminAction, color: theme.text, borderColor: theme.border }}><LayoutDashboard size={20} /> إدارة القائمة ({listings.length})</button>
              </>
            ) : adminView === 'add' ? (
              <div>
                <div style={s.adminHeader}><h3>إضافة عقار</h3> <X size={20} onClick={() => setAdminView('main')} style={{ cursor: 'pointer' }} /></div>
                <input style={{ ...s.input, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }} placeholder="اسم العقار" value={newProperty.property_name} onChange={e => setNewProperty({...newProperty, property_name: e.target.value})} />
                <select style={{ ...s.input, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }} value={newProperty.category} onChange={e => setNewProperty({...newProperty, category: e.target.value})}>
                  <option>شقة</option><option>أرض</option><option>فيلا</option>
                </select>
                <button onClick={handleSave} style={s.loginBtn}>حفظ البيانات</button>
              </div>
            ) : (
              <div>
                <div style={s.adminHeader}><h3>إدارة القائمة</h3> <X size={20} onClick={() => setAdminView('main')} style={{ cursor: 'pointer' }} /></div>
                <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                  {listings.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
                      <span>{item.property_name}</span>
                      <Trash2 size={18} color="#ef4444" style={{ cursor: 'pointer' }} onClick={async () => { await supabase.from('listings').delete().eq('id', item.id); fetchListings(); }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : !showLogin ? (
          <div style={s.services}>
            {[
              { icon: <Building2 size={32} color="#f59e0b" />, text: 'عرض الشقق المتوفرة' },
              { icon: <ClipboardEdit size={32} color="#f59e0b" />, text: 'تقديم طلب' },
              { icon: <Plus size={32} color="#f59e0b" />, text: 'عرض عقار على الصفحة' },
            ].map((item, index) => (
              <button
                key={index}
                style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, boxShadow: theme.shadow, color: theme.text }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#f59e0b'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.borderColor = theme.border; }}
              >
                {item.icon}
                <span style={s.serviceText}>{item.text}</span>
              </button>
            ))}
          </div>
        ) : (
          /* صندوق تسجيل الدخول */
          <div style={{ ...s.loginBox, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
            <div style={s.loginHeader}><Lock size={18} color="#f59e0b" /> <span style={{ fontWeight: 700 }}>دخول الإدارة</span></div>
            <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} style={{ ...s.input, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }} autoFocus />
            <button onClick={handleLogin} style={s.loginBtn}>دخول</button>
          </div>
        )}
      </div>

      <footer style={{ ...s.footer, color: theme.subText }}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

const s = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', direction: 'rtl', fontFamily: 'system-ui, sans-serif', padding: '25px', transition: '0.3s ease', boxSizing: 'border-box' },
  mainWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '-8vh' },
  themeToggleWrap: { position: 'absolute', top: '25px', left: '25px' },
  themeBtn: { cursor: 'pointer', borderRadius: '14px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' },
  identity: { textAlign: 'center', marginBottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  logoWrap: { cursor: 'pointer', marginBottom: '15px', borderRadius: '26px', overflow: 'hidden', width: '110px', height: '110px', transition: '0.3s ease' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '1.9rem', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' },
  sub: { marginTop: '5px', fontSize: '1.1rem', fontWeight: '600' },
  grid: { display: 'flex', gap: '12px', marginBottom: '35px', justifyContent: 'center' },
  box: { width: '52px', height: '52px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s ease' },
  services: { display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '390px' },
  serviceCard: { display: 'flex', alignItems: 'center', gap: '20px', padding: '22px 24px', borderRadius: '22px', cursor: 'pointer', transition: '0.25s ease', outline: 'none' },
  serviceText: { fontSize: '1.15rem', fontWeight: '700' },
  loginBox: { width: '100%', maxWidth: '320px', borderRadius: '24px', padding: '20px', marginBottom: '25px', textAlign: 'center' },
  loginHeader: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '15px' },
  input: { width: '100%', borderRadius: '14px', padding: '12px', outline: 'none', fontSize: '1rem', marginBottom: '10px', textAlign: 'center', boxSizing: 'border-box' },
  loginBtn: { width: '100%', backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '14px', padding: '12px', cursor: 'pointer', fontWeight: '700' },
  admin: { width: '340px', borderRadius: '24px', padding: '24px' },
  adminHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  adminAction: { width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '14px', backgroundColor: 'transparent', border: '1px solid', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  logoutBtn: { background: 'none', border: 'none', cursor: 'pointer' },
  footer: { position: 'fixed', bottom: '20px', fontSize: '10px', opacity: 0.7, letterSpacing: '1px', fontWeight: '700' },
};
