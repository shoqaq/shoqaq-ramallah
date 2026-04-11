import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Sun, Moon, X } from 'lucide-react';
import { s } from './styles'; // المسار الصحيح (نقطة واحدة)

// استيراد المكونات الفرعية
import HomePage from './components/HomePage';
import PropertyGrid from './components/PropertyGrid';
import AdminPanel from './components/AdminPanel';

const supabase = createClient(
  'https://ohomklxgvyzwjexkvzfc.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ob21rbHhndnl6d2pleGt2emZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMjYwMjAsImV4cCI6MjA5MDkwMjAyMH0.724AvkaimAvkJ4n6Q3sftYNgOI7cAMb1rDplpGHe5ag'
);

export default function App() {
  const [view, setView] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [listings, setListings] = useState([]);
  const [selectedProp, setSelectedProp] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [step, setStep] = useState(1);

  const initialPropertyState = { 
    owner_name: '', owner_phone1: '', owner_phone2: '', owner_notes: '',
    neighborhood: 'الماصيون', exact_address: '',
    category: 'شقة', listing_type: 'للإيجار', 
    price: '', currency: 'دينار', area: '', is_negotiable: false,
    payment_method: 'كاش', building_fees: '', municipal_fees: '', education_tax: '',
    electricity_bill_included: false, water_bill_included: false,
    features: {
      floor: '', bedrooms: '', bathrooms: '', balconies: '',
      has_living_room: false, has_salon: false, has_storage: false,
      parking_type: 'لا يوجد', has_elevator: false,
      electricity_meter: 'منفصلة', water_meter: 'منفصلة',
      central_gas: false, has_boiler: false, has_solar_heater: false,
      heating_type: 'لا يوجد'
    }
  };

  const [newProperty, setNewProperty] = useState(initialPropertyState);

  const fetchListings = async () => {
    const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (data) setListings(data);
  };

  useEffect(() => { fetchListings(); }, []);

  const handleSave = async () => {
    try {
      const payload = {
        owner_name: newProperty.owner_name,
        owner_phone: newProperty.owner_phone1,
        owner_phone2: newProperty.owner_phone2,
        owner_notes: newProperty.owner_notes,
        neighborhood: newProperty.neighborhood,
        exact_address: newProperty.exact
