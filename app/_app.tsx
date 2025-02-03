// _app.js

import '../styles/globals.css'; // Import your global styles
import { AppProps } from 'next/app';
import App from './components/App';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <App />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
