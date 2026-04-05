// @ts-nocheck
import React from 'react';
import { Building2, MapPin, Home, Phone } from 'lucide-react';

const App = () => {
  const properties = [
    { id: 1, name: "شقة فاخرة في الماصيون", price: "150,000$", area: "160م", location: "رام الله - الماصيون" },
    { id: 2, name: "شقة مطلة في الطيرة", price: "135,000$", area: "145م", location: "رام الله - الطيرة" },
    { id: 3, name: "روف فخم في بيتونيا", price: "120,000$", area: "180م", location: "بيتونيا" }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-blue-700 text-white p-6 shadow-lg text-center">
        <h1 className="text-3xl font-bold">شقق رام الله العقارية</h1>
        <p className="mt-2">دليلك الأول للعثور على منزل أحلامك في رام الله والبيرة</p>
      </header>

      <main className="p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gray-200 h-48 flex items-center justify-center">
               <Building2 size={64} className="text-gray-400" />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
              <div className="flex items-center text-gray-500 mt-2"><MapPin size={16} className="ml-1"/> {item.location}</div>
              <div className="flex items-center text-gray-500 mt-1"><Home size={16} className="ml-1"/> المساحة: {item.area}</div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-blue-700 font-bold text-lg">{item.price}</span>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">
                  <Phone size={16} className="ml-2" /> اتصل الآن
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;
