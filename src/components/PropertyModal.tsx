import React from 'react';
import { X, MapPin, ExternalLink, Instagram, Phone } from 'lucide-react';
import { s } from '../styles';

interface PropertyModalProps {
  selectedProp: any;
  onClose: () => void;
  theme: any;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ selectedProp, onClose, theme }) => {
  if (!selectedProp) return null;

  return (
    <div style={s.modalOverlay} onClick={onClose}>
      {/*stopPropagation لمنع إغلاق النافذة عند الضغط داخل المحتوى */}
      <div
        style={{
          ...s.modalContent,
          backgroundColor: theme.cardBg,
          color: theme.text,
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* مقبض السحب للشكل الجمالي على الموبايل */}
        <div style={{
          width: '40px',
          height: '5px',
          background: theme.border,
          borderRadius: '999px',
          margin: '0 auto 20px'
        }} />

        {/* Header */}
        <div style={s.modalHeader}>
          <h3 style={{ margin: 0, fontSize: '1.3rem' }}>
            {selectedProp.category} في {selectedProp.neighborhood}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: theme.text, cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div style={s.modalBody}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={s.priceTagLarge}>
              {selectedProp.price} {selectedProp.currency || 'دينار'}
            </span>
            <span style={{
              ...s.statusBadge,
              color: selectedProp.status === 'متاح' ? '#22c55e' : '#ef4444',
              borderColor: selectedProp.status === 'متاح' ? '#22c55e' : '#ef4444'
            }}>
              {selectedProp.status}
            </span>
          </div>

          <p style={{ ...s.detailRow, opacity: 0.8 }}>
            <MapPin size={18} color={theme.accent} />
            {selectedProp.address || 'رام الله - فلسطين'}
          </p>

          <div style={s.descBox}>
            <strong style={{ display: 'block', marginBottom: '5px' }}>التفاصيل:</strong>
            {selectedProp.description || 'لا يوجد وصف إضافي لهذا العقار.'}
          </div>

          {/* روابط التواصل والتفاعل */}
          <div style={s.modalLinks}>
            {selectedProp.post_url && (
              <a href={selectedProp.post_url} target="_blank" rel="noopener noreferrer" style={s.actionLink}>
                <ExternalLink size={18} /> عرض المنشور الأصلي
              </a>
            )}

            {selectedProp.video_url && (
              <a href={selectedProp.video_url} target="_blank" rel="noopener noreferrer" style={{ ...s.actionLink, color: '#e1306c' }}>
                <Instagram size={18} /> شاهد فيديو العرض
              </a>
            )}

            <a
              href={`tel:${selectedProp.owner_phone || '+970594560056'}`}
              style={{ ...s.callAction, backgroundColor: theme.accent }}
            >
              <Phone size={20] /> اتصل الآن للاستفسار
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
