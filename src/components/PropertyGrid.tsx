import React from 'react';
import { X, MapPin, Maximize2, ExternalLink, Instagram } from 'lucide-react';
import { s } from '../styles';

interface PropertyGridProps {
  listings: any[];
  onBack: () => void;
  onSelect: (prop: any) => void;
  selectedProp: any;
  onCloseModal: () => void;
  theme: any;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  listings,
  onBack,
  onSelect,
  selectedProp,
  onCloseModal,
  theme
}) => (
  <div style={s.wrapper}>

    {/* ===== Header ===== */}
    <div style={s.sectionHeader}>
      <button onClick={onBack} style={s.backBtn}>
        <X size={18} /> رجوع
      </button>
      <h3 style={{ margin: 0 }}>العقارات</h3>
    </div>

    {/* ===== Grid ===== */}
    <div style={s.gridDisplay}>
      {listings.map(item => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          onPointerDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
          onPointerUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          style={{
            ...s.miniCard,
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.border}`,
            opacity: item.status === 'غير متاح' ? 0.5 : 1
          }}
        >
          <div
            style={{
              ...s.miniStatus,
              backgroundColor: item.status === 'متاح' ? '#22c55e' : '#ef4444'
            }}
          />

          <div style={s.miniPrice}>
            {item.price} {item.currency}
          </div>

          <div style={s.miniTitle}>{item.neighborhood}</div>
          <div style={s.miniSub}>{item.category}</div>

          <Maximize2 size={14} style={s.expandIcon} />
        </div>
      ))}
    </div>

    {/* ===== Modal ===== */}
    {selectedProp && (
      <div style={s.modalOverlay}>

        <div
          style={{
            ...s.modalContent,
            backgroundColor: theme.cardBg,
            color: theme.text
          }}
        >
          {/* Drag Handle */}
          <div
            style={{
              width: '40px',
              height: '5px',
              background: '#e5e7eb',
              borderRadius: '999px',
              margin: '0 auto 14px'
            }}
          />

          {/* Modal Header */}
          <div style={s.modalHeader}>
            <h3 style={{ margin: 0 }}>
              {selectedProp.category} في {selectedProp.neighborhood}
            </h3>
            <X
              size={20}
              onClick={onCloseModal}
              style={{ cursor: 'pointer' }}
            />
          </div>

          {/* Modal Body */}
          <div style={s.modalBody}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={s.priceTagLarge}>
                {selectedProp.price} {selectedProp.currency}
              </span>

              <span
                style={{
                  ...s.statusBadge,
                  color:
                    selectedProp.status === 'متاح'
                      ? '#22c55e'
                      : '#ef4444',
                  borderColor:
                    selectedProp.status === 'متاح'
                      ? '#22c55e'
                      : '#ef4444'
                }}
              >
                {selectedProp.status}
              </span>
            </div>

            <p style={s.detailRow}>
              <MapPin size={16} color={theme.accent} />
              {selectedProp.address || 'رام الله'}
            </p>

            <div style={s.descBox}>{selectedProp.description}</div>

            <div style={s.modalLinks}>
              {selectedProp.post_url && (
                <a
                  href={selectedProp.post_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={s.actionLink}
                >
                  <ExternalLink size={16} /> رابط التفاصيل
                </a>
              )}

              {selectedProp.video_url && (
                <a
                  href={selectedProp.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...s.actionLink, color: '#ff0050' }}
                >
                  <Instagram size={16} /> فيديو العرض
                </a>
              )}

              <a
                href={`tel:${selectedProp.owner_phone || '+970594560056'}`}
                style={s.callAction}
              >
                اتصال مباشر
              </a>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default PropertyGrid;
