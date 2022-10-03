import {
  LoadingSkeleton,
  LoadingSpinner,
  NftCard,
  WalletInput,
} from "@components";
import { AlchemyContext } from "@providers";
import { useContext } from "react";
import "./App.css";

function App() {
  const { nftObjs, loading } = useContext(AlchemyContext);

  return (
    <div className='App'>
      <h1>3D NFT Visualizer</h1>
      <h3>
        By{" "}
        <a href='https://github.com/ACucos1' target='_blank'>
          Alex Cucos
        </a>
      </h3>

      <WalletInput />
      {loading && <LoadingSpinner />}

      <div className='container'>
        {nftObjs.length > 0 ? (
          nftObjs.map((nftObj, idx) => (
            <NftCard
              key={idx}
              url={nftObj.url}
              name={nftObj.name}
              description={nftObj.desc}
              error={nftObj.error}
            />
          ))
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </div>
  );
}

export default App;
