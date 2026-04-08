// @ts-nocheck
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Phone, Instagram, LogOut, PlusCircle, LayoutDashboard,
  Building2, ClipboardEdit, Plus, Sun, Moon, Lock, CheckCircle2, X, Save, Trash2
} from 'lucide-react';

// --- 1. إعدادات الاتصال بـ Supabase ---
const supabaseUrl = 'https://ohomklxgvyzwjexkvzfc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  // --- 2. الحالات (States) ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [dbStatus, setDbStatus] = useState('connecting');
  const [view, setView] = useState('home'); // home, add, manage
  const [listings, setListings] = useState([]);

  // حالة نموذج الإضافة
  const [form, setForm] = useState({
    location: '', price: '', category: 'شقة', listing_type: 'للبيع',
    currency: 'دولار', area: '', area_unit: 'متر مربع', internal_name: ''
  });

  const whatsappLink = 'https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d';
  const logoUrl = 'https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg';

  // --- 3. الوظائف (Functions) ---
  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    try {
      const { error } = await supabase.from('listings').select('id').limit(1);
      setDbStatus(error ? 'error' : 'connected');
    } catch { setDbStatus('error'); }
  }

  const loadListings = async () => {
    const { data, error } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (!error) setListings(data);
  };

  const handleLogin = () => {
    if (password === '749329') {
      setIsLoggedIn(true);
      setShowLogin(false);
      setPassword('');
    }
  };

  const handleSave = async () => {
    if (!form.location || !form.price) return alert("يرجى ملء الحقول الأساسية");
    
    const { error } = await supabase.from('listings').insert([{
      ...form,
      price: parseFloat(form.price),
      area: parseFloat(form.area) || 0
    }]);

    if (!error) {
      alert("✅ تم الحفظ بنجاح");
      setForm({ location: '', price: '', category: 'شقة', listing_type: 'للبيع', currency: 'دولار', area: '', area_unit: 'متر مربع', internal_name: '' });
      setView('home');
    } else {
      alert("❌ خطأ: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("حذف العقار؟")) {
      const { error } = await supabase.from('listings').delete().eq('id', id);
      if (!error) loadListings();
    }
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    subText: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#262626' : '#E5E7EB',
    cardBg: isDarkMode ? '#0A0A0A' : '#FFFFFF',
    iconBox: isDarkMode ? '#0A0A0A' : '#F9FAFB',
    inputBg: isDarkMode ? (isDarkMode ? '#111111' : '#F9FAFB') : '#F9FAFB'
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      
      {/* زر الثيم */}
      <div style={s.themeToggleWrap}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, border: `1.5px solid ${theme.border}`, color: theme.text, backgroundColor: theme.iconBox }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.mainWrapper}>
        <div style={s.identity}>
          <div onClick={() => { setShowLogin(!showLogin); setPassword(''); }} style={{ ...s.logoWrap, border: `2px solid ${theme.border}` }}>
            <img src={logoUrl} alt="Logo" style={s.logoImg} />
          </div>
          <h1 style={s.title}>شقق <span style={{ color: '#f59e0b' }}>رام الله</span></h1>
        </div>

        {/* --- لوحة الإدارة --- */}
        {isLoggedIn ? (
          <div style={{ width: '100%', maxWidth: '400px' }}>
            
            {view === 'home' && (
              <div style={{ ...s.adminCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}` }}>
                <div style={s.adminHeader}>
                  <h2 style={{ color: '#f59e0b', margin: 0 }}>لوحة التحكم</h2>
                  <LogOut onClick={() => setIsLoggedIn(false)} size={20} style={{ cursor: 'pointer' }} />
                </div>
                <button onClick={() => setView('add')} style={{ ...s.adminAction, color: theme.text, borderColor: theme.border }}><PlusCircle size={20} /> إضافة عقار جديد</button>
                <button onClick={() => { setView('manage'); loadListings(); }} style={{ ...s.adminAction, color: theme.text, borderColor: theme.border }}><LayoutDashboard size={20} /> إدارة القائمة</button>
              </div>
            )}

            {view === 'add' && (
              <div style={{ ...s.adminCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}` }}>
                <div style={s.adminHeader}><h3>عقار جديد</h3> <X onClick={() => setView('home')} style={{ cursor: 'pointer' }} /></div>
                <input style={{ ...s.input, backgroundColor: theme.iconBox, color: theme.text, borderColor: theme.border }} placeholder="الموقع" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="number" style={{ ...s.input, flex: 2, backgroundColor: theme.iconBox, color: theme.text, borderColor: theme.border }} placeholder="السعر" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                  <select style={{ ...s.input, flex: 1, backgroundColor: theme.iconBox, color: theme.text, borderColor: theme.border }} value={form.currency} onChange={e => setForm({...form, currency: e.target.value})}>
                    <option>دولار</option><option>دينار</option><option>شيكل</option>
                  </select>
                </div>
                <select style={{ ...s.input, backgroundColor: theme.iconBox, color: theme.text, borderColor: theme.border }} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                  <option>شقة</option><option>أرض</option><option>مكتب</option><option>محل</option>
                </select>
                <button onClick={handleSave} style={s.loginBtn}><Save size={18} /> حفظ العقار</button>
              </div>
            )}

            {view === 'manage' && (
              <div style={{ ...s.adminCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}` }}>
                <div style={s.adminHeader}><h3>إدارة القائمة</h3> <X onClick={() => setView('home')} style={{ cursor: 'pointer' }} /></div>
                {listings.map(item => (
                  <div key={item.id} style={{ ...s.listRow, borderBottom: `1px solid ${theme.border}` }}>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <div style={{ fontWeight: '700' }}>{item.location}</div>
                      <div style={{ fontSize: '12px', color: '#f59e0b' }}>{item.price} {item.currency}</div>
                    </div>
                    <Trash2 size={18} color="#ef4444" onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer' }} />
                  </div>
                ))}
              </div>
            )}

          </div>
        ) : (
          /* --- واجهة الزوار --- */
          <div style={{ width: '100%', maxWidth: '380px' }}>
            {showLogin ? (
              <div style={{ ...s.adminCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}` }}>
                <div style={s.loginHeader}><Lock size={18} color="#f59e0b" /><span>دخول الإدارة</span></div>
                <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} style={{ ...s.input, backgroundColor: theme.iconBox, color: theme.text, borderColor: theme.border }} />
                <button onClick={handleLogin} style={s.loginBtn}>دخول</button>
              </div>
            ) : (
              <div style={s.services}>
                <div style={s.grid}>
                   <a href={whatsappLink} target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}>
                      <svg width="24" height="24" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/></svg>
                   </a>
                   <a href="tel:+970594560056" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}><Phone size={24} color="#34A853" /></a>
                   <a href="https://facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                </div>
                {[ { i: <Building2 />, t: 'عرض الشقق المتوفرة' }, { i: <ClipboardEdit />, t: 'تقديم طلب' }, { i: <Plus />, t: 'عرض عقار على الصفحة' } ].map((item, idx) => (
                  <button key={idx} style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
                    <div style={{color: '#f59e0b'}}>{item.i}</div> <span style={s.serviceText}>{item.t}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <footer style={{ ...s.footer, color: theme.subText }}>shoqaq.ramallah • 2026</footer>
    </div>
  );
}

const s = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', direction: 'rtl', fontFamily: 'system-ui', padding: '20px' },
  mainWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '5vh' },
  themeToggleWrap: { position: 'absolute', top: '20px', left: '20px' },
  themeBtn: { cursor: 'pointer', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  identity: { textAlign: 'center', marginBottom: '30px' },
  logoWrap: { cursor: 'pointer', borderRadius: '24px', overflow: 'hidden', width: '90px', height: '90px', margin: '0 auto 15px' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '1.7rem', fontWeight: '800', margin: 0 },
  grid: { display: 'flex', gap: '10px', marginBottom: '25px', justifyContent: 'center' },
  box: { width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  services: { display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' },
  serviceCard: { display: 'flex', alignItems: 'center', gap: '15px', padding: '18px', borderRadius: '18px', cursor: 'pointer', textAlign: 'right' },
  serviceText: { fontSize: '1rem', fontWeight: '700' },
  adminCard: { padding: '20px', borderRadius: '24px', width: '100%', boxSizing: 'border-box' },
  adminHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  adminAction: { width: '100%', padding: '14px', marginBottom: '10px', borderRadius: '12px', border: '1px solid', display: 'flex', gap: '10px', cursor: 'pointer', background: 'none', fontWeight: '600' },
  input: { width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid', marginBottom: '10px', boxSizing: 'border-box', outline: 'none' },
  loginBtn: { width: '100%', backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '12px', padding: '14px', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  loginHeader: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '15px', fontWeight: '700' },
  listRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' },
  footer: { position: 'fixed', bottom: '15px', fontSize: '10px', fontWeight: '700' }
};
