import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Sun, Moon, X, PlusCircle, LayoutDashboard, LogOut, 
  Edit3, Trash2, User, MapPin, Home, DollarSign, 
  ChevronLeft, ChevronRight, CheckCircle2, Zap, Droplets, Flame
} from 'lucide-react';
import { s } from './styles';
import HomePage from './components/HomePage';
import PropertyGrid from './components/PropertyGrid';

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
    owner_name: '', owner_phone1: '', owner_phone2: '', owner_notes: '',
    neighborhood: 'الماصيون', exact_address: '',
    category: 'شقة', listing_type: 'للإيجار', 
    price: '', currency: 'دينار', area: '', is_negotiable: false,
    payment_method: 'كاش', building_fees: '', municipal_fees: '', education_tax: '',
    electricity_bill_included: false, water_bill_included: false,
    features: {
      floor: '', bedrooms: '', bathrooms: '', balconies: '',
      has_living_room: false, has_salon: false, has_storage: false,
      parking_type: 'لا يوجد', 
      has_elevator: false,
      electricity_meter: 'منفصلة', water_meter: 'منفصلة',
      central_gas: false, has_boiler: false, has_solar_heater: false,
      heating_type: 'لا يوجد'
    }
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
        owner_name: newProperty.owner_name,
        owner_phone: newProperty.owner_phone1,
        owner_phone2: newProperty.owner_phone2,
        owner_notes: newProperty.owner_notes,
        neighborhood: newProperty.neighborhood,
        exact_address: newProperty.exact_address,
        category: newProperty.category,
        listing_type: newProperty.listing_type,
        price: parseInt(newProperty.price) || 0,
        currency: newProperty.currency,
        area: parseFloat(newProperty.area) || 0,
        is_negotiable: newProperty.is_negotiable,
        payment_method: newProperty.payment_method,
        building_fees: parseFloat(newProperty.building_fees) || 0,
        municipal_fees: parseFloat(newProperty.municipal_fees) || 0,
        education_tax: parseFloat(newProperty.education_tax) || 0,
        electricity_bill_included: newProperty.electricity_bill_included,
        water_bill_included: newProperty.water_bill_included,
        features: newProperty.features,
        internal_name: `${newProperty.category} - ${newProperty.neighborhood} (${newProperty.owner_name})`
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

        {/* تحديث شاشة الدخول المعتمد */}
        {showLogin && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
          }}>
            <div style={{
              width: '100%', maxWidth: '340px', backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`, borderRadius: '24px',
              padding: '30px 20px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0 }}>دخول المشرف</h3> 
                  <X onClick={() => { setShowLogin(false); setPassword(''); }} style={{ cursor: 'pointer', opacity: 0.6 }} />
               </div>
               <input 
                 type="text"
                 inputMode="numeric"
                 pattern="[0-9]*"
                 autoFocus
                 style={{ 
                   ...s.input, textAlign: 'center', fontSize: '2rem', 
                   letterSpacing: '8px', color: theme.accent, 
                   backgroundColor: theme.bg, border: `1px solid ${theme.border}`,
                   borderRadius: '16px', padding: '15px' 
                 }} 
                 placeholder="••••••" 
                 value={password} 
                 onChange={e => {
                   const val = e.target.value;
                   if (/^\d*$/.test(val)) {
                     setPassword(val);
                     if (val === '749329') { 
                       setIsLoggedIn(true); setView('admin_main'); 
                       setShowLogin(false); setPassword(''); 
                     }
                   }
                 }} 
               />
               <p style={{ marginTop: '15px', fontSize: '0.85rem', color: theme.subText }}>أدخل الرقم السري للمتابعة</p>
            </div>
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
    padding: '18px', 
    fontSize: '1.1rem', 
    marginBottom: '12px', 
    backgroundColor: theme.cardBg, 
    color: theme.text, 
    border: `1px solid ${theme.border}`,
    borderRadius: '12px'
  };

  const labelStyle = { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: `1px solid ${theme.border}`, borderRadius: '10px', fontSize: '0.95rem' };

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
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
            {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: '6px', borderRadius: '10px', backgroundColor: step >= i ? theme.accent : theme.border }} />)}
          </div>

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '15px' }}><User size={18}/> معلومات صاحب العقار</h3>
              <input style={inputStyle} placeholder="الاسم الكامل" value={newProperty.owner_name} onChange={e => setNewProperty({...newProperty, owner_name: e.target.value})} />
              <input style={inputStyle} type="tel" placeholder="رقم الهاتف 1" value={newProperty.owner_phone1} onChange={e => setNewProperty({...newProperty, owner_phone1: e.target.value})} />
              <input style={inputStyle} type="tel" placeholder="رقم الهاتف 2" value={newProperty.owner_phone2} onChange={e => setNewProperty({...newProperty, owner_phone2: e.target.value})} />
              <textarea style={{...inputStyle, height: '80px'}} placeholder="ملاحظات خاصة عن المالك (لا تظهر للعامة)" value={newProperty.owner_notes} onChange={e => setNewProperty({...newProperty, owner_notes: e.target.value})} />
              <button onClick={() => setStep(2)} style={s.saveBtn}>التالي: الموقع <ChevronLeft size={20}/></button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '15px' }}><MapPin size={18}/> الموقع ونوع العقار</h3>
              <select style={inputStyle} value={newProperty.neighborhood} onChange={e => setNewProperty({...newProperty, neighborhood: e.target.value})}>
                {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <input style={inputStyle} placeholder="العنوان بالتفصيل (اسم العمارة، الشارع..)" value={newProperty.exact_address} onChange={e => setNewProperty({...newProperty, exact_address: e.target.value})} />
              <div style={{ marginBottom: '10px', fontSize: '0.9rem', opacity: 0.7 }}>تصنيف العقار:</div>
              <select style={inputStyle} value={newProperty.category} onChange={e => setNewProperty({...newProperty, category: e.target.value})}>
                <option value="شقة">شقة غير مفروشة</option>
                <option value="شقة مفروشة">شقة مفروشة</option>
                <option value="مكتب">مكتب</option>
                <option value="محل">محل</option>
                <option value="أرض">أرض</option>
              </select>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setStep(1)} style={{ ...s.saveBtn, backgroundColor: theme.border, flex: 1 }}>السابق</button>
                <button onClick={() => setStep(3)} style={{ ...s.saveBtn, flex: 2 }}>التالي: المواصفات</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '15px' }}><Home size={18}/> المواصفات الفنية</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                 <input type="number" style={{...inputStyle, flex: 1}} placeholder="المساحة" value={newProperty.area} onChange={e => setNewProperty({...newProperty, area: e.target.value})} />
                 <input style={{...inputStyle, flex: 1}} placeholder="الطابق" value={newProperty.features.floor || ''} onChange={e => updateFeature('floor', e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" style={{ ...inputStyle, flex: 1 }} placeholder="غرف النوم" value={newProperty.features.bedrooms || ''} onChange={e => updateFeature('bedrooms', e.target.value)} />
                <input type="number" style={{ ...inputStyle, flex: 1 }} placeholder="الحمامات" value={newProperty.features.bathrooms || ''} onChange={e => updateFeature('bathrooms', e.target.value)} />
                <input type="number" style={{ ...inputStyle, flex: 1 }} placeholder="البرندات" value={newProperty.features.balconies || ''} onChange={e => updateFeature('balconies', e.target.value)} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                <label style={labelStyle}><input type="checkbox" checked={newProperty.features.has_living_room} onChange={e => updateFeature('has_living_room', e.target.checked)} /> صالة</label>
                <label style={labelStyle}><input type="checkbox" checked={newProperty.features.has_salon} onChange={e => updateFeature('has_salon', e.target.checked)} /> صالون</label>
                <label style={labelStyle}><input type="checkbox" checked={newProperty.features.has_storage} onChange={e => updateFeature('has_storage', e.target.checked)} /> مخزن</label>
                <label style={labelStyle}><input type="checkbox" checked={newProperty.features.has_elevator} onChange={e => updateFeature('has_elevator', e.target.checked)} /> مصعد</label>
              </div>

              <div style={{ marginBottom: '10px', fontSize: '0.9rem' }}>الموقف ونوع التدفئة:</div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <select style={{...inputStyle, flex: 1}} value={newProperty.features.parking_type} onChange={e => updateFeature('parking_type', e.target.value)}>
                   <option value="لا يوجد">بدون موقف</option><option value="داخلي">موقف داخلي</option><option value="خارجي">موقف خارجي</option>
                </select>
                <select style={{...inputStyle, flex: 1}} value={newProperty.features.heating_type} onChange={e => updateFeature('heating_type', e.target.value)}>
                   <option value="لا يوجد">بدون تدفئة</option><option value="غاز">تدفئة غاز</option><option value="سولار">تدفئة سولار</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                <label style={labelStyle}><input type="checkbox" checked={newProperty.features.central_gas} onChange={e => updateFeature('central_gas', e.target.checked)} /> غاز مركزي</label>
                <label style={labelStyle}><input type="checkbox" checked={newProperty.features.has_boiler} onChange={e => updateFeature('has_boiler', e.target.checked)} /> بويلر</label>
                <label style={labelStyle}><input type="checkbox" checked={newProperty.features.has_solar_heater} onChange={e => updateFeature('has_solar_heater', e.target.checked)} /> حمام شمسي</label>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setStep(2)} style={{ ...s.saveBtn, backgroundColor: theme.border, flex: 1 }}>السابق</button>
                <button onClick={() => setStep(4)} style={{ ...s.saveBtn, flex: 2 }}>التالي: المالية</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '15px' }}><DollarSign size={18}/> المعلومات المالية والرسوم</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" style={{ ...inputStyle, flex: 2 }} placeholder="الأجرة / الثمن" value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} />
                <select style={{ ...inputStyle, flex: 1 }} value={newProperty.currency} onChange={e => setNewProperty({...newProperty, currency: e.target.value})}>
                  <option value="دينار">دينار</option><option value="دولار">دولار</option><option value="شيكل">شيكل</option>
                </select>
              </div>
              <select style={inputStyle} value={newProperty.payment_method} onChange={e => setNewProperty({...newProperty, payment_method: e.target.value})}>
                <option value="كاش">دفع كاش</option><option value="شيكات">دفع شيكات</option><option value="كاش أو شيكات">كاش أو شيكات</option>
              </select>
              
              <div style={{ padding: '12px', border: `1px solid ${theme.border}`, borderRadius: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '0.85rem', marginBottom: '10px', opacity: 0.8 }}>الفواتير والرسوم الإضافية:</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                   <label><input type="checkbox" checked={newProperty.electricity_bill_included} onChange={e => setNewProperty({...newProperty, electricity_bill_included: e.target.checked})} /> فاتورة الكهرباء</label>
                   <label><input type="checkbox" checked={newProperty.water_bill_included} onChange={e => setNewProperty({...newProperty, water_bill_included: e.target.checked})} /> فاتورة المياه</label>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                   <input type="number" style={{...inputStyle, marginBottom: 0, flex: 1, fontSize: '0.9rem'}} placeholder="خدمات العمارة" value={newProperty.building_fees} onChange={e => setNewProperty({...newProperty, building_fees: e.target.value})} />
                   <input type="number" style={{...inputStyle, marginBottom: 0, flex: 1, fontSize: '0.9rem'}} placeholder="ضريبة المعارف" value={newProperty.education_tax} onChange={e => setNewProperty({...newProperty, education_tax: e.target.value})} />
                </div>
              </div>

              <label style={{ ...labelStyle, marginBottom: '15px' }}>
                <input type="checkbox" checked={newProperty.is_negotiable} onChange={e => setNewProperty({...newProperty, is_negotiable: e.target.checked})} /> السعر قابل للتفاوض
              </label>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setStep(3)} style={{ ...s.saveBtn, backgroundColor: theme.border, flex: 1 }}>السابق</button>
                <button onClick={onSave} style={{ ...s.saveBtn, backgroundColor: '#10b981', flex: 2 }}><CheckCircle2 size={18}/> حفظ العقار</button>
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
