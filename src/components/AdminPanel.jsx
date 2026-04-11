import React, { useState, useMemo } from 'react';
import {
  User, MapPin, Home, DollarSign, ChevronRight, 
  ChevronLeft, CheckCircle2
} from 'lucide-react';
import { s } from '../styles';

const NEIGHBORHOODS = ['الماصيون', 'الطيرة', 'بطن الهوى', 'البالوع', 'عين منجد', 'الإرسال'];

const AdminPanel = ({
  view, setView, listings, onSave, onDelete, onEdit, 
  newProperty, setNewProperty, editingId, theme
}) => {
  const [step, setStep] = useState(1);

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

  // Input موحّد مع دعم RTL كامل
  const bigInput = useMemo(() => ({
    width: '100%',
    padding: '16px',
    fontSize: '1.05rem',
    borderRadius: '16px',
    marginBottom: '15px',
    border: `2px solid ${theme.border}`,
    backgroundColor: theme.cardBg, // تم التغيير ليتناسب مع خلفية الكروت
    color: theme.text,
    textAlign: 'right',
    direction: 'rtl',
    outline: 'none',
    boxSizing: 'border-box'
  }), [theme]);

  return (
    <div style={{ paddingBottom: '100px', direction: 'rtl' }}>
      {view === 'admin_add' && (
        <div style={s.wrapper}>

          {/* Progress Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '30px',
            padding: '0 5px'
          }}>
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                style={{
                  width: '23%',
                  height: '6px',
                  borderRadius: '10px',
                  backgroundColor: step >= i ? theme.accent : theme.border,
                  transition: 'background-color 0.3s ease'
                }}
              />
            ))}
          </div>

          {/* STEP 1: معلومات المالك */}
          {step === 1 && (
            <div style={s.services}>
              <h2 style={{ ...s.title, fontSize: '1.4rem', color: theme.text, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <User color={theme.accent} size={24} /> معلومات المالك
              </h2>

              <input
                style={bigInput}
                placeholder="اسم المالك الكامل"
                value={newProperty.owner_name || ''}
                onChange={e => setNewProperty({ ...newProperty, owner_name: e.target.value })}
              />

              <input
                style={bigInput}
                type="tel"
                placeholder="رقم الهاتف الأساسي"
                value={newProperty.owner_phone1 || ''}
                onChange={e => setNewProperty({ ...newProperty, owner_phone1: e.target.value })}
              />

              <input
                style={bigInput}
                type="tel"
                placeholder="رقم هاتف إضافي (اختياري)"
                value={newProperty.owner_phone2 || ''}
                onChange={e => setNewProperty({ ...newProperty, owner_phone2: e.target.value })}
              />

              <button onClick={() => setStep(2)} style={s.callAction}>
                التالي: الموقع <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 2: الموقع والنوع */}
          {step === 2 && (
            <div style={s.services}>
              <h2 style={{ ...s.title, fontSize: '1.4rem', color: theme.text, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin color={theme.accent} size={24} /> أين يقع العقار؟
              </h2>

              <select
                style={bigInput}
                value={newProperty.listing_type || 'للإيجار'}
                onChange={e => setNewProperty({ ...newProperty, listing_type: e.target.value })}
              >
                <option value="للإيجار">للإيجار</option>
                <option value="للبيع">للبيع</option>
              </select>

              <select
                style={bigInput}
                value={newProperty.category || 'شقة'}
                onChange={e => setNewProperty({ ...newProperty, category: e.target.value })}
              >
                <option value="شقة">شقة</option>
                <option value="مكتب">مكتب</option>
                <option value="محل">محل</option>
                <option value="أرض">أرض</option>
              </select>

              <select
                style={bigInput}
                value={newProperty.neighborhood || NEIGHBORHOODS[0]}
                onChange={e => setNewProperty({ ...newProperty, neighborhood: e.target.value })}
              >
                {NEIGHBORHOODS.map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>

              <input
                style={bigInput}
                placeholder="العنوان بالتفصيل (مثلاً: قرب صيدلية كذا)"
                value={newProperty.exact_address || ''}
                onChange={e => setNewProperty({ ...newProperty, exact_address: e.target.value })}
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setStep(1)} style={{ ...s.backBtn, flex: 1, justifyContent: 'center' }}>
                  <ChevronLeft size={18} /> السابق
                </button>
                <button onClick={() => setStep(3)} style={{ ...s.callAction, flex: 2, position: 'static' }}>
                  التالي <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: المواصفات */}
          {step === 3 && (
            <div style={s.services}>
              <h2 style={{ ...s.title, fontSize: '1.4rem', color: theme.text, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Home color={theme.accent} size={24} /> مواصفات العقار
              </h2>

              <input
                type="number"
                style={bigInput}
                placeholder="المساحة (متر مربع)"
                value={newProperty.area || ''}
                onChange={e => setNewProperty({ ...newProperty, area: e.target.value })}
              />

              {newProperty.category === 'شقة' && (
                <>
                  <input
                    style={bigInput}
                    placeholder="الطابق (مثلاً: 3 أو أرضي)"
                    value={features.floor || ''}
                    onChange={e => updateFeature('floor', e.target.value)}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input
                      type="number"
                      style={bigInput}
                      placeholder="عدد الغرف"
                      value={features.bedrooms || ''}
                      onChange={e => updateFeature('bedrooms', e.target.value)}
                    />
