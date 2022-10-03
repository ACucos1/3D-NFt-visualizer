import { View3D, WalletInput, PageNavigator } from "@components";
import { AlchemyContext } from "@providers";
import { useContext } from "react";
import "./App.css";

const NftCard = ({
  url,
  name = "Placeholder",
  description = "placeholder",
}) => {
  return (
    <div className='nftCard'>
      <h2 className='name'>{name}</h2>
      {!url && <p className='error'>Error loading image</p>}
      <View3D nftImg={url} />
      <div className='description'>
        <p>{description}</p>
      </div>
    </div>
  );
};

function App() {
  const { nftObjs } = useContext(AlchemyContext);

  return (
    <div className='App'>
      <WalletInput />

      <div className='container'>
        {nftObjs.length > 0 &&
          nftObjs.map((nftObj, idx) => (
            <div key={idx} className='view-container'>
              {nftObj.error === false ? (
                <NftCard
                  url={nftObj.url}
                  name={nftObj.name}
                  description={nftObj.desc}
                />
              ) : (
                <NftCard
                  url={""}
                  name={nftObj.name}
                  description={nftObj.desc}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
