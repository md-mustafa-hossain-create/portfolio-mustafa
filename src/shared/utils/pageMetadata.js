export function setPageMetadata(title, description) {
  document.title = title;

  const canonicalUrl = new URL(window.location.pathname, window.location.origin).href;
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
  document.querySelector('meta[property="twitter:url"]')?.setAttribute('content', canonicalUrl);

  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) descriptionTag.setAttribute('content', description);

  const socialTitleTags = [
    'meta[property="og:title"]',
    'meta[property="twitter:title"]',
  ];
  socialTitleTags.forEach((selector) => {
    document.querySelector(selector)?.setAttribute('content', title);
  });

  const socialDescriptionTags = [
    'meta[property="og:description"]',
    'meta[property="twitter:description"]',
  ];
  socialDescriptionTags.forEach((selector) => {
    document.querySelector(selector)?.setAttribute('content', description);
  });
}
