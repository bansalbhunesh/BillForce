import { render, screen } from '@testing-library/react';
import Home from './page';
import { describe, it, expect } from 'vitest';

describe('Landing Page', () => {
  it('renders the main heading', () => {
    render(<Home />);

    // Check for the main heading text (ignoring the span/em tags for simple match)
    expect(screen.getByText(/Stop chasing payments/i)).toBeInTheDocument();
  });

  it('renders the tax exposure calculator', () => {
    render(<Home />);

    expect(screen.getByText('Tax exposure calculator')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. 500000')).toBeInTheDocument();
  });
});
