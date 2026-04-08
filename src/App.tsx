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
  Trash2
} from 'lucide-react';

// --- إعدادات Supabase ---
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

  // الحالة الابتدائية للعقار الجديد (متوافق مع جدول Supabase المعتمد)
  const [newProperty, setNewProperty] = useState({ 
    internal_name: '', 
    category: 'شقة',
    neighborhood: 'الماصيون',
    listing_type: 'للإيجار',
    price: '',
    currency: 'دولار',
    owner_phone: '',
    description: '',
    address: '',
    status: 'متاح'
  });

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
    if (!newProperty.internal_name.trim()) {
      alert("الرجاء إدخال الاسم الداخلي للعقار");
      return;
    }
    
    // تحويل السعر لرقم صحيح قبل الإرسال لتجنب الكسور
    const dataToSave = {
      ...newProperty,
      price: newProperty.price ? Math.floor(Number(newProperty.price)) : 0
    };

    const { error } = await supabase.from('listings').insert([dataToSave]);
    
    if (!error) {
      alert("✅ تم حفظ العقار بنجاح");
      // تصفير الخانات مع بقاء الحي والتصنيف لتسهيل الإدخال المتكرر
      setNewProperty({ 
        ...newProperty,
        internal_name: '', 
        price: '',
        owner_phone: '',
        description: '',
        address: ''
      }); 
      fetchListings();
    } else {
      alert("❌ خطأ أثناء الحفظ: " + error.message);
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
            <a href={whatsappLink} target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
              <svg width="24" height="24" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/></svg>
            </a>
            <a href="tel:+970594560056" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}><Phone size={24} color="#34A853" strokeWidth={1.5} /></a>
            <a href="https://facebook.com/shoqaq.store/" target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com/shoqaq.ramallah/" target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}><Instagram size={24} color="#e1306c" strokeWidth={1.5} /></a>
            <a href="https://tiktok.com/@shoqaq.ramallah" target="_blank" rel="noreferrer" style={{ ...s.box, backgroundColor: theme.iconBox, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
              <svg width="24" height="24" fill={isDarkMode ? "white" : "#111827"} viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
            </a>
          </div>
        )}

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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={s.adminHeader}>
                   <h3 style={{ margin: 0 }}>إضافة عقار</h3> 
                   <X size={20} onClick={() => setAdminView('main')} style={{ cursor: 'pointer' }} />
                </div>
                
                <input 
                   style={{ ...s.input, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }} 
                   placeholder="الاسم الداخلي (مثلاً: شقة الماصيون)" 
                   value={newProperty.internal_name} 
                   onChange={e => setNewProperty({...newProperty, internal_name: e.target.value})} 
                />

                <div style={{ display: 'flex', gap: '5px' }}>
                  <select 
                     style={{ ...s.input, flex: 1, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }}
                     value={newProperty.category}
                     onChange={e => setNewProperty({...newProperty, category: e.target.value})}
                  >
                    {['شقة', 'مكتب', 'محل', 'أرض', 'مخزن'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select 
                     style={{ ...s.input, flex: 1, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }}
                     value={newProperty.listing_type}
                     onChange={e => setNewProperty({...newProperty, listing_type: e.target.value})}
                  >
                    <option value="للإيجار">للإيجار</option>
                    <option value="للبيع">للبيع</option>
                  </select>
                </div>

                <select 
                   style={{ ...s.input, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }}
                   value={newProperty.neighborhood}
                   onChange={e => setNewProperty({...newProperty, neighborhood: e.target.value})}
                >
                  {['الماصيون', 'الطيرة', 'عين منجد', 'الإرسال', 'المصايف', 'حي النهضة', 'رام الله التحتا', 'وسط البلد', 'عين مصباح', 'البالوع', 'سطح مرحبا', 'بيتونيا', 'سردا', 'أبو قش', 'رافات', 'كفر عقب', 'منطقة أخرى'].map(n => <option key={n} value={n}>{n}</option>)}
                </select>

                <div style={{ display: 'flex', gap: '5px' }}>
                  <input 
                    type="number"
                    style={{ ...s.input, flex: 2, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }} 
                    placeholder="السعر (أرقام صحيحة)" 
                    value={newProperty.price} 
                    onChange={e => setNewProperty({...newProperty, price: e.target.value})} 
                  />
                  <select 
                    style={{ ...s.input, flex: 1, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }}
                    value={newProperty.currency}
                    onChange={e => setNewProperty({...newProperty, currency: e.target.value})}
                  >
                    <option value="دولار">دولار</option>
                    <option value="دينار">دينار</option>
                    <option value="شيكل">شيكل</option>
                  </select>
                </div>

                <input 
                   style={{ ...s.input, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }} 
                   placeholder="رقم هاتف صاحب العقار" 
                   value={newProperty.owner_phone} 
                   onChange={e => setNewProperty({...newProperty, owner_phone: e.target.value})} 
                />

                <textarea 
                   style={{ ...s.input, height: '80px', backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text, textAlign: 'right' }} 
                   placeholder="وصف العقار الجذاب للزبائن..." 
                   value={newProperty.description} 
                   onChange={e => setNewProperty({...newProperty, description: e.target.value})} 
                />

                <button onClick={handleSave} style={s.loginBtn}>حفظ وإضافة آخر</button>
              </div>
            ) : (
              <div>
                <div style={s.adminHeader}><h3>إدارة القائمة</h3> <X size={20} onClick={() => setAdminView('main')} style={{ cursor: 'pointer' }} /></div>
                <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                  {listings.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${theme.border}` }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{item.internal_name}</span>
                        <span style={{ fontSize: '0.75rem', color: theme.subText }}>{item.neighborhood} | {item.price} {item.currency}</span>
                      </div>
                      <Trash2 size={18} color="#ef4444" style={{ cursor: 'pointer', alignSelf: 'center' }} onClick={async () => { if(confirm('حذف هذا العقار نهائياً؟')) { await supabase.from('listings').delete().eq('id', item.id); fetchListings(); } }} />
                    </div>
                  ))}
                  {listings.length === 0 && <p style={{ textAlign: 'center', color: theme.subText, fontSize: '0.9rem' }}>لا توجد عقارات مضافة بعد</p>}
                </div>
              </div>
            )}
          </div>
        ) : showLogin ? (
          <div style={{ ...s.loginBox, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}`, boxShadow: theme.shadow }}>
            <div style={s.loginHeader}><Lock size={18} color="#f59e0b" /><span style={{ fontWeight: 700 }}>دخول الإدارة</span></div>
            <input 
              type="tel" inputMode="numeric" placeholder="كلمة المرور" value={password} 
              onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} 
              style={{ ...s.input, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text, WebkitTextSecurity: 'disc' }} autoFocus 
            />
            <button onClick={handleLogin} style={s.loginBtn}>دخول</button>
          </div>
        ) : (
          <div style={s.services}>
            {[
              { icon: <Building2 size={32} color="#f59e0b" />, text: 'عرض الشقق المتوفرة' },
              { icon: <ClipboardEdit size={32} color="#f59e0b" />, text: 'تقديم طلب' },
              { icon: <Plus size={32} color="#f59e0b" />, text: 'عرض عقار على الصفحة' },
            ].map((item, index) => (
              <button key={index} style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, boxShadow: theme.shadow, color: theme.text }}>
                {item.icon} <span style={s.serviceText}>{item.text}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <footer style={{ ...s.footer, color: theme.subText }}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

const s = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', direction: 'rtl', fontFamily: 'system-ui, sans-serif', padding: '20px', boxSizing: 'border-box' },
  mainWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px', marginTop: '-5vh' },
  themeToggleWrap: { position: 'absolute', top: '20px', left: '20px' },
  themeBtn: { cursor: 'pointer', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  identity: { textAlign: 'center', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  logoWrap: { cursor: 'pointer', marginBottom: '10px', borderRadius: '22px', overflow: 'hidden', width: '95px', height: '95px' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '1.7rem', fontWeight: '800', margin: 0 },
  sub: { marginTop: '2px', fontSize: '1.05rem', fontWeight: '600' },
  grid: { display: 'flex', gap: '10px', marginBottom: '30px', justifyContent: 'center' },
  box: { width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  services: { display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' },
  serviceCard: { display: 'flex', alignItems: 'center', gap: '15px', padding: '20px', borderRadius: '20px', cursor: 'pointer', textAlign: 'right', border: 'none', outline: 'none' },
  serviceText: { fontSize: '1.1rem', fontWeight: '700' },
  loginBox: { width: '100%', borderRadius: '20px', padding: '20px' },
  loginHeader: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '15px' },
  input: { width: '100%', borderRadius: '12px', padding: '12px', outline: 'none', fontSize: '0.95rem', textAlign: 'right', boxSizing: 'border-box', border: 'none' },
  loginBtn: { width: '100%', backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '12px', padding: '14px', cursor: 'pointer', fontWeight: '700', marginTop: '10px' },
  admin: { width: '100%', borderRadius: '24px', padding: '20px' },
  adminHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  adminAction: { width: '100%', padding: '14px', marginBottom: '10px', borderRadius: '14px', backgroundColor: 'transparent', border: '1px solid', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: '600' },
  logoutBtn: { background: 'none', border: 'none', cursor: 'pointer' },
  footer: { position: 'fixed', bottom: '15px', fontSize: '9px', opacity: 0.6, fontWeight: '700' },
};
