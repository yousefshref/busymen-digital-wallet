import { useState } from 'react';
import { supabase } from '../supabaseClient';

const Icon = ({ name }) => {
  const icons = {
    phone: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-3C9.716 21 3 14.284 3 5z"></path></svg>,
    whatsapp: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>,
    instagram: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>,
    tiktok: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A145.11,145.11,0,1,1,180,204.42a144.17,144.17,0,0,1,34.25,4.24V131.64a218.6,218.6,0,0,0-34.25-2.69C104.12,128.95,41,192.08,41,270.06S104.12,411.17,182.09,411.17s141.09-63.13,141.09-141.11V102.23A210.4,210.4,0,0,0,448,209.91Z"></path></svg>,
    linkedin: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>,
    twitterx: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 448 512"><path d="M224 32a192 192 0 1 0 192 192A192.1 192.1 0 0 0 224 32zm0 354.5a162.5 162.5 0 1 1 162.5-162.5A162.7 162.7 0 0 1 224 386.5zM224 96a128 128 0 1 0 128 128A128.1 128.1 0 0 0 224 96zm12 188.7v-25h-24v25zm0-48.8v-12.2h-24v12.2zM236.4 171H211.6v62.1h24.8zm0-40H211.6v28h24.8zM248 111.4a86.1 86.1 0 0 0 0 171.7h0a86.1 86.1 0 0 0 0-171.7h0zm0 159.2a73.1 73.1 0 1 1 73.1-73.1A73.2 73.2 0 0 1 248 270.6z"></path></svg>,
    facebook: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 320 512"><path d="M80 299.3V512H196V299.3h86.5l18-117.8H196V114.8c0-34.2 16.9-67.5 70.2-67.5H320V0c-26.6-4.1-80-14.7-124.9-14.7C101.5-14.7 48 48.7 48 141.2v67.8H0V299.3h80z"></path></svg>,
    edit: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
  };
  return icons[name] || null;
};

// 🌟 الدالة الذكية لتحويل النص للينك شغال 100% 🌟
const formatUrl = (platform, value) => {
  if (!value) return '#';
  
  // لو العميل كتب اللينك كامل من نفسه، هنرجعه زي ما هو
  const isAlreadyUrl = value.startsWith('http://') || value.startsWith('https://');

  switch (platform) {
    case 'whatsapp': {
      // بنشيل أي مسافات أو علامات من الرقم
      let cleanNum = value.replace(/[\s\-\+]/g, '');
      // لو الرقم بيبدأ بـ 0 (زي 010)، بنحط كود مصر 2
      if (cleanNum.startsWith('0')) {
        cleanNum = '2' + cleanNum;
      }
      return `https://wa.me/${cleanNum}`;
    }
    case 'instagram':
      return isAlreadyUrl ? value : `https://instagram.com/${value.replace('@', '')}`;
    case 'tiktok':
      return isAlreadyUrl ? value : `https://tiktok.com/@${value.replace('@', '')}`;
    case 'linkedin':
      return isAlreadyUrl ? value : `https://linkedin.com/in/${value}`;
    case 'twitterx':
      return isAlreadyUrl ? value : `https://twitter.com/${value.replace('@', '')}`;
    case 'facebook':
      return isAlreadyUrl ? value : `https://facebook.com/${value}`;
    case 'phone':
      return `tel:${value}`;
    default:
      return isAlreadyUrl ? value : `https://${value}`;
  }
};

const SocialIcon = ({ name, value }) => {
  const brandStyles = {
    whatsapp: 'text-[#25D366] border-[#25D366]/40 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:-translate-y-1',
    instagram: 'text-[#E1306C] border-[#E1306C]/40 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent hover:-translate-y-1',
    tiktok: 'text-black border-black/30 hover:bg-black hover:text-white hover:border-black hover:-translate-y-1',
    linkedin: 'text-[#0A66C2] border-[#0A66C2]/40 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:-translate-y-1',
    twitterx: 'text-black border-black/30 hover:bg-black hover:text-white hover:border-black hover:-translate-y-1',
    facebook: 'text-[#1877F2] border-[#1877F2]/40 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:-translate-y-1',
  };

  const styleClass = brandStyles[name] || 'text-gray-600 border-gray-200 hover:bg-gray-100 hover:-translate-y-1';
  
  // بنعدي القيمة للدالة الذكية عشان تطلعلنا اللينك النهائي
  const finalUrl = formatUrl(name, value);

  return (
    <a 
      href={finalUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`w-12 h-12 rounded-full border bg-white flex justify-center items-center shadow-sm transition-all duration-300 ${styleClass}`}
    >
      <Icon name={name} />
    </a>
  );
};

export default function ViewPage({ wallet, onRestoreAccess }) {
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinAttempt, setPinAttempt] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { name = 'مستخدم جديد', bio = 'أهلاً بك في صفحتي الشخصية.', avatarUrl = '', links = [] } = wallet.profile_data || {};
  
  const phoneLink = links.find(l => l.platform === 'phone');
  const socialLinks = links.filter(l => l.platform !== 'phone');
  // const facebookLink = links.find(l => l.platform === 'facebook');

  const handlePinCheck = () => {
    if (pinAttempt === wallet.owner_pin) {
      localStorage.setItem(`wallet_owner_${wallet.slug}`, 'true');
      onRestoreAccess();
      window.location.reload();
    } else {
      setErrorMsg('الرقم السري خاطئ!');
    }
  };

  return (
    <div className="min-h-screen bg-busyBg flex justify-center items-center p-4">
      <div className="bg-white max-w-xl w-full rounded-3xl shadow-xl overflow-hidden relative">
        <div className="bg-busyDark h-32 relative"></div>

        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-28 h-28 bg-[#d4d4d8] rounded-full border-4 border-white flex justify-center items-center overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <svg className="w-14 h-14 text-busyBg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          )}
        </div>

        <div className="pt-16 px-6 text-center">
          <h1 className="text-3xl font-bold text-busyDark mt-4 tracking-tight">{name}</h1>
          <p className="text-sm text-[#71717a] mt-2 font-light">{bio}</p>

          <hr className="border-[#d4d4d8] my-6 w-12 mx-auto" />

          {phoneLink && (
            <a href={`tel:${phoneLink.value}`} className="bg-busyDark text-busyBg rounded-full flex justify-center items-center px-6 py-4 mt-6 text-lg w-full max-w-xs mx-auto gap-3 hover:bg-black transition-colors">
              <Icon name="phone" />
              {/* التعديل هنا: هيعرض القيمة الحقيقية اللي العميل دخلها في صفحة الـ Edit */}
              {phoneLink.value}
            </a>
          )}

          {socialLinks.length > 0 && (
            <div className="flex justify-center gap-4 mt-8 px-6 max-w-full mx-auto flex-wrap">
              {socialLinks.map((link, index) => (
                <SocialIcon key={index} name={link.platform} value={link.value} />
              ))}
            </div>
          )}

          {/* {facebookLink && (
            <div className="mt-6 px-6 max-w-xs mx-auto flex justify-center">
              <SocialIcon name="facebook" value={facebookLink.value} />
            </div>
          )} */}

          <div className="text-center text-xs text-[#71717a] mt-10 mb-6 px-6 font-light">
            powered by <span className="font-semibold text-[#18181b]">BusyMen</span>
          </div>
        </div>

        {!showPinInput ? (
          <button onClick={() => setShowPinInput(true)} className="absolute bottom-3 left-3 text-busyDark opacity-30 hover:opacity-100 flex items-center gap-1.5 p-1">
            <Icon name="edit" />
          </button>
        ) : (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm p-10 flex flex-col justify-center items-center text-center z-10">
            <p className="text-busyDark text-lg font-semibold">أدخل الرقم السري للتعديل:</p>
            <input type="password" value={pinAttempt} onChange={(e) => setPinAttempt(e.target.value)} className="w-full max-w-xs border border-busyBorder p-3 rounded-lg mt-4" />
            <button onClick={handlePinCheck} className="bg-busyDark text-white p-3 rounded-lg w-full max-w-xs mt-3">دخول</button>
            {errorMsg && <p className="text-red-500 mt-2 text-sm">{errorMsg}</p>}
            <button onClick={() => setShowPinInput(false)} className="text-busyDark opacity-50 mt-4 text-xs">إلغاء</button>
          </div>
        )}
      </div>
    </div>
  );
}