import React from 'react';
import { PlusCircle, LayoutDashboard, LogOut, Plus, X, Edit3, Trash2 } from 'lucide-react';
import { s } from '../styles';

const NEIGHBORHOODS = ['الماصيون', 'الطيرة', 'عين منجد', 'الإرسال', 'المصايف', 'حي النهضة', 'رام الله التحتا', 'وسط البلد', 'عين مصباح', 'البالوع', 'سطح مرحبا', 'بيتونيا', 'سردا', 'أبو قش', 'رافات', 'كفر عقب', 'منطقة أخرى'];

const AdminPanel = ({ 
  view, setView, listings, onSave, onDelete, onEdit, 
  newProperty, setNewProperty, editingId, onLogout, theme 
}) => {
  return (
    <div style={{ ...s.adminPanel, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, width: '100%', padding: '20px', borderRadius: '25px' }}>
      
      {/* القائمة الرئيسية للإدارة */}
      {view === 'admin_main' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setView('admin_add')} style={s.menuBtn}><PlusCircle /> إضافة عقار جديد</button>
          <button onClick={() => setView('admin_list')} style={s.menuBtn}><LayoutDashboard /> إدارة القائمة الحالية</button>
          <button onClick={onLogout} style={{ ...s.menuBtn, color: '#ef4444' }}><LogOut /> تسجيل الخروج</button>
        </div>
      )}

      {/* نموذج الإضافة والتعديل */}
      {view === 'admin_add' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>{editingId ? "تعديل العقار" : "إضافة عقار جديد"}</h3>
            <X onClick={() => setView('admin_main')} style={{ cursor: 'pointer' }} />
          </div>
          
          <input style={s.input} placeholder="الاسم الداخلي (للتذكير فقط)" value={newProperty.internal_name} onChange={e => setNewProperty({ ...newProperty, internal_name: e.target.value })} />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <select style={{ ...s.input, flex: 1 }} value={newProperty.neighborhood} onChange={e => setNewProperty({ ...newProperty, neighborhood: e.target.value })}>
              {NEIGHBORHOODS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <select style={{ ...s.input, width: '35%' }} value={newProperty.status} onChange={e => setNewProperty({ ...newProperty, status: e.target.value })}>
              <option value="متاح">متاح</option>
              <option value="غير متاح">غير متاح</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <select style={{ ...s.input, flex: 1 }} value={newProperty.category} onChange={e => setNewProperty({ ...newProperty, category: e.target.value })}>
              {['شقة', 'مكتب', 'محل', 'أرض', 'استوديو'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input style={{ ...s.input, flex: 1 }} type="number" placeholder="السعر" value={newProperty.price} onChange={e => setNewProperty({ ...newProperty, price: e.target.value })} />
          </div>

          <input style={s.input} placeholder="رابط الإعلان (فيسبوك/موقع)" value={newProperty.post_url} onChange={e => setNewProperty({ ...newProperty, post_url: e.target.value })} />
          <textarea style={{ ...s.input, height: '100px' }} placeholder="التفاصيل والمواصفات..." value={newProperty.description} onChange={e => setNewProperty({ ...newProperty, description: e.target.value })} />
          
          <button onClick={onSave} style={s.saveBtn}>حفظ العقار الآن</button>
        </div>
      )}

      {/* قائمة الإدارة (تعديل/حذف) */}
      {view === 'admin_list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>إدارة العقارات</h3>
            <X onClick={() => setView('admin_main')} style={{ cursor: 'pointer' }} />
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {listings.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${theme.border}` }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{item.internal_name}</div>
                  <div style={{ fontSize: '0.75rem', color: item.status === 'متاح' ? '#34A853' : '#ef4444' }}>{item.status} - {item.price}</div>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <Edit3 size={20} onClick={() => onEdit(item)} style={{ cursor: 'pointer', color: '#f59e0b' }} />
                  <Trash2 size={20} onClick={() => onDelete(item.id)} style={{ cursor: 'pointer', color: '#ef4444' }} />
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
