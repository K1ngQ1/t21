import { render, screen } from '@testing-library/react';
import App from './App';


test('renders Main heading when loads', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search Results:/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders search bar when loads', () => {
  render(<App />);
  const linkElement = screen.getByPlaceholderText(/Search Here!/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Your favourites button when loads', () => {
  render(<App />);
  const linkElement = screen.getByText(/Your Favourites/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders search catagory dropdown when loads', () => {
  render(<App />);
  const linkElement = screen.getByTestId(/select-form/i);
  expect(linkElement).toBeInTheDocument();
});
