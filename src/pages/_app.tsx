// Import the AppProps type from Next.js.
// AppProps provides types for the props used in the custom App component in Next.js.
import { AppProps } from 'next/app';

// Import the global CSS file to apply styles across the entire app.
// This is the file where global styles are defined for the Next.js application.
import '../styles/globals.css';

// Define the MyApp component, which is a custom App component in Next.js.
// It takes the 'Component' and 'pageProps' as parameters from AppProps.
// - Component: The active page to be rendered.
// - pageProps: The props that get passed to the active page.
function MyApp({ Component, pageProps }: AppProps) {
  // Render the active page (Component) with its props (pageProps).
  // Next.js automatically passes these props to the page component when it renders.
  return <Component {...pageProps} />;
}

// Export the MyApp component as the default export.
// This tells Next.js to use this component as the custom App component.
export default MyApp;
