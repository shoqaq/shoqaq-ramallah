// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Building2, MapPin, Home, Loader2, Phone, MessageCircle } from 'lucide-react';

// إعداد الاتصال ببياناتك المباشرة
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
          .order('created_at', { ascending: false });
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
      {/* الهيدر */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm text-right">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Building2 size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">شقق رام الله</h1>
          </div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            بث مباشر
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 text-right">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">عقاراتنا المتاحة في رام الله والبيرة</h2>
          <p className="text-slate-500 italic">بإدارة نور الدين - تسويق عقاري احترافي</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-slate-500">جاري جلب البيانات من السيرفر...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
            {apartments.length > 0 ? apartments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
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
                  
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{apt.name}</h3>
                  
                  <div className="flex items-center gap-1 text-slate-500 text-sm mb-6 border-b pb-4">
                    <MapPin size={16} className="text-red-400" />
                    {apt.location}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-2 bg-slate-900 text-white p-2 rounded-lg text-sm hover:bg-slate-800 transition-all">
                      <Phone size={14} /> اتصال
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-green-600 text-white p-2 rounded-lg text-sm hover:bg-green-700 transition-all">
                      <MessageCircle size={14} /> واتساب
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 text-lg">لا يوجد عقارات معروضة حالياً.</p>
                <p className="text-slate-400 text-sm">تأكد من إضافة بيانات في جدول "apartments" داخل Supabase.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
