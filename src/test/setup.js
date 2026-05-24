import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.elements = [];
  }
  observe(element) {
    this.elements.push(element);
  }
  unobserve(element) {
    this.elements = this.elements.filter((el) => el !== element);
  }
  disconnect() {
    this.elements = [];
  }
}

global.IntersectionObserver = MockIntersectionObserver;

// Mock MutationObserver
class MockMutationObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn();
}

global.MutationObserver = MockMutationObserver;

// Mock window.scrollTo
window.scrollTo = vi.fn();
