import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Sun, Moon, X } from 'lucide-react';
import { s } from './styles'; // تم تصحيح المسار إلى نقطة واحدة

// استيراد المكونات المنفصلة
import HomePage from './components/HomePage';
import PropertyGrid from './components/PropertyGrid';
import AdminPanel from './components/AdminPanel';

// إعداد Supabase
const supabase = createClient(
  'https://ohomklxgvyzwjexkvzfc.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag'
);

export default function App() {
  const [view, setView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [listings, setListings] = useState([]);
  const [selectedProp, setSelectedProp] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [step, setStep] = useState(1);

  const initialPropertyState = { 
    owner_name: '', owner_phone1: '', owner_phone2: '', owner_notes: '',
    neighborhood: 'الماصيون', exact_address: '',
    category: 'شقة', listing_type: 'للإيجار', 
    price: '', currency: 'دينار', area: '', is_negotiable: false,
    payment_method: 'كاش', building_fees: '', municipal_fees: '', education_tax: '',
    electricity_bill_included: false, water_bill_included: false,
    features: {
      floor: '', bedrooms: '', bathrooms: '', balconies: '',
      has_living_room: false, has_salon: false, has_storage: false,
      parking_type: 'لا يوجد', has_elevator: false,
      electricity_meter: 'منفصلة', water_meter: 'منفصلة',
      central_gas: false, has_boiler: false, has_solar_heater: false,
      heating_type: 'لا يوجد'
    }
  };

  const [newProperty, setNewProperty] = useState(initialPropertyState);

  const fetchListings = async () => {
    const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (data) setListings(data);
  };

  useEffect(() => { fetchListings(); }, []);

  const handleSave = async () => {
    try {
      const payload = {
        owner_name: newProperty.owner_name,
        owner_phone: newProperty.owner_phone1,
        owner_phone2: newProperty.owner_phone2,
        owner_notes: newProperty.owner_notes,
        neighborhood: newProperty.neighborhood,
        exact_address: newProperty.exact_address,
        category: newProperty.category,
        listing_type: newProperty.listing_type,
        price: parseInt(newProperty.price) || 0,
        currency: newProperty.currency,
        area: parseFloat(newProperty.area) || 0,
        features: newProperty.features,
        internal_name: `${newProperty.category} - ${newProperty.neighborhood}`
      };

      if (editingId) {
        await supabase.from('listings').update(payload).eq('id', editingId);
      } else {
        await supabase.from('listings').insert([payload]);
      }
      
      setEditingId(null);
      setNewProperty(initialPropertyState);
      setStep(1);
      fetchListings();
      setView('admin_list');
      alert("تم الحفظ بنجاح");
    } catch (error: any) {
      alert("خطأ في الحفظ: " + error.message);
    }
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    subText: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#262626' : '#E5E7EB',
    cardBg: isDarkMode ? '#0A0A0A' : '#FFFFFF',
    accent: '#f59e0b'
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text, direction: 'rtl' }}>
      <div style={s.topNav}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, border: `1px solid ${theme.border}`, color: theme.text, backgroundColor: theme.cardBg }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.wrapper}>
        {view === 'home' && (
          <HomePage onNavigate={setView} onLogoClick={() => setShowLogin(true)} theme={theme} isDarkMode={isDarkMode} />
        )}

        {view === 'browse' && (
          <PropertyGrid listings={listings} onBack={() => setView('home')} onSelect={setSelectedProp} selectedProp={selectedProp} onCloseModal={() => setSelectedProp(null)} theme={theme} />
        )}

        {showLogin && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ width: '240px', backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>دخول سريع</span> 
                  <X onClick={() => { setShowLogin(false); setPassword(''); }} size={18} style={{ cursor: 'pointer', opacity: 0.5 }} />
               </div>
               <input 
                 type="password"
                 autoFocus
                 style={{ width: '100%', textAlign: 'center', fontSize: '1.5rem', color: theme.accent, backgroundColor: theme.bg, border: `1px solid ${theme.border}`, borderRadius: '12px', padding: '10px' }} 
                 placeholder="الرمز" 
                 value={password} 
                 onChange={e => {
                   const val = e.target.value;
                   setPassword(val);
                   if (val === '749329') { 
                     setIsLoggedIn(true); setView('admin_main'); 
                     setShowLogin(false); setPassword(''); 
                   }
                 }} 
               />
            </div>
          </div>
        )}

        {isLoggedIn && (
          <AdminPanel 
            view={view} setView={setView} listings={listings} onSave={handleSave} 
            newProperty={newProperty} setNewProperty={setNewProperty} 
            theme={theme} step={step} setStep={setStep}
            onLogout={() => { setIsLoggedIn(false); setView('home'); }}
            onEdit={(item: any) => { setNewProperty(item); setEditingId(item.id); setView('admin_add'); setStep(1); }}
            onDelete={async (id: any) => { if(window.confirm('حذف؟')) { await supabase.from('listings').delete().eq('id', id); fetchListings(); } }}
          />
        )}
      </div>
    </div>
  );
}
