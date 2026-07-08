import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import Header from '../../components/Header';
import Inquiry from '../../components/Inquiry';
import Booking from '../../components/Booking';
import Footer from '../../components/Footer';

describe('Header Component', () => {
  const mockNavigate = vi.fn();
  const mockSetLanguage = vi.fn();
  const mockContent = {
    topBanner: "Let's create something permanent, shall we?",
    nav: {
      info: 'Info & Contact',
      booking: 'Booking',
      about: 'About Me',
      gallery: 'Gallery',
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the branding logo and navigation links', () => {
    render(
      <Header 
        navigate={mockNavigate} 
        content={mockContent} 
        setLanguage={mockSetLanguage} 
        currentLanguage="en" 
      />
    );

    // Assert branding logo is visible
    expect(screen.getByText('Sentiment')).toBeInTheDocument();
    
    // Assert navigation links are rendered
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText('BOOK NOW')).toBeInTheDocument();
  });

  it('triggers language change when switcher buttons are clicked', () => {
    render(
      <Header 
        navigate={mockNavigate} 
        content={mockContent} 
        setLanguage={mockSetLanguage} 
        currentLanguage="en" 
      />
    );

    const huButtons = screen.getAllByText('HU');
    fireEvent.click(huButtons[0]);
    expect(mockSetLanguage).toHaveBeenCalledWith('hu');

    const enButtons = screen.getAllByText('EN');
    fireEvent.click(enButtons[0]);
    expect(mockSetLanguage).toHaveBeenCalledWith('en');
  });

  it('calls navigate with the correct page on link clicks', () => {
    render(
      <Header 
        navigate={mockNavigate} 
        content={mockContent} 
        setLanguage={mockSetLanguage} 
        currentLanguage="en" 
      />
    );

    const aboutLink = screen.getByText('About Me');
    fireEvent.click(aboutLink);
    expect(mockNavigate).toHaveBeenCalledWith('about', undefined);

    const galleryLink = screen.getByText('Gallery');
    fireEvent.click(galleryLink);
    expect(mockNavigate).toHaveBeenCalledWith('gallery', undefined);
  });
});

describe('Inquiry Component', () => {
  const mockNavigate = vi.fn();
  const mockContent = {
    title: 'Begin a Conversation',
    body: 'Your story is unique, and your tattoo should be too.',
    button: 'Book Now',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders inquiry content correctly', () => {
    render(<Inquiry navigate={mockNavigate} content={mockContent} />);

    expect(screen.getByText('Begin a Conversation')).toBeInTheDocument();
    expect(screen.getByText('Your story is unique, and your tattoo should be too.')).toBeInTheDocument();
    expect(screen.getByText('Book Now')).toBeInTheDocument();
  });

  it('calls navigate to booking when the CTA is clicked', () => {
    render(<Inquiry navigate={mockNavigate} content={mockContent} />);

    const bookBtn = screen.getByText('Book Now');
    fireEvent.click(bookBtn);
    expect(mockNavigate).toHaveBeenCalledWith('booking');
  });
});

describe('Booking Component', () => {
  const mockContent = {
    tag: 'The Process',
    title: 'Book a Session',
    body: 'Ready to start your tattoo journey?',
    buttonText: 'Fill Form',
    formUrl: 'https://example.com/form',
  };

  it('renders correctly and links to the correct form URL', () => {
    render(<Booking content={mockContent} />);

    expect(screen.getByText('The Process')).toBeInTheDocument();
    expect(screen.getByText('Book a Session')).toBeInTheDocument();
    expect(screen.getByText('Ready to start your tattoo journey?')).toBeInTheDocument();

    const link = screen.getByText('Fill Form') as HTMLAnchorElement;
    expect(link).toBeInTheDocument();
    expect(link.href).toBe('https://example.com/form');
    expect(link.target).toBe('_blank');
  });
});

describe('Footer Component', () => {
  const mockContent = {
    copyright: '© 2026 Sentiment. All rights reserved.',
    imprintLabel: 'Imprint',
    gtcLabel: 'General Terms',
    imprintTitle: 'Imprint Info',
    imprintPlaceholder: 'This is the imprint of Sentiment Studio.',
    gtcTitle: 'Terms & Conditions',
    gtcContent: 'These are the general terms of the tattoo studio.',
  };

  it('renders copyright, links, and opens/closes modals properly', async () => {
    render(<Footer content={mockContent} />);

    expect(screen.getByText('© 2026 Sentiment. All rights reserved.')).toBeInTheDocument();

    // Verify modal is not open initially
    expect(screen.queryByText('Imprint Info')).not.toBeInTheDocument();

    // Click Imprint button to open modal
    const imprintBtn = screen.getByText('Imprint');
    fireEvent.click(imprintBtn);

    // Verify imprint modal is open
    expect(screen.getByText('Imprint Info')).toBeInTheDocument();
    expect(screen.getByText('This is the imprint of Sentiment Studio.')).toBeInTheDocument();

    // Click close button
    const closeBtn = screen.getByLabelText('Close modal');
    fireEvent.click(closeBtn);

    // Wait for modal element to be fully removed from DOM (handling motion exit animation)
    await waitForElementToBeRemoved(() => screen.queryByText('Imprint Info'));

    // Verify modal content disappears
    expect(screen.queryByText('Imprint Info')).not.toBeInTheDocument();
  });
});
