import '../styles/globals.css';
import { BookingProvider } from '../contexts/BookingContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <BookingProvider>
      <Component {...pageProps} />
    </BookingProvider>
  );
}
