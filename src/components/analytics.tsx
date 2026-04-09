"use client";

import { useEffect } from "react";
import Script from "next/script";

const GA_ID = "G-S7WKB67K2G";
const COOKIE_KEY = "dyahorro_cookie_consent";

export function ConditionalAnalytics() {
  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (consent === "accepted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    }
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('consent', 'default', { analytics_storage: 'denied' });
        gtag('config', '${GA_ID}', { send_page_view: false });
        if (localStorage.getItem('${COOKIE_KEY}') === 'accepted') {
          gtag('consent', 'update', { analytics_storage: 'granted' });
          gtag('event', 'page_view');
        }
      `}</Script>
    </>
  );
}
