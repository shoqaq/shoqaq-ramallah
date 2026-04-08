// @ts-nocheck
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Phone, Instagram, LogOut, PlusCircle, LayoutDashboard, Building2,
  ClipboardEdit, Plus, Sun, Moon, Lock, X, Trash2, Edit3, ExternalLink, MapPin
} from 'lucide-react';

// --- إعدادات Supabase ---
const supabaseUrl = 'https://ohomklxgvyzwjexkvzfc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag';
const supabase = createClient(supabaseUrl, supabaseKey);

const NEIGHBORHOODS = ['الماصيون', 'الطيرة', 'عين منجد', 'الإرسال', 'المصايف', 'حي النهضة', 'رام الله التحتا', 'وسط البلد', 'عين مصباح', 'البالوع', 'سطح مرحبا', 'بيتونيا', 'سردا', 'أبو قش', 'رافات', 'كفر عقب', 'منطقة أخرى'];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [view, setView] = useState('home'); // home, browse, admin_main, admin_add, admin_list
  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const initialPropertyState = { 
    internal_name: '', category: 'شقة', neighborhood: 'الماصيون',
    listing_type: 'للإيجار', price: '', currency: 'دولار',
    owner_phone: '', description: '', address: '', post_url: '', video_url: '', status: 'متاح'
  };

  const [newProperty, setNewProperty] = useState(initialPropertyState);

  const fetchListings = async () => {
    const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (data) setListings(data);
  };

  useEffect(() => { fetchListings(); }, []);

  const handleLogin = () => {
    if (password === '749329') { 
      setIsLoggedIn(true); 
      setShowLogin(false); 
      setPassword(''); 
      setView('admin_main');
    }
  };

  const handleSave = async () => {
    if (!newProperty.internal_name.trim()) return alert("يرجى إدخال الاسم");
    const dataToSave = { ...newProperty, price: parseInt(newProperty.price) || 0 };
    let error;
    if (editingId) {
      const { error: err } = await supabase.from('listings').update(dataToSave).eq('id', editingId);
      error = err;
    } else {
      const { error: err } = await supabase.from('listings').insert([dataToSave]);
      error = err;
    }
    if (!error) {
      alert("تم الحفظ");
      setNewProperty(initialPropertyState);
      setEditingId(null);
      setView('admin_list');
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
      
      {/* زر التبديل بين الوضع الليلي والنهاري */}
      <div style={s.themeToggleWrap}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, border: `1.5px solid ${theme.border}`, color: theme.text, backgroundColor: theme.iconBox }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.mainWrapper}>
        
        {/* الهوية البصرية (اللوجو والعنوان) */}
        <div style={s.identity}>
          <div onClick={() => { setShowLogin(true); setView('home'); }} style={{ ...s.logoWrap, border: `2px solid ${theme.border}`, boxShadow: theme.shadow }}>
            <img src="https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg" alt="Logo" style={s.logoImg} />
          </div>
          <h1 style={s.title}>شقق <span style={{ color: '#f59e0b' }}>رام الله</span></h1>
        </div>

        {/* --- المحتوى المتغير --- */}
        
        {/* 1. الشاشة الرئيسية (أزرار التواصل والخدمات) */}
        {view === 'home' && !showLogin && (
          <>
            <div style={s.grid}>
              <a href="https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}><Phone size={22} color="#25D366" /></a>
              <a href="tel:+970594560056" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}><Phone size={22} color="#34A853" /></a>
              <a href="https://facebook.com/shoqaq.store/" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}><Building2 size={22} color="#1877F2" /></a>
              <a href="https://instagram.com/shoqaq.ramallah/" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}><Instagram size={22} color="#e1306c" /></a>
            </div>

            <div style={s.services}>
              <button onClick={() => setView('browse')} style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
                <Building2 size={30} color="#f59e0b" /> <span style={s.serviceText}>عرض العقارات المتوفرة</span>
              </button>
              <button style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
                <ClipboardEdit size={30} color="#f59e0b" /> <span style={s.serviceText}>تقديم طلب بحث</span>
              </button>
              <button style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
                <Plus size={30} color="#f59e0b" /> <span style={s.serviceText}>عرض عقارك معنا</span>
              </button>
            </div>
          </>
        )}

        {/* 2. شاشة تصفح العقارات للجمهور */}
        {view === 'browse' && (
          <div style={s.fullWidth}>
            <div style={s.sectionHeader}>
              <button onClick={() => setView('home')} style={s.backBtn}><X size={20} /> رجوع</button>
              <h3 style={{margin:0}}>العقارات المتاحة</h3>
            </div>
            <div style={s.scrollArea}>
              {listings.map(item => (
                <div key={item.id} style={{ ...s.propCard, backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}>
                  <div style={s.cardHeader}>
                    <span style={s.priceTag}>{item.price} {item.currency}</span>
                    <span style={{opacity: 0.7}}>{item.category}</span>
                  </div>
                  <h4 style={{margin: '10px 0 5px'}}>{item.neighborhood} - {item.listing_type}</h4>
                  <p style={s.cardAddress}><MapPin size={14} /> {item.address || 'رام الله'}</p>
                  <p style={s.cardDesc}>{item.description}</p>
                  <div style={s.cardLinks}>
                    {item.post_url && <a href={item.post_url} target="_blank" style={s.linkBtn}>فيسبوك</a>}
                    {item.video_url && <a href={item.video_url} target="_blank" style={s.linkBtn}>تيك توك</a>}
                    <a href={`tel:${item.owner_phone || '+970594560056'}`} style={{...s.linkBtn, backgroundColor: '#34A853', color: '#fff'}}>اتصال</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. شاشة تسجيل الدخول */}
        {showLogin && (
          <div style={{ ...s.loginBox, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
            <div style={s.formHeader}><h3>دخول الإدارة</h3> <X onClick={() => setShowLogin(false)} /></div>
            <input type="password" style={s.input} placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} autoFocus />
            <button onClick={handleLogin} style={s.saveBtn}>دخول</button>
          </div>
        )}

        {/* 4. لوحة الإدارة */}
        {isLoggedIn && (
          <div style={{ ...s.adminPanel, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}` }}>
             {view === 'admin_main' && (
               <div style={s.adminMenu}>
                  <button onClick={() => {setEditingId(null); setNewProperty(initialPropertyState); setView('admin_add');}} style={s.menuBtn}><PlusCircle /> إضافة عقار جديد</button>
                  <button onClick={() => setView('admin_list')} style={s.menuBtn}><LayoutDashboard /> إدارة العقارات ({listings.length})</button>
                  <button onClick={() => {setIsLoggedIn(false); setView('home');}} style={{...s.menuBtn, color: '#ef4444'}}><LogOut /> خروج</button>
               </div>
             )}

             {(view === 'admin_add') && (
               <div style={s.formGroup}>
                  <div style={s.formHeader}><h3>{editingId ? "تعديل" : "إضافة"}</h3> <X onClick={() => setView('admin_main')} /></div>
                  <input style={s.input} placeholder="الاسم الداخلي" value={newProperty.internal_name} onChange={e => setNewProperty({...newProperty, internal_name: e.target.value})} />
                  <div style={s.row}>
                    <select style={s.input} value={newProperty.neighborhood} onChange={e => setNewProperty({...newProperty, neighborhood: e.target.value})}>
                      {NEIGHBORHOODS.map(n => <option key={n}>{n}</option>)}
                    </select>
                    <select style={{...s.input, width: '40%'}} value={newProperty.category} onChange={e => setNewProperty({...newProperty, category: e.target.value})}>
                      {['شقة', 'مكتب', 'محل', 'أرض'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <input style={s.input} placeholder="العنوان (الشارع، البناية)" value={newProperty.address} onChange={e => setNewProperty({...newProperty, address: e.target.value})} />
                  <div style={s.row}>
                    <input style={{...s.input, flex: 2}} type="number" placeholder="السعر" value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} />
                    <select style={{...s.input, flex: 1}} value={newProperty.currency} onChange={e => setNewProperty({...newProperty, currency: e.target.value})}>
                      <option>دولار</option><option>دينار</option><option>شيكل</option>
                    </select>
                  </div>
                  <input style={s.input} placeholder="رابط الفيسبوك" value={newProperty.post_url} onChange={e => setNewProperty({...newProperty, post_url: e.target.value})} />
                  <input style={s.input} placeholder="رابط فيديو تيك توك" value={newProperty.video_url} onChange={e => setNewProperty({...newProperty, video_url: e.target.value})} />
                  <textarea style={{...s.input, height: '70px'}} placeholder="الوصف للزبائن" value={newProperty.description} onChange={e => setNewProperty({...newProperty, description: e.target.value})} />
                  <button onClick={handleSave} style={s.saveBtn}>حفظ البيانات</button>
               </div>
             )}

             {view === 'admin_list' && (
               <div style={s.formGroup}>
                  <div style={s.formHeader}><h3>قائمة العقارات</h3> <X onClick={() => setView('admin_main')} /></div>
                  <div style={s.scrollAreaSmall}>
                    {listings.map(item => (
                      <div key={item.id} style={{...s.listItem, borderBottom: `1px solid ${theme.border}`}}>
                        <div>
                          <div style={{fontSize: '0.9rem', fontWeight: 'bold'}}>{item.internal_name}</div>
                          <div style={{fontSize: '0.7rem', opacity: 0.6}}>{item.neighborhood} - {item.price} {item.currency}</div>
                        </div>
                        <div style={{display:'flex', gap: '10px'}}>
                          <Edit3 size={18} onClick={() => {setNewProperty(item); setEditingId(item.id); setView('admin_add');}} style={{cursor:'pointer', color:'#f59e0b'}} />
                          <Trash2 size={18} onClick={async () => {if(confirm('حذف؟')) {await supabase.from('listings').delete().eq('id', item.id); fetchListings();}}} style={{cursor:'pointer', color:'#ef4444'}} />
                        </div>
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

const s = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', direction: 'rtl', fontFamily: 'system-ui, sans-serif', padding: '20px' },
  mainWrapper: { width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' },
  themeToggleWrap: { position: 'absolute', top: '20px', left: '20px' },
  themeBtn: { width: '40px', height: '40px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  identity: { textAlign: 'center', marginBottom: '25px' },
  logoWrap: { width: '90px', height: '90px', borderRadius: '25px', overflow: 'hidden', marginBottom: '10px', cursor: 'pointer' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '1.8rem', fontWeight: '800', margin: 0 },
  grid: { display: 'flex', gap: '12px', marginBottom: '25px' },
  box: { width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  services: { width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' },
  serviceCard: { display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', borderRadius: '20px', cursor: 'pointer', textAlign: 'right', fontWeight: '700' },
  serviceText: { fontSize: '1.1rem' },
  fullWidth: { width: '100%' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  backBtn: { background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
  scrollArea: { maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', paddingBottom: '20px' },
  propCard: { padding: '15px', borderRadius: '20px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' },
  priceTag: { backgroundColor: '#f59e0b', color: '#fff', padding: '3px 10px', borderRadius: '8px', fontWeight: 'bold' },
  cardAddress: { fontSize: '0.8rem', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '4px' },
  cardDesc: { fontSize: '0.9rem', lineHeight: '1.4', margin: '10px 0' },
  cardLinks: { display: 'flex', gap: '10px', marginTop: '10px' },
  linkBtn: { flex: 1, textAlign: 'center', padding: '8px', borderRadius: '10px', fontSize: '0.8rem', textDecoration: 'none', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontWeight: 'bold' },
  loginBox: { width: '100%', padding: '20px', borderRadius: '20px' },
  adminPanel: { width: '100%', padding: '20px', borderRadius: '25px' },
  adminMenu: { display: 'flex', flexDirection: 'column', gap: '10px' },
  menuBtn: { padding: '15px', borderRadius: '15px', border: '1px solid #ddd', background: 'none', color: 'inherit', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  formHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  input: { width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', background: 'rgba(255,255,255,0.05)', color: 'inherit', boxSizing: 'border-box' },
  row: { display: 'flex', gap: '10px' },
  saveBtn: { padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#f59e0b', color: '#fff', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
  scrollAreaSmall: { maxHeight: '300px', overflowY: 'auto' },
  listItem: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', alignItems: 'center' },
  footer: { position: 'fixed', bottom: '15px', fontSize: '10px', opacity: 0.5 }
};
