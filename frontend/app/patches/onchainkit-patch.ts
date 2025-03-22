/**
 * Patches for @coinbase/onchainkit
 */
import { copyToClipboard } from "../utils/compat";

// Monkey patch the copyToClipboard function from onchainkit
// This only runs in the browser
if (typeof window !== 'undefined') {
  // We need to wait for the module to be loaded
  setTimeout(() => {
    try {
      // Find the onchainkit module in the window
      // @ts-expect-error - Accessing internal onchainkit object
      const onchainkit = window.__onchainkit;
      if (onchainkit && onchainkit.utils && onchainkit.utils.copyToClipboard) {
        // Replace their implementation with our own
        const originalCopy = onchainkit.utils.copyToClipboard;
        onchainkit.utils.copyToClipboard = async (text: string) => {
          try {
            // Try our implementation first
            const success = await copyToClipboard(text);
            if (success) return true;
            
            // Fall back to their implementation if ours fails
            return await originalCopy(text);
          } catch (e) {
            console.warn('Copy to clipboard failed:', e);
            return false;
          }
        };
      }
    } catch (e) {
      console.warn('Failed to patch onchainkit copyToClipboard:', e);
    }
  }, 100);
}