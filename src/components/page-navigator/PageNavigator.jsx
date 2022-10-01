import { AlchemyContext } from "@providers";
import { useContext } from "react";

export const PageNavigator = ({ address }) => {
  const { getNftsForOwner, pageKey } = useContext(AlchemyContext);

  const handlePrevClick = () => {};

  const handleNextClick = () => {
    getNftsForOwner(address, pageKey);
  };

  return (
    <div>
      <button onClick={handlePrevClick}>Prev</button>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};
