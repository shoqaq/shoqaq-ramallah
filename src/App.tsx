import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Sun, Moon } from 'lucide-react';
import { s } from './styles';

// Components
import HomePage from './components/HomePage';
import PropertyGrid from './components/PropertyGrid';
import AdminPanel from './components/AdminPanel';

// الربط مع Supabase باستخدام متغيرات البيئة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Initialize with placeholders if keys are missing to avoid immediate crash
const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
);

const defaultProperty = {
  owner_name: '',
  owner_phone1: '',
  neighborhood: 'الماصيون',
  price: '',
  status: 'متاح',
  features: {}
};

export default function App() {
  const [view, setView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [listings, setListings] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [newProperty, setNewProperty] = useState<any>(defaultProperty);
  const [selectedProp, setSelectedProp] = useState<any>(null);

  // تعريف الثيم الموحد
  const theme = {
    bg: isDarkMode ? '#000' : '#f8f9fa',
    text: isDarkMode ? '#fff' : '#000',
    border: isDarkMode ? '#222' : '#ddd',
    cardBg: isDarkMode ? '#111' : '#fff',
    accent: '#f59e0b'
  };

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setListings(data);
    } catch (err) {
      console.error('Error fetching listings:', err);
    }
  };

  useEffect(() => { 
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_KEY) {
      fetchListings(); 
    }
  }, []);

  const resetForm = () => {
    setNewProperty(defaultProperty);
    setEditingId(null);
    setStep(1);
  };

  // دالة الحفظ الشاملة (إضافة وتعديل)
  const onSave = async () => {
    if (!newProperty.price || !newProperty.owner_name) {
      alert('الرجاء إدخال الاسم والسعر');
      return;
    }

    const { error } = editingId
      ? await supabase.from('listings').update(newProperty).eq('id', editingId)
      : await supabase.from('listings').insert([newProperty]);

    if (!error) {
      resetForm();
      setView('admin_main');
      fetchListings();
    } else {
      alert("حدث خطأ أثناء الحفظ");
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    const { error } = await supabase.from('listings').delete().eq('id', id);
    if (!error) fetchListings();
  };

  const onEdit = (item: any) => {
    setNewProperty(item);
    setEditingId(item.id);
    setStep(1);
    setView('admin_add');
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      {/* شريط التحكم بالوضع الليلي */}
      <div style={s.topNav}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{ ...s.themeBtn, color: theme.text, backgroundColor: theme.cardBg }}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div style={s.wrapper}>
        {/* العرض الشرطي للواجهات */}
        {!isLoggedIn && view === 'home' && (
          <HomePage onNavigate={setView} onLogoClick={() => setShowLogin(true)} theme={theme} isDarkMode={isDarkMode} />
        )}

        {view === 'browse' && (
          <PropertyGrid 
            listings={listings} 
            onBack={() => setView('home')} 
            theme={theme} 
            onSelect={setSelectedProp} 
            selectedProp={selectedProp} 
            onCloseModal={() => setSelectedProp(null)} 
          />
        )}

        {isLoggedIn && (
          <AdminPanel
            view={view} setView={setView} listings={listings}
            newProperty={newProperty} setNewProperty={setNewProperty}
            theme={theme} step={step} setStep={setStep}
            onLogout={() => { setIsLoggedIn(false); setView('home'); }}
            onEdit={onEdit} onSave={onSave} onDelete={onDelete}
          />
        )}

        {/* نافذة تسجيل الدخول */}
        {showLogin && (
          <div style={s.modalOverlay}>
            <div style={{ ...s.modalContent, backgroundColor: theme.cardBg, textAlign: 'center' }}>
              <h3 style={{ marginBottom: '20px' }}>الإدارة</h3>
              <input
                type='password'
                autoFocus
                placeholder='الرمز السري'
                style={{ ...s.input, backgroundColor: theme.bg, color: theme.text, border: `1px solid ${theme.border}` }}
                onChange={(e) => {
                  if (e.target.value === '749329') {
                    setIsLoggedIn(true);
                    setView('admin_main');
                    setShowLogin(false);
                  }
                }}
              />
              <button 
                onClick={() => setShowLogin(false)} 
                style={{ color: '#ef4444', background: 'none', border: 'none', marginTop: '15px', cursor: 'pointer', fontSize: '1rem' }}
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
