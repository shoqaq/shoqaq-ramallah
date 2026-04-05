// @ts-nocheck
import React from 'react';
import { Building2, MapPin, Home, Phone, Facebook, Instagram, MessageCircle, Share2 } from 'lucide-react';

const App = () => {
  // بيانات التواصل الخاصة بك (يمكنك تعديل الروابط هنا)
  const socialLinks = {
    facebook: "https://facebook.com/yourpage",
    whatsapp: "https://wa.me/970590000000",
    instagram: "https://instagram.com/yourprofile"
  };

  const properties = [
    { id: 1, name: "شقة فاخرة في الماصيون", price: "150,000$", area: "160م", location: "رام الله - الماصيون" },
    { id: 2, name: "شقة مطلة في الطيرة", price: "135,000$", area: "145م", location: "رام الله - الطيرة" },
    { id: 3, name: "روف فخم في بيتونيا", price: "120,000$", area: "180م", location: "بيتونيا" }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans flex flex-col">
      
      {/* الهيدر مع اللوجو والاسم */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg">
              <Building2 size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">شقق رام الله</h1>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Ramallah Real Estate</p>
            </div>
          </div>
          
          {/* أزرار التواصل السريع في الهيدر */}
          <div className="flex gap-3">
            <a href={socialLinks.whatsapp} target="_blank" className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors">
              <MessageCircle size={24} />
            </a>
            <a href={socialLinks.facebook} target="_blank" className="p-2 text-blue-700 hover:bg-blue-50 rounded-full transition-colors">
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </header>

      {/* قسم الترحيب (Hero Section) */}
      <section className="bg-blue-700 text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4">دليلك الأول لعقارك القادم</h2>
          <p className="text-blue-100 text-lg opacity-90">نقدم لك أفضل الفرص العقارية في رام الله، البيرة، وبيتونيا بأفضل الأسعار.</p>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-center items-center">
          <Building2 size={300} />
        </div>
      </section>

      {/* عرض العقارات */}
      <main className="p-8 max-w-6xl mx-auto flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-800 border-r-4 border-blue-600 pr-3">أحدث العقارات المتاحة</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map(item => (
            <div key={item.id} className="bg-white rounded-3xl shadow-md overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="bg-slate-200 h-52 flex items-center justify-center text-slate-400 group-hover:bg-slate-300 transition-colors">
                 <Building2 size={64} />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-3">{item.name}</h2>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-slate-500 text-sm"><MapPin size={16} className="ml-2 text-red-500"/> {item.location}</div>
                  <div className="flex items-center text-slate-500 text-sm"><Home size={16} className="ml-2 text-blue-500"/> مساحة {item.area}</div>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-blue-700 font-black text-xl">{item.price}</span>
                  <a href={socialLinks.whatsapp} className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center hover:bg-green-700 font-bold shadow-md transition-transform active:scale-95">
                    <Phone size={16} className="ml-2" /> اتصل
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* الفوتر مع مواقع التواصل */}
      <footer className="bg-white border-t border-slate-200 pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="flex gap-6 mb-8">
            <a href={socialLinks.facebook} className="text-slate-400 hover:text-blue-700 transition-colors"><Facebook size={28} /></a>
            <a href={socialLinks.instagram} className="text-slate-400 hover:text-pink-600 transition-colors"><Instagram size={28} /></a>
            <a href={socialLinks.whatsapp} className="text-slate-400 hover:text-green-600 transition-colors"><MessageCircle size={28} /></a>
          </div>
          <div className="text-center">
            <p className="text-slate-800 font-bold">شقق رام الله العقارية</p>
            <p className="text-slate-400 text-xs mt-1">V 1.0 - جميع الحقوق محفوظة لـ نور الدين 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
