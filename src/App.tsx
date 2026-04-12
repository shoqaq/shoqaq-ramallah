import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Sun, Moon, Building2, ClipboardEdit, Phone, Instagram } from 'lucide-react';
import { s } from './styles';

// استيراد المكونات الفرعية
import HomePage from './components/HomePage';
import PropertyGrid from './components/PropertyGrid';
import AdminPanel from './components/AdminPanel';

// يرجى وضع المفاتيح الخاصة بك هنا
const supabase = createClient('https://ohomklxgvyzwjexkvzfc.supabase.co', 'YOUR_SUPABASE_ANON_KEY');

export default function App() {
  const [view, setView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [listings, setListings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [step, setStep] = useState(1);
  const [newProperty, setNewProperty] = useState({ 
    owner_name: '', neighborhood: 'الماصيون', price: '', status: 'متاح', features: {} 
  });

  const theme = {
    bg: isDarkMode ? '#000' : '#f4f4f4',
    text: isDarkMode ? '#fff' : '#000',
    border: isDarkMode ? '#222' : '#ddd',
    cardBg: isDarkMode ? '#111' : '#fff',
    accent: '#f59e0b'
  };

  const fetchListings = async () => {
    const { data, error } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (!error && data) setListings(data);
  };

  useEffect(() => { fetchListings(); }, []);

  const onSave = async () => {
    if (!newProperty.price || !newProperty.owner_name) {
      alert("الرجاء إدخال الاسم والسعر على الأقل");
      return;
    }

    const { error } = editingId 
      ? await supabase.from('listings').update(newProperty).eq('id', editingId)
      : await supabase.from('listings').insert([newProperty]);

    if (!error) {
      setEditingId(null);
      setNewProperty({ owner_name: '', neighborhood: 'الماصيون', price: '', status: 'متاح', features: {} });
      setView('admin_main');
      fetchListings();
    }
  };

  const onDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العقار نهائياً؟")) {
      await supabase.from('listings').delete().eq('id', id);
      fetchListings();
    }
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      {/* شريط التبديل العلوي */}
      <div style={s.topNav}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, color: theme.text, backgroundColor: theme.cardBg }}>
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div style={s.wrapper}>
        {/* الصفحة الرئيسية */}
        {!isLoggedIn && view === 'home' && (
          <HomePage 
            onNavigate={setView} 
            onLogoClick={() => setShowLogin(true)} 
            theme={theme} 
            isDarkMode={isDarkMode} 
          />
        )}

        {/* متصفح العقارات للزوار */}
        {view === 'browse' && (
          <PropertyGrid 
            listings={listings} 
            onBack={() => setView('home')} 
            theme={theme} 
          />
        )}

        {/* لوحة التحكم للمشرف */}
        {isLoggedIn && (
          <AdminPanel 
            view={view} setView={setView} listings={listings} 
            newProperty={newProperty} setNewProperty={setNewProperty}
            theme={theme} step={step} setStep={setStep}
            onLogout={() => { setIsLoggedIn(false); setView('home'); }}
            onEdit={(item) => { setNewProperty(item); setEditingId(item.id); setView('admin_add'); }}
            onSave={onSave}
            onDelete={onDelete}
          />
        )}

        {/* نافذة تسجيل الدخول السري */}
        {showLogin && (
          <div style={s.modalOverlay}>
             <div style={{ ...s.modalContent, backgroundColor: theme.cardBg, marginBottom: '25vh', width: '85%', margin: '0 auto', borderRadius: '25px', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '20px' }}>لوحة التحكم</h3>
                <input 
                  type="password" 
                  autoFocus 
                  placeholder="أدخل الرمز" 
                  style={{ ...s.input, backgroundColor: theme.bg, color: theme.text, border: `1px solid ${theme.border}` }} 
                  onChange={e => { 
                    if(e.target.value === '749329') { 
                      setIsLoggedIn(true); 
                      setView('admin_main'); 
                      setShowLogin(false); 
                    } 
                  }} 
                />
                <button onClick={() => setShowLogin(false)} style={{ color: '#ef4444', background: 'none', border: 'none', marginTop: '10px', cursor: 'pointer' }}>إلغاء</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
