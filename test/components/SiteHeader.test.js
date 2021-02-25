import { render, screen } from '@testing-library/react';
import SiteHeader from '../../components/SiteHeader';

test('renders website title from config', () => {
  render(<SiteHeader />);
  const title = screen.getByText(process.env.NEXT_PUBLIC_SITE_TITLE);
  expect(title).toBeInTheDocument();
});

test('renders the header menu', () => {
  render(<SiteHeader />);
  const menu = screen.getByText(/About/);
  expect(menu).toBeInTheDocument();
});