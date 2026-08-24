import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = 'https://www.cousincolors.be';

export default function SEO({ title, description, canonicalPath, ogImage, jsonLd }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    if (ogImage) {
      setMeta('og:image', ogImage, 'property');
      setMeta('twitter:image', ogImage);
    }

    if (canonicalPath) {
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', `${BASE_URL}${canonicalPath}`);
    }

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      script.dataset.dynamic = 'true';
      document.head.appendChild(script);
    }

    return () => {
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [title, description, canonicalPath, ogImage, jsonLd]);

  return null;
}
