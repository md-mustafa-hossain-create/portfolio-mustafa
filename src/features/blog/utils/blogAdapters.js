/**
 * @fileoverview Data adapters for standardizing Blog structures from raw datastore records.
 */

/**
 * @typedef {Object} BlogModel
 * @property {string} id
 * @property {string} title
 * @property {string} summary
 * @property {string} content
 * @property {string} category
 * @property {string[]} tags
 * @property {string} coverImage
 * @property {string} date
 * @property {string} readTime
 * @property {string|null} externalUrl
 */

/**
 * Normalizes a raw blog post item from Firestore or mock source into a standard BlogModel format.
 * Ensures defensive fallbacks for missing/renamed properties and arrays.
 * 
 * @param {Object} raw - Raw object from datastore/local mock.
 * @returns {BlogModel} Normalized blog post object.
 */
export function normalizeBlog(raw) {
  if (!raw || typeof raw !== 'object') {
    return {
      id: '',
      title: 'Untitled Article',
      summary: '',
      content: '',
      category: 'General',
      tags: [],
      coverImage: '',
      date: 'Date Unknown',
      readTime: 'Quick Read',
      externalUrl: null,
    };
  }

  // Handle case variance of standard fields
  const title = raw.title || raw.Title || 'Untitled Article';
  const summary = raw.summary || raw.Summary || raw.description || raw.Description || '';
  const content = raw.content || raw.Content || raw.body || raw.Body || '';
  const category = raw.category || raw.Category || 'General';
  const coverImage = raw.coverImage || raw.CoverImage || raw.image || raw.Image || '';
  const date = raw.date || raw.Date || 'Date Unknown';
  const readTime = raw.readTime || raw.ReadTime || 'Quick Read';
  const externalUrl = raw.externalUrl || raw.ExternalUrl || raw.external_url || null;

  // Safely normalize tags to lowercase string array
  let tags = [];
  const rawTags = raw.tags || raw.Tags;
  if (Array.isArray(rawTags)) {
    tags = rawTags.map(t => String(t || '').trim());
  } else if (typeof rawTags === 'string') {
    tags = rawTags.split(',').map(t => t.trim()).filter(Boolean);
  }

  return {
    id: raw.id || '',
    title,
    summary,
    content,
    category,
    tags,
    coverImage,
    date,
    readTime,
    externalUrl,
  };
}

/**
 * Normalizes an array of raw blog post items.
 * 
 * @param {Array} rawList - Raw blog list.
 * @returns {BlogModel[]} Array of normalized blogs.
 */
export function normalizeBlogs(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(normalizeBlog);
}
