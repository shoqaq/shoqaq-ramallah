// @ts-nocheck
import { useState } from 'react';
import { Phone, Facebook, Instagram, LogOut, PlusCircle, LayoutDashboard } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  
  const whatsappChannel = "https://whatsapp.com/channel/0029Vb7b4Lg29758H3Dnbd0d"; 
  const logo = "https://raw.githubusercontent.com/shoqaq/shoqaq-ramallah/main/logo.jpg";

  const handleLogin = (v) => {
    setPassword(v);
    if (v === "749329") { setIsLoggedIn(true); setShowLogin(false); }
  };

  return (
    <div style={s.container}>
      <div style={s.identity}>
        <div onClick={() => { setShowLogin(!showLogin); setPassword(""); }} style={s.logoWrap}>
          <img src={logo} alt="Logo" style={s.logoImg} />
        </div>
        <h1 style={s.title}>شقق <span style={{color:'#f59e0b'}}>رام الله</span></h1>
        <p style={s.sub}>دليلك العقاري الأول في فلسطين</p>
      </div>

      {showLogin && !isLoggedIn && (
        <div style={{marginBottom:'30px'}}>
          <input type="password" placeholder="كود الوصول..." value={password} onChange={(e)=>handleLogin(e.target.value)} style={s.input} autoFocus />
        </div>
      )}

      {isLoggedIn ? (
        <div style={s.admin}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
            <h2 style={{margin:0,fontSize:'1.1rem',color:'#f59e0b'}}>لوحة التحكم</h2>
            <button onClick={()=>setIsLoggedIn(false)} style={s.logout}><LogOut size={20}/></button>
          </div>
          <button style={s.adminBtn}><PlusCircle size={18}/> إضافة عقار جديد</button>
          <button style={s.adminBtn}><LayoutDashboard size={18}/> إدارة القائمة</button>
        </div>
      ) : (
        <div style={s.grid}>
          <a href={whatsappChannel} target="_blank" rel="noreferrer" style={{...s.box,background:'#25D366'}}>
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.12.554 4.189 1.602 6.02L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.635 0 12.046-5.411 12.049-12.046a11.8 11.8 0 00-3.535-8.484"/></svg>
          </a>
          <a href="tel:+970594560056" style={{...s.box,background:'#34A853'}}><Phone size={24} color="white"/></a>
          <a href="https://facebook.com/shoqaq.store/" style={{...s.box,background:'#1877F2'}}><Facebook size={24} color="white"/></a>
          <a href="https://instagram.com/shoqaq.ramallah/" style={{...s.box,background:'linear-gradient(45deg,#f09433,#e6683c,#bc1888)'}}><Instagram size={24} color="white"/></a>
          <a href="https://tiktok.com/@shoqaq.ramallah" style={{...s.box,background:'#000',border:'1px solid #222'}}>
            <svg width="26" height="26" fill="white" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
          </a>
        </div>
      )}
      <footer style={s.foot}>SHOQAQ.STORE • 2026</footer>
    </div>
  );
}

const s = {
  container: { backgroundColor:'#000', color:'white', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', direction:'rtl', fontFamily:'sans-serif', padding:'20px' },
  identity: { textAlign:'center', marginBottom:'40px' },
  logoWrap: { cursor:'pointer', marginBottom:'15px', borderRadius:'18px', overflow:'hidden', display:'inline-block', border:'1px solid #333', width:'100px', height:'100px', boxShadow:'0 5px 15px rgba(245,158,11,0.1)' },
  logoImg: { width:'100%', height:'100%', objectFit:'cover', display:'block' },
  title: { fontSize:'2.5rem', fontWeight:'900', margin:'10px 0 0 0' },
  sub: { color:'#444', marginTop:'5px', fontSize:'0.9rem' },
  grid: { display:'flex', gap:'12px', justifyContent:'center' },
  box: { width:'50px', height:'50px', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none' },
  input: { backgroundColor:'#050505', border:'1px solid #111', borderRadius:'10px', padding:'10px', color:'#f59e0b', textAlign:'center', width:'160px' },
  admin: { backgroundColor:'#050505', padding:'20px', borderRadius:'20px', width:'300px', border:'1px solid #111' },
  adminBtn: { width:'100%', padding:'10px', marginBottom:'8px', borderRadius:'10px', backgroundColor:'#0a0a0a', border:'1px solid #111', color:'white', textAlign:'right', display:'flex', alignItems:'center', gap:'8px' },
  logout: { background:'none', border:'none', color:'#444', cursor:'pointer' },
  foot: { position:'fixed', bottom:'20px', opacity:0.05, fontSize:'9px' }
};
