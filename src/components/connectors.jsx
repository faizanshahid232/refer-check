import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { BscConnector } from "@binance-chain/bsc-connector";

const bsc = new BscConnector({
    supportedChainIds: [56] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
  });

  const walletconnect = new WalletConnectConnector({ 
    rpcUrl: { 
      '56': "https://bsc-dataseed.binance.org"
    },
    supportedChainIds: [56],
    qrcode: true, 
  });

const Injected = new InjectedConnector({
 supportedChainIds: [56]
});

const walletlink = new WalletLinkConnector({
    url: `https://bsc-dataseed1.binance.org/`,
    appName: "web3-react-demo",
    supportedChainIds: [56]
  });

export const connectors = {
    Injected: Injected,
    walletConnect: walletconnect,
    bsc: bsc,
    coinbaseWallet: walletlink,
};