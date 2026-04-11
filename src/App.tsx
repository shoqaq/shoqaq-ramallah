// @ts-nocheck
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Phone, Instagram, LogOut, PlusCircle, LayoutDashboard, Building2,
  ClipboardEdit, Plus, Sun, Moon, Lock, X, Trash2, Edit3, MapPin, Maximize2, ExternalLink
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
  const [selectedProp, setSelectedProp] = useState(null);

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
      alert("تم الحفظ بنجاح");
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
    accent: '#f59e0b'
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      
      <div style={s.themeToggleWrap}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, border: `1.5px solid ${theme.border}`, color: theme.text, backgroundColor: theme.cardBg }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.mainWrapper}>
        <div style={s.identity}>
          <div onClick={() => { setShowLogin(true); setView('home'); }} style={{ ...s.logoWrap, border: `2px solid ${theme.border}` }}>
            <img src="https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg" alt="Logo" style={s.logoImg} />
          </div>
          <h1 style={s.title}>شقق <span style={{ color: theme.accent }}>رام الله</span></h1>
        </div>

        {/* الصفحة الرئيسية - استعادة الأيقونات */}
        {view === 'home' && !showLogin && (
          <>
            <div style={s.grid}>
              <a href="https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d" target="_blank" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
                <svg width="24" height="24" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/></svg>
              </a>
              <a href="tel:+970594560056" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}><Phone size={24} color="#34A853" /></a>
              <a href="https://facebook.com/shoqaq.store/" target="_blank" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}><Instagram size={24} color="#e1306c" /></a>
              <a href="https://tiktok.com/@shoqaq.ramallah" target="_blank" style={{ ...s.box, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
                <svg width="24" height="24" fill={isDarkMode ? "white" : "black"} viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </a>
            </div>

            <div style={s.services}>
              <button onClick={() => setView('browse')} style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
                <Building2 size={32} color={theme.accent} /> <span style={s.serviceText}>تصفح العقارات المتاحة</span>
              </button>
              <button style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
                <ClipboardEdit size={32} color={theme.accent} /> <span style={s.serviceText}>تقديم طلب بحث</span>
              </button>
            </div>
          </>
        )}

        {/* شاشة العرض بالمربعات الصغيرة */}
        {view === 'browse' && (
          <div style={s.fullWidth}>
            <div style={s.sectionHeader}>
              <button onClick={() => setView('home')} style={s.backBtn}><X size={18} /> رجوع</button>
              <h3 style={{margin:0}}>العقارات</h3>
            </div>
            <div style={s.gridDisplay}>
              {listings.map(item => (
                <div key={item.id} onClick={() => setSelectedProp(item)} style={{ ...s.miniCard, backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, opacity: item.status === 'غير متاح' ? 0.5 : 1 }}>
                  <div style={{...s.miniStatus, backgroundColor: item.status === 'متاح' ? '#34A853' : '#ef4444'}} />
                  <div style={s.miniPrice}>{item.price} {item.currency}</div>
                  <div style={s.miniTitle}>{item.neighborhood}</div>
                  <div style={s.miniSub}>{item.category}</div>
                  <Maximize2 size={12} style={s.expandIcon} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* المودال المكبر */}
        {selectedProp && (
          <div style={s.modalOverlay}>
            <div style={{ ...s.modalContent, backgroundColor: theme.cardBg, color: theme.text, border: `1px solid ${theme.border}` }}>
              <div style={s.modalHeader}>
                <h3 style={{margin:0}}>{selectedProp.category} في {selectedProp.neighborhood}</h3>
                <X onClick={() => setSelectedProp(null)} style={{cursor:'pointer'}} />
              </div>
              <div style={s.modalBody}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px', alignItems:'center'}}>
                   <span style={s.priceTagLarge}>{selectedProp.price} {selectedProp.currency}</span>
                   <span style={{...s.statusBadge, color: selectedProp.status === 'متاح' ? '#34A853' : '#ef4444', borderColor: selectedProp.status === 'متاح' ? '#34A853' : '#ef4444'}}>{selectedProp.status}</span>
                </div>
                <p style={s.detailRow}><MapPin size={16} color={theme.accent} /> {selectedProp.address || 'رام الله'}</p>
                <div style={s.descBox}>{selectedProp.description}</div>
                <div style={s.modalLinks}>
                   {selectedProp.post_url && <a href={selectedProp.post_url} target="_blank" style={s.actionLink}><ExternalLink size={16} /> رابط {selectedProp.category}</a>}
                   {selectedProp.video_url && <a href={selectedProp.video_url} target="_blank" style={{...s.actionLink, color:'#ff0050'}}><Instagram size={16} /> فيديو العرض</a>}
                   <a href={`tel:${selectedProp.owner_phone || '+970594560056'}`} style={s.callAction}>اتصال مباشر</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* لوحة الإدارة */}
        {isLoggedIn && (
          <div style={{ ...s.adminPanel, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}` }}>
             {view === 'admin_main' && (
               <div style={s.adminMenu}>
                  <button onClick={() => {setEditingId(null); setNewProperty(initialPropertyState); setView('admin_add');}} style={s.menuBtn}><PlusCircle /> إضافة عقار جديد</button>
                  <button onClick={() => setView('admin_list')} style={s.menuBtn}><LayoutDashboard /> إدارة القائمة</button>
                  <button onClick={() => {setIsLoggedIn(false); setView('home');}} style={{...s.menuBtn, color: '#ef4444'}}><LogOut /> خروج</button>
               </div>
             )}

             {view === 'admin_add' && (
               <div style={s.formGroup}>
                  <div style={s.formHeader}><h3>{editingId ? "تعديل" : "إضافة"}</h3> <X onClick={() => setView('admin_main')} /></div>
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
                      {['شقة', 'مكتب', 'محل', 'أرض'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input style={{...s.input, flex: 2}} type="number" placeholder="السعر" value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} />
                  </div>
                  <input style={s.input} placeholder="رابط الفيسبوك/العقار" value={newProperty.post_url} onChange={e => setNewProperty({...newProperty, post_url: e.target.value})} />
                  <textarea style={{...s.input, height: '80px'}} placeholder="التفاصيل كاملة" value={newProperty.description} onChange={e => setNewProperty({...newProperty, description: e.target.value})} />
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
                          <div style={{fontSize: '0.85rem', fontWeight: 'bold'}}>{item.internal_name}</div>
                          <div style={{fontSize: '0.7rem', color: item.status === 'متاح' ? '#34A853' : '#ef4444'}}>{item.status}</div>
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

        {showLogin && (
          <div style={{ ...s.loginBox, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
            <div style={s.formHeader}><h3>دخول الإدارة</h3> <X onClick={() => setShowLogin(false)} /></div>
            <input type="password" style={s.input} placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} autoFocus />
            <button onClick={handleLogin} style={s.saveBtn}>دخول</button>
          </div>
        )}
      </div>
      <footer style={{ ...s.footer, color: theme.subText }}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

const s = {
  container: { minHeight: '100vh', direction: 'rtl', fontFamily: 'system-ui, sans-serif', padding: '20px' },
  mainWrapper: { width: '100%', maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  themeToggleWrap: { position: 'absolute', top: '20px', left: '20px' },
  themeBtn: { width: '40px', height: '40px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  identity: { textAlign: 'center', marginBottom: '30px' },
  logoWrap: { width: '85px', height: '85px', borderRadius: '22px', overflow: 'hidden', marginBottom: '10px', cursor: 'pointer' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '1.8rem', fontWeight: '800', margin: 0 },
  grid: { display: 'flex', gap: '10px', marginBottom: '30px' },
  box: { width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  services: { width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' },
  serviceCard: { display: 'flex', alignItems: 'center', gap: '15px', padding: '22px', borderRadius: '24px', cursor: 'pointer', fontWeight: '700' },
  serviceText: { fontSize: '1.1rem' },
  fullWidth: { width: '100%' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  backBtn: { background: 'rgba(245, 158, 11, 0.1)', border: 'none', color: '#f59e0b', padding: '6px 12px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' },
  gridDisplay: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  miniCard: { padding: '15px', borderRadius: '20px', position: 'relative', cursor: 'pointer', textAlign: 'center' },
  miniStatus: { position: 'absolute', top: '10px', right: '10px', width: '7px', height: '7px', borderRadius: '50%' },
  miniPrice: { fontSize: '0.95rem', fontWeight: '900', color: '#f59e0b' },
  miniTitle: { fontSize: '0.8rem', fontWeight: 'bold', marginTop: '4px' },
  miniSub: { fontSize: '0.7rem', opacity: 0.6 },
  expandIcon: { position: 'absolute', bottom: '8px', left: '8px', opacity: 0.2 },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' },
  modalContent: { width: '100%', maxWidth: '380px', borderRadius: '30px', padding: '25px' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  priceTagLarge: { fontSize: '1.4rem', fontWeight: '900', color: '#f59e0b' },
  statusBadge: { fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid', padding: '2px 8px', borderRadius: '6px' },
  detailRow: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', margin: '10px 0' },
  descBox: { padding: '15px', background: 'rgba(128,128,128,0.05)', borderRadius: '18px', fontSize: '0.95rem', lineHeight: '1.6', margin: '15px 0', minHeight: '80px' },
  modalLinks: { display: 'flex', flexDirection: 'column', gap: '8px' },
  actionLink: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '14px', border: '1.5px solid #f59e0b', color: '#f59e0b', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem' },
  callAction: { padding: '14px', borderRadius: '14px', backgroundColor: '#34A853', color: '#fff', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold' },
  loginBox: { width: '100%', padding: '25px', borderRadius: '22px' },
  adminPanel: { width: '100%', padding: '20px', borderRadius: '25px' },
  adminMenu: { display: 'flex', flexDirection: 'column', gap: '10px' },
  menuBtn: { padding: '15px', borderRadius: '14px', border: '1px solid #ddd', background: 'none', color: 'inherit', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  formHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  input: { width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #ddd', background: 'rgba(255,255,255,0.05)', color: 'inherit', boxSizing: 'border-box' },
  row: { display: 'flex', gap: '10px' },
  saveBtn: { padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#f59e0b', color: '#fff', fontWeight: 'bold', cursor: 'pointer' },
  scrollAreaSmall: { maxHeight: '350px', overflowY: 'auto' },
  listItem: { display: 'flex', justifyContent: 'space-between', padding: '10px 0' },
  footer: { position: 'fixed', bottom: '15px', fontSize: '10px', opacity: 0.5, fontWeight: '700' }
};
