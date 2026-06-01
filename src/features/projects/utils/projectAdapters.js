/**
 * @fileoverview Data adapters for standardizing Project structures from raw datastore records.
 */

/**
 * @typedef {Object} MetricItem
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} ProjectModel
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} tags
 * @property {string} github
 * @property {string} demo
 * @property {string} category
 * @property {string} challenge
 * @property {string} solution
 * @property {string} codeSpotlight
 * @property {MetricItem[]} metrics
 */

/**
 * Normalizes a raw project post item from Firestore or mock source into a standard ProjectModel format.
 * Ensures defensive fallbacks for missing/renamed properties and arrays.
 * 
 * @param {Object} raw - Raw project object.
 * @returns {ProjectModel} Normalized project object.
 */
export function normalizeProject(raw) {
  if (!raw || typeof raw !== 'object') {
    return {
      id: '',
      title: 'Untitled Project',
      description: '',
      tags: [],
      github: '#',
      demo: '#',
      category: 'General',
      challenge: '',
      solution: '',
      codeSpotlight: '',
      metrics: [],
    };
  }

  // Handle case variance of standard fields
  const title = raw.title || raw.Title || 'Untitled Project';
  const description = raw.description || raw.Description || '';
  const github = raw.github || raw.Github || raw.GitHub || '#';
  const demo = raw.demo || raw.Demo || '#';
  const category = raw.category || raw.Category || 'General';
  const challenge = raw.challenge || raw.Challenge || '';
  const solution = raw.solution || raw.Solution || '';
  const codeSpotlight = raw.codeSpotlight || raw.CodeSpotlight || '';
  const metrics = Array.isArray(raw.metrics) ? raw.metrics : (Array.isArray(raw.Metrics) ? raw.Metrics : []);

  // Safely normalize tags to uppercase/standard format
  let tags = [];
  const rawTags = raw.tags || raw.Tags;
  if (Array.isArray(rawTags)) {
    tags = rawTags.map(t => String(t || '').trim()).filter(Boolean);
  } else if (typeof rawTags === 'string') {
    tags = rawTags.split(',').map(t => t.trim()).filter(Boolean);
  }

  return {
    id: raw.id || raw.id === 0 ? String(raw.id) : '',
    title,
    description,
    tags,
    github,
    demo,
    category,
    challenge,
    solution,
    codeSpotlight,
    metrics,
  };
}

/**
 * Normalizes an array of raw project items.
 * 
 * @param {Array} rawList - Raw project list.
 * @returns {ProjectModel[]} Array of normalized projects.
 */
export function normalizeProjects(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(normalizeProject);
}
