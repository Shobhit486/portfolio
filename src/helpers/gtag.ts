export const GA4_MEASUREMENT_ID = "G-EG71VENRCY";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  console.log("GA pageview", url);
  window.gtag?.("config", GA4_MEASUREMENT_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: Partial<{
  action: string;
  category: string;
  label: string;
  value: string;
}>) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
