import React, { createContext, useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";

export const AlchemyContext = createContext();
const settings = {
  apiKey: "DyEENpyUqzS1Q-ISpkIccPA6okk1A3ga",
  network: Network.ETH_MAINNET,
};

export const AlchemyProvider = ({ children }) => {
  const [alchemy] = useState(new Alchemy(settings));
  const [nfts, setNfts] = useState([]);

  const getNftsForOwner = async (address) => {
    const nftsForOwner = await alchemy.nft.getNftsForOwner(address);
    console.log("Number of NFTs found: ", nftsForOwner.totalCount);
    console.log(nftsForOwner);
    setNfts(nftsForOwner.ownedNfts);
  };

  return (
    <AlchemyContext.Provider value={{ alchemy, getNftsForOwner, nfts }}>
      {children}
    </AlchemyContext.Provider>
  );
};
