import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Sun, Moon, X, PlusCircle, LayoutDashboard, LogOut, 
  Edit3, Trash2, User, MapPin, Home, DollarSign, 
  ChevronLeft, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { s } from './styles';
import HomePage from './components/HomePage';
import PropertyGrid from './components/PropertyGrid';

// إعداد الاتصال بـ Supabase
const supabase = createClient('https://ohomklxgvyzwjexkvzfc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag');

const NEIGHBORHOODS = ['الماصيون', 'الطيرة', 'عين منجد', 'الإرسال', 'المصايف', 'حي النهضة', 'رام الله التحتا', 'وسط البلد', 'عين مصباح', 'البالوع', 'سطح مرحبا', 'حي الجنان', 'أم الشرايط', 'بيتونيا', 'سردا', 'أبو قش', 'رافات', 'كفر عقب', 'منطقة أخرى'];

export default function App() {
  const [view, setView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [listings, setListings] = useState<any[]>([]);
  const [selectedProp, setSelectedProp] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const initialPropertyState = { 
    internal_name: '', neighborhood: 'الماصيون', status: 'متاح', category: 'شقة', 
    listing_type: 'للإيجار', price: '', currency: 'دينار', area: '',
    description: '', post_url: '', video_url: '', owner_name: '',
    owner_phone1: '', owner_phone2: '', exact_address: '', is_negotiable: false,
    payment_method: 'كاش', building_fees: '', municipal_fees: '', features: {} 
  };

  const [newProperty, setNewProperty] = useState(initialPropertyState);

  const fetchListings = async () => {
    const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (data) setListings(data);
  };

  useEffect(() => { fetchListings(); }, []);

  const handleSave = async () => {
    try {
      const payload = {
        internal_name: newProperty.internal_name,
        neighborhood: newProperty.neighborhood,
        status: newProperty.status,
        category: newProperty.category,
        listing_type: newProperty.listing_type,
        price: parseInt(newProperty.price) || 0,
        currency: newProperty.currency,
        area: parseFloat(newProperty.area) || 0,
        description: newProperty.description,
        post_url: newProperty.post_url,
        owner_name: newProperty.owner_name,
        owner_phone: newProperty.owner_phone1,
        exact_address: newProperty.exact_address,
        is_negotiable: newProperty.is_negotiable,
        payment_method: newProperty.payment_method,
        building_fees: parseFloat(newProperty.building_fees) || 0,
        municipal_fees: parseFloat(newProperty.municipal_fees) || 0,
        features: { ...newProperty.features, owner_phone2: newProperty.owner_phone2 }
      };

      if (editingId) {
        await supabase.from('listings').update(payload).eq('id', editingId);
      } else {
        await supabase.from('listings').insert([payload]);
      }
      
      alert("تم الحفظ بنجاح");
      setEditingId(null);
      setNewProperty(initialPropertyState);
      setStep(1);
      fetchListings();
      setView('admin_list');
    } catch (error: any) {
      alert("خطأ: " + error.message);
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
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text, direction: 'rtl' }}>
      <div style={s.topNav}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, border: `1px solid ${theme.border}`, color: theme.text, backgroundColor: theme.cardBg }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.wrapper}>
        {view === 'home' && (
          <HomePage onNavigate={setView} onLogoClick={() => setShowLogin(true)} theme={theme} isDarkMode={isDarkMode} />
        )}

        {view === 'browse' && (
          <PropertyGrid listings={listings} onBack={() => setView('home')} onSelect={setSelectedProp} selectedProp={selectedProp} onCloseModal={() => setSelectedProp(null)} theme={theme} />
        )}

        {showLogin && (
          <div style={s.loginBox}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <h3>دخول المشرف</h3> 
                <X onClick={() => setShowLogin(false)} style={{ cursor: 'pointer' }} />
              </div>
              <input type="password" style={{ ...s.input, textAlign: 'center', fontSize: '1.5rem' }} placeholder="••••••" value={password} onChange={e => {
                const val = e.target.value;
                setPassword(val);
                if (val === '749329') { setIsLoggedIn(true); setView('admin_main'); setShowLogin(false); setPassword(''); }
              }} />
          </div>
        )}

        {isLoggedIn && (
          <AdminPanel 
            view={view} setView={setView} listings={listings} onSave={handleSave} 
            newProperty={newProperty} setNewProperty={setNewProperty} 
            editingId={editingId} theme={theme} step={step} setStep={setStep}
            onLogout={() => { setIsLoggedIn(false); setView('home'); }}
            onEdit={(item: any) => { setNewProperty(item); setEditingId(item.id); setView('admin_add'); setStep(1); }}
            onDelete={async (id: string) => { if(window.confirm('حذف؟')) { await supabase.from('listings').delete().eq('id', id); fetchListings(); } }}
          />
        )}
      </div>
    </div>
  );
}

function AdminPanel({ view, setView, listings, onSave, onEdit, onDelete, newProperty, setNewProperty, theme, step, setStep, onLogout }: any) {
  const updateFeature = (k: string, v: any) => setNewProperty({ ...newProperty, features: { ...newProperty.features, [k]: v } });
  
  const inputStyle = { 
    ...s.input, 
    padding: '20px', 
    fontSize: '1.2rem', 
    marginBottom: '15px', 
    backgroundColor: theme.cardBg, 
    color: theme.text, 
    border: `2px solid ${theme.border}`,
    borderRadius: '15px'
  };

  const btnContainer = { display: 'flex', gap: '10px', marginTop: '20px' };

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      {view === 'admin_main' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button onClick={() => {setStep(1); setView('admin_add')}} style={s.menuBtn}><PlusCircle /> إضافة عقار جديد</button>
          <button onClick={() => setView('admin_list')} style={s.menuBtn}><LayoutDashboard /> إدارة العقارات</button>
          <button onClick={onLogout} style={{ ...s.menuBtn, color: '#ef4444' }}><LogOut /> خروج</button>
        </div>
      )}

      {view === 'admin_add' && (
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '25px' }}>
            {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: '8px', borderRadius: '10px', backgroundColor: step >= i ? theme.accent : theme.border }} />)}
          </div>

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ marginBottom: '20px' }}>👤 معلومات صاحب العقار</h2>
              <input style={inputStyle} placeholder="الاسم الكامل" value={newProperty.owner_name} onChange={e => setNewProperty({...newProperty, owner_name: e.target.value})} />
              <input style={inputStyle} type="tel" placeholder="رقم الهاتف 1" value={newProperty.owner_phone1} onChange={e => setNewProperty({...newProperty, owner_phone1: e.target.value})} />
              <input style={inputStyle} type="tel" placeholder="رقم الهاتف 2" value={newProperty.owner_phone2} onChange={e => setNewProperty({...newProperty, owner_phone2: e.target.value})} />
              <button onClick={() => setStep(2)} style={s.saveBtn}>التالي: الموقع <ChevronLeft size={20}/></button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ marginBottom: '20px' }}>📍 الموقع والنوع</h2>
              <select style={inputStyle} value={newProperty.listing_type} onChange={e => setNewProperty({...newProperty, listing_type: e.target.value})}>
                <option value="للإيجار">للإيجار</option><option value="للبيع">للبيع</option>
              </select>
              <select style={inputStyle} value={newProperty.category} onChange={e => setNewProperty({...newProperty, category: e.target.value})}>
                {['شقة','مكتب','محل','أرض','مخزن'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select style={inputStyle} value={newProperty.neighborhood} onChange={e => setNewProperty({...newProperty, neighborhood: e.target.value})}>
                {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <input style={inputStyle} placeholder="العنوان بالتفصيل (يدوي)" value={newProperty.exact_address} onChange={e => setNewProperty({...newProperty, exact_address: e.target.value})} />
              <div style={btnContainer}>
                <button onClick={() => setStep(1)} style={{ ...s.saveBtn, backgroundColor: theme.border }}>السابق</button>
                <button onClick={() => setStep(3)} style={s.saveBtn}>التالي: المواصفات</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ marginBottom: '20px' }}>🏠 المواصفات التقنية</h2>
              <input type="number" style={inputStyle} placeholder="المساحة (متر مربع)" value={newProperty.area} onChange={e => setNewProperty({...newProperty, area: e.target.value})} />
              
              {newProperty.category === 'شقة' && (
                <>
                  <input style={inputStyle} placeholder="الطابق" value={newProperty.features.floor || ''} onChange={e => updateFeature('floor', e.target.value)} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="number" style={{ ...inputStyle, flex: 1 }} placeholder="غرف النوم" value={newProperty.features.bedrooms || ''} onChange={e => updateFeature('bedrooms', e.target.value)} />
                    <input type="number" style={{ ...inputStyle, flex: 1 }} placeholder="الحمامات" value={newProperty.features.bathrooms || ''} onChange={e => updateFeature('bathrooms', e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '10px' }}>
                    <label><input type="checkbox" checked={newProperty.features.elevator} onChange={e => updateFeature('elevator', e.target.checked)} /> مصعد</label>
                    <label><input type="checkbox" checked={newProperty.features.central_gas} onChange={e => updateFeature('central_gas', e.target.checked)} /> غاز مركزي</label>
                  </div>
                </>
              )}
              
              <div style={btnContainer}>
                <button onClick={() => setStep(2)} style={{ ...s.saveBtn, backgroundColor: theme.border }}>السابق</button>
                <button onClick={() => setStep(4)} style={s.saveBtn}>التالي: المالية</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ marginBottom: '20px' }}>💰 المعلومات المالية</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="number" style={{ ...inputStyle, flex: 2 }} placeholder={newProperty.listing_type === 'للإيجار' ? "الأجرة" : "الثمن"} value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} />
                <select style={{ ...inputStyle, flex: 1 }} value={newProperty.currency} onChange={e => setNewProperty({...newProperty, currency: e.target.value})}>
                  <option value="دينار">دينار</option><option value="دولار">دولار</option><option value="شيكل">شيكل</option>
                </select>
              </div>
              <input style={inputStyle} placeholder="طريقة الدفع (كاش/شيكات)" value={newProperty.payment_method} onChange={e => setNewProperty({...newProperty, payment_method: e.target.value})} />
              <div style={{ padding: '15px', border: `1px solid ${theme.border}`, borderRadius: '15px', marginBottom: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" checked={newProperty.is_negotiable} onChange={e => setNewProperty({...newProperty, is_negotiable: e.target.checked})} /> السعر قابل للتفاوض
                </label>
              </div>
              <div style={btnContainer}>
                <button onClick={() => setStep(3)} style={{ ...s.saveBtn, backgroundColor: theme.border }}>السابق</button>
                <button onClick={onSave} style={{ ...s.saveBtn, backgroundColor: '#10b981' }}><CheckCircle2 size={18}/> حفظ العقار نهائياً</button>
              </div>
            </div>
          )}
        </div>
      )}

      {view === 'admin_list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <h3>إدارة القائمة ({listings.length})</h3>
            <X onClick={() => setView('admin_main')} style={{ cursor: 'pointer' }} />
          </div>
          {listings.map((item: any) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: theme.cardBg, borderRadius: '15px', border: `1px solid ${theme.border}` }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{item.internal_name || 'بدون اسم'}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{item.neighborhood} - {item.price} {item.currency}</div>
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <Edit3 size={20} color={theme.accent} onClick={() => onEdit(item)} style={{ cursor: 'pointer' }} />
                <Trash2 size={20} color="#ef4444" onClick={() => onDelete(item.id)} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
