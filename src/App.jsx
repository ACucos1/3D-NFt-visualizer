import { useContext, useEffect, useState } from "react";
import { View3D, WalletInput } from "@components";
import { AlchemyContext } from "@providers";
import "./App.css";

function App() {
  const { nfts } = useContext(AlchemyContext);

  return (
    <div className='App'>
      <div className='container'>
        <WalletInput />
        <div className='view-container'>
          <View3D />
        </div>
        {nfts &&
          nfts.map((nft, idx) => (
            <div key={idx} className='view-container'>
              <View3D nftImg={nft} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
