// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Building2, MapPin, Home, Loader2, Phone, MessageCircle, Navigation } from 'lucide-react';

// إعداد الاتصال ببياناتك (تأكد أن المفتاح صحيح)
const supabaseUrl = 'https://ohomklxgvyzwjexkvzfc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag'; 

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('apartments') 
          .select('*')
          .order('created_at', { ascending: false }); // الأحدث يظهر أولاً
        if (data) setApartments(data);
      } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* الشريط العلوي */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-blue-200 shadow-lg">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 leading-none">شقق رام الله</h1>
              <p className="text-[10px] text-blue-600 font-bold mt-1">عقارات نور الدين</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            تحديث مباشر
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* العناوين الرئيسية */}
        <div className="mb-12 text-right">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">عقارات مميزة في قلب رام الله</h2>
          <p className="text-slate-500 text-lg">تصفح أحدث الشقق المتاحة للبيع والإيجار في أرقى أحياء المدينة.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="animate-spin text-blue-600" size={48} />
            <p className="text-slate-500 font-medium">جاري تحديث قائمة العقارات...</p>
          </div>
        ) : (
          <>
            {apartments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {apartments.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    {/* مكان للصورة مستقبلاً */}
                    <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-400">
                      <Home size={48} strokeWidth={1} />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-right">
                          <h3 className="text-xl font-bold text-slate-800 mb-1">{apt.name}</h3>
                          <div className="flex items-center gap-1 text-slate-500 text-sm">
                            <MapPin size={14} className="text-red-500" />
                            {apt.location}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 rounded-2xl p-4 mb-6 flex justify-between items-center">
                        <span className="text-slate-500 text-sm font-bold">السعر المطلوب</span>
                        <div className="text-left">
                          <span className="text-2xl font-black text-blue-600">{Number(apt.price).toLocaleString()}</span>
                          <span className="text-sm font-bold text-blue-600 mr-1">{apt.currency}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200">
                          <Phone size={18} /> اتصال
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-2xl font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-100">
                          <MessageCircle size={18} /> واتساب
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Navigation size={32} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">لا يوجد عقارات متاحة حالياً</h3>
                <p className="text-slate-400">قم بإضافة أول عقار من لوحة تحكم Supabase ليظهر هنا فوراً.</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* فوتر بسيط */}
      <footer className="bg-white border-t border-slate-100 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">جميع الحقوق محفوظة © 2026 - شقق رام الله والبيرة</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
