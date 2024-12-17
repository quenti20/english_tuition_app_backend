import React, { useEffect } from 'react';

const FlushLocalStorage = () => {
  useEffect(() => {
    // Clear the localStorage when the component mounts
    localStorage.clear();
    console.log('LocalStorage has been cleared!');
  }, []); // The empty dependency array ensures this runs only once

  return null; // This component does not render anything visible
};

export default FlushLocalStorage;
