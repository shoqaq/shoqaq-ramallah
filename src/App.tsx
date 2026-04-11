import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Sun, Moon, X, PlusCircle, LayoutDashboard, LogOut, Edit3, Trash2, User, MapPin, Home, DollarSign, ChevronLeft } from 'lucide-react';
import { s } from './styles';
import HomePage from './components/HomePage';
import PropertyGrid from './components/PropertyGrid';

// إعداد الاتصال بـ Supabase
const supabase = createClient('https://ohomklxgvyzwjexkvzfc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag');

const NEIGHBORHOODS = ['الماصيون', 'الطيرة', 'عين منجد', 'الإرسال', 'المصايف', 'حي النهضة', 'رام الله التحتا', 'وسط البلد', 'عين مصباح', 'البالوع', 'سطح مرحبا', 'بيتونيا', 'سردا', 'أبو قش', 'رافات', 'كفر عقب', 'منطقة أخرى'];

export default function App() {
  const [view, setView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [listings, setListings] = useState([]);
  const [selectedProp, setSelectedProp] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState(null);

  // الحالة الابتدائية للعقار الجديد (شاملة لجميع الحقول)
  const initialPropertyState = { 
    internal_name: '', 
    neighborhood: 'الماصيون', 
    status: 'متاح', 
    category: 'شقة', 
    listing_type: 'للإيجار',
    price: '', 
    currency: 'دينار', 
    description: '', 
    post_url: '', 
    video_url: '',
    owner_name: '',
    owner_phone1: '',
    owner_phone2: '',
    exact_address: '',
    is_negotiable: false,
    payment_method: 'كاش',
    building_fees: 0,
    municipal_fees: 0,
    electricity_bill_included: false,
    water_bill_included: false,
    features: {} 
  };

  const [newProperty, setNewProperty] = useState(initialPropertyState);

  const fetchListings = async () => {
    const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (data) setListings(data);
  };

  useEffect(() => { fetchListings(); }, []);

  const handleSave = async () => {
    const dataToSave = { ...newProperty };
    if (editingId) {
      await supabase.from('listings').update(dataToSave).eq('id', editingId);
    } else {
      await supabase.from('listings').insert([dataToSave]);
    }
    setEditingId(null);
    setNewProperty(initialPropertyState);
    fetchListings();
    setView('admin_list');
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العقار نهائياً؟')) {
      const { error } = await supabase.from('listings').delete().eq('id', id);
      if (!error) {
        setListings(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  const handleEdit = (item) => {
    setNewProperty(item);
    setEditingId(item.id);
    setView('admin_add');
  };

  const theme = {
    bg: isDarkMode ? '#0f172a' : '#f8fafc',
    text: isDarkMode ? '#f8fafc' : '#1e293b',
    subText: isDarkMode ? '#94a3b8' : '#64748b',
    border: isDarkMode ? '#1e293b' : '#e2e8f0',
    cardBg: isDarkMode ? '#1e293b' : '#ffffff',
    accent: '#f59e0b'
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      <div style={s.topNav}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, border: `1px solid ${theme.border}`, color: theme.text, backgroundColor: theme.cardBg }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.wrapper}>
        {view === 'home' && !showLogin && !isLoggedIn && (
          <HomePage onNavigate={setView} onLogoClick={() => setShowLogin(true)} theme={theme} isDarkMode={isDarkMode} />
        )}

        {view === 'browse' && (
          <PropertyGrid listings={listings} onBack={() => setView('home')} onSelect={setSelectedProp} selectedProp={selectedProp} onCloseModal={() => setSelectedProp(null)} theme={theme} />
        )}

        {showLogin && !isLoggedIn && (
          <div style={{ ...s.modalOverlay, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ ...s.miniCard, width: '90%', maxWidth: '350px', backgroundColor: theme.cardBg }}>
              <div style={s.modalHeader}>
                <h3 style={s.miniTitle}>دخول المشرف</h3>
                <X onClick={() => setShowLogin(false)} style={{ cursor: 'pointer' }} />
              </div>
              <input 
                type="password" 
                inputMode="numeric"
                autoFocus
                style={{ ...s.input, textAlign: 'center', letterSpacing: '10px', fontSize: '1.5rem' }} 
                placeholder="••••••"
                value={password}
                onChange={e => {
                  const val = e.target.value;
                  setPassword(val);
                  if (val === '749329') {
                    setIsLoggedIn(true); setView('admin_main'); setShowLogin(false); setPassword('');
                  }
                }}
              />
            </div>
          </div>
        )}

        {isLoggedIn && (
          <AdminPanel 
            view={view} setView={setView} listings={listings} onSave={handleSave} 
            onDelete={handleDelete} onEdit={handleEdit} newProperty={newProperty} 
            setNewProperty={setNewProperty} editingId={editingId} 
            onLogout={() => { setIsLoggedIn(false); setView('home'); }} theme={theme} 
          />
        )}
      </div>
      <footer style={{ ...s.footer, color: theme.subText }}>Noureddine Real Estate • 2026</footer>
    </div>
  );
}

// --- مكون لوحة التحكم (AdminPanel) مدمج بنفس الملف لسهولة النسخ ---

function AdminPanel({ view, setView, listings, onSave, onDelete, onEdit, newProperty, setNewProperty, editingId, onLogout, theme }) {
  const updateFeature = (key, value) => {
    setNewProperty({ ...newProperty, features: { ...newProperty.features, [key]: value } });
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      {view === 'admin_main' && (
        <div style={s.services}>
          <button onClick={() => setView('admin_add')} style={{...s.serviceCard, backgroundColor: theme.cardBg}}><PlusCircle color={theme.accent} /> <span style={{...s.serviceText, color: theme.text}}>إضافة عقار جديد</span></button>
          <button onClick={() => setView('admin_list')} style={{...s.serviceCard, backgroundColor: theme.cardBg}}><LayoutDashboard color={theme.accent} /> <span style={{...s.serviceText, color: theme.text}}>إدارة العقارات</span></button>
          <button onClick={onLogout} style={{...s.serviceCard, backgroundColor: theme.cardBg}}><LogOut color="#ef4444" /> <span style={{...s.serviceText, color: '#ef4444'}}>تسجيل الخروج</span></button>
        </div>
      )}

      {view === 'admin_add' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={s.sectionHeader}>
            <button onClick={() => setView('admin_main')} style={{...s.backBtn, backgroundColor: theme.cardBg, color: theme.text}}><ChevronLeft size={18} /> عودة</button>
            <h3 style={s.miniTitle}>{editingId ? "تعديل بيانات العقار" : "إضافة عقار جديد"}</h3>
          </div>

          {/* القسم 1: المالك */}
          <div style={{...s.descBox, backgroundColor: theme.cardBg}}>
            <p style={{ fontWeight: '800', marginBottom: '12px', color: theme.accent }}><User size={16} /> معلومات المالك</p>
            <input style={{...s.input, backgroundColor: theme.bg, color: theme.text}} placeholder="اسم المالك" value={newProperty.owner_name} onChange={e => setNewProperty({...newProperty, owner_name: e.target.value})} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input style={{...s.input, backgroundColor: theme.bg, color: theme.text}} placeholder="هاتف 1" value={newProperty.owner_phone1} onChange={e => setNewProperty({...newProperty, owner_phone1: e.target.value})} />
              <input style={{...s.input, backgroundColor: theme.bg, color: theme.text}} placeholder="هاتف 2" value={newProperty.owner_phone2} onChange={e => setNewProperty({...newProperty, owner_phone2: e.target.value})} />
            </div>
          </div>

          {/* القسم 2: الموقع */}
          <div style={{...s.descBox, backgroundColor: theme.cardBg}}>
            <p style={{ fontWeight: '800', marginBottom: '12px', color: theme.accent }}><MapPin size={16} /> الموقع والتصنيف</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select style={{...s.input, flex: 1, backgroundColor: theme.bg, color: theme.text}} value={newProperty.listing_type} onChange={e => setNewProperty({...newProperty, listing_type: e.target.value})}>
                <option value="للإيجار">للإيجار</option>
                <option value="للبيع">للبيع</option>
              </select>
              <select style={{...s.input, flex: 1, backgroundColor: theme.bg, color: theme.text}} value={newProperty.category} onChange={e => setNewProperty({...newProperty, category: e.target.value})}>
                {['شقة', 'مكتب', 'محل', 'أرض', 'مخزن'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <select style={{...s.input, backgroundColor: theme.bg, color: theme.text}} value={newProperty.neighborhood} onChange={e => setNewProperty({...newProperty, neighborhood: e.target.value})}>
              {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <input style={{...s.input, backgroundColor: theme.bg, color: theme.text}} placeholder="العنوان بالتفصيل" value={newProperty.exact_address} onChange={e => setNewProperty({...newProperty, exact_address: e.target.value})} />
          </div>

          {/* القسم 3: مواصفات الشقة */}
          {newProperty.category === 'شقة' && (
            <div style={{...s.descBox, backgroundColor: theme.cardBg, border: `1px solid ${theme.accent}`}}>
              <p style={{ fontWeight: '800', marginBottom: '12px' }}><Home size={16} /> مواصفات الشقة</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input type="number" style={{...s.input, backgroundColor: theme.bg, color: theme.text}} placeholder="المساحة" value={newProperty.area} onChange={e => setNewProperty({...newProperty, area: e.target.value})} />
                <input style={{...s.input, backgroundColor: theme.bg, color: theme.text}} placeholder="الطابق" value={newProperty.features.floor || ''} onChange={e => updateFeature('floor', e.target.value)} />
                <input type="number" style={{...s.input, backgroundColor: theme.bg, color: theme.text}} placeholder="غرف النوم" value={newProperty.features.bedrooms || ''} onChange={e => updateFeature('bedrooms', e.target.value)} />
                <input type="number" style={{...s.input, backgroundColor: theme.bg, color: theme.text}} placeholder="الحمامات" value={newProperty.features.bathrooms || ''} onChange={e => updateFeature('bathrooms', e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
                <label style={{ fontSize: '0.85rem' }}><input type="checkbox" checked={newProperty.features.elevator} onChange={e => updateFeature('elevator', e.target.checked)} /> مصعد</label>
                <label style={{ fontSize: '0.85rem' }}><input type="checkbox" checked={newProperty.features.gas} onChange={e => updateFeature('gas', e.target.checked)} /> غاز مركزي</label>
              </div>
            </div>
          )}

          {/* القسم 4: المالية */}
          <div style={{...s.descBox, backgroundColor: theme.cardBg}}>
            <p style={{ fontWeight: '800', marginBottom: '12px', color: theme.accent }}><DollarSign size={16} /> البيانات المالية</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="number" style={{...s.input, flex: 2, backgroundColor: theme.bg, color: theme.text}} placeholder={newProperty.listing_type === 'للإيجار' ? "الأجرة الشهرية" : "ثمن البيع"} value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} />
              <select style={{...s.input, flex: 1, backgroundColor: theme.bg, color: theme.text}} value={newProperty.currency} onChange={e => setNewProperty({...newProperty, currency: e.target.value})}>
                <option value="دينار">دينار</option><option value="دولار">دولار</option><option value="شيكل">شيكل</option>
              </select>
            </div>
            <label style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0' }}>
              <input type="checkbox" checked={newProperty.is_negotiable} onChange={e => setNewProperty({...newProperty, is_negotiable: e.target.checked})} /> السعر قابل للتفاوض
            </label>
            <input style={{...s.input, backgroundColor: theme.bg, color: theme.text}} placeholder="طريقة الدفع (كاش/شيكات)" value={newProperty.payment_method} onChange={e => setNewProperty({...newProperty, payment_method: e.target.value})} />
          </div>

          <button onClick={onSave} style={{...s.callAction, position: 'relative', bottom: 0}}>حفظ التعديلات الآن</button>
        </div>
      )}

      {view === 'admin_list' && (
        <div style={s.gridDisplay}>
          <div style={s.sectionHeader}>
            <button onClick={() => setView('admin_main')} style={{...s.backBtn, backgroundColor: theme.cardBg, color: theme.text}}><ChevronLeft size={18} /> عودة</button>
            <h3 style={s.miniTitle}>قائمة العقارات ({listings.length})</h3>
          </div>
          {listings.map(item => (
            <div key={item.id} style={{...s.miniCard, backgroundColor: theme.cardBg}}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{...s.miniTitle, color: theme.text}}>{item.internal_name || 'عقار بدون اسم'}</div>
                  <div style={s.miniSub}>{item.neighborhood} - {item.price} {item.currency}</div>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <Edit3 size={20} color={theme.accent} onClick={() => onEdit(item)} style={{ cursor: 'pointer' }} />
                  <Trash2 size={20} color="#ef4444" onClick={() => onDelete(item.id)} style={{ cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
