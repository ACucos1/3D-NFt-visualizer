import { AlchemyContext } from "@providers";
import { useContext, useEffect } from "react";

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

  useEffect(() => {
    console.log(pageKeys, pageIndex);
  }, [pageKeys, pageIndex]);

  return (
    <div className='page-navigator'>
      {totalPages > 1 && (
        <>
          <div>
            <button onClick={handlePrevClick}>Prev</button>
            <button
              onClick={handleNextClick}
              disabled={pageIndex === totalPages}>
              Next
            </button>
          </div>
          <span className='progress'>
            {pageIndex}/{totalPages}
          </span>
        </>
      )}
    </div>
  );
};
