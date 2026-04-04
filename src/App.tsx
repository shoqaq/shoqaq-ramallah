// @ts-nocheck
import React, { useState } from 'react';
import { Building2, MapPin, Home, ExternalLink } from 'lucide-react';

function App() {
  const [apartments] = useState([
    { id: 1, name: "شقة الماصيون الفاخرة", price: "150,000", currency: "$", location: "الماصيون" },
    { id: 2, name: "روف الطيرة بإطلالة مميزة", price: "120,000", currency: "$", location: "الطيرة" }
  ]);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-8 text-right">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-10 border-b pb-5">
          <Building2 className="text-blue-600" size={32} />
          <h1 className="text-2xl font-bold">عقارات رام الله</h1>
        </header>
        
        <div className="grid gap-6">
          {apartments.map(apt => (
            <div key={apt.id} className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{apt.name}</h2>
                <p className="text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin size={16} /> {apt.location}
                </p>
              </div>
              <div className="text-left">
                <span className="text-2xl font-black text-blue-600">{apt.price} {apt.currency}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
