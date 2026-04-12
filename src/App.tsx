import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Sun, Moon } from 'lucide-react';
import { s } from './styles';

// Components
import HomePage from './components/HomePage';
import PropertyGrid from './components/PropertyGrid';
import AdminPanel from './components/AdminPanel';

// Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string
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
  const [view, setView] = useState<'home' | 'browse' | 'admin_main' | 'admin_add' | 'admin_list'>('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [listings, setListings] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [newProperty, setNewProperty] = useState<any>(defaultProperty);
  const [selectedProp, setSelectedProp] = useState<any>(null);

  const theme = {
    bg: isDarkMode ? '#000' : '#f4f4f4',
    text: isDarkMode ? '#fff' : '#000',
    border: isDarkMode ? '#222' : '#ddd',
    cardBg: isDarkMode ? '#111' : '#fff',
    accent: '#f59e0b'
  };

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setListings(data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const resetForm = () => {
    setNewProperty(defaultProperty);
    setEditingId(null);
    setStep(1);
  };

  const onSave = async () => {
    if (!newProperty.price || !newProperty.owner_name) {
      alert('الرجاء إدخال الاسم والسعر');
      return;
    }

    const payload = { ...newProperty };

    const query = editingId
      ? supabase.from('listings').update(payload).eq('id', editingId)
      : supabase.from('listings').insert([payload]);

    const { error } = await query;

    if (!error) {
      resetForm();
      setView('admin_main');
      fetchListings();
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;

    await supabase.from('listings').delete().eq('id', id);
    fetchListings();
  };

  const onEdit = (item: any) => {
    setNewProperty(item);
    setEditingId(item.id);
    setStep(1);
    setView('admin_add');
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      {/* Top Nav */}
      <div style={s.topNav}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{ ...s.themeBtn, color: theme.text, backgroundColor: theme.cardBg }}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div style={s.wrapper}>
        {/* Home */}
        {!isLoggedIn && view === 'home' && (
          <HomePage
            onNavigate={setView}
            onLogoClick={() => setShowLogin(true)}
            theme={theme}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Browse */}
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

        {/* Admin */}
        {isLoggedIn && (
          <AdminPanel
            view={view}
            setView={setView}
            listings={listings}
            newProperty={newProperty}
            setNewProperty={setNewProperty}
            theme={theme}
            step={step}
            setStep={setStep}
            onLogout={() => {
              setIsLoggedIn(false);
              setView('home');
            }}
            onEdit={onEdit}
            onSave={onSave}
            onDelete={onDelete}
          />
        )}

        {/* Login Modal */}
        {showLogin && (
          <div style={s.modalOverlay}>
            <div
              style={{
                ...s.modalContent,
                backgroundColor: theme.cardBg,
                marginBottom: '25vh',
                width: '85%',
                margin: '0 auto',
                borderRadius: '25px',
                textAlign: 'center'
              }}
            >
              <h3>لوحة التحكم</h3>
              <input
                type='password'
                autoFocus
                placeholder='أدخل الرمز'
                style={{
                  ...s.input,
                  backgroundColor: theme.bg,
                  color: theme.text,
                  border: `1px solid ${theme.border}`
                }}
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
                style={{ color: '#ef4444', background: 'none', border: 'none', marginTop: '10px' }}
              >
                إلغاء
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

