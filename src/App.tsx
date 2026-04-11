import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Sun, Moon, X } from 'lucide-react';
import { s } from './styles';
import HomePage from './components/HomePage';
import PropertyGrid from './components/PropertyGrid';

const supabase = createClient('https://ohomklxgvyzwjexkvzfc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag');

export default function App() {
  const [view, setView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [listings, setListings] = useState([]);
  const [selectedProp, setSelectedProp] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
      if (data) setListings(data);
    };
    fetchListings();
  }, []);

  const theme = {
    bg: isDarkMode ? '#000000' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    subText: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#262626' : '#E5E7EB',
    cardBg: isDarkMode ? '#0A0A0A' : '#FFFFFF',
    accent: '#f59e0b'
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      <div style={s.topNav}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, border: `1px solid ${theme.border}`, color: theme.text, backgroundColor: theme.cardBg }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.wrapper}>
        {view === 'home' && !showLogin && (
          <HomePage onNavigate={setView} onLogoClick={() => setShowLogin(true)} theme={theme} isDarkMode={isDarkMode} />
        )}

        {view === 'browse' && (
          <PropertyGrid 
            listings={listings} 
            onBack={() => setView('home')} 
            onSelect={setSelectedProp} 
            selectedProp={selectedProp} 
            onCloseModal={() => setSelectedProp(null)} 
            theme={theme} 
          />
        )}

        {showLogin && (
          <div style={{ ...s.loginBox, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
            <div style={{display:'flex', justifyContent:'space-between'}}><h3>الإدارة</h3> <X onClick={() => setShowLogin(false)} /></div>
            <input type="password" style={s.input} placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} autoFocus />
            <button onClick={() => { if(password==='749329') alert('مرحباً نور الدين'); }} style={s.saveBtn}>دخول</button>
          </div>
        )}
      </div>
      <footer style={{ ...s.footer, color: theme.subText }}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}
