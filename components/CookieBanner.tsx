import React, { useEffect, useState } from 'react';

const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 z-[9999] max-w-[500px] rounded-xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
      <div className="flex items-start gap-4">
        <div className="text-2xl">🍪</div>
        <div>
          <h4 className="mb-1 text-base font-bold text-slate-900">
            We respect your privacy
          </h4>
          <p className="m-0 text-sm leading-relaxed text-slate-500">
            We use cookies to improve your experience and analyze traffic. Since our tool runs locally, your images
            are never stored. Read our{' '}
            <a href="/privacy.html" className="font-semibold text-indigo-600 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={acceptCookies}
          className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
