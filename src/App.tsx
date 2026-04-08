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
  const [adminView, setAdminView] = useState('main'); 
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
    if (password === '749329') { setIsLoggedIn(true); setShowLogin(false); setPassword(''); }
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
      alert("تم الحفظ بنجاح");
      setNewProperty(initialPropertyState);
      setEditingId(null);
      setAdminView('list');
      fetchListings();
    } else {
      alert("خطأ: " + error.message);
    }
  };

  const startEdit = (item) => {
    setNewProperty(item);
    setEditingId(item.id);
    setAdminView('add');
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#F3F4F6',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    subText: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#262626' : '#E5E7EB',
    cardBg: isDarkMode ? '#0A0A0A' : '#FFFFFF',
    accent: '#f59e0b'
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      {/* الهيدر واللوجو */}
      <div style={s.topNav}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.iconBtn, border: `1px solid ${theme.border}`, backgroundColor: theme.cardBg }}>
          {isDarkMode ? <Sun size={20} color={theme.text} /> : <Moon size={20} color={theme.text} />}
        </button>
        <div onClick={() => { setShowLogin(!showLogin); setAdminView('main'); }} style={s.logoMini}>
          <img src="https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg" alt="Logo" style={s.logoImg} />
        </div>
      </div>

      <div style={s.content}>
        {/* شاشة العرض العامة للزبائن */}
        {!isLoggedIn && !showLogin && adminView === 'main' && (
          <div style={s.publicArea}>
             <h1 style={s.heroTitle}>عقارات <span style={{color: theme.accent}}>رام الله</span></h1>
             <div style={s.listingsGrid}>
               {listings.map(item => (
                 <div key={item.id} style={{ ...s.propCard, backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}>
                   <div style={s.cardHeader}>
                     <span style={s.priceTag}>{item.price} {item.currency}</span>
                     <span style={s.categoryTag}>{item.category}</span>
                   </div>
                   <h3 style={s.cardTitle}>{item.neighborhood} - {item.listing_type}</h3>
                   {item.address && <p style={s.cardAddress}><MapPin size={14} /> {item.address}</p>}
                   <p style={s.cardDesc}>{item.description}</p>
                   <div style={s.cardLinks}>
                     {item.post_url && <a href={item.post_url} target="_blank"><ExternalLink size={18} /> فيسبوك</a>}
                     {item.video_url && <a href={item.video_url} target="_blank"><ExternalLink size={18} /> تيك توك</a>}
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* لوحة تحكم الإدارة */}
        {isLoggedIn ? (
          <div style={{ ...s.adminBox, backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }}>
            {adminView === 'main' ? (
              <div style={s.adminMenu}>
                <h2 style={{color: theme.accent}}>لوحة الإدارة</h2>
                <button onClick={() => {setEditingId(null); setNewProperty(initialPropertyState); setAdminView('add');}} style={s.menuBtn}><PlusCircle /> إضافة عقار</button>
                <button onClick={() => setAdminView('list')} style={s.menuBtn}><LayoutDashboard /> إدارة القائمة</button>
                <button onClick={() => setIsLoggedIn(false)} style={s.logoutBtn}><LogOut /> تسجيل خروج</button>
              </div>
            ) : adminView === 'add' ? (
              <div style={s.formScroll}>
                <div style={s.formHeader}><h3>{editingId ? "تعديل عقار" : "إضافة جديد"}</h3> <X onClick={() => setAdminView('main')} /></div>
                <input style={s.input} placeholder="الاسم الداخلي" value={newProperty.internal_name} onChange={e => setNewProperty({...newProperty, internal_name: e.target.value})} />
                <div style={s.row}>
                  <select style={s.input} value={newProperty.category} onChange={e => setNewProperty({...newProperty, category: e.target.value})}>
                    {['شقة', 'مكتب', 'محل', 'أرض'].map(c => <option key={c}>{c}</option>)}
                  </select>
                  <select style={s.input} value={newProperty.listing_type} onChange={e => setNewProperty({...newProperty, listing_type: e.target.value})}>
                    <option>للإيجار</option><option>للبيع</option>
                  </select>
                </div>
                <select style={s.input} value={newProperty.neighborhood} onChange={e => setNewProperty({...newProperty, neighborhood: e.target.value})}>
                  {NEIGHBORHOODS.map(n => <option key={n}>{n}</option>)}
                </select>
                <input style={s.input} placeholder="العنوان التفصيلي" value={newProperty.address} onChange={e => setNewProperty({...newProperty, address: e.target.value})} />
                <div style={s.row}>
                  <input style={{...s.input, flex: 2}} type="number" placeholder="السعر" value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} />
                  <select style={{...s.input, flex: 1}} value={newProperty.currency} onChange={e => setNewProperty({...newProperty, currency: e.target.value})}>
                    <option>دولار</option><option>دينار</option><option>شيكل</option>
                  </select>
                </div>
                <input style={s.input} placeholder="رابط الفيسبوك" value={newProperty.post_url} onChange={e => setNewProperty({...newProperty, post_url: e.target.value})} />
                <input style={s.input} placeholder="رابط التيك توك" value={newProperty.video_url} onChange={e => setNewProperty({...newProperty, video_url: e.target.value})} />
                <input style={s.input} placeholder="رقم المالك" value={newProperty.owner_phone} onChange={e => setNewProperty({...newProperty, owner_phone: e.target.value})} />
                <textarea style={{...s.input, height: '80px'}} placeholder="الوصف" value={newProperty.description} onChange={e => setNewProperty({...newProperty, description: e.target.value})} />
                <button onClick={handleSave} style={s.saveBtn}>{editingId ? "تحديث البيانات" : "حفظ العقار"}</button>
              </div>
            ) : (
              <div style={s.formScroll}>
                <div style={s.formHeader}><h3>إدارة العقارات</h3> <X onClick={() => setAdminView('main')} /></div>
                {listings.map(item => (
                  <div key={item.id} style={{ ...s.listItem, borderBottom: `1px solid ${theme.border}` }}>
                    <div>
                      <div style={{fontWeight: 'bold'}}>{item.internal_name}</div>
                      <div style={{fontSize: '0.8rem', color: theme.subText}}>{item.neighborhood} | {item.price} {item.currency}</div>
                    </div>
                    <div style={s.listActions}>
                      <Edit3 size={18} onClick={() => startEdit(item)} style={{cursor: 'pointer', color: theme.accent}} />
                      <Trash2 size={18} onClick={async () => {if(confirm('حذف؟')) {await supabase.from('listings').delete().eq('id', item.id); fetchListings();}}} style={{cursor: 'pointer', color: '#ef4444'}} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : showLogin && (
          <div style={{ ...s.loginBox, backgroundColor: theme.cardBg }}>
            <h3>دخول الإدارة</h3>
            <input type="password" style={s.input} placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} autoFocus />
            <button onClick={handleLogin} style={s.saveBtn}>دخول</button>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  container: { minHeight: '100vh', direction: 'rtl', fontFamily: 'system-ui, sans-serif' },
  topNav: { display: 'flex', justifyContent: 'space-between', padding: '15px 20px', alignItems: 'center' },
  iconBtn: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  logoMini: { width: '45px', height: '45px', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  content: { padding: '10px 20px', maxWidth: '600px', margin: '0 auto' },
  heroTitle: { textAlign: 'center', fontSize: '2rem', marginBottom: '20px' },
  listingsGrid: { display: 'flex', flexDirection: 'column', gap: '15px' },
  propCard: { padding: '15px', borderRadius: '18px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  priceTag: { backgroundColor: '#f59e0b', color: '#fff', padding: '4px 10px', borderRadius: '8px', fontWeight: 'bold' },
  categoryTag: { opacity: 0.7, fontSize: '0.9rem' },
  cardTitle: { margin: '0 0 5px 0', fontSize: '1.2rem' },
  cardAddress: { fontSize: '0.85rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' },
  cardDesc: { fontSize: '0.95rem', lineHeight: '1.5', opacity: 0.9, marginBottom: '12px' },
  cardLinks: { display: 'flex', gap: '15px', borderTop: '1px solid #eee', paddingTop: '10px', fontSize: '0.85rem' },
  adminBox: { borderRadius: '24px', padding: '20px', minHeight: '400px' },
  adminMenu: { display: 'flex', flexDirection: 'column', gap: '12px' },
  menuBtn: { padding: '15px', borderRadius: '12px', border: '1px solid #ddd', background: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', cursor: 'pointer' },
  formScroll: { display: 'flex', flexDirection: 'column', gap: '10px' },
  formHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  input: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', boxSizing: 'border-box', background: 'rgba(255,255,255,0.05)', color: 'inherit' },
  row: { display: 'flex', gap: '10px' },
  saveBtn: { padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#f59e0b', color: '#fff', fontWeight: 'bold', cursor: 'pointer' },
  listItem: { display: 'flex', justifyContent: 'space-between', padding: '12px 0' },
  listActions: { display: 'flex', gap: '15px', alignItems: 'center' },
  logoutBtn: { marginTop: '20px', color: '#ef4444', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' },
  loginBox: { padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '15px' }
};
