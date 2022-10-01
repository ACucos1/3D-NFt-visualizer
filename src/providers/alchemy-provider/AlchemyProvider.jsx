import React, { createContext, useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import { urlWorks, isValidUrl, extractNftData } from "@utils";

export const AlchemyContext = createContext();
const settings = {
  apiKey: "DyEENpyUqzS1Q-ISpkIccPA6okk1A3ga",
  network: Network.ETH_MAINNET,
};

export const AlchemyProvider = ({ children }) => {
  const [alchemy] = useState(new Alchemy(settings));
  const [nftObjs, setNftObjs] = useState([]);
  const [pageKey, setPageKey] = useState("");

  const getNftsForOwner = async (address, pageKey = "") => {
    setNftObjs([]);
    const response = await alchemy.nft.getNftsForOwner(address, {
      owner: address,
      pageKey: pageKey,
      pageSize: 8,
    });
    console.log("Number of NFTs found: ", response.totalCount);
    console.log(response);
    setPageKey(response?.pageKey ?? "");

    const nfts = response.ownedNfts;
    validateNfts(nfts);
  };

  const validateNfts = async (nfts) => {
    for (const nft of nfts) {
      let nftObj = extractNftData(nft);
      if (isValidUrl(nftObj.url)) {
        const result = await urlWorks(nftObj.url);
        if (result == true) {
          setNftObjs((prev) => [...prev, nftObj]);
        }
      }
    }
  };

  return (
    <AlchemyContext.Provider
      value={{ alchemy, getNftsForOwner, pageKey, nftObjs }}>
      {children}
    </AlchemyContext.Provider>
  );
};
