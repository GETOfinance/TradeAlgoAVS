"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState, useEffect } from "react";
import { State, WagmiProvider } from "wagmi";
import { getConfig } from "./wagmi.config";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { SnackbarProvider } from "notistack";
import { Chain } from "wagmi/chains";
// Import our compatibility utilities
import { generateUUID } from "./utils/compat";

// Define Sonic Blaze Testnet chain
const sonicBlazeTestnet: Chain = {
  id: 57054,
  name: "Sonic Blaze Testnet",
  nativeCurrency: {
    name: "Sonic",
    symbol: "S",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.blaze.soniclabs.com"],
    },
    public: {
      http: ["https://rpc.blaze.soniclabs.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "SonicScan",
      url: "https://testnet.sonicscan.org",
    },
  },
  testnet: true
};

export function Providers({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: State | undefined;
}) {
  // 使用 useState 來確保 QueryClient 只初始化一次
  const [queryClient] = useState(() => new QueryClient());
  
  // Install browser compatibility polyfills
  useEffect(() => {
    // Ensure crypto and randomUUID are available
    if (typeof window !== 'undefined') {
      try {
        // Test clipboard functionality to make sure it's available
        const testClipboard = async () => {
          try {
            // Create a UUID as a test
            const testId = generateUUID();
            console.debug('Compatibility check - UUID generation works:', !!testId);
            
            // Try copying to clipboard silently (this might fail in certain contexts)
            if (window.navigator?.clipboard) {
              console.debug('Compatibility check - Clipboard API exists');
            } else {
              console.warn('Compatibility check - Clipboard API not available, using fallback');
            }
          } catch (err) {
            console.error('Browser compatibility initialization error:', err);
          }
        };
        
        testClipboard();
      } catch (e) {
        console.error('Failed to initialize browser compatibility features:', e);
      }
    }
  }, []);

  return (
    /* 先提供 React Query 環境，確保其他 Provider 能使用 API */
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        {/* Wagmi 依賴 React Query，因此放在 QueryClientProvider 內 */}
        <WagmiProvider config={getConfig()} initialState={initialState}>
          {/* OnchainKit 需要 Wagmi 提供的鏈上連線資訊，因此放在 WagmiProvider 內 */}
          <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            chain={sonicBlazeTestnet}
          >
            {children}
          </OnchainKitProvider>
        </WagmiProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
