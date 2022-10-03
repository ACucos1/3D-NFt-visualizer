import { useContext, useState, useRef } from "react";
import { AlchemyContext } from "@providers";
import { PageNavigator } from "@components";

export function WalletInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const { getNftsForOwner } = useContext(AlchemyContext);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    getNftsForOwner(searchTerm.toLowerCase(), "", true);
  };

  return (
    <div className='search'>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          placeholder='Input Wallet Address'
          onChange={handleChange}
          value={searchTerm}
        />
        <button onClick={handleClick}>Search</button>
      </form>

      <PageNavigator address={searchTerm.toLowerCase()} />
    </div>
  );
}
