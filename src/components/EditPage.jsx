import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function EditPage({ wallet, onUpdated }) {
  const profile = wallet.profile_data || {};
  const [name, setName] = useState(profile.name || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || '');
  const [links, setLinks] = useState(profile.links || []);
  
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false); // حالة تحميل الصورة

  const platforms = [
    { id: 'phone', label: 'رقم هاتف' },
    { id: 'whatsapp', label: 'واتساب' },
    { id: 'instagram', label: 'إنستجرام' },
    { id: 'tiktok', label: 'تيك توك' },
    { id: 'linkedin', label: 'لينكد إن' },
    { id: 'twitterx', label: 'إكس (تويتر)' },
    { id: 'facebook', label: 'فيسبوك' }
  ];

  // --- دالة رفع الصورة لـ ImgBB ---
// --- دالة رفع الصورة لـ ImgBB (بعد التعديل) ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);

    const formData = new FormData();
    formData.append('image', file);
    
    // التعديل هنا: حطينا الـ API Key في اللينك نفسه بدل الـ FormData
    const apiKey = '5e0a355626194b79a27ff459bb6d9401';
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // لو الرفع نجح
        setAvatarUrl(data.data.url);
      } else {
        // لو ImgBB رفض الصورة لسبب معين (زي الحجم أو الصيغة)
        console.error('ImgBB Error Details:', data);
        alert(`رفض السيرفر الصورة: ${data.error?.message || 'خطأ غير معروف'}`);
      }
    } catch (error) {
      console.error('Network or Fetch Error:', error);
      alert('فشل الاتصال بالسيرفر، يرجى التحقق من الإنترنت.');
    } finally {
      setImageUploading(false);
    }
  };

  // استبدل الدالة دي:
const addLink = () => {
  if (links.length < 7) {
    setLinks([...links, { platform: 'phone', value: '', label: '' }]);
  }
};
  
  const updateLink = (index, field, newValue) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = newValue;
    setLinks(updatedLinks);
  };

  const removeLink = (index) => setLinks(links.filter((_, i) => i !== index));

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedProfile = { name, bio, avatarUrl, links };

    const { data, error } = await supabase
      .from('wallets')
      .update({ profile_data: updatedProfile })
      .eq('id', wallet.id)
      .select()
      .single();

    if (!error) {
      alert('تم حفظ التعديلات بنجاح! ✅');
      onUpdated(data);
    } else {
      alert('حدث خطأ أثناء الحفظ.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(`wallet_owner_${wallet.slug}`);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-busyBg py-10 px-4 flex justify-center items-start">
      <div className="bg-white p-6 max-w-lg w-full rounded-2xl shadow-sm border border-busyBorder">
        <h2 className="text-2xl font-bold text-busyDark mb-6">تعديل بيانات المحفظة ✏️</h2>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          
          <div className="space-y-4">
            {/* --- قسم رفع الصورة --- */}
            <div>
              <label className="block text-sm font-medium text-busyDark mb-2">الصورة الشخصية:</label>
              <div className="flex items-center gap-4">
                {/* عرض الصورة الحالية أو الديفولت */}
                <div className="w-16 h-16 rounded-full bg-gray-100 border border-busyBorder overflow-hidden flex-shrink-0 flex justify-center items-center">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  )}
                </div>
                
                {/* زرار اختيار الصورة */}
                <div className="flex-1">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    disabled={imageUploading}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-busyDark file:text-white hover:file:bg-black cursor-pointer disabled:opacity-50 transition-all" 
                  />
                  {imageUploading && <p className="text-sm text-blue-600 mt-2 font-medium animate-pulse">جاري رفع الصورة...</p>}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-busyDark mb-1">الاسم:</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-busyBorder p-3 rounded-lg focus:ring-2 focus:ring-busyDark outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-busyDark mb-1">الوصف (Bio):</label>
              <textarea rows="3" value={bio} onChange={(e) => setBio(e.target.value)} className="w-full border border-busyBorder p-3 rounded-lg focus:ring-2 focus:ring-busyDark outline-none transition-all" />
            </div>
          </div>

          <hr className="border-busyBorder" />

          {/* --- قسم السوشيال ميديا --- */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-lg font-medium text-busyDark">روابط التواصل:</label>
              
              <button 
                type="button" 
                onClick={addLink} 
                disabled={links.length >= 7}
                className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                  links.length >= 7 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-busyBorder text-busyDark hover:bg-gray-300'
                }`}
              >
                {links.length >= 7 ? 'الحد الأقصى (7)' : '+ إضافة رابط'}
              </button>
            </div>

            <div className="space-y-4">
              {links.map((link, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center bg-gray-50 p-3 rounded-xl border border-gray-200 relative">
                  <select value={link.platform} onChange={(e) => updateLink(index, 'platform', e.target.value)} className="p-2 border border-busyBorder rounded-lg w-full sm:w-1/3 bg-white">
                    {platforms.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>

                  <input type="text" placeholder={link.platform === 'phone' ? 'رقم الهاتف' : 'الرابط (URL)'} value={link.value} onChange={(e) => updateLink(index, 'value', e.target.value)} className="p-2 border border-busyBorder rounded-lg w-full sm:w-2/3 text-left" dir="ltr" required />

                  <button type="button" onClick={() => removeLink(index)} className="absolute top-2 left-2 sm:static bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              ))}
              
              {links.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">لم تقم بإضافة أي روابط حتى الآن.</p>
              )}
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button type="submit" disabled={loading || imageUploading} className="w-full bg-busyDark text-white p-4 rounded-xl font-bold hover:bg-black transition-all disabled:opacity-50">
              {loading ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </button>

            <button type="button" onClick={handleLogout} className="w-full bg-red-50 text-red-600 p-3 rounded-xl font-semibold hover:bg-red-100 transition-all border border-red-200">
              خروج (عرض كزائر)
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}