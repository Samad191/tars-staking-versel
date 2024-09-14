import { clusterApiUrl } from "@solana/web3.js";

// export const SERVER_URL = 'http://localhost:4000';
export const SERVER_URL = "https://backend.tars.gg";

// export const SOLANA_RPC = "http://127.0.0.1:8899";
// solana config 3 places
export const SOLANA_RPC = 'https://mainnet.helius-rpc.com/?api-key=571874a6-e07b-4be4-8296-e7329c31cc66'
// export const SOLANA_RPC = clusterApiUrl("devnet")
// export const SOLANA_RPC = 'https://rpc.ankr.com/solana'

export const shortenSolanaAddress = (
  address: string,
  startLength = 4,
  endLength = 4
) => {
  if (!address) return "";

  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);
  return `${start}...${end}`;
};
