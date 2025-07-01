// @ts-nocheck
import { useEffect } from 'react';
import Script from 'next/script';
import { GA4_MEASUREMENT_ID } from 'helpers/gtag';

const GoogleAnalytics = () => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID);
  }, []);

  return (
    <>
      
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;