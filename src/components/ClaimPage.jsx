import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ClaimPage({ wallet, onClaimed }) {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [bio, setBio] = useState('أهلاً بك في صفحتي الشخصية.'); // بايو افتراضي
  const [phone, setPhone] = useState('+20 100 000 0000'); // قيمة تجريبية
  const [loading, setLoading] = useState(false);

  const handleClaim = async (e) => {
    e.preventDefault();
    setLoading(true);

    // تجهيز الداتا بالهيكل اللي هيقرأه الـ ViewPage الجديد
    const initialProfileData = {
      name: name,
      bio: bio,
      links: [
        { platform: 'phone', value: phone, label: phone },
        { platform: 'whatsapp', value: 'https://wa.me/201000000000', label: 'WhatsApp' }, // مثال تجريبي
        { platform: 'instagram', value: 'https://instagram.com/', label: 'Instagram' }, // مثال تجريبي
        { platform: 'tiktok', value: 'https://tiktok.com/', label: 'TikTok' }, // مثال تجريبي
        { platform: 'linkedin', value: 'https://linkedin.com/', label: 'LinkedIn' }, // مثال تجريبي
        { platform: 'twitterx', value: 'https://twitter.com/', label: 'Twitter X' }, // مثال تجريبي
        { platform: 'facebook', value: 'https://facebook.com/', label: 'Facebook' }, // مثال تجريبي
      ]
    };

    const { data, error } = await supabase
      .from('wallets')
      .update({
        is_claimed: true,
        owner_pin: pin,
        profile_data: initialProfileData
      })
      .eq('id', wallet.id)
      .select()
      .single();

    if (!error) {
      localStorage.setItem(`wallet_owner_${wallet.slug}`, 'true');
      onClaimed(data);
    }
    setLoading(false);
  };

  // ملاحظة: لضمان التوافق مع التصميم الجديد، قمت بإعداد القيم التجريبية للسوشيال ميديا بشكل تلقائي.
  // في سيستم حقيقي، ستحتاج إلى إضافة حقول إدخال إضافية في هذا الفورم لكل لينك.

  return (
    <div className="min-h-screen bg-busyBg flex justify-center items-center p-4">
      <div className="bg-white p-8 max-w-sm w-full rounded-2xl shadow-lg border border-busyBorder">
        <h2 className="text-2xl font-bold text-busyDark mb-4 text-center">تفعيل محفظتك 🚀</h2>
        <p className="text-busyDark/70 text-center mb-6">أدخل بياناتك لإنشاء صفحتك الشخصية.</p>
        
        <form onSubmit={handleClaim} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-busyDark">الاسم الكامل:</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-busyBorder p-3 rounded-lg mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium text-busyDark">البايو / الوصف:</label>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} className="w-full border border-busyBorder p-3 rounded-lg mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium text-busyDark">رقم الهاتف الأساسي:</label>
            <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-busyBorder p-3 rounded-lg mt-1" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-busyDark">رقم سري (PIN) للتعديل لاحقاً:</label>
            <input type="password" required value={pin} onChange={(e) => setPin(e.target.value)} className="w-full border border-busyBorder p-3 rounded-lg mt-1" />
          </div>

          <button type="submit" disabled={loading} className="bg-busyDark text-busyBg w-full p-4 rounded-xl mt-6 font-semibold hover:bg-black transition-colors disabled:opacity-50">
            {loading ? 'جاري التفعيل...' : 'تفعيل المحفظة وعرض الصفحة'}
          </button>
        </form>
      </div>
    </div>
  );
}