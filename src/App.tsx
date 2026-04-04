import { createClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

// --- بيانات الربط الخاصة بنور الدين ---
const SUPABASE_URL = 'https://ohomklxgvyzwjexkvzfc.supabase.co';
const SUPABASE_KEY = 'أدخل_هنا_المفتاح_السري_الطويل_الذي_نسخته_anon_public';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function App() {
  const [apartments, setApartments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [newApt, setNewApt] = useState({ 
    title: '', price: '', location: '', description: '', link: '', currency: '$' 
  });

  // جلب البيانات من القاعدة
  const fetchApartments = async () => {
    const { data, error } = await supabase
      .from('apartments')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setApartments(data);
    if (error) console.error("Error fetching:", error);
  };

  useEffect(() => { fetchApartments(); }, []);

  // إضافة شقة جديدة
  const handleAddApt = async () => {
    if (!newApt.title || !newApt.price) return alert("يرجى إدخال الاسم والسعر");
    const { error } = await supabase.from('apartments').insert([newApt]);
    if (!error) {
      alert("تمت إضافة العقار بنجاح في رام الله!");
      setNewApt({ title: '', price: '', location: '', description: '', link: '', currency: '$' });
      fetchApartments();
    } else {
      alert("تأكد من إضافة الأعمدة في Supabase أولاً");
    }
  };

  return (
    <div style={containerStyle}>
      {/* الهوية */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div onClick={() => setShowLogin(!showLogin)} style={logoStyle}>🏠</div>
        <h1 style={{ fontSize: '2.2rem', margin: '10px 0' }}>
          شقق <span style={{ color: '#f59e0b' }}>رام الله</span>
        </h1>
        <p style={{ color: '#888' }}>منصة نور الدين العقارية</p>
      </header>

      {/* لوحة التحكم السرية */}
      {showLogin && (
        <section style={adminBoxStyle}>
          {!isLoggedIn ? (
            <input 
              type="password" 
              placeholder="أدخل الكود السري" 
              onChange={(e) => e.target.value === "749329" && setIsLoggedIn(true)} 
              style={inputStyle}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ margin: '0 0 10px', color: '#f59e0b' }}>إضافة شقة جديدة</h3>
              <input placeholder="اسم الشقة" value={newApt.title} onChange={e => setNewApt({...newApt, title: e.target.value})} style={inputStyle} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input placeholder="السعر" value={newApt.price} onChange={e => setNewApt({...newApt, price: e.target.value})} style={{ ...inputStyle, flex: 2 }} />
                <select value={newApt.currency} onChange={e => setNewApt({...newApt, currency: e.target.value})} style={{ ...inputStyle, flex: 1 }}>
                  <option value="$">دولار ($)</option>
                  <option value="JD">دينار (JD)</option>
                  <option value="₪">شيكل (₪)</option>
                </select>
              </div>
              <input placeholder="المنطقة (الماصيون، الطيرة...)" value={newApt.location} onChange={e => setNewApt({...newApt, location: e.target.value})} style={inputStyle} />
              <input placeholder="رابط فيديو أو موقع" value={newApt.link} onChange={e => setNewApt({...newApt, link: e.target.value})} style={inputStyle} />
              <textarea placeholder="الوصف" value={newApt.description} onChange={e => setNewApt({...newApt, description: e.target.value})} style={{ ...inputStyle, minHeight: '60px' }} />
              <button onClick={handleAddApt} style={btnStyle}>نشر الآن</button>
            </div>
          )}
        </section>
      )}

      {/* قائمة العرض */}
      <div style={gridStyle}>
        {apartments.map((apt: any) => (
          <div key={apt.id} style={cardStyle}>
            <h2 style={{ fontSize: '1.4rem' }}>{apt.title}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
               <span style={{ color: '#f59e0b', fontSize: '1.3rem', fontWeight: 'bold' }}>{apt.price} {apt.currency}</span>
               <span style={{ fontSize: '0.8rem' }}>📍 {apt.location}</span>
            </div>
            <p style={{ color: '#bbb', fontSize: '0.9rem' }}>{apt.description}</p>
            {apt.link && <a href={apt.link} target="_blank" rel="noreferrer" style={linkBtnStyle}>🔗 الرابط / الموقع</a>}
          </div>
        ))}
      </div>
    </div>
  );
}

// التنسيقات
const containerStyle: any = { backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '30px 20px', direction: 'rtl', fontFamily: 'Arial' };
const logoStyle = { backgroundColor: '#f59e0b', width: '60px', height: '60px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto', cursor: 'pointer' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' };
const cardStyle = { backgroundColor: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #222' };
const inputStyle: any = { padding: '12px', borderRadius: '10px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff', textAlign: 'right' };
const btnStyle = { backgroundColor: '#f59e0b', color: '#000', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' };
const adminBoxStyle = { backgroundColor: '#111', padding: '25px', borderRadius: '20px', marginBottom: '40px', border: '1px dashed #f59e0b', maxWidth: '500px', margin: '0 auto 40px' };
const linkBtnStyle = { display: 'block', textAlign: 'center' as const, marginTop: '15px', color: '#60a5fa', textDecoration: 'none', border: '1px solid #2563eb', padding: '8px', borderRadius: '8px' };

export default App;
