# Agentic Trading Frontend (Frontend for Trade-Algo-AVS)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Web3 (blockchain) folder was created with hardhat framework.

## Setting Up
Blockchain folder's env file `./blockchain/.env`
```
PRIVATE_KEY=yourPrivateKeyHere
```

### Blockchain Network
The project uses Sonic Blaze Testnet:
- Network name: Sonic Blaze Testnet
- RPC URL: https://rpc.blaze.soniclabs.com
- Explorer URL: https://testnet.sonicscan.org
- Chain ID: 57054
- Currency symbol: S

Frontend `.env` file should contain
```
NEXT_PUBLIC_API_URL=your URL
NEXT_PUBLIC_CONTRACT_ADDRESS=0x4Cd7fDFf83DC1540696BdaF38840a93134336dF8
```

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
