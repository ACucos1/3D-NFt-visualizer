import React, { createContext, useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import { parseImgUrl, urlWorks, isValidUrl, getNftImageUrl } from "@utils";

export const AlchemyContext = createContext();
const settings = {
  apiKey: "DyEENpyUqzS1Q-ISpkIccPA6okk1A3ga",
  network: Network.ETH_MAINNET,
};

export const AlchemyProvider = ({ children }) => {
  const [alchemy] = useState(new Alchemy(settings));
  const [nftUrls, setNftUrls] = useState([]);
  const [pageKey, setPageKey] = useState("");

  const getNftsForOwner = async (address, pageKey = "") => {
    setNftUrls([]);
    const response = await alchemy.nft.getNftsForOwner(address, {
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
      let url = getNftImageUrl(nft);
      if (isValidUrl(url)) {
        const result = await urlWorks(url);
        if (result == true) {
          setNftUrls((prev) => [...prev, url]);
        }
      }
    }
  };

  return (
    <AlchemyContext.Provider
      value={{ alchemy, getNftsForOwner, pageKey, nftUrls }}>
      {children}
    </AlchemyContext.Provider>
  );
};
