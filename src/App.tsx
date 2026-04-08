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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [adminView, setAdminView] = useState('main'); 
  const [listings, setListings] = useState([]);
  const [newProperty, setNewProperty] = useState({ property_name: '', category: 'شقة' });

  const whatsappLink = 'https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d';
  const logoUrl = 'https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg';

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
      <div style={s.themeToggleWrap}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, border: `1.5px solid ${theme.border}`, color: theme.text, backgroundColor: theme.iconBox }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.mainWrapper}>
        <div style={s.identity}>
          <div onClick={() => { setShowLogin(!showLogin); setPassword(''); }} style={{ ...s.logoWrap, border: `2px solid ${theme.border}`, boxShadow: theme.shadow }}>
            <img src={logoUrl} alt="Logo" style={s.logoImg} />
          </div>
          <h1 style={s.title}>أهلاً بكم في <span style={{ color: '#f59e0b' }}>شقق رام الله</span></h1>
          <p style={{ ...s.sub, color: theme.subText }}>تابعونا ليصلكم كل جديد</p>
        </div>

        {!isLoggedIn && !showLogin && (
          <div style={s.grid}>
            {/* الواتساب الأخضر */}
            <a href={whatsappLink} target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
              <svg width="26" height="26" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
            </a>
            {/* الهاتف */}
            <a href="tel:+970594560056" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
              <Phone size={24} color="#34A853" />
            </a>
            {/* التيك توك */}
            <a href="https://tiktok.com/@shoqaq.ramallah" target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
              <svg width="22" height="22" fill={isDarkMode ? "#FFFFFF" : "#000000"} viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.34 6.34 0 0 1-2.12-1.92l-.01 6.2c-.01 2.35-.91 4.58-2.6 6.13-1.8 1.64-4.32 2.44-6.7 2.18-2.52-.27-4.83-1.86-5.96-4.13-1.2-2.39-1.07-5.46.43-7.72 1.41-2.13 3.86-3.48 6.42-3.48.45 0 .91.03 1.36.1v4.02c-.45-.11-.91-.17-1.37-.16-1.27.01-2.52.59-3.28 1.6-.79 1.05-1.01 2.49-.6 3.75.38 1.17 1.34 2.12 2.5 2.5 1.15.39 2.45.19 3.42-.53.94-.7 1.48-1.78 1.48-2.96V.02z"/></svg>
            </a>
            {/* فيسبوك */}
            <a href="https://facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            {/* إنستغرام */}
            <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
              <Instagram size={24} color="#e1306c" />
            </a>
          </div>
        )}

        {isLoggedIn ? (
          <div style={{ ...s.admin, border: `2px solid ${theme.border}`, backgroundColor: theme.cardBg, boxShadow: theme.shadow }}>
            {adminView === 'main' ? (
              <>
                <div style={s.adminHeader}><h2>لوحة التحكم</h2> <button onClick={() => setIsLoggedIn(false)} style={s.logoutBtn}><LogOut size={22} color={theme.subText} /></button></div>
                <button onClick={() => setAdminView('add')} style={{ ...s.adminAction, color: theme.text, borderColor: theme.border }}><PlusCircle size={20} /> إضافة عقار جديد</button>
                <button onClick={() => setAdminView('list')} style={{ ...s.adminAction, color: theme.text, borderColor: theme.border }}><LayoutDashboard size={20} /> إدارة القائمة ({listings.length})</button>
              </>
            ) : adminView === 'add' ? (
              <div>
                <div style={s.adminHeader}><h3>إضافة عقار</h3> <X size={20} onClick={() => setAdminView('main')} style={{ cursor: 'pointer' }} /></div>
                <input style={{ ...s.input, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }} placeholder="اسم العقار" value={newProperty.property_name} onChange={e => setNewProperty({...newProperty, property_name: e.target.value})} />
                <button onClick={handleSave} style={s.loginBtn}>حفظ</button>
              </div>
            ) : (
              <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                <div style={s.adminHeader}><h3>القائمة</h3> <X size={20} onClick={() => setAdminView('main')} /></div>
                {listings.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
                    <span>{item.property_name}</span>
                    <Trash2 size={18} color="#ef4444" style={{ cursor: 'pointer' }} onClick={async () => { await supabase.from('listings').delete().eq('id', item.id); fetchListings(); }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : !showLogin && (
          <div style={s.services}>
            {[
              { icon: <Building2 size={32} color="#f59e0b" />, text: 'عرض الشقق المتوفرة' },
              { icon: <ClipboardEdit size={32} color="#f59e0b" />, text: 'تقديم طلب' },
              { icon: <Plus size={32} color="#f59e0b" />, text: 'عرض عقار على الصفحة' },
            ].map((item, index) => (
              <button key={index} style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, boxShadow: theme.shadow, color: theme.text }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#f59e0b'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.borderColor = theme.border; }}>
                {item.icon} <span style={s.serviceText}>{item.text}</span>
              </button>
            ))}
          </div>
        )}

        {showLogin && !isLoggedIn && (
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
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', direction: 'rtl', fontFamily: 'system-ui, sans-serif', padding: '25px' },
  mainWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '-8vh' },
  themeToggleWrap: { position: 'absolute', top: '25px', left: '25px' },
  themeBtn: { cursor: 'pointer', borderRadius: '14px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  identity: { textAlign: 'center', marginBottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  logoWrap: { cursor: 'pointer', marginBottom: '15px', borderRadius: '26px', overflow: 'hidden', width: '110px', height: '110px' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '1.9rem', fontWeight: '800', margin: 0 },
  sub: { marginTop: '5px', fontSize: '1.1rem', fontWeight: '600' },
  grid: { display: 'flex', gap: '12px', marginBottom: '35px', justifyContent: 'center' },
  box: { width: '52px', height: '52px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s ease' },
  services: { display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '390px' },
  serviceCard: { display: 'flex', alignItems: 'center', gap: '20px', padding: '22px 24px', borderRadius: '22px', cursor: 'pointer', transition: '0.25s ease', outline: 'none' },
  serviceText: { fontSize: '1.15rem', fontWeight: '700' },
  loginBox: { width: '100%', maxWidth: '320px', borderRadius: '24px', padding: '20px', textAlign: 'center' },
  loginHeader: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '15px' },
  input: { width: '100%', borderRadius: '14px', padding: '12px', outline: 'none', marginBottom: '10px', textAlign: 'center', boxSizing: 'border-box' },
  loginBtn: { width: '100%', backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '14px', padding: '12px', cursor: 'pointer', fontWeight: '700' },
  admin: { width: '340px', borderRadius: '24px', padding: '24px' },
  adminHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  adminAction: { width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '14px', background: 'transparent', border: '1px solid', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: '600' },
  logoutBtn: { background: 'none', border: 'none', cursor: 'pointer' },
  footer: { position: 'fixed', bottom: '20px', fontSize: '10px', opacity: 0.7, fontWeight: '700' },
};
