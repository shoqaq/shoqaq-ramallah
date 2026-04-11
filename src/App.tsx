import React from 'react';
import { 
  PlusCircle, LayoutDashboard, LogOut, Edit3, Trash2, 
  User, MapPin, Home, DollarSign, ChevronLeft, CheckCircle2, X 
} from 'lucide-react';
import { s } from '../styles';

const NEIGHBORHOODS = ['الماصيون', 'الطيرة', 'عين منجد', 'الإرسال', 'المصايف', 'البالوع', 'بيتونيا', 'سردا', 'منطقة أخرى'];

export default function AdminPanel({ 
  view, setView, listings, onSave, onEdit, onDelete, 
  newProperty, setNewProperty, theme, step, setStep, onLogout 
}) {
  
  const updateFeature = (k, v) => 
    setNewProperty({ ...newProperty, features: { ...newProperty.features, [k]: v } });

  const inputStyle = { 
    ...s.input, 
    padding: '18px', 
    fontSize: '1.1rem', 
    marginBottom: '12px', 
    backgroundColor: theme.cardBg, 
    color: theme.text, 
    border: `1px solid ${theme.border}`,
    borderRadius: '12px',
    textAlign: 'right'
  };

  const labelStyle = { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    padding: '12px', 
    border: `1px solid ${theme.border}`, 
    borderRadius: '10px', 
    fontSize: '0.95rem',
    color: theme.text
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', direction: 'rtl' }}>
      
      {/* القائمة الرئيسية للآدمن */}
      {view === 'admin_main' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button onClick={() => {setStep(1); setView('admin_add')}} style={s.menuBtn}><PlusCircle /> إضافة عقار جديد</button>
          <button onClick={() => setView('admin_list')} style={s.menuBtn}><LayoutDashboard /> إدارة العقارات</button>
          <button onClick={onLogout} style={{ ...s.menuBtn, color: '#ef4444' }}><LogOut /> خروج</button>
        </div>
      )}

      {/* نموذج إضافة/تعديل عقار */}
      {view === 'admin_add' && (
        <div>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
            {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: '6px', borderRadius: '10px', backgroundColor: step >= i ? theme.accent : theme.border }} />)}
          </div>

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '15px' }}><User size={18}/> معلومات المالك</h3>
              <input style={inputStyle} placeholder="الاسم الكامل" value={newProperty.owner_name} onChange={e => setNewProperty({...newProperty, owner_name: e.target.value})} />
              <input style={inputStyle} type="tel" placeholder="رقم الهاتف 1" value={newProperty.owner_phone1} onChange={e => setNewProperty({...newProperty, owner_phone1: e.target.value})} />
              <input style={inputStyle} type="tel" placeholder="رقم الهاتف 2" value={newProperty.owner_phone2} onChange={e => setNewProperty({...newProperty, owner_phone2: e.target.value})} />
              <textarea style={{...inputStyle, height: '80px'}} placeholder="ملاحظات خاصة" value={newProperty.owner_notes} onChange={e => setNewProperty({...newProperty, owner_notes: e.target.value})} />
              <button onClick={() => setStep(2)} style={s.saveBtn}>التالي: الموقع <ChevronLeft size={20}/></button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '15px' }}><MapPin size={18}/> الموقع والتصنيف</h3>
              <select style={inputStyle} value={newProperty.neighborhood} onChange={e => setNewProperty({...newProperty, neighborhood: e.target.value})}>
                {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <input style={inputStyle} placeholder="العنوان بالتفصيل" value={newProperty.exact_address} onChange={e => setNewProperty({...newProperty, exact_address: e.target.value})} />
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                <input type="number" style={inputStyle} placeholder="نوم" value={newProperty.features.bedrooms || ''} onChange={e => updateFeature('bedrooms', e.target.value)} />
                <input type="number" style={inputStyle} placeholder="حمام" value={newProperty.features.bathrooms || ''} onChange={e => updateFeature('bathrooms', e.target.value)} />
                <input type="number" style={inputStyle} placeholder="برندا" value={newProperty.features.balconies || ''} onChange={e => updateFeature('balconies', e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setStep(2)} style={{ ...s.saveBtn, backgroundColor: theme.border, flex: 1 }}>السابق</button>
                <button onClick={() => setStep(4)} style={{ ...s.saveBtn, flex: 2 }}>التالي: المالية</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '15px' }}><DollarSign size={18}/> المالية</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" style={{ ...inputStyle, flex: 2 }} placeholder="السعر" value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} />
                <select style={{ ...inputStyle, flex: 1 }} value={newProperty.currency} onChange={e => setNewProperty({...newProperty, currency: e.target.value})}>
                  <option value="دينار">دينار</option><option value="دولار">دولار</option><option value="شيكل">شيكل</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setStep(3)} style={{ ...s.saveBtn, backgroundColor: theme.border, flex: 1 }}>السابق</button>
                <button onClick={onSave} style={{ ...s.saveBtn, backgroundColor: '#10b981', flex: 2 }}>حفظ العقار</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* إدارة القائمة */}
      {view === 'admin_list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>قائمة العقارات ({listings.length})</h3>
            <X onClick={() => setView('admin_main')} style={{ cursor: 'pointer' }} />
          </div>
          {listings.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: theme.cardBg, borderRadius: '15px', border: `1px solid ${theme.border}` }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{item.internal_name}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{item.neighborhood}</div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <Edit3 size={18} color={theme.accent} onClick={() => onEdit(item)} />
                <Trash2 size={18} color="#ef4444" onClick={() => onDelete(item.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
