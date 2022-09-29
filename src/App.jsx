import { useContext, useEffect, useState, useRef } from "react";
import { View3D, WalletInput } from "@components";
import { AlchemyContext } from "@providers";
import "./App.css";

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
    img.onload = () => {
      console.warn("Url passed: ", url);
      resolve(true);
    };
    img.onerror = () => {
      console.warn("url failed: ", url);
      resolve(false);
    };
  });
};

const getNftImageUrl = (nft) => {
  if (!nft.rawMetadata.image) return "";

  let parsedUrl = parseImgUrl(nft.rawMetadata.image);
  let finalUrl = "";

  if (parsedUrl.length > 0) finalUrl = parsedUrl;

  return finalUrl;
};

// let url = getNftImageUrl(nft);
//       if (url.length > 0) {
//         urlWorks(url).then((result) => {
//           if (result == true) {
//             setNftUrls((prev) => [...prev, url]);
//             console.log("added: ", url);
//           }
//         });
//       }

function App() {
  const { nfts } = useContext(AlchemyContext);
  const [nftUrls, setNftUrls] = useState([]);
  const urlsValidated = useRef(false);

  useEffect(() => {
    const validateNfts = async () => {
      for (const nft of nfts) {
        let url = getNftImageUrl(nft);
        if (url.length > 0) {
          const result = await urlWorks(url);
          if (result == true) {
            setNftUrls((prev) => [...prev, url]);
            console.log("added: ", url);
          }
        }
      }
    };
    validateNfts();

    // urlsValidated.current = true;
  }, [nfts, urlsValidated, setNftUrls]);

  return (
    <div className='App'>
      <div className='container'>
        <WalletInput />
        <div className='view-container'>
          <View3D />
        </div>
        {nfts &&
          nftUrls.map((url, idx) => (
            <div key={idx} className='view-container'>
              <View3D nftImg={url} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
