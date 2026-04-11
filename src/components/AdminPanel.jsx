import React from 'react';
import { PlusCircle, LayoutDashboard, LogOut, X, Edit3, Trash2, User, MapPin, Home, DollarSign } from 'lucide-react';
import { s } from '../styles';

const NEIGHBORHOODS = ['الماصيون', 'الطيرة', 'عين منجد', 'الإرسال', 'المصايف', 'حي النهضة', 'رام الله التحتا', 'وسط البلد', 'عين مصباح', 'البالوع', 'سطح مرحبا', 'بيتونيا', 'سردا', 'أبو قش', 'رافات', 'كفر عقب', 'منطقة أخرى'];

const AdminPanel = ({ 
  view, setView, listings, onSave, onDelete, onEdit, 
  newProperty, setNewProperty, editingId, onLogout, theme 
}) => {

  // دالة مساعدة لتحديث الحقول الديناميكية داخل features
  const updateFeature = (key, value) => {
    setNewProperty({
      ...newProperty,
      features: { ...newProperty.features, [key]: value }
    });
  };

  return (
    <div style={{ ...s.adminPanel, backgroundColor: theme.cardBg, color: theme.text }}>
      
      {view === 'admin_main' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button onClick={() => setView('admin_add')} style={s.serviceCard}><PlusCircle color={theme.accent} /> <span style={s.serviceText}>إضافة عقار جديد</span></button>
          <button onClick={() => setView('admin_list')} style={s.serviceCard}><LayoutDashboard color={theme.accent} /> <span style={s.serviceText}>إدارة القائمة الحالية</span></button>
          <button onClick={onLogout} style={{ ...s.serviceCard, border: '1px solid #fee2e2' }}><LogOut color="#ef4444" /> <span style={{ ...s.serviceText, color: '#ef4444' }}>تسجيل الخروج</span></button>
        </div>
      )}

      {view === 'admin_add' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={s.modalHeader}>
            <h3 style={s.miniTitle}>{editingId ? "تعديل العقار" : "إضافة عقار جديد"}</h3>
            <X onClick={() => setView('admin_main')} style={{ cursor: 'pointer' }} />
          </div>

          {/* القسم 1: معلومات المالك */}
          <div style={s.descBox}>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}><User size={16} /> معلومات صاحب العقار</p>
            <input style={s.input} placeholder="اسم صاحب العقار" value={newProperty.owner_name} onChange={e => setNewProperty({ ...newProperty, owner_name: e.target.value })} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input style={s.input} placeholder="رقم هاتف 1" value={newProperty.owner_phone1} onChange={e => setNewProperty({ ...newProperty, owner_phone1: e.target.value })} />
              <input style={s.input} placeholder="رقم هاتف 2" value={newProperty.owner_phone2} onChange={e => setNewProperty({ ...newProperty, owner_phone2: e.target.value })} />
            </div>
          </div>

          {/* القسم 2: الموقع والنوع */}
          <div style={s.descBox}>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}><MapPin size={16} /> الموقع والنوع</p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <select style={{ ...s.input, flex: 1 }} value={newProperty.listing_type} onChange={e => setNewProperty({ ...newProperty, listing_type: e.target.value })}>
                <option value="للإيجار">للإيجار</option>
                <option value="للبيع">للبيع</option>
              </select>
              <select style={{ ...s.input, flex: 1 }} value={newProperty.category} onChange={e => setNewProperty({ ...newProperty, category: e.target.value })}>
                {['شقة', 'مكتب', 'محل', 'أرض', 'مخزن'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <select style={s.input} value={newProperty.neighborhood} onChange={e => setNewProperty({ ...newProperty, neighborhood: e.target.value })}>
              {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <input style={s.input} placeholder="العنوان التفصيلي (يدوي)" value={newProperty.exact_address} onChange={e => setNewProperty({ ...newProperty, exact_address: e.target.value })} />
          </div>

          {/* القسم 3: مواصفات الشقة (يظهر فقط إذا كان النوع شقة) */}
          {newProperty.category === 'شقة' && (
            <div style={{ ...s.descBox, border: `1px solid ${theme.accent}` }}>
              <p style={{ fontWeight: 'bold', marginBottom: '10px' }}><Home size={16} /> مواصفات الشقة (غير مفروشة)</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <input type="number" style={s.input} placeholder="المساحة" value={newProperty.area} onChange={e => setNewProperty({...newProperty, area: e.target.value})} />
                <input style={s.input} placeholder="الطابق" value={newProperty.features.floor || ''} onChange={e => updateFeature('floor', e.target.value)} />
                <input type="number" style={s.input} placeholder="الغرف" value={newProperty.features.bedrooms || ''} onChange={e => updateFeature('bedrooms', e.target.value)} />
                <input type="number" style={s.input} placeholder="الحمامات" value={newProperty.features.bathrooms || ''} onChange={e => updateFeature('bathrooms', e.target.value)} />
              </div>
              
              {/* خيارات Checkbox للمواصفات */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px', fontSize: '0.85rem' }}>
                <label><input type="checkbox" checked={newProperty.features.elevator} onChange={e => updateFeature('elevator', e.target.checked)} /> مصعد</label>
                <label><input type="checkbox" checked={newProperty.features.central_gas} onChange={e => updateFeature('central_gas', e.target.checked)} /> غاز مركزي</label>
                <label><input type="checkbox" checked={newProperty.features.parking} onChange={e => updateFeature('parking', e.target.checked)} /> موقف خاص</label>
                <label><input type="checkbox" checked={newProperty.features.storage} onChange={e => updateFeature('storage', e.target.checked)} /> مخزن</label>
              </div>
            </div>
          )}

          {/* القسم 4: المعلومات المالية */}
          <div style={s.descBox}>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}><DollarSign size={16} /> المعلومات المالية</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="number" style={{ ...s.input, flex: 2 }} 
                placeholder={newProperty.listing_type === 'للإيجار' ? "الأجرة الشهرية" : "ثمن البيع"} 
                value={newProperty.price} onChange={e => setNewProperty({ ...newProperty, price: e.target.value })} 
              />
              <select style={{ ...s.input, flex: 1 }} value={newProperty.currency} onChange={e => setNewProperty({ ...newProperty, currency: e.target.value })}>
                <option value="دينار">دينار</option>
                <option value="دولار">دولار</option>
                <option value="شيكل">شيكل</option>
              </select>
            </div>
            <label style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px', margin: '10px 0' }}>
              <input type="checkbox" checked={newProperty.is_negotiable} onChange={e => setNewProperty({ ...newProperty, is_negotiable: e.target.checked })} />
              إمكانية التفاوض (السعر نهائي)
            </label>
            <input style={s.input} placeholder="طريقة الدفع (مثلاً: كاش، شيكات)" value={newProperty.payment_method} onChange={e => setNewProperty({ ...newProperty, payment_method: e.target.value })} />
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <input type="number" style={s.input} placeholder="خدمات العمارة" value={newProperty.building_fees} onChange={e => setNewProperty({ ...newProperty, building_fees: e.target.value })} />
              <input type="number" style={s.input} placeholder="بلدية ومعارف" value={newProperty.municipal_fees} onChange={e => setNewProperty({ ...newProperty, municipal_fees: e.target.value })} />
            </div>
          </div>

          <button onClick={onSave} style={s.callAction}>حفظ العقار الآن</button>
        </div>
      )}

      {/* قائمة الإدارة تبقى كما هي مع تغيير طفيف للتنسيق */}
      {view === 'admin_list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={s.modalHeader}>
            <h3 style={s.miniTitle}>إدارة العقارات</h3>
            <X onClick={() => setView('admin_main')} style={{ cursor: 'pointer' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {listings.map(item => (
              <div key={item.id} style={s.miniCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={s.miniTitle}>{item.internal_name || 'بدون اسم'}</div>
                    <div style={s.miniSub}>{item.neighborhood} - {item.price} {item.currency}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Edit3 size={20} onClick={() => onEdit(item)} style={{ color: theme.accent, cursor: 'pointer' }} />
                    <Trash2 size={20} onClick={() => onDelete(item.id)} style={{ color: '#ef4444', cursor: 'pointer' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
