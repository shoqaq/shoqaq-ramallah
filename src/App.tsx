// @ts-nocheck
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Phone, Instagram, LogOut, PlusCircle, LayoutDashboard, Building2,
  ClipboardEdit, Plus, Sun, Moon, Lock, X, Trash2, Edit3, MapPin
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
  const [view, setView] = useState('home'); 
  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const initialPropertyState = { 
    internal_name: '', category: 'شقة', neighborhood: 'الماصيون',
    listing_type: 'للإيجار', price: '', currency: 'دولار',
    owner_phone: '', description: '', address: '', post_url: '', video_url: '', status: 'متاح'
  };

  const [newProperty, setNewProperty] = useState(initialPropertyState);

  const fetchListings = async () => {
    // جلب البيانات من الجدول مباشرة
    const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (data) setListings(data);
  };

  useEffect(() => { fetchListings(); }, []);

  const handleLogin = () => {
    if (password === '749329') { 
      setIsLoggedIn(true); setShowLogin(false); setPassword(''); setView('admin_main');
    }
  };

  const handleSave = async () => {
    if (!newProperty.internal_name.trim()) return alert("يرجى إدخال الاسم الداخلي");
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
      alert("تم حفظ الحالة والبيانات بنجاح");
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
      
      <div style={s.themeToggleWrap}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, border: `1.5px solid ${theme.border}`, color: theme.text, backgroundColor: theme.iconBox }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.mainWrapper}>
        
        <div style={s.identity}>
          <div onClick={() => { setShowLogin(true); setView('home'); }} style={{ ...s.logoWrap, border: `2px solid ${theme.border}`, boxShadow: theme.shadow }}>
            <img src="https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg" alt="Logo" style={s.logoImg} />
          </div>
          <h1 style={s.title}>أهلاً بكم في <span style={{ color: '#f59e0b' }}>شقق رام الله</span></h1>
          <p style={{ ...s.sub, color: theme.subText }}>عقارات ومكاتب للايجار والبيع</p>
        </div>

        {/* الشاشة الرئيسية */}
        {view === 'home' && !showLogin && (
          <>
            <div style={s.grid}>
              <a href="https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d" target="_blank" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}>
                <svg width="24" height="24" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/></svg>
              </a>
              <a href="tel:+970594560056" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}><Phone size={24} color="#34A853" /></a>
              <a href="https://facebook.com/shoqaq.store/" target="_blank" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}` }}><Instagram size={24} color="#e1306c" /></a>
            </div>

            <div style={s.services}>
              <button onClick={() => setView('browse')} style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
                <Building2 size={32} color="#f59e0b" /> <span style={s.serviceText}>عرض العقارات المتوفرة</span>
              </button>
              <button style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
                <ClipboardEdit size={32} color="#f59e0b" /> <span style={s.serviceText}>تقديم طلب بحث</span>
              </button>
            </div>
          </>
        )}

        {/* شاشة العرض العام */}
        {view === 'browse' && (
          <div style={s.fullWidth}>
            <div style={s.sectionHeader}>
              <button onClick={() => setView('home')} style={s.backBtn}><X size={20} /> رجوع</button>
              <h3 style={{margin:0}}>قائمة العقارات</h3>
            </div>
            <div style={s.scrollArea}>
              {listings.map(item => (
                <div key={item.id} style={{ ...s.propCard, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}`, opacity: item.status === 'غير متاح' ? 0.6 : 1 }}>
                  <div style={s.cardHeader}>
                    <span style={s.priceTag}>{item.price} {item.currency}</span>
                    <span style={{...s.statusBadge, color: item.status === 'متاح' ? '#34A853' : '#ef4444', borderColor: item.status === 'متاح' ? '#34A853' : '#ef4444'}}>
                      {item.status}
                    </span>
                  </div>
                  <h4 style={{margin: '10px 0 5px'}}>{item.neighborhood} - {item.listing_type} {item.category}</h4>
                  <p style={s.cardAddress}><MapPin size={14} /> {item.address || 'رام الله'}</p>
                  <p style={s.cardDesc}>{item.description}</p>
                  <div style={s.cardLinks}>
                    {item.post_url && <a href={item.post_url} target="_blank" style={s.linkBtn}>رابط {item.category}</a>}
                    {item.video_url && <a href={item.video_url} target="_blank" style={{...s.linkBtn, color: '#ff0050'}}>فيديو العرض</a>}
                    <a href={`tel:${item.owner_phone || '+970594560056'}`} style={{...s.linkBtn, backgroundColor: '#34A853', color: '#fff', border: 'none'}}>اتصال</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* تسجيل الدخول */}
        {showLogin && (
          <div style={{ ...s.loginBox, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
            <div style={s.formHeader}><h3>دخول الإدارة</h3> <X onClick={() => setShowLogin(false)} /></div>
            <input type="password" style={s.input} placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} autoFocus />
            <button onClick={handleLogin} style={s.saveBtn}>دخول</button>
          </div>
        )}

        {/* لوحة الإدارة */}
        {isLoggedIn && (
          <div style={{ ...s.adminPanel, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}` }}>
             {view === 'admin_main' && (
               <div style={s.adminMenu}>
                  <button onClick={() => {setEditingId(null); setNewProperty(initialPropertyState); setView('admin_add');}} style={s.menuBtn}><PlusCircle /> إضافة عقار جديد</button>
                  <button onClick={() => setView('admin_list')} style={s.menuBtn}><LayoutDashboard /> إدارة القائمة ({listings.length})</button>
                  <button onClick={() => {setIsLoggedIn(false); setView('home');}} style={{...s.menuBtn, color: '#ef4444'}}><LogOut /> خروج</button>
               </div>
             )}

             {view === 'admin_add' && (
               <div style={s.formGroup}>
                  <div style={s.formHeader}><h3>{editingId ? "تعديل بيانات" : "إضافة جديد"}</h3> <X onClick={() => setView('admin_main')} /></div>
                  <input style={s.input} placeholder="الاسم الداخلي" value={newProperty.internal_name} onChange={e => setNewProperty({...newProperty, internal_name: e.target.value})} />
                  <div style={s.row}>
                    <select style={s.input} value={newProperty.neighborhood} onChange={e => setNewProperty({...newProperty, neighborhood: e.target.value})}>
                      {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <select style={{...s.input, width: '40%'}} value={newProperty.status} onChange={e => setNewProperty({...newProperty, status: e.target.value})}>
                      <option value="متاح">متاح</option>
                      <option value="غير متاح">غير متاح</option>
                    </select>
                  </div>
                  <div style={s.row}>
                    <select style={s.input} value={newProperty.category} onChange={e => setNewProperty({...newProperty, category: e.target.value})}>
                      {['شقة', 'مكتب', 'محل', 'أرض', 'مخزن'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select style={{...s.input, width: '40%'}} value={newProperty.listing_type} onChange={e => setNewProperty({...newProperty, listing_type: e.target.value})}>
                      <option>للإيجار</option><option>للبيع</option>
                    </select>
                  </div>
                  <input style={s.input} placeholder="رابط الفيسبوك" value={newProperty.post_url} onChange={e => setNewProperty({...newProperty, post_url: e.target.value})} />
                  <input style={s.input} placeholder="رابط التيك توك" value={newProperty.video_url} onChange={e => setNewProperty({...newProperty, video_url: e.target.value})} />
                  <div style={s.row}>
                    <input style={{...s.input, flex: 2}} type="number" placeholder="السعر" value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} />
                    <select style={{...s.input, flex: 1}} value={newProperty.currency} onChange={e => setNewProperty({...newProperty, currency: e.target.value})}>
                      <option>دولار</option><option>دينار</option><option>شيكل</option>
                    </select>
                  </div>
                  <textarea style={{...s.input, height: '70px'}} placeholder="الوصف العام" value={newProperty.description} onChange={e => setNewProperty({...newProperty, description: e.target.value})} />
                  <button onClick={handleSave} style={s.saveBtn}>حفظ العقار</button>
               </div>
             )}

             {view === 'admin_list' && (
               <div style={s.formGroup}>
                  <div style={s.formHeader}><h3>إدارة القائمة</h3> <X onClick={() => setView('admin_main')} /></div>
                  <div style={s.scrollAreaSmall}>
                    {listings.map(item => (
                      <div key={item.id} style={{...s.listItem, borderBottom: `1px solid ${theme.border}`}}>
                        <div>
                          <div style={{fontSize: '0.9rem', fontWeight: 'bold'}}>{item.internal_name}</div>
                          <div style={{fontSize: '0.7rem', color: item.status === 'متاح' ? '#34A853' : '#ef4444'}}>{item.status}</div>
                        </div>
                        <div style={{display:'flex', gap: '10px'}}>
                          <Edit3 size={18} onClick={() => {setNewProperty(item); setEditingId(item.id); setView('admin_add');}} style={{cursor:'pointer', color:'#f59e0b'}} />
                          <Trash2 size={18} onClick={async () => {if(confirm('حذف نهائي؟')) {await supabase.from('listings').delete().eq('id', item.id); fetchListings();}}} style={{cursor:'pointer', color:'#ef4444'}} />
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
  mainWrapper: { width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' },
  themeToggleWrap: { position: 'absolute', top: '20px', left: '20px' },
  themeBtn: { width: '40px', height: '40px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  identity: { textAlign: 'center', marginBottom: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  logoWrap: { width: '90px', height: '90px', borderRadius: '25px', overflow: 'hidden', marginBottom: '10px', cursor: 'pointer' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '1.7rem', fontWeight: '800', margin: 0 },
  sub: { marginTop: '2px', fontSize: '1rem', fontWeight: '600' },
  grid: { display: 'flex', gap: '12px', marginBottom: '30px' },
  box: { width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  services: { width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' },
  serviceCard: { display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', borderRadius: '20px', cursor: 'pointer', textAlign: 'right', fontWeight: '700' },
  serviceText: { fontSize: '1.1rem' },
  fullWidth: { width: '100%' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  backBtn: { background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' },
  scrollArea: { maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', paddingBottom: '20px' },
  propCard: { padding: '18px', borderRadius: '22px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  priceTag: { backgroundColor: '#f59e0b', color: '#fff', padding: '4px 12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '1.1rem' },
  statusBadge: { fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid', padding: '2px 8px', borderRadius: '6px' },
  cardAddress: { fontSize: '0.85rem', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '4px', margin: '5px 0' },
  cardDesc: { fontSize: '0.95rem', lineHeight: '1.5', margin: '12px 0' },
  cardLinks: { display: 'flex', gap: '10px' },
  linkBtn: { flex: 1, textAlign: 'center', padding: '10px', borderRadius: '12px', fontSize: '0.85rem', textDecoration: 'none', border: '1.5px solid #f59e0b', color: '#f59e0b', fontWeight: 'bold' },
  loginBox: { width: '100%', padding: '25px', borderRadius: '22px' },
  adminPanel: { width: '100%', padding: '20px', borderRadius: '25px' },
  adminMenu: { display: 'flex', flexDirection: 'column', gap: '12px' },
  menuBtn: { padding: '16px', borderRadius: '15px', border: '1px solid #ddd', background: 'none', color: 'inherit', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  formHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' },
  input: { width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid #ddd', background: 'rgba(255,255,255,0.05)', color: 'inherit', boxSizing: 'border-box' },
  row: { display: 'flex', gap: '10px' },
  saveBtn: { padding: '16px', borderRadius: '14px', border: 'none', backgroundColor: '#f59e0b', color: '#fff', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
  scrollAreaSmall: { maxHeight: '350px', overflowY: 'auto' },
  listItem: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', alignItems: 'center' },
  footer: { position: 'fixed', bottom: '15px', fontSize: '10px', opacity: 0.5, fontWeight: '700' }
};
