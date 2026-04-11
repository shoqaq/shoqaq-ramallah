import HomePage from './components/HomePage';
import AdminPanel from './components/AdminPanel';
import PropertyGrid from './components/PropertyGrid';
import { s } from './styles';

export default function App() {
  // الحالات (States) والمنطق البرمجي (Supabase)
  return (
    <div style={{ ...s.container, backgroundColor: theme.bg }}>
      {view === 'home' && <HomePage onNavigate={setView} ... />}
      {view === 'browse' && <PropertyGrid listings={listings} ... />}
      {isLoggedIn && <AdminPanel ... />}
    </div>
  );
}
