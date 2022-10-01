import { useContext, useEffect, useState, useRef } from "react";
import { View3D, WalletInput } from "@components";
import { AlchemyContext } from "@providers";
import "./App.css";

function App() {
  const { nftUrls } = useContext(AlchemyContext);

  return (
    <div className='App'>
      <WalletInput />
      <div className='container'>
        {nftUrls.length > 0 &&
          nftUrls.map((url, idx) => {
            try {
              return (
                <div key={idx} className='view-container'>
                  <View3D nftImg={url} />
                </div>
              );
            } catch (err) {
              console.log("not load");
            }
          })}
      </div>
    </div>
  );
}

export default App;
