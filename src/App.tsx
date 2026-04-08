// @ts-nocheck
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Phone, Instagram, LogOut, PlusCircle, LayoutDashboard,
  Building2, ClipboardEdit, Plus, Sun, Moon, Lock, CheckCircle2, X, Save, Trash2
} from 'lucide-react';

const supabaseUrl = 'https://ohomklxgvyzwjexkvzfc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [view, setView] = useState('home'); // التأكد من أن الحالة الافتراضية هي home
  const [listings, setListings] = useState([]);

  const [form, setForm] = useState({
    location: '', price: '', category: 'شقة', listing_type: 'للبيع',
    currency: 'دولار', area: '', area_unit: 'متر مربع'
  });

  const whatsappLink = 'https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d';
  const logoUrl = 'https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg';

  const handleLogin = () => {
    if (password === '749329') {
      setIsLoggedIn(true);
      setShowLogin(false);
      setView('home'); // نضمن العودة للشاشة الرئيسية للإدارة بعد الدخول
    } else {
      alert("كلمة المرور غير صحيحة");
    }
  };

  const loadListings = async () => {
    const { data, error } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (!error) setListings(data);
  };

  const handleSave = async () => {
    if (!form.location || !form.price) return alert("يرجى إدخال الموقع والسعر");
    const { error } = await supabase.from('listings').insert([{ ...form, price: parseFloat(form.price) }]);
    if (!error) {
      alert("✅ تم الحفظ");
      setView('home');
    }
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    border: isDarkMode ? '#262626' : '#E5E7EB',
    cardBg: isDarkMode ? '#0A0A0A' : '#FFFFFF',
    iconBox: isDarkMode ? '#0A0A0A' : '#F9FAFB',
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      
      {/* زر الوضع الليلي */}
      <div style={s.themeToggleWrap}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, border: `1px solid ${theme.border}`, color: theme.text, backgroundColor: theme.iconBox }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.mainWrapper}>
        <div style={s.identity}>
          <div onClick={() => { if(!isLoggedIn) setShowLogin(!showLogin); }} style={{ ...s.logoWrap, border: `2px solid ${theme.border}` }}>
            <img src={logoUrl} alt="Logo" style={s.logoImg} />
          </div>
          <h1 style={s.title}>شقق <span style={{ color: '#f59e0b' }}>رام الله</span></h1>
        </div>

        {isLoggedIn ? (
          <div style={{ width: '100%', maxWidth: '400px' }}>
            
            {/* 1. قائمة الخيارات الرئيسية للإدارة */}
            {view === 'home' && (
              <div style={{ ...s.adminCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}` }}>
                <div style={s.adminHeader}>
                  <h2 style={{ color: '#f59e0b', margin: 0 }}>لوحة التحكم</h2>
                  <LogOut onClick={() => setIsLoggedIn(false)} size={20} style={{ cursor: 'pointer' }} />
                </div>
                <button onClick={() => setView('add')} style={{ ...s.adminAction, color: theme.text, borderColor: theme.border }}>
                  <PlusCircle size={20} /> إضافة عقار جديد
                </button>
                <button onClick={() => { setView('manage'); loadListings(); }} style={{ ...s.adminAction, color: theme.text, borderColor: theme.border }}>
                  <LayoutDashboard size={20} /> إدارة القائمة
                </button>
              </div>
            )}

            {/* 2. شاشة إضافة عقار */}
            {view === 'add' && (
              <div style={{ ...s.adminCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}` }}>
                <div style={s.adminHeader}><h3>إضافة عقار</h3> <X onClick={() => setView('home')} style={{ cursor: 'pointer' }} /></div>
                <input style={{ ...s.input, backgroundColor: theme.bg, color: theme.text, borderColor: theme.border }} placeholder="الموقع" onChange={e => setForm({...form, location: e.target.value})} />
                <input type="number" style={{ ...s.input, backgroundColor: theme.bg, color: theme.text, borderColor: theme.border }} placeholder="السعر" onChange={e => setForm({...form, price: e.target.value})} />
                <button onClick={handleSave} style={s.loginBtn}><Save size={18} /> حفظ البيانات</button>
              </div>
            )}

            {/* 3. شاشة إدارة القائمة */}
            {view === 'manage' && (
              <div style={{ ...s.adminCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}` }}>
                <div style={s.adminHeader}><h3>قائمة العقارات</h3> <X onClick={() => setView('home')} style={{ cursor: 'pointer' }} /></div>
                {listings.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #333' }}>
                    <span>{item.location} - {item.price}$</span>
                    <Trash2 size={18} color="#ef4444" style={{cursor: 'pointer'}} onClick={async () => {
                      await supabase.from('listings').delete().eq('id', item.id);
                      loadListings();
                    }} />
                  </div>
                ))}
              </div>
            )}

          </div>
        ) : (
          /* واجهة تسجيل الدخول والزوار (تبقى كما هي في كودك) */
          showLogin ? (
            <div style={{ ...s.adminCard, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
              <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} style={{ ...s.input, backgroundColor: theme.iconBox, color: theme.text }} />
              <button onClick={handleLogin} style={s.loginBtn}>دخول</button>
            </div>
          ) : (
            <div style={s.services}>
               {/* أزرار التواصل الخاصة بك */}
               <div style={{textAlign: 'center', marginBottom: '20px', color: theme.text}}>يرجى تسجيل الدخول للإدارة</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

const s = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', direction: 'rtl', padding: '20px' },
  mainWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  logoWrap: { cursor: 'pointer', borderRadius: '24px', overflow: 'hidden', width: '90px', height: '90px', marginBottom: '15px' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '1.7rem', fontWeight: '800' },
  adminCard: { padding: '20px', borderRadius: '24px', width: '100%' },
  adminHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  adminAction: { width: '100%', padding: '15px', marginBottom: '10px', borderRadius: '12px', border: '1px solid', display: 'flex', gap: '10px', cursor: 'pointer', background: 'none' },
  input: { width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid', marginBottom: '10px', boxSizing: 'border-box' },
  loginBtn: { width: '100%', backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '12px', padding: '14px', cursor: 'pointer', fontWeight: 'bold' },
  themeToggleWrap: { position: 'absolute', top: '20px', left: '20px' },
  themeBtn: { cursor: 'pointer', borderRadius: '12px', width: '40px', height: '40px' }
};
