import React from 'react';
import { 
  PlusCircle, LayoutDashboard, LogOut, Edit3, Trash2, 
  User, MapPin, Home, DollarSign, X 
} from 'lucide-react';
import { s } from '../styles';

const NEIGHBORHOODS = ['الماصيون', 'الطيرة', 'عين منجد', 'الإرسال', 'المصايف', 'البالوع', 'بيتونيا', 'سردا', 'منطقة أخرى'];

interface AdminPanelProps {
  view: string;
  setView: (view: string) => void;
  listings: any[];
  onSave: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  newProperty: any;
  setNewProperty: (prop: any) => void;
  theme: any;
  step: number;
  setStep: (step: number) => void;
  onLogout: () => void;
}

export default function AdminPanel({ 
  view, setView, listings, onSave, onEdit, onDelete, 
  newProperty, setNewProperty, theme, step, setStep, onLogout 
}) {
  
  const updateFeature = (k: string, v: any) => 
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
    textAlign: 'right' as const
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', direction: 'rtl' }}>
      
      {/* القائمة الرئيسية */}
      {view === 'admin_main' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button onClick={() => {setStep(1); setView('admin_add')}} style={s.menuBtn}><PlusCircle /> إضافة عقار جديد</button>
          <button onClick={() => setView('admin_list')} style={s.menuBtn}><LayoutDashboard /> إدارة العقارات</button>
          <button onClick={onLogout} style={{ ...s.menuBtn, color: '#ef4444' }}><LogOut /> خروج</button>
        </div>
      )}

      {/* نموذج الإضافة - الخطوات */}
      {view === 'admin_add' && (
        <div>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '15px' }}><User size={18}/> معلومات المالك</h3>
              <input style={inputStyle} placeholder="الاسم" value={newProperty.owner_name} onChange={e => setNewProperty({...newProperty, owner_name: e.target.value})} />
              <input style={inputStyle} placeholder="هاتف 1" value={newProperty.owner_phone1} onChange={e => setNewProperty({...newProperty, owner_phone1: e.target.value})} />
              <button onClick={() => setStep(2)} style={s.saveBtn}>التالي</button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '15px' }}><MapPin size={18}/> الموقع</h3>
              <select style={inputStyle} value={newProperty.neighborhood} onChange={e => setNewProperty({...newProperty, neighborhood: e.target.value})}>
                {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <button onClick={() => setStep(3)} style={s.saveBtn}>التالي</button>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '15px' }}><Home size={18}/> المواصفات</h3>
              <input type="number" style={inputStyle} placeholder="نوم" value={newProperty.features.bedrooms || ''} onChange={e => updateFeature('bedrooms', e.target.value)} />
              <button onClick={() => setStep(4)} style={s.saveBtn}>التالي</button>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '15px' }}><DollarSign size={18}/> السعر</h3>
              <input type="number" style={inputStyle} placeholder="السعر" value={newProperty.price} onChange={e => setNewProperty({...newProperty, price: e.target.value})} />
              <button onClick={onSave} style={s.saveBtn}>حفظ العقار</button>
            </div>
          )}
        </div>
      )}

      {/* قائمة العقارات للإدارة */}
      {view === 'admin_list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3>إدارة العقارات ({listings.length})</h3>
            <X onClick={() => setView('admin_main')} style={{ cursor: 'pointer' }} />
          </div>
          {listings.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: theme.cardBg, borderRadius: '15px', border: `1px solid ${theme.border}` }}>
              <div>{item.neighborhood} - {item.price}</div>
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
