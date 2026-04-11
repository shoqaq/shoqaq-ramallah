import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Sun, Moon, X } from 'lucide-react';
import { s } from './styles';
import HomePage from './components/HomePage';
import PropertyGrid from './components/PropertyGrid';
import AdminPanel from './components/AdminPanel';

const supabase = createClient('https://ohomklxgvyzwjexkvzfc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag');

export default function App() {
  const [view, setView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [listings, setListings] = useState([]);
  const [selectedProp, setSelectedProp] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newProperty, setNewProperty] = useState({ internal_name: '', neighborhood: 'الماصيون', status: 'متاح', category: 'شقة', price: '', currency: 'دينار', description: '', post_url: '', video_url: '' });

  const fetchListings = async () => {
    const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (data) setListings(data);
  };

  useEffect(() => { fetchListings(); }, []);

  const handleSave = async () => {
    if (editingId) {
      await supabase.from('listings').update(newProperty).eq('id', editingId);
    } else {
      await supabase.from('listings').insert([newProperty]);
    }
    setEditingId(null);
    setNewProperty({ internal_name: '', neighborhood: 'الماصيون', status: 'متاح', category: 'شقة', price: '', currency: 'دينار', description: '', post_url: '', video_url: '' });
    fetchListings();
    setView('admin_list');
  };

  const handleDelete = async (id) => {
    console.log("محاولة حذف العقار رقم:", id);
    const confirmed = window.confirm('هل أنت متأكد من حذف هذا العقار نهائياً؟');
    
    if (confirmed) {
      try {
        const { error } = await supabase.from('listings').delete().eq('id', id);
        if (error) {
          alert("فشل الحذف: " + error.message);
        } else {
          setListings(prev => prev.filter(item => item.id !== id));
        }
      } catch (err) {
        console.error("خطأ غير متوقع:", err);
      }
    }
  };

  const handleEdit = (item) => {
    setNewProperty(item);
    setEditingId(item.id);
    setView('admin_add');
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
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      <div style={s.topNav}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, border: `1px solid ${theme.border}`, color: theme.text, backgroundColor: theme.cardBg }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.wrapper}>
        {view === 'home' && !showLogin && !isLoggedIn && (
          <HomePage onNavigate={setView} onLogoClick={() => setShowLogin(true)} theme={theme} isDarkMode={isDarkMode} />
        )}

        {view === 'browse' && (
          <PropertyGrid listings={listings} onBack={() => setView('home')} onSelect={setSelectedProp} selectedProp={selectedProp} onCloseModal={() => setSelectedProp(null)} theme={theme} />
        )}
// ابحث عن الجزء الخاص بـ showLogin واستبدله بهذا الكود المطور:

{showLogin && !isLoggedIn && (
  <div style={{ ...s.loginBox, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
      <h3>دخول المشرف</h3> 
      <X onClick={() => { setShowLogin(false); setPassword(''); }} style={{ cursor: 'pointer' }} />
    </div>
    
    <input 
      type="text" 
      inputMode="numeric" 
      pattern="[0-9]*" 
      autoFocus // التركيز على المربع فور ظهوره
      style={{ ...s.input, textAlign: 'center', letterSpacing: '8px', fontSize: '1.5rem', fontWeight: 'bold' }} 
      placeholder="••••••" 
      value={password} 
      onChange={e => {
        const val = e.target.value.replace(/\D/g, ''); // أرقام فقط
        setPassword(val);
        
        // الدخول المباشر عند اكتمال الكود الصحيح
        if (val === '749329') {
          setIsLoggedIn(true);
          setView('admin_main');
          setShowLogin(false);
          setPassword(''); // تصفير الحقل للأمان
        }
      }} 
    />
    
    <p style={{ fontSize: '0.8rem', textAlign: 'center', marginTop: '10px', opacity: 0.5 }}>
      أدخل الكود المكون من 6 أرقام
    </p>
  </div>
)}

        {isLoggedIn && (
          <AdminPanel 
            view={view} 
            setView={setView} 
            listings={listings} 
            onSave={handleSave} 
            onDelete={handleDelete} 
            onEdit={handleEdit}
            newProperty={newProperty}
            setNewProperty={setNewProperty}
            editingId={editingId}
            onLogout={() => { setIsLoggedIn(false); setView('home'); }}
            theme={theme}
          />
        )}
      </div>
      <footer style={{ ...s.footer, color: theme.subText }}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}
