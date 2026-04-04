// @ts-nocheck
import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  PlusCircle, 
  Home, 
  Search, 
  ExternalLink,
  Phone
} from 'lucide-react';

function App() {
  // بيانات تجريبية ثابتة (بدون قاعدة بيانات)
  const [apartments] = useState([
    {
      id: 1,
      name: "شقة مودرن في الماصيون",
      price: "150,000",
      currency: "$",
      location: "رام الله - الماصيون",
      link: "#"
    },
    {
      id: 2,
      name: "روف واسع مع إطلالة",
      price: "120,000",
      currency: "$",
      location: "رام الله - الطيرة",
      link: "#"
    },
    {
      id: 3,
      name: "شقة عائلية قريبة من الخدمات",
      price: "85,000",
      currency: "JD",
      location: "بيتونيا",
      link: "#"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* الهيدر */}
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
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors text-blue-600 font-bold"
          >
            <PlusCircle size={20} />
            أضف عقارك
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* قسم الترحيب */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">اعثر على منزلك المثالي في رام الله</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">نقدم لك أفضل العروض العقارية في أرقى أحياء رام الله والبيرة وبيتونيا بأسعار منافسة.</p>
        </div>

        {/* عرض العقارات */}
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
                  className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white p-3 rounded-xl font-medium hover:bg-blue-600 transition-all"
                >
                  عرض التفاصيل
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* تذييل بسيط */}
        <div className="mt-16 text-center border-t pt-8 border-slate-200">
          <div className="flex items-center justify-center gap-4 text-slate-500 mb-4">
             <div className="flex items-center gap-1"><Phone size={16}/> تواصل معنا: 059XXXXXXX</div>
          </div>
          <p className="text-slate-400 text-sm italic">بواسطة نور الدين - التسويق العقاري الرقمي</p>
        </div>
      </main>
    </div>
  );
}

export default App;
