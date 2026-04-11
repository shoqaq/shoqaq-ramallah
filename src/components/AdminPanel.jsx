import React, { useState } from 'react';
import { User, MapPin, Home, DollarSign, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { s } from '../styles';

const AdminPanel = ({ view, setView, listings, onSave, onDelete, onEdit, newProperty, setNewProperty, editingId, theme }) => {
  const [step, setStep] = useState(1); // حالة لتتبع الشاشة الحالية

  const updateFeature = (key, value) => {
    setNewProperty({ ...newProperty, features: { ...newProperty.features, [key]: value } });
  };

  // تنسيق مخصص لمربعات الإدخال الكبيرة
  const bigInput = {
    ...s.input,
    padding: '16px',
    fontSize: '1.1rem',
    borderRadius: '16px',
    marginBottom: '15px',
    border: `2px solid ${theme.border}`
  };

  return (
    <div style={{ paddingBottom: '100px' }}>
      {view === 'admin_add' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {/* شريط التقدم */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', padding: '0 10px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ 
                width: '22%', height: '6px', borderRadius: '10px', 
                backgroundColor: step >= i ? theme.accent : theme.border 
              }} />
            ))}
          </div>

          {/* الشاشة 1: المالك */}
          {step === 1 && (
            <div style={s.services}>
              <h2 style={{ ...s.title, fontSize: '1.5rem' }}><User color={theme.accent} /> معلومات المالك</h2>
              <input style={bigInput} placeholder="اسم المالك الكامل" value={newProperty.owner_name} onChange={e => setNewProperty({...newProperty, owner_name: e.target.value})} />
              <input style={bigInput} type="tel" placeholder="رقم الهاتف الأساسي" value={newProperty.owner_phone1} onChange={e => setNewProperty({...newProperty, owner_phone1: e.target.value})} />
              <input style={bigInput} type="tel" placeholder="رقم هاتف إضافي (اختياري)" value={newProperty.owner_phone2} onChange={e => setNewProperty({...newProperty, owner_phone2: e.target.value})} />
              <button onClick={() => setStep(2)} style={s.callAction}>التالي: الموقع <ChevronLeft /></button>
            </div>
          )}

          {/* الشاشة 2: الموقع */}
          {step === 2 && (
            <div style={s.services}>
              <h2 style={{ ...s.title, fontSize: '1.5rem' }}><MapPin color={theme.accent} /> أين يقع العقار؟</h2>
              <select style={bigInput} value={newProperty.listing_type} onChange={e => setNewProperty({...newProperty, listing_type: e.target.value})}>
                <option value="للإيجار">للإيجار</option>
                <option value="للبيع">للبيع</option>
              </select>
              <select style={bigInput} value={newProperty.category} onChange={e => setNewProperty({...newProperty, category: e.target.value})}>
                <option value="شقة">شقة</option>
                <option value="مكتب">مكتب</option>
                <option value="محل">محل</option>
                <option value="أرض">أرض</option>
              </select>
              <select style={bigInput} value={newProperty.neighborhood} onChange={e => setNewProperty({...newProperty, neighborhood: e.target.value})}>
                {/* تذكر وضع مصفوفة الأحياء هنا */}
                <option value="الماصيون">الماصيون</option>
                <option value="الطيرة">الطيرة</option>
              </select>
              <input style={bigInput} placeholder="العنوان بالتفصيل (مثلاً: قرب مسجد...)" value={newProperty.exact_address} onChange={e => setNewProperty({...newProperty, exact_address: e.target.value})} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setStep(1)} style={{ ...s.backBtn, flex: 1 }}>السابق</button>
                <button onClick={() => setStep(3)} style={{ ...s.callAction, flex: 2 }}>التالي: المواصفات</button>
              </div>
            </div>
          )}

          {/* الشاشة 3: المواصفات */}
          {step === 3 && (
            <div style={s.services}>
              <h2 style={{ ...s.title, fontSize: '1.5rem' }}><Home color={theme.accent} /> مواصفات العقار</h2>
              <input type="number" style={bigInput} placeholder="المساحة الكلية (متر)" value={newProperty.area} onChange={e => setNewProperty({...newProperty, area: e.target.value})} />
              
              {newProperty.category === 'شقة' && (
                <>
                  <input style={bigInput} placeholder="الطابق" value={newProperty.features.floor || ''} onChange={e => updateFeature('floor', e.target.value)} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input type="number" style={bigInput} placeholder="الغرف" value={newProperty.features.bedrooms || ''} onChange={e => updateFeature('bedrooms', e.target.value)} />
                    <input type="number" style={bigInput} placeholder="الحمامات" value={newProperty.features.bathrooms || ''} onChange={e => updateFeature('bathrooms', e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '10px' }}>
                    <label style={{ fontSize: '1.1rem' }}><input type="checkbox" checked={newProperty.features.elevator} onChange={e => updateFeature('elevator', e.target.checked)} /> مصعد</label>
                    <label style={{ fontSize: '1.1rem' }}><input type="checkbox" checked={newProperty.features.gas} onChange={e => updateFeature('gas', e.target.checked)} /> غاز مركزي</label>
                  </div>
                </>
              )}
              
              <textarea style={{ ...bigInput, height: '120px' }} placeholder="وصف إضافي (اختياري)..." value={newProperty.description} onChange={e => setNewProperty({...newProperty, description: e.target.value})} />
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setStep(2)} style={{ ...s.backBtn, flex: 1 }}>السابق</button>
                <button onClick={() => setStep(4)} style={{ ...s.callAction, flex: 2 }}>التالي: المالية</button>
              </div>
            </div>
          )}

          {/* الشاشة 4: المالية */}
          {step === 4 && (
            <div style={s.services}>
              <h2 style={{ ...s.title, fontSize: '1.5rem' }}><DollarSign color={theme.accent} /> التكاليف النهائية</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="number" style={{ ...bigInput, flex: 2 }} placeholder={newProperty.listing_type === 'للإيجار' ? "الأجرة" : "الثمن"} value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} />
                <select style={{ ...bigInput, flex: 1 }} value={newProperty.currency} onChange={e => setNewProperty({...newProperty, currency: e.target.value})}>
                  <option value="دينار">دينار</option>
                  <option value="دولار">دولار</option>
                  <option value="شيكل">شيكل</option>
                </select>
              </div>
              <input style={bigInput} placeholder="طريقة الدفع (كاش/شيكات)" value={newProperty.payment_method} onChange={e => setNewProperty({...newProperty, payment_method: e.target.value})} />
              
              <div style={{ ...s.descBox, backgroundColor: theme.border, padding: '15px' }}>
                <label style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" checked={newProperty.is_negotiable} onChange={e => setNewProperty({...newProperty, is_negotiable: e.target.checked})} /> السعر نهائي (غير قابل للتفاوض)
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => setStep(3)} style={{ ...s.backBtn, flex: 1 }}>السابق</button>
                <button onClick={onSave} style={{ ...s.callAction, flex: 2, backgroundColor: '#10b981' }}>
                  <CheckCircle2 size={18} /> حفظ ونشر الآن
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* باقي الأكواد لـ admin_list و admin_main تبقى كما هي */}
    </div>
  );
};
