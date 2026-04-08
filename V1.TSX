// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  Phone, Instagram, LogOut, PlusCircle, LayoutDashboard,
  Building2, ClipboardEdit, Plus, Sun, Moon, Lock, X, Save, Trash2, Database
} from 'lucide-react';

// --- 1. إعدادات الربط مع Supabase ---
const supabaseUrl: string = 'https://ohomklxgvyzwjexkvzfc.supabase.co';
const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// --- 2. تعريف أنواع البيانات ---
interface Listing {
  id: number;
  property_name: string;
  category: string;
  created_at?: string;
}

export default function App() {
  // حالات النظام
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [view, setView] = useState<'home' | 'add' | 'manage'>('home');
  
  // حالات البيانات
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ property_name: '', category: 'شقة' });

  const whatsappLink = 'https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d';
  const logoUrl = 'https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg';

  // --- 3. وظائف التعامل مع قاعدة البيانات ---

  // جلب البيانات
  const fetchListings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('id', { ascending: false });
    if (!error && data) setListings(data);
    setLoading(false);
  };

  // إضافة عقار (الخطوة المتطورة)
  const handleAddProperty = async () => {
    if (!form.property_name.trim()) return alert("يرجى كتابة اسم العقار");
    setLoading(true);
    const { error } = await supabase.from('listings').insert([form]);
    if (!error) {
      alert("✅ تم الحفظ بنجاح!");
      setForm({ property_name: '', category: 'شقة' });
      setView('manage'); // الانتقال لعرض النتائج
      fetchListings();
    } else {
      alert("خطأ في الإضافة: " + error.message);
    }
    setLoading(false);
  };

  // حذف عقار
  const handleDelete = async (id: number) => {
    if (window.confirm("هل تريد حذف هذا العقار نهائياً؟")) {
      await supabase.from('listings').delete().eq('id', id);
      fetchListings();
    }
  };

  useEffect(() => { fetchListings(); }, []);

  // تسجيل الدخول
  const handleLogin = () => {
    if (password === '749329') {
      setIsLoggedIn(true);
      setShowLogin(false);
      setPassword('');
    }
  };

  const theme = {
    bg: isDarkMode ? '#000000' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    subText: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#262626' : '#E5E7EB',
    cardBg: isDarkMode ? '#0A0A0A' : '#FFFFFF',
    iconBox: isDarkMode ? '#0A0A0A' : '#F9FAFB',
    shadow: isDarkMode ? '0 8px 30px rgba(255,255,255,0.03)' : '0 10px 20px rgba(0,0,0,0.08)',
  };

  return (
    <div style={{ ...s.container, backgroundColor: theme.bg, color: theme.text }}>
      
      {/* زر تبديل الوضع الليلي */}
      <div style={s.themeToggleWrap}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ ...s.themeBtn, border: `1.5px solid ${theme.border}`, color: theme.text, backgroundColor: theme.iconBox }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div style={s.mainWrapper}>
        {/* الهوية البصرية */}
        <div style={s.identity}>
          <div onClick={() => { setShowLogin(!showLogin); setPassword(''); }} style={{ ...s.logoWrap, border: `2px solid ${theme.border}`, boxShadow: theme.shadow }}>
            <img src={logoUrl} alt="Logo" style={s.logoImg} />
          </div>
          <h1 style={s.title}>عقارات <span style={{ color: '#f59e0b' }}>نور الدين</span></h1>
          <p style={{ color: theme.subText, marginTop: '5px' }}>إدارة ذكية لعقارات رام الله</p>
        </div>

        {/* الواجهة الرئيسية للجمهور */}
        {!isLoggedIn && !showLogin && (
          <div style={s.services}>
             <button style={{ ...s.serviceCard, backgroundColor: theme.cardBg, border: `2px solid ${theme.border}`, color: theme.text }}>
              <Building2 size={32} color="#f59e0b" />
              <span style={s.serviceText}>تصفح العقارات المتاحة</span>
            </button>
            <div style={s.grid}>
              <a href={whatsappLink} style={{ ...s.box, border: `1.5px solid ${theme.border}`, backgroundColor: theme.iconBox }}><Phone size={24} color="#25D366" /></a>
              <a href="https://instagram.com/shoqaq.ramallah/" style={{ ...s.box, border: `1.5px solid ${theme.border}`, backgroundColor: theme.iconBox }}><Instagram size={24} color="#e1306c" /></a>
            </div>
          </div>
        )}

        {/* نموذج تسجيل دخول الإدارة */}
        {showLogin && !isLoggedIn && (
          <div style={{ ...s.loginBox, backgroundColor: theme.cardBg, border: `1.5px solid ${theme.border}` }}>
            <div style={s.loginHeader}><Lock size={18} color="#f59e0b" /> <span>منطقة المسؤول</span></div>
            <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} style={{ ...s.input, backgroundColor: theme.iconBox, border: `1px solid ${theme.border}`, color: theme.text }} />
            <button onClick={handleLogin} style={s.loginBtn}>دخول للنظام</button>
          </div>
        )}

        {/* لوحة التحكم عند تسجيل الدخول */}
        {isLoggedIn && (
          <div style={{ width: '100%', maxWidth: '420px' }}>
            {view === 'home' && (
              <div style={{ ...s.admin, border: `2px solid ${theme.border}`, backgroundColor: theme.cardBg }}>
                <div style={s.adminHeader}>
                  <h2 style={{ color: '#f59e0b' }}>لوحة التحكم</h2>
                  <button onClick={() => setIsLoggedIn(false)} style={s.logoutBtn}><LogOut size={22} color={theme.subText} /></button>
                </div>
                <button onClick={() => setView('add')} style={{ ...s.adminAction, color: theme.text, borderColor: theme.border }}><PlusCircle size={20} /> إضافة عقار جديد</button>
                <button onClick={() => setView('manage')} style={{ ...s.adminAction, color: theme.text, borderColor: theme.border }}><LayoutDashboard size={20} /> إدارة القائمة ({listings.length})</button>
              </div>
            )}

            {/* شاشة الإضافة المتطورة */}
            {view === 'add' && (
              <div style={{ ...s.admin, border: `2px solid ${theme.border}`, backgroundColor: theme.cardBg }}>
                <div style={s.adminHeader}><h3>إضافة عقار</h3> <X onClick={() => setView('home')} style={{ cursor: 'pointer' }} /></div>
                
                <label style={s.label}>اسم العقار</label>
                <input style={{ ...s.input, backgroundColor: theme.iconBox, color: theme.text }} placeholder="مثلاً: شقة الماصيون الملكية" value={form.property_name} onChange={e => setForm({ ...form, property_name: e.target.value })} />
                
                <label style={s.label}>التصنيف</label>
                <select style={{ ...s.input, backgroundColor: theme.iconBox, color: theme.text }} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option>شقة</option><option>أرض</option><option>فيلا</option><option>محل تجاري</option><option>مكتب</option><option>مخزن</option>
                </select>
                
                <button onClick={handleAddProperty} style={s.loginBtn} disabled={loading}>
                   {loading ? 'جاري الحفظ...' : <><Save size={18} /> حفظ في القاعدة</>}
                </button>
              </div>
            )}

            {/* شاشة عرض البيانات المرتبطة */}
            {view === 'manage' && (
              <div style={{ ...s.admin, border: `2px solid ${theme.border}`, backgroundColor: theme.cardBg }}>
                <div style={s.adminHeader}><h3>قائمة العقارات</h3> <X onClick={() => setView('home')} style={{ cursor: 'pointer' }} /></div>
                <div style={s.scrollArea}>
                  {listings.map(item => (
                    <div key={item.id} style={{ ...s.listItem, borderBottom: `1px solid ${theme.border}` }}>
                      <div>
                        <div style={s.itemNumber}>#{item.id}</div>
                        <div style={s.itemName}>{item.property_name}</div>
                        <div style={s.itemTag}>{item.category}</div>
                      </div>
                      <Trash2 size={18} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id)} />
                    </div>
                  ))}
                  {listings.length === 0 && <p style={{ textAlign: 'center', color: theme.subText }}>لا توجد عقارات مسجلة</p>}
                </div>
                <button onClick={fetchListings} style={{ ...s.adminAction, marginTop: '15px' }}><Database size={16} /> تحديث البيانات</button>
              </div>
            )}
          </div>
        )}
      </div>

      <footer style={{ ...s.footer, color: theme.subText }}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

// --- التنسيقات ---
const s = {
  container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', direction: 'rtl', fontFamily: 'system-ui', padding: '25px' },
  mainWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingTop: '40px' },
  themeToggleWrap: { position: 'absolute', top: '25px', left: '25px' },
  themeBtn: { cursor: 'pointer', borderRadius: '14px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none' },
  identity: { textAlign: 'center', marginBottom: '30px' },
  logoWrap: { cursor: 'pointer', borderRadius: '26px', overflow: 'hidden', width: '110px', height: '110px', margin: '0 auto 15px' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { fontSize: '2rem', fontWeight: '800', margin: 0 },
  services: { display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '390px' },
  serviceCard: { display: 'flex', alignItems: 'center', gap: '20px', padding: '22px', borderRadius: '22px', cursor: 'pointer', transition: '0.2s' },
  serviceText: { fontSize: '1.2rem', fontWeight: '700' },
  grid: { display: 'flex', gap:
