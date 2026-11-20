import {useEffect} from 'react';
import {FRUIT_PRODUCTS, type FruitProduct} from '../data/fruits';
import type {BlogPost} from '../data/blog';

export const DEFAULT_SEO = {
  title: 'Mùa Quả — Trái Cây Tươi Theo Mùa & Quà Biếu Tuyển Chọn',
  description:
    'Đặt mua trái cây tươi thu hoạch trong ngày từ nhà vườn Việt Nam và nhập khẩu chính ngạch. Giao lạnh 2 giờ tại TP.HCM và Hà Nội, đổi trả 100%.',
};

function upsertMetaTag(
  selector: string,
  attrName: 'name' | 'property',
  attrValue: string,
  content: string,
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function upsertJsonLd(id: string, payload: unknown) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(payload);
}

export function useDynamicSeo(
  activeProduct: FruitProduct | null,
  activeArticle: BlogPost | null,
) {
  useEffect(() => {
    const baseUrl = window.location.origin + window.location.pathname;

    if (activeArticle) {
      const articleUrl = `${baseUrl}#blog/${activeArticle.slug}`;
      document.title = activeArticle.seoTitle;
      upsertMetaTag('meta[name="description"]', 'name', 'description', activeArticle.seoDescription);
      upsertMetaTag('meta[property="og:type"]', 'property', 'og:type', 'article');
      upsertMetaTag('meta[property="og:title"]', 'property', 'og:title', activeArticle.seoTitle);
      upsertMetaTag(
        'meta[property="og:description"]',
        'property',
        'og:description',
        activeArticle.seoDescription,
      );
      upsertMetaTag('meta[property="og:url"]', 'property', 'og:url', articleUrl);
      upsertMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', activeArticle.seoTitle);
      upsertMetaTag(
        'meta[name="twitter:description"]',
        'name',
        'twitter:description',
        activeArticle.seoDescription,
      );
      upsertCanonical(articleUrl);

      upsertJsonLd('dynamic-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: activeArticle.title,
        description: activeArticle.seoDescription,
        articleSection: activeArticle.category,
        datePublished: activeArticle.isoDate,
        inLanguage: 'vi-VN',
        author: {
          '@type': 'Person',
          name: activeArticle.authorName,
          jobTitle: activeArticle.authorRole,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Mùa Quả',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
      });
      return;
    }

    if (activeProduct) {
      const productUrl = `${baseUrl}#san-pham/${activeProduct.id}`;
      const productTitle = `${activeProduct.name} (${activeProduct.origin}) | Mùa Quả`;
      const productDesc = `${activeProduct.description} Độ ngọt ${activeProduct.brixLevel}. Giao lạnh trong 2 giờ tại TP.HCM và Hà Nội.`;
      const prices = activeProduct.variants.map((v) => v.price);
      const lowPrice = Math.min(...prices);
      const highPrice = Math.max(...prices);

      document.title = productTitle;
      upsertMetaTag('meta[name="description"]', 'name', 'description', productDesc);
      upsertMetaTag('meta[property="og:type"]', 'property', 'og:type', 'product');
      upsertMetaTag('meta[property="og:title"]', 'property', 'og:title', productTitle);
      upsertMetaTag('meta[property="og:description"]', 'property', 'og:description', productDesc);
      upsertMetaTag('meta[property="og:url"]', 'property', 'og:url', productUrl);
      upsertMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', productTitle);
      upsertMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', productDesc);
      upsertCanonical(productUrl);

      upsertJsonLd('dynamic-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: activeProduct.name,
        description: activeProduct.description,
        category: activeProduct.category,
        brand: {
          '@type': 'Brand',
          name: 'Mùa Quả',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'VND',
          lowPrice,
          highPrice,
          offerCount: activeProduct.variants.length,
          availability: 'https://schema.org/InStock',
        },
      });
      return;
    }

    // Default Storefront SEO + GroceryStore & ItemList JSON-LD
    document.title = DEFAULT_SEO.title;
    upsertMetaTag('meta[name="description"]', 'name', 'description', DEFAULT_SEO.description);
    upsertMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    upsertMetaTag('meta[property="og:title"]', 'property', 'og:title', DEFAULT_SEO.title);
    upsertMetaTag(
      'meta[property="og:description"]',
      'property',
      'og:description',
      DEFAULT_SEO.description,
    );
    upsertMetaTag('meta[property="og:url"]', 'property', 'og:url', baseUrl);
    upsertMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', DEFAULT_SEO.title);
    upsertMetaTag(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      DEFAULT_SEO.description,
    );
    upsertCanonical(baseUrl);

    upsertJsonLd('dynamic-jsonld', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'GroceryStore',
          name: 'Mùa Quả',
          url: baseUrl,
          description: DEFAULT_SEO.description,
          priceRange: '₫₫',
          telephone: '1900-6824',
          areaServed: ['TP. Hồ Chí Minh', 'Hà Nội'],
        },
        {
          '@type': 'ItemList',
          name: 'Trái cây tuyển chọn theo mùa tại Mùa Quả',
          itemListElement: FRUIT_PRODUCTS.map((p, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              name: p.name,
              description: p.description,
              offers: {
                '@type': 'Offer',
                price: p.variants[0].price,
                priceCurrency: 'VND',
                availability: 'https://schema.org/InStock',
              },
            },
          })),
        },
      ],
    });
  }, [activeProduct, activeArticle]);
}
