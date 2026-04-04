// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Building2, 
  MapPin, 
  PlusCircle, 
  Home, 
  Search, 
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';

// إعداد الاتصال بـ Supabase
// استبدل الروابط أدناه ببيانات مشروعك الحقيقية من إعدادات Supabase
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(null);

  const [newAppart, setNewAppart] = useState({
    name: '',
    price: '',
    currency: '$',
    location: '',
    link: ''
  });

  useEffect(() => {
    fetchApartments();
  }, []);

  async function fetchApartments() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('apartments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApartments(data || []);
    } catch (err) {
      setError('تعذر تحميل البيانات من قاعدة البيانات');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleAuth = (e) => {
    e.preventDefault();
    if (authCode === '749329') {
      setIsAuthorized(true);
      setError(null);
    } else {
      setError('كود الدخول غير صحيح');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase
        .from('apartments')
        .insert([
          { 
            name: newAppart.name, 
            price: parseFloat(newAppart.price), 
            currency: newAppart.currency,
            location: newAppart.location,
            link: newAppart.link
          }
        ]);

      if (error) throw error;

      setNewAppart({ name: '', price: '', currency: '$', location: '', link: '' });
      setShowAddForm(false);
      fetchApartments();
      alert('تم إضافة العقار بنجاح!');
    } catch (err) {
      alert('حدث خطأ أثناء الإضافة');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Building2 size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">شقق رام الله</h1>
          </div>
          
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-slate-100 hover:bg-amber-100 p-2 rounded-full transition-colors text-amber-600"
          >
            <Home size={24} />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {showAddForm && (
          <div className="mb-10 bg-white p-6 rounded-2xl border border-slate-200 shadow-xl">
            {!isAuthorized ? (
              <form onSubmit={handleAuth} className="space-y-4 text-center max-w-xs mx-auto">
                <h2 className="text-lg font-bold text-slate-700">دخول الإدارة</h2>
                <input
                  type="password"
                  placeholder="أدخل الكود الخاص بك"
                  className="w-full p-3 border rounded-xl text-center outline-none focus:ring-2 focus:ring-blue-500"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                />
                <button className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700">
                  تأكيد الدخول
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-slate-800">إضافة عقار جديد</h2>
                  <button onClick={() => setIsAuthorized(false)} className="text-sm text-red-500 underline">خروج</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="اسم العقار (مثلاً: شقة الماصيون)"
                    className="p-3 border rounded-xl outline-none focus:border-blue-500"
                    value={newAppart.name}
                    onChange={e => setNewAppart({...newAppart, name: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <input
                      required
                      type="number"
                      placeholder="السعر"
                      className="flex-1 p-3 border rounded-xl outline-none focus:border-blue-500"
                      value={newAppart.price}
                      onChange={e => setNewAppart({...newAppart, price: e.target.value})}
                    />
                    <select 
                      className="p-3 border rounded-xl outline-none"
                      value={newAppart.currency}
                      onChange={e => setNewAppart({...newAppart, currency: e.target.value})}
                    >
                      <option value="$">$ دولار</option>
                      <option value="JD">JD دينار</option>
                      <option value="₪">₪ شيكل</option>
                    </select>
                  </div>
                  <input
                    required
                    placeholder="الموقع (الطيرة، بيتونيا...)"
                    className="p-3 border rounded-xl outline-none focus:border-blue-500"
                    value={newAppart.location}
                    onChange={e => setNewAppart({...newAppart, location: e.target.value})}
                  />
                  <input
                    required
                    placeholder="رابط الصور أو التفاصيل"
                    className="p-3 border rounded-xl outline-none focus:border-blue-500"
                    value={newAppart.link}
                    onChange={e => setNewAppart({...newAppart, link: e.target.value})}
                  />
                </div>
                <button 
                  disabled={loading}
                  className="w-full bg-green-600 text-white p-4 rounded-xl font-bold hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <PlusCircle size={20} />}
                  نشر العقار الآن
                </button>
              </form>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">أحدث العقارات المتاحة</h2>
          <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {apartments.length} عقار
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {loading && apartments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 size={40} className="animate-spin mb-4" />
            <p>جاري تحميل البيانات...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apt) => (
              <div key={apt.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                      <Home size={24} />
                    </div>
                    <div className="text-left">
                      <span className="text-2xl font-black text-blue-600">{apt.price}</span>
                      <span className="text-sm font-bold text-slate-500 mr-1">{apt.currency}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {apt.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-slate-500 text-sm mb-6">
                    <MapPin size={16} className="text-slate-400" />
                    {apt.location}
                  </div>

                  <a 
                    href={apt.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white p-3 rounded-xl font-medium hover:bg-blue-600 transition-all"
                  >
                    عرض التفاصيل
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && apartments.length === 0 && !error && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <Search size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">لا توجد عقارات حالياً</p>
          </div>
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-10 text-center border-t border-slate-200 mt-10">
        <p className="text-slate-400 text-sm italic">
          بواسطة نور الدين - التطوير العقاري الرقمي
        </p>
      </footer>
    </div>
  );
}

export default App;
