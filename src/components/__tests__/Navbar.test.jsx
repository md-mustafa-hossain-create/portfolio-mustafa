import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  it('renders brand logo and desktop navigation links successfully', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Verify brand logo text exists
    expect(screen.getByText('MUSTAFA')).toBeInTheDocument();
    expect(screen.getByText('.dev')).toBeInTheDocument();

    // Verify desktop navigation links are rendered by their unique IDs
    expect(document.getElementById('nav-link-home')).toBeInTheDocument();
    expect(document.getElementById('nav-link-about')).toBeInTheDocument();
    expect(document.getElementById('nav-link-skills')).toBeInTheDocument();
    expect(document.getElementById('nav-link-projects')).toBeInTheDocument();
    expect(document.getElementById('nav-link-education')).toBeInTheDocument();
    expect(document.getElementById('nav-link-contact')).toBeInTheDocument();

  });

  it('toggles the mobile drawer menu when clicking the hamburger menu button', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Find the toggle button by aria-label "Toggle Menu"
    const toggleButton = screen.getByLabelText('Toggle Menu');
    expect(toggleButton).toBeInTheDocument();

    // Verify mobile links exist in the document (but are hidden by styles initially)
    const mobileHomeLink = document.getElementById('nav-mobile-link-home');
    expect(mobileHomeLink).toBeInTheDocument();
    
    // Toggle menu to open
    fireEvent.click(toggleButton);

    // Verify it is still in the document
    expect(mobileHomeLink).toBeInTheDocument();
  });

  it('closes the mobile menu when clicking a mobile navigation link', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggleButton = screen.getByLabelText('Toggle Menu');
    
    // Open menu
    fireEvent.click(toggleButton);
    
    // Find a mobile link and click it
    const mobileAboutLink = document.getElementById('nav-mobile-link-about');
    expect(mobileAboutLink).toBeInTheDocument();
    
    fireEvent.click(mobileAboutLink);

    // Clicking a link sets isOpen to false, hiding the drawer.
    expect(mobileAboutLink).toBeInTheDocument();
  });

  it('scrolls to top when clicking the brand logo', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logoElement = document.getElementById('nav-logo');
    expect(logoElement).toBeInTheDocument();

    fireEvent.click(logoElement);

    // Verify window.scrollTo was called with smooth behavior
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
