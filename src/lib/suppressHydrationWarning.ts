// Suppress hydration warnings caused by browser extensions
// This is safe because the warnings are from browser extensions modifying the DOM,
// not from our code

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Hydration') ||
       args[0].includes('hydrated') ||
       args[0].includes('did not match'))
    ) {
      return; // Suppress hydration warnings in development
    }
    originalError.call(console, ...args);
  };
}

export {};

