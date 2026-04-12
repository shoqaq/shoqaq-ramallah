import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Sun, Moon, X } from 'lucide-react';
import { s } from './styles'; 

// استيراد المكونات المنفصلة
import HomePage from './components/HomePage';
import PropertyGrid from './components/PropertyGrid';
import AdminPanel from './components/AdminPanel';

const supabase = createClient(
  'https://ohomklxgvyzwjexkvzfc.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag'
);

export default function App() {
  const [view, setView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [listings, setListings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [step, setStep] = useState(1);

  const initialPropertyState = { 
    owner_name: '', owner_phone1: '', neighborhood: 'الماصيون',
    category: 'شقة', price: '', currency: 'دينار', area: '',
    features: { floor: '', bedrooms: '', bathrooms: '' }
  };
  const [newProperty, setNewProperty] = useState(initialPropertyState);

  const fetchListings = async () => {
    const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (data) setListings(data);
  };

  useEffect(() => { fetchListings(); }, []);

  const handleSave = async () => {
    const payload = { ...newProperty, internal_name: `${newProperty.category} - ${newProperty.neighborhood}` };
    if (editingId) await supabase.from('listings').update(payload).eq('id', editingId);
    else await supabase.from('listings').insert([payload]);
    
    setEditingId(null);
    setNewProperty(initialPropertyState);
    fetchListings();
    setView('admin_list');
  };

  const theme = {
    bg: isDarkMode ? '#000' : '#fff',
    text: isDarkMode ? '#fff' : '#000',
    border: isDarkMode ? '#222' : '#ddd',
    cardBg: isDarkMode ? '#111' : '#fff',
    accent: '#f59e0b'
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      <div style={s.topNav}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, color: theme.text }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.wrapper}>
        {!isLoggedIn && view === 'home' && (
          <HomePage onNavigate={setView} onLogoClick={() => setShowLogin(true)} theme={theme} />
        )}

        {view === 'browse' && (
          <PropertyGrid listings={listings} onBack={() => setView('home')} theme={theme} />
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

        {showLogin && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ padding: '20px', backgroundColor: theme.cardBg, borderRadius: '20px', border: `1px solid ${theme.border}` }}>
              <input type="password" autoFocus style={s.input} placeholder="الرمز" onChange={e => { if(e.target.value === '749329') { setIsLoggedIn(true); setView('admin_main'); setShowLogin(false); } }} />
              <button onClick={() => setShowLogin(false)} style={{ color: theme.text }}>إغلاق</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
