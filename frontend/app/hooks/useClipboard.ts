"use client";

import { useState, useCallback } from 'react';
import { copyToClipboard } from '../utils/compat';

/**
 * Hook for clipboard operations with compatibility fallbacks
 * 
 * @returns Object with copy function and state
 */
export function useClipboard() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(async (text: string) => {
    try {
      setError(null);
      const result = await copyToClipboard(text);
      setCopied(result);
      
      // Reset the copied state after 2 seconds
      if (result) {
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } else {
        setError(new Error('Copy operation failed'));
      }
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Copy operation failed'));
      setCopied(false);
      return false;
    }
  }, []);

  return {
    copy,
    copied,
    error
  };
}