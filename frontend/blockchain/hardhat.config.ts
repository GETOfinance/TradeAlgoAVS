import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {}, // Local testing
    sonicBlazeTestnet: {
      url: "https://rpc.blaze.soniclabs.com",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 57054
    }
  },
};

export default config;
