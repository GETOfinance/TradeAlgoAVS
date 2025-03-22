/**
 * Browser compatibility polyfills for modern APIs
 */

// We'll cast the crypto object directly rather than declaring a global interface
// to avoid conflicts with built-in type definitions

/**
 * Polyfill for crypto.randomUUID
 * @returns A randomly generated UUID string
 */
export function generateUUID(): string {
  try {
    // Try to use native randomUUID if available
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    
    // Use crypto.getRandomValues if available for more secure generation
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      // Create a UUID v4 (random) based on RFC 4122
      const randomBytes = new Uint8Array(16);
      window.crypto.getRandomValues(randomBytes);
      
      // Set version (4) and variant bits
      randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // version 4
      randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // variant 10
      
      // Convert to hex string with dashes in the proper positions
      return [
        randomBytes.slice(0, 4).reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), ''),
        randomBytes.slice(4, 6).reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), ''),
        randomBytes.slice(6, 8).reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), ''),
        randomBytes.slice(8, 10).reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), ''),
        randomBytes.slice(10).reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), ''),
      ].join('-');
    }
    
    // Final fallback to Math.random (less secure but works everywhere)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  } catch (e) {
    // If anything fails, use the simple Math.random approach
    console.warn('Using fallback UUID generation due to error:', e);
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

/**
 * Safely copy text to clipboard with fallbacks
 * @param text Text to copy to clipboard
 * @returns Promise that resolves when copy operation completes
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Modern clipboard API
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers
    if (typeof document !== 'undefined') {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      } catch {
        // Ignore error and just return false
        document.body.removeChild(textArea);
        return false;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Failed to copy text: ', error);
    return false;
  }
}

// Install polyfills when this module is imported
// This part only runs on the client side
if (typeof window !== 'undefined') {
  // Add crypto polyfill
  if (!window.crypto) {
    // @ts-expect-error - Creating crypto object for older browsers
    window.crypto = {};
  }
  
  // Add randomUUID polyfill if not available
  if (window.crypto && !('randomUUID' in window.crypto)) {
    // @ts-expect-error - Adding randomUUID method
    window.crypto.randomUUID = generateUUID;
  }
  
  // Patch console warn for older browsers that might not have it
  if (!console.warn) {
    console.warn = console.log;
  }
}