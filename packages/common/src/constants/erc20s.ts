import { ChainId } from './chain-id';

export const DOLLAR_STABLECOIN_SYMBOLS = [
  'USD',
  'DAI',
  'USDC',
  'm.USDC',
  'USDT',
  'm.USDT',
  'BUSD',
  'USDP',
  'GoodDollar',
].map((s) => s.toUpperCase());

export const POPULAR_ERC20_TOKENS = {
  1: [
    {
      symbol: 'DAI',
      contractAddress:
        '0x6b175474e89094c44da98b954eedeac495271d0f'.toLowerCase(),
    },
    {
      symbol: 'USDC',
      contractAddress:
        '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'.toLowerCase(),
    },
    {
      symbol: 'USDT',
      contractAddress:
        '0xdac17f958d2ee523a2206206994597c13d831ec7'.toLowerCase(),
    },
    {
      symbol: 'BUSD',
      contractAddress:
        '0x4fabb145d64652a948d72533023f6e7a623c7c53'.toLowerCase(),
    },
    {
      symbol: 'USDP',
      contractAddress:
        '0x8e870d67f660d95d5be530380d0ec0bd388289e1'.toLowerCase(),
    },
    {
      symbol: 'WETH',
      contractAddress:
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'.toLowerCase(),
      coinMarketCapSymbol: 'ETH',
      coingeckoId: 'ethereum',
    },
  ],
  // Ethereum Goerli
  5: [
    {
      symbol: 'USDC',
      contractAddress:
        '0x2a0cF3E01F4422d1701A690Ab504c0909627486b'.toLowerCase(),
    },
    {
      symbol: 'WETH',
      contractAddress:
        '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'.toLowerCase(),
      coinMarketCapSymbol: 'ETH',
      coingeckoId: 'ethereum',
    },
  ],
  // Binance Mainnet
  56: [
    {
      symbol: 'USDT',
      contractAddress:
        '0x55d398326f99059ff775485246999027b3197955'.toLowerCase(),
    },
    {
      symbol: 'USDC',
      contractAddress:
        '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'.toLowerCase(),
    },
    {
      symbol: 'BUSD',
      contractAddress:
        '0xe9e7cea3dedca5984780bafc599bd69add087d56'.toLowerCase(),
    },
    {
      symbol: 'WETH',
      contractAddress:
        '0x2170ed0880ac9a755fd29b2688956bd959f933f8'.toLowerCase(),
    },
    {
      symbol: 'WBNB',
      contractAddress:
        '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase(),
    },
  ],
  // Polygon
  137: [
    {
      symbol: 'DAI',
      contractAddress:
        '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063'.toLowerCase(),
    },
    {
      symbol: 'USDC',
      contractAddress:
        '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'.toLowerCase(),
    },
    {
      symbol: 'USDT',
      contractAddress:
        '0xc2132d05d31c914a87c6611c10748aeb04b58e8f'.toLowerCase(),
    },
    {
      symbol: 'BUSD',
      contractAddress:
        '0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7'.toLowerCase(),
    },
    {
      symbol: 'WETH',
      contractAddress:
        '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'.toLowerCase(),
      coinMarketCapSymbol: 'ETH',
      coingeckoId: 'ethereum',
    },
  ],
  // Polygon Mumbai
  80001: [
    {
      symbol: 'WETH',
      contractAddress:
        '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa'.toLowerCase(),
      coinMarketCapSymbol: 'ETH',
      coingeckoId: 'ethereum',
    },
  ],
  // Arbitrum One
  42161: [
    {
      symbol: 'USDC',
      contractAddress:
        '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'.toLowerCase(),
    },
    {
      symbol: 'USDT',
      contractAddress:
        '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'.toLowerCase(),
    },
    {
      symbol: 'WETH',
      contractAddress:
        '0x82af49447d8a07e3bd95bd0d56f35241523fbab1'.toLowerCase(),
      coinMarketCapSymbol: 'ETH',
      coingeckoId: 'ethereum',
    },
  ],
  // Arbitrum Nova
  42170: [
    {
      symbol: 'USDC',
      contractAddress:
        '0x750ba8b76187092B0D1E87E28daaf484d1b5273b'.toLowerCase(),
    },
    {
      symbol: 'DAI',
      contractAddress:
        '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1'.toLowerCase(),
    },
  ],
  // Fuse
  122: [
    {
      symbol: 'GoodDollar',
      contractAddress:
        '0x495d133B938596C9984d462F007B676bDc57eCEC'.toLowerCase(),
    },
    {
      symbol: 'USDC',
      contractAddress:
        '0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5'.toLowerCase(),
    },
  ],
  [ChainId.TELOS_MAINNET]: [
    {
      symbol: 'USDC',
      contractAddress:
        '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b'.toLowerCase(),
    },
    {
      symbol: 'USDT',
      contractAddress:
        '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73'.toLowerCase(),
    },
  ],
  [ChainId.METIS_MAINNET]: [
    {
      symbol: 'WETH',
      contractAddress:
        '0x420000000000000000000000000000000000000A'.toLowerCase(),
      coinMarketCapSymbol: 'ETH',
      coingeckoId: 'ethereum',
    },
    {
      symbol: 'USDC',
      contractAddress:
        '0xEA32A96608495e54156Ae48931A7c20f0dcc1a21'.toLowerCase(),
    },
    {
      symbol: 'USDT',
      contractAddress:
        '0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC'.toLowerCase(),
    },
  ],
  [ChainId.METIS_GOERLI]: [
    {
      symbol: 'WETH',
      contractAddress:
        '0x420000000000000000000000000000000000000A'.toLowerCase(),
      coinMarketCapSymbol: 'ETH',
      coingeckoId: 'ethereum',
    },
    {
      symbol: 'USDC',
      contractAddress:
        '0x6F66cc9902f4770C815f6093d07e8DbB66bcCBE7'.toLowerCase(),
    },
    {
      symbol: 'USDT',
      contractAddress:
        '0x176dD192f2f6505aD99204Ff83561baC6D7F6D4b'.toLowerCase(),
    },
  ],
};
