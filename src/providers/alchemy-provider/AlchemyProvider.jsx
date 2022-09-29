import React, { createContext, useState } from "react";
import { Network, Alchemy } from "alchemy-sdk";

export const AlchemyContext = createContext();
const settings = {
  apiKey: "DyEENpyUqzS1Q-ISpkIccPA6okk1A3ga",
  network: Network.ETH_MAINNET,
};

const parseImgUrl = (url) => {
  let parsedUrl;
  console.log(url);
  if (/https/.test(url) || /data:image/.test(url)) {
    parsedUrl = url;
  } else if (/ipfs/.test(url))
    parsedUrl = `https://ipfs.io/ipfs/${url.split("ipfs://")[1]}`;
  else return "";
  return parsedUrl;
};

const urlWorks = (url) => {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

export const AlchemyProvider = ({ children }) => {
  const [alchemy] = useState(new Alchemy(settings));
  const [nfts, setNfts] = useState([]);

  const getNftsForOwner = async (address) => {
    const nftsForOwner = await alchemy.nft.getNftsForOwner(address);
    console.log("Number of NFTs found: ", nftsForOwner.totalCount);
    console.log(nftsForOwner);
    let validatedUrls = [];
    nftsForOwner.ownedNfts.forEach((nft) => {
      let parsedUrl = parseImgUrl(nft?.rawMetadata?.image ?? "");
      if (parsedUrl.length > 0) {
        urlWorks(parsedUrl).then((result) => {
          if (result) validatedUrls.push(parsedUrl);
          setNfts(validatedUrls);
        });
      }
    });
  };

  return (
    <AlchemyContext.Provider value={{ alchemy, getNftsForOwner, nfts }}>
      {children}
    </AlchemyContext.Provider>
  );
};
