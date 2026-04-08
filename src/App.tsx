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
  Save,
  Trash2
} from 'lucide-react';

// --- إعدادات الربط (نفس مفاتيحك) ---
const supabaseUrl = 'https://ohomklxgvyzwjexkvzfc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  // الحالات الأصلية
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // حالات الربط (بدون تغيير التصميم)
  const [view, setView] = useState('main'); // main, add, manage
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({ property_name: '', category: 'شقة' });

  const whatsappLink = 'https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d';
  const logoUrl = 'https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg';

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // وظائف الربط
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
    const { error } = await supabase.from('listings').insert([form]);
    if (!error) {
      alert("✅ تم الحفظ");
      setForm({ property_name: '', category: 'شقة' });
      setView('main');
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
      <div style={s.themeToggleWrap}>
        <button onClick={toggleTheme} style={{ ...s.themeBtn, border: `1.5px solid ${theme.border}`, color: theme.text, backgroundColor: theme.iconBox }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.mainWrapper}>
        {/* الهوية البصرية الأصلية */}
        <div style={s.identity}>
          <div onClick={() => { setShowLogin(!showLogin); setPassword(''); }} style={{ ...s.logoWrap, border: `2px solid ${theme.border}`, boxShadow: theme.shadow }}>
            <img src={logoUrl} alt="Logo" style={s.logoImg} />
          </div>
          <h1 style={s.title}>أهلاً بكم في <span style={{ color: '#f59e0b' }}>شقق رام الله</span></h1>
          <p style={{ ...s.sub, color: theme.subText }}>تابعونا ليصلكم كل جديد</p>
        </div>

        {/* الواجهة الأصلية للزوار */}
        {!isLoggedIn && !showLogin && (
          <>
            <div style={s.grid}>
              <a href={whatsappLink} target="_blank" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}>
                <svg width="24" height="24" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
              </a>
              <a href="tel:+970594560056" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}><Phone size={24} color="#34A853" /></a>
              <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}><Instagram size={24} color="#e1306c" /></a>
            </div>

            <div style={s.services}>
              <button style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
                <Building2 size={32} color="#f59e0b" /> <span style={s.serviceText}>عرض الشقق المتوفرة</span>
              </button>
              <button style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
                <ClipboardEdit size={32} color="#f59e0b" /> <span style={s.serviceText}>تقديم طلب</span>
              </button>
            </div>
          </>
        )}

        {/* نموذج الدخول الأصلي */}
        {showLogin && !isLoggedIn && (
          <div style={{ ...s.loginBox, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
            <div style={s.loginHeader}><Lock size={18} color="#f59e0b" /> <span style={{ fontWeight: 700 }}>دخول الإدارة</span></div>
            <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} style={{ ...s.input, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }} />
            <button onClick={handleLogin} style={s.loginBtn}>دخول</button>
          </div>
        )}

        {/* لوحة التحكم مع الحفاظ على التصميم */}
        {isLoggedIn && (
          <div style={{ ...s.admin, border: `2px solid ${theme.border}`, backgroundColor: theme.cardBg }}>
            {view === 'main' ? (
              <>
                <div style={s.adminHeader}>
                  <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#f59e0b' }}>لوحة التحكم</h2>
                  <button onClick={() => setIsLoggedIn(false)} style={s.logoutBtn}><LogOut size={22} color={theme.subText} /></button>
                </div>
                <button onClick={() => setView('add')} style={{ ...s.adminAction, color: theme.text, borderColor: theme.border }}><PlusCircle size={20} /> إضافة عقار جديد</button>
                <button onClick={() => setView('manage')} style={{ ...s.adminAction, color: theme.text, borderColor: theme.border }}><LayoutDashboard size={20} /> إدارة القائمة ({listings.length})</button>
              </>
            ) : view === 'add' ? (
              <div>
                <div style={s.adminHeader}><h3>إضافة عقار</h3> <X onClick={() => setView('main')} style={{ cursor: 'pointer' }} /></div>
                <input style={{ ...s.input, backgroundColor: theme.iconBox, color: theme.text }} placeholder="اسم العقار" value={form.property_name} onChange={e => setForm({ ...form, property_name: e.target.value })} />
                <select style={{ ...s.input, backgroundColor: theme.iconBox, color: theme.text }} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option>شقة</option><option>أرض</option><option>فيلا</option>
                </select>
                <button onClick={handleSave} style={s.loginBtn}><Save size={18} /> حفظ</button>
              </div>
            ) : (
              <div>
                <div style={s.adminHeader}><h3>القائمة</h3> <X onClick={() => setView('main')} style={{ cursor: 'pointer' }} /></div>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {listings.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
                      <span>{item.property_name}</span>
                      <Trash2 size={18} color="#ef4444" onClick={async () => { await supabase.from('listings').delete().eq('id', item.id); fetchListings(); }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <footer style={{ ...s.footer, color: theme.subText }}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

// التنسيقات (نفس الكود الأصلي الذي أرسلته أنت)
const s = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', direction: 'rtl', fontFamily: 'system-ui, sans-serif', padding: '25px', boxSizing: 'border-box' },
  mainWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingTop: '40px' },
  themeToggleWrap: { position: 'absolute', top: '25px', left: '25px' },
  themeBtn: { cursor: 'pointer', borderRadius: '14px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' },
  identity: { textAlign: 'center', marginBottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  logoWrap: { cursor: 'pointer', marginBottom: '12px', borderRadius: '26px', overflow: 'hidden', width: '110px', height: '110px' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '1.9rem', fontWeight: '800', margin: 0 },
  sub: { marginTop: '4px', fontSize: '1.1rem', fontWeight: '600' },
  grid: { display: 'flex', gap: '12px', marginBottom: '35px', justifyContent: 'center' },
  box: { width: '52px', height: '52px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  services: { display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '390px' },
  serviceCard: { display: 'flex', alignItems: 'center', gap: '20px', padding: '22px 24px', borderRadius: '22px', cursor: 'pointer', outline: 'none' },
  serviceText: { fontSize: '1.15rem', fontWeight: '700' },
  loginBox: { width: '100%', maxWidth: '320px', borderRadius: '24px', padding: '20px' },
  loginHeader: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '15px' },
  input: { width: '100%', borderRadius: '14px', padding: '12px', outline: 'none', marginBottom: '10px', textAlign: 'center', boxSizing: 'border-box' },
  loginBtn: { width: '100%', backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '14px', padding: '12px', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  admin: { width: '340px', borderRadius: '24px', padding: '24px' },
  adminHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  adminAction: { width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '14px', background: 'transparent', border: '1px solid', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  logoutBtn: { background: 'none', border: 'none', cursor: 'pointer' },
  footer: { position: 'fixed', bottom: '20px', fontSize: '10px', opacity: 0.7, fontWeight: '700' },
};
