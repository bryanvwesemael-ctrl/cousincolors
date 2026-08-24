type EventType =
  | 'phone_click'
  | 'quote_started'
  | 'quote_completed'
  | 'contact_form_submitted'
  | 'booking_started'
  | 'booking_completed';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: EventType, data?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  if (window.dataLayer) {
    window.dataLayer.push({ event, ...data });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, data);
  }
}
