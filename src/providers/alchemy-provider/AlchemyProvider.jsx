import { extractNftData, isValidUrl, urlWorks } from "@utils";
import { Alchemy, Network } from "alchemy-sdk";
import { createContext, useState } from "react";

export const AlchemyContext = createContext();
const settings = {
  apiKey: "DyEENpyUqzS1Q-ISpkIccPA6okk1A3ga",
  network: Network.ETH_MAINNET,
};

export const AlchemyProvider = ({ children }) => {
  const [alchemy] = useState(new Alchemy(settings));
  const [nftObjs, setNftObjs] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageKeys, setPageKeys] = useState([""]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const getNftsForOwner = async (
    address,
    pageKey = "",
    isNewSearch = false
  ) => {
    setLoading(true);
    if (isNewSearch) {
      setPageKeys([""]);
      setPageIndex(0);
    }
    setNftObjs([]);
    const response = await alchemy.nft.getNftsForOwner(address, {
      owner: address,
      pageKey: pageKey,
      pageSize: 8,
    });
    setTotalPages(Math.floor(response.totalCount / 8));
    if (pageKeys.indexOf(response.pageKey) === -1) {
      setPageKeys((prev) => [...prev, response.pageKey]);
    }

    const nfts = response.ownedNfts;
    validateNfts(nfts);
  };

  const validateNfts = async (nfts) => {
    for (const nft of nfts) {
      let nftObj = extractNftData(nft);
      if (!isValidUrl(nftObj.url) || !(await urlWorks(nftObj.url))) {
        nftObj.error = true;
      }
      setNftObjs((prev) => [...prev, nftObj]);
    }
    setLoading(false);
  };

  return (
    <AlchemyContext.Provider
      value={{
        alchemy,
        getNftsForOwner,
        loading,
        totalPages,
        pageIndex,
        setPageIndex,
        nftObjs,
        pageKeys,
        setPageKeys,
      }}>
      {children}
    </AlchemyContext.Provider>
  );
};
