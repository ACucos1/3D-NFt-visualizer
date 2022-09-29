import { useContext, useState } from "react";
import { AlchemyContext } from "@providers";

export function WalletInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const { getNftsForOwner } = useContext(AlchemyContext);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = async () => {
    try {
      getNftsForOwner(searchTerm);
    } catch (err) {}
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
    </div>
  );
}
