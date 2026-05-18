import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ClaimPage from '../components/ClaimPage';
import EditPage from '../components/EditPage';
import ViewPage from '../components/ViewPage';
import ErrorPage from '../components/ErrorPage';

export default function WalletHandler() {
  const { slug } = useParams();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // بنشيك لو الـ LocalStorage موجود لنفس الـ slug
  const hasLocalStorage = localStorage.getItem(`wallet_owner_${slug}`) === 'true';

useEffect(() => {
    async function fetchWallet() {
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error("Supabase Error:", error); // السطر ده هيكشفلنا المشكلة
      }

      if (data) setWallet(data);
      setLoading(false);
    }
    
    fetchWallet();
  }, [slug]);

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>جاري التحميل...</div>;
  
  // لو اللينك غلط أو مش موجود في الداتا بيز
  if (!wallet) return <ErrorPage />;

  // لو لسه متفعلتش
  if (!wallet.is_claimed) {
    return <ClaimPage wallet={wallet} onClaimed={(updatedWallet) => setWallet(updatedWallet)} />;
  }

  // لو متفعلة ومعاه الـ Local Storage
  if (hasLocalStorage) {
    return <EditPage wallet={wallet} onUpdated={(updatedWallet) => setWallet(updatedWallet)} />;
  }

  // لو متفعلة بس معهوش الـ Local Storage (شخص بيعمل Scan أو صاحبها من موبايل تاني)
  return <ViewPage wallet={wallet} onRestoreAccess={() => setWallet({...wallet})} />;
}