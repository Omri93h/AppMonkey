import React, { useEffect } from 'react';

export default function AdsBanner() {
  useEffect(() => {
    if (window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error('Adsense push error', e);
      }
    }
  }, []);

  return (
    <div className="flex justify-center my-4">
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '728px', height: '90px' }}
           data-ad-client="ca-pub-7940804732484653"
           data-ad-slot="8057681277"
           data-ad-format="auto"
           data-full-width-responsive="true">
      </ins>
    </div>
  );
}
