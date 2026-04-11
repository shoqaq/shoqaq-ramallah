import React, { useState, useMemo } from 'react';
import {
  User,
  MapPin,
  Home,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';

import { s } from '../styles';

const NEIGHBORHOODS = ['الماصيون', 'الطيرة'];

const AdminPanel = ({
  view,
  setView,
  listings,
  onSave,
  onDelete,
  onEdit,
  newProperty,
  setNewProperty,
  editingId,
  theme
}) => {
  const [step, setStep] = useState(1);

  // ضمان عدم انهيار features
  const features = newProperty.features || {};

  const updateFeature = (key, value) => {
    setNewProperty({
      ...newProperty,
      features: {
        ...(newProperty.features || {}),
        [key]: value
      }
    });
  };

  // input موحّد مع الثيم
  const bigInput = useMemo(() => ({
    ...s.input,
    padding: '16px',
    fontSize: '1.05rem',
    borderRadius: '16px',
    marginBottom: '15px',
    border: `2px solid ${theme.border}`,
    backgroundColor: theme.inputBg || 'transparent',
    color: theme.text
  }), [theme]);

  const nextStep = (target) => {
    setStep(target);
  };

  const prevStep = (target) => {
    setStep(target);
  };

  return (
    <div style={{ paddingBottom: '100px' }}>
      {view === 'admin_add' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          {/* Progress */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
            padding: '0 10px'
          }}>
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                style={{
                  width: '22%',
                  height: '6px',
                  borderRadius: '10px',
                  backgroundColor: step >= i ? theme.accent : theme.border
                }}
              />
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div style={s.services}>
              <h2 style={{ ...s.title, fontSize: '1.5rem', color: theme.text }}>
                <User color={theme.accent} /> معلومات المالك
              </h2>

              <input
                style={bigInput}
                placeholder="اسم المالك الكامل"
                value={newProperty.owner_name}
                onChange={e =>
                  setNewProperty({ ...newProperty, owner_name: e.target.value })
                }
              />

              <input
                style={bigInput}
                type="tel"
                placeholder="رقم الهاتف الأساسي"
                value={newProperty.owner_phone1}
                onChange={e =>
                  setNewProperty({ ...newProperty, owner_phone1: e.target.value })
                }
              />

              <input
                style={bigInput}
                type="tel"
                placeholder="رقم هاتف إضافي (اختياري)"
                value={newProperty.owner_phone2}
                onChange={e =>
                  setNewProperty({ ...newProperty, owner_phone2: e.target.value })
                }
              />

              <button
                onClick={() => nextStep(2)}
                style={s.callAction}
              >
                التالي: الموقع <ChevronRight />
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={s.services}>
              <h2 style={{ ...s.title, fontSize: '1.5rem', color: theme.text }}>
                <MapPin color={theme.accent} /> أين يقع العقار؟
              </h2>

              <select
                style={bigInput}
                value={newProperty.listing_type}
                onChange={e =>
                  setNewProperty({ ...newProperty, listing_type: e.target.value })
                }
              >
                <option value="للإيجار">للإيجار</option>
                <option value="للبيع">للبيع</option>
              </select>

              <select
                style={bigInput}
                value={newProperty.category}
                onChange={e =>
                  setNewProperty({ ...newProperty, category: e.target.value })
                }
              >
                <option value="شقة">شقة</option>
                <option value="مكتب">مكتب</option>
                <option value="محل">محل</option>
                <option value="أرض">أرض</option>
              </select>

              <select
                style={bigInput}
                value={newProperty.neighborhood}
                onChange={e =>
                  setNewProperty({ ...newProperty, neighborhood: e.target.value })
                }
              >
                {NEIGHBORHOODS.map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>

              <input
                style={bigInput}
                placeholder="العنوان بالتفصيل"
                value={newProperty.exact_address}
                onChange={e =>
                  setNewProperty({ ...newProperty, exact_address: e.target.value })
                }
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => prevStep(1)}
                  style={{ ...s.backBtn, flex: 1 }}
                >
                  <ChevronLeft /> السابق
                </button>

                <button
                  onClick={() => nextStep(3)}
                  style={{ ...s.callAction, flex: 2 }}
                >
                  التالي: المواصفات <ChevronRight />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div style={s.services}>
              <h2 style={{ ...s.title, fontSize: '1.5rem', color: theme.text }}>
                <Home color={theme.accent} /> مواصفات العقار
              </h2>

              <input
                type="number"
                style={bigInput}
                placeholder="المساحة (متر)"
                value={newProperty.area}
                onChange={e =>
                  setNewProperty({ ...newProperty, area: e.target.value })
                }
              />

              {newProperty.category === 'شقة' && (
                <>
                  <input
                    style={bigInput}
                    placeholder="الطابق"
                    value={features.floor || ''}
                    onChange={e => updateFeature('floor', e.target.value)}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input
                      type="number"
                      style={bigInput}
                      placeholder="غرف"
                      value={features.bedrooms || ''}
                      onChange={e => updateFeature('bedrooms', e.target.value)}
                    />

                    <input
                      type="number"
                      style={bigInput}
                      placeholder="حمامات"
                      value={features.bathrooms || ''}
                      onChange={e => updateFeature('bathrooms', e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'grid', gap: '10px', padding: '10px' }}>
                    <label style={{ color: theme.text }}>
                      <input
                        type="checkbox"
                        checked={!!features.elevator}
                        onChange={e => updateFeature('elevator', e.target.checked)}
                      /> مصعد
                    </label>

                    <label style={{ color: theme.text }}>
                      <input
                        type="checkbox"
                        checked={!!features.gas}
                        onChange={e => updateFeature('gas', e.target.checked)}
                      /> غاز مركزي
                    </label>
                  </div>
                </>
              )}

              <textarea
                style={{ ...bigInput, height: '120px' }}
                placeholder="وصف إضافي..."
                value={newProperty.description}
                onChange={e =>
                  setNewProperty({ ...newProperty, description: e.target.value })
                }
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => prevStep(2)}
                  style={{ ...s.backBtn, flex: 1 }}
                >
                  <ChevronLeft /> السابق
                </button>

                <button
                  onClick={() => nextStep(4)}
                  style={{ ...s.callAction, flex: 2 }}
                >
                  التالي: المالية <ChevronRight />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div style={s.services}>
              <h2 style={{ ...s.title, fontSize: '1.5rem', color: theme.text }}>
                <DollarSign color={theme.accent} /> التكاليف النهائية
              </h2>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="number"
                  style={{ ...bigInput, flex: 2 }}
                  placeholder={
                    newProperty.listing_type === 'للإيجار'
                      ? 'الأجرة'
                      : 'السعر'
                  }
                  value={newProperty.price}
                  onChange={e =>
                    setNewProperty({ ...newProperty, price: e.target.value })
                  }
                />

                <select
                  style={{ ...bigInput, flex: 1 }}
                  value={newProperty.currency}
                  onChange={e =>
                    setNewProperty({ ...newProperty, currency: e.target.value })
                  }
                >
                  <option value="دينار">دينار</option>
                  <option value="دولار">دولار</option>
                  <option value="شيكل">شيكل</option>
                </select>
              </div>

              <input
                style={bigInput}
                placeholder="طريقة الدفع"
                value={newProperty.payment_method}
                onChange={e =>
                  setNewProperty({ ...newProperty, payment_method: e.target.value })
                }
              />

              <div style={{ ...s.descBox, backgroundColor: theme.border, padding: '15px' }}>
                <label style={{ color: theme.text }}>
                  <input
                    type="checkbox"
                    checked={!!newProperty.is_final_price}
                    onChange={e =>
                      setNewProperty({
                        ...newProperty,
                        is_final_price: e.target.checked
                      })
                    }
                  /> السعر نهائي (غير قابل للتفاوض)
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => prevStep(3)}
                  style={{ ...s.backBtn, flex: 1 }}
                >
                  <ChevronLeft /> السابق
                </button>

                <button
                  onClick={onSave}
                  style={{
                    ...s.callAction,
                    flex: 2,
                    backgroundColor: '#10b981'
                  }}
                >
                  <CheckCircle2 size={18} /> حفظ ونشر
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default AdminPanel;
