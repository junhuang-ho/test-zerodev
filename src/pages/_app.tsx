import { type AppType } from "next/app";

import { api } from "~/utils/api";

import {
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
  enhanceWalletWithAAConnector,
} from "@zerodevapp/wagmi/rainbowkit";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
// import {
//   metaMaskWallet,
//   walletConnectWallet,
// } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import "~/styles/globals.css";

// YOUR ZERODEV PROJECT ID
const projectId = "YOUR_PROJECT_ID";

const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({
      apiKey: "YOUR_API_KEY",
    }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Social",
    wallets: [
      googleWallet({ options: { projectId } }),
      facebookWallet({ options: { projectId } }),
      githubWallet({ options: { projectId } }),
      discordWallet({ options: { projectId } }),
      twitchWallet({ options: { projectId } }),
      twitterWallet({ options: { projectId } }),
    ],
  },
  //   {
  //     groupName: "Wallets",
  //     wallets: [metaMaskWallet({ chains }), walletConnectWallet({ chains })],
  //   },
]);

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default api.withTRPC(MyApp);
