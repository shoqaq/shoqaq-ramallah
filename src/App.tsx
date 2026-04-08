// @ts-nocheck
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Phone, Instagram, LogOut, PlusCircle, LayoutDashboard,
  Building2, ClipboardEdit, Plus, Sun, Moon, Lock, CheckCircle2, X, Save, Trash2
} from 'lucide-react';

// --- 1. إعدادات Supabase ---
const supabaseUrl = 'https://ohomklxgvyzwjexkvzfc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  // --- 2. الحالات (States) ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [dbStatus, setDbStatus] = useState('connecting');
  const [view, setView] = useState('home'); 
  const [listings, setListings] = useState([]);

  // نموذج الإضافة
  const [form, setForm] = useState({
    location: '', price: '', category: 'شقة', listing_type: 'للبيع',
    currency: 'دولار', area: '', area_unit: 'متر مربع'
  });

  const whatsappLink = 'https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d';
  const logoUrl = 'https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg';

  // --- 3. الوظائف (Functions) ---
  useEffect(() => {
    async function check() {
      try {
        const { error } = await supabase.from('listings').select('id').limit(1);
        setDbStatus(error ? 'error' : 'connected');
      } catch { setDbStatus('error'); }
    }
    check();
  }, []);

  const handleLogin = () => {
    if (password === '749329') {
      setIsLoggedIn(true);
      setShowLogin(false);
      setView('home');
      setPassword('');
    } else {
      alert("كلمة المرور غير صحيحة");
    }
  };

  const loadListings = async () => {
    const { data, error } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (!error) setListings(data);
  };

  const handleSave = async () => {
    if (!form.location || !form.price) return alert("يرجى إ
