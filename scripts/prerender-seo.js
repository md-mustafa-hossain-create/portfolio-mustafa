import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const siteUrl = 'https://mustafa-dev-portfolio.web.app';
const distDirectory = path.resolve('dist');
const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8');
const vite = await createServer({
  configFile: path.resolve('vite.config.js'),
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function setTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error('Expected metadata tag not found: ' + pattern);
  return html.replace(pattern, replacement);
}

function applyMetadata(page, { path: route, title, description, image, type = 'website' }) {
  if (!/^\/(blogs|projects)\/[a-z0-9-]+$/.test(route)) {
    throw new Error('Refusing to emit an unsafe SEO route: ' + route);
  }

  const canonicalUrl = new URL(route, siteUrl).href;
  const imageUrl = image ? new URL(image, siteUrl).href : undefined;
  let html = setTag(page, /<title>[^<]*<\/title>/, '<title>' + escapeHtml(title) + '</title>');
  html = setTag(html, /<meta name="description" content="[^"]*"\s*\/>/, '<meta name="description" content="' + escapeHtml(description) + '" />');
  html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/>/, '<link rel="canonical" href="' + canonicalUrl + '" />');
  html = setTag(html, /<meta property="og:type" content="[^"]*"\s*\/>/, '<meta property="og:type" content="' + type + '" />');
  html = setTag(html, /<meta property="og:url" content="[^"]*"\s*\/>/, '<meta property="og:url" content="' + canonicalUrl + '" />');
  html = setTag(html, /<meta property="og:title" content="[^"]*"\s*\/>/, '<meta property="og:title" content="' + escapeHtml(title) + '" />');
  html = setTag(html, /<meta property="og:description" content="[^"]*"\s*\/>/, '<meta property="og:description" content="' + escapeHtml(description) + '" />');
  html = setTag(html, /<meta property="twitter:url" content="[^"]*"\s*\/>/, '<meta property="twitter:url" content="' + canonicalUrl + '" />');
  html = setTag(html, /<meta property="twitter:title" content="[^"]*"\s*\/>/, '<meta property="twitter:title" content="' + escapeHtml(title) + '" />');
  html = setTag(html, /<meta property="twitter:description" content="[^"]*"\s*\/>/, '<meta property="twitter:description" content="' + escapeHtml(description) + '" />');
  if (imageUrl) {
    html = setTag(html, /<meta property="og:image" content="[^"]*"\s*\/>/, '<meta property="og:image" content="' + imageUrl + '" />');
    html = setTag(html, /<meta property="twitter:image" content="[^"]*"\s*\/>/, '<meta property="twitter:image" content="' + imageUrl + '" />');
  }
  return html;
}

try {
  const { DEFAULT_BLOGS, DEFAULT_PROJECTS } = await vite.ssrLoadModule('/src/constants/data.jsx');
  const pages = [
    ...DEFAULT_BLOGS.map((blog) => ({
      path: '/blogs/' + blog.id,
      title: blog.title + ' | MD Mustafa Hossain',
      description: blog.summary || 'Read ' + blog.title + ', an article by MD Mustafa Hossain.',
      image: blog.coverImage,
      type: 'article',
    })),
    ...DEFAULT_PROJECTS.map((project) => ({
      path: '/projects/' + project.id,
      title: project.title + ' Case Study | MD Mustafa Hossain',
      description: project.description || 'Explore the ' + project.title + ' project by MD Mustafa Hossain.',
    })),
  ];

  for (const page of pages) {
    const outputDirectory = path.join(distDirectory, page.path.slice(1));
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(path.join(outputDirectory, 'index.html'), applyMetadata(template, page));
  }

  console.log('Generated route-specific metadata for ' + pages.length + ' blog and project pages.');
} finally {
  await vite.close();
}
