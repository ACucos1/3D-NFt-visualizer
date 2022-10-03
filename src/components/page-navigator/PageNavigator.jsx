import { AlchemyContext } from "@providers";
import { useContext } from "react";

export const PageNavigator = ({ address }) => {
  const { getNftsForOwner, pageIndex, setPageIndex, pageKeys, totalPages } =
    useContext(AlchemyContext);

  const handlePrevClick = () => {
    // console.log(pageKeys);
    getNftsForOwner(address, pageKeys[pageIndex - 1]);
    setPageIndex((prev) => prev - 1);
  };

  const handleNextClick = () => {
    getNftsForOwner(address, pageKeys[pageIndex + 1]);
    setPageIndex((prev) => prev + 1);
  };

  return (
    <div className='page-navigator'>
      {totalPages > 1 && (
        <>
          <div>
            <button onClick={handlePrevClick} disabled={pageIndex == 0}>
              Prev
            </button>
            <button
              onClick={handleNextClick}
              disabled={pageIndex === totalPages}>
              Next
            </button>
          </div>
          <span className='progress'>
            {pageIndex + 1}/{totalPages + 1}
          </span>
        </>
      )}
    </div>
  );
};
