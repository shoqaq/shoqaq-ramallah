import React from 'react';
import { X, Maximize2 } from 'lucide-react';
import { s } from '../styles';

// لاحظ أننا قمنا بتقليل الـ Props لأن الـ App هو من يدير المودال الآن
interface PropertyGridProps {
  listings: any[];
  onBack: () => void;
  onSelect: (prop: any) => void;
  theme: any;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  listings,
  onBack,
  onSelect,
  theme
}) => (
  <div style={s.wrapper}>

    {/* ===== Header القسم العلوي ===== */}
    <div style={s.sectionHeader}>
      <button onClick={onBack} style={s.backBtn}>
        <X size={18} /> رجوع
      </button>
      <h3 style={{ margin: 0, color: theme.text }}>العقارات</h3>
    </div>

    {/* ===== Grid Display شبكة العرض ===== */}
    <div style={s.gridDisplay}>
      {listings.length === 0 ? (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', opacity: 0.5 }}>
          جاري تحميل العقارات أو لا يوجد بيانات حالياً...
        </div>
      ) : (
        listings.map(item => (
          <div
            key={item.id}
            onClick={() => onSelect(item)} // هذه الدالة الآن ترفع العقار للـ App ليفتحه في الملف المستقل
            onPointerDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
            onPointerUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            style={{
              ...s.miniCard,
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`,
              opacity: item.status === 'غير متاح' ? 0.5 : 1,
              transition: 'transform 0.1s ease'
            }}
          >
            <div
              style={{
                ...s.miniStatus,
                backgroundColor: item.status === 'متاح' ? '#22c55e' : '#ef4444'
              }}
            />

            <div style={{ ...s.miniPrice, color: theme.accent }}>
              {item.price} <span style={{fontSize: '0.8rem'}}>{item.currency}</span>
            </div>

            <div style={{ ...s.miniTitle, color: theme.text }}>{item.neighborhood}</div>
            <div style={{ ...s.miniSub, color: theme.text, opacity: 0.7 }}>{item.category}</div>

            <Maximize2 size={14} style={{ ...s.expandIcon, color: theme.text, opacity: 0.5 }} />
          </div>
        ))
      )}
    </div>

    {/* تم حذف كود الـ Modal من هنا بالكامل لأنه أصبح في PropertyModal.tsx */}
  </div>
);

export default PropertyGrid;
