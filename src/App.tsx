import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Sun, Moon } from 'lucide-react';
import { s } from './styles';

import HomePage from './components/HomePage';
import PropertyGrid from './components/PropertyGrid';
import AdminPanel from './components/AdminPanel';

const supabase = createClient('https://ohomklxgvyzwjexkvzfc.supabase.co', 'YOUR_KEY');

export default function App() {
  const [view, setView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [listings, setListings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [step, setStep] = useState(1);
  const [newProperty, setNewProperty] = useState({ owner_name: '', neighborhood: 'الماصيون', price: '', features: {} });

  const theme = {
    bg: isDarkMode ? '#000' : '#fff',
    text: isDarkMode ? '#fff' : '#000',
    border: isDarkMode ? '#222' : '#ddd',
    cardBg: isDarkMode ? '#111' : '#fff',
    accent: '#f59e0b'
  };

  useEffect(() => {
    const fetchListings = async () => {
      const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
      if (data) setListings(data);
    };
    fetchListings();
  }, []);

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      <div style={s.topNav}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, color: theme.text }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.wrapper}>
        {/* الصفحة الرئيسية تظهر فقط إذا لم نكن في لوحة التحكم */}
        {!isLoggedIn && view === 'home' && (
          <HomePage onNavigate={setView} onLogoClick={() => setShowLogin(true)} theme={theme} />
        )}

        {/* متصفح العقارات */}
        {view === 'browse' && (
          <PropertyGrid listings={listings} onBack={() => setView('home')} theme={theme} />
        )}

        {/* لوحة التحكم تظهر فقط عند تسجيل الدخول */}
        {isLoggedIn && (
          <AdminPanel 
            view={view} setView={setView} listings={listings} 
            newProperty={newProperty} setNewProperty={setNewProperty}
            theme={theme} step={step} setStep={setStep}
            onLogout={() => { setIsLoggedIn(false); setView('home'); }}
            onEdit={(item: any) => { setNewProperty(item); setEditingId(item.id); setView('admin_add'); }}
            onSave={() => { /* دالة الحفظ */ }}
          />
        )}

        {/* نافذة الدخول */}
        {showLogin && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
             <div style={{ padding: '30px', backgroundColor: theme.cardBg, borderRadius: '20px', border: `1px solid ${theme.border}` }}>
                <input type="password" autoFocus placeholder="الرمز" style={s.input} onChange={e => { if(e.target.value === '749329') { setIsLoggedIn(true); setView('admin_main'); setShowLogin(false); } }} />
                <button onClick={() => setShowLogin(false)} style={{ color: theme.text, marginTop: '10px', width: '100%' }}>إغلاق</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
