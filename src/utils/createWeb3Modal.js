import Web3Modal, { connectors } from 'web3modal';
import binanceLogo from '../assets/images/binance-wallet.png';
import mathLogo from '../assets/images/math-wallet.svg';
import trustLogo from '../assets/images/trust-wallet.svg';
import safePalLogo from '../assets/images/safepal-wallet.svg';

export const createWeb3Modal = () =>
    new Web3Modal({
        network: 'binance',
        cacheProvider: true,
        providerOptions: {
            injected: {
                display: {
                    name: 'Injected',
                    description: 'Home-BrowserWallet',
                },
            },
            'custom-binance': {
                display: {
                    name: 'Binance',
                    description: 'Binance Chain Wallet',
                    logo: binanceLogo,
                },
                package: 'binance',
                connector: async (ProviderPackage, options) => {
                    const provider = window.BinanceChain;
                    await provider.enable();
                    return provider;
                },
            },
            'custom-math': {
                display: {
                    name: 'Math',
                    description: 'Math Wallet',
                    logo: mathLogo,
                },
                package: 'math',
                connector: connectors.injected,
            },
            'custom-twt': {
                display: {
                    name: 'Trust',
                    description: 'Trust Wallet',
                    logo: trustLogo,
                },
                package: 'twt',
                connector: connectors.injected,
            },
            'custom-safepal': {
                display: {
                    name: 'SafePal',
                    description: 'SafePal App',
                    logo: safePalLogo,
                },
                package: 'safepal',
                connector: connectors.injected,
            },
        },
    });
