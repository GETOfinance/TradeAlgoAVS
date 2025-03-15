// wagmi.config.ts
import { createConfig, http } from "wagmi";
import { Chain } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

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

// Always use Sonic Blaze Testnet
const chains: readonly [Chain, ...Chain[]] = [sonicBlazeTestnet];

export const getConfig = () =>
  createConfig({
    chains,
    connectors: [
      metaMask(),
    ],
    transports: {
      [sonicBlazeTestnet.id]: http(),
    },
    ssr: true,
  });
