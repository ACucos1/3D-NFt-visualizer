import { View3D } from "@components";

export const NftCard = ({
  url = "",
  name = "",
  description = "",
  error = false,
  loading = false,
}) => {
  return (
    <div className='nftCard'>
      <h2 className='name'>{name}</h2>
      <div className='error-wrapper'>
        {error && !loading && <p className='error'>Error loading image</p>}
      </div>
      {!loading && <View3D nftImg={error === false ? url : ""} />}
      <div className='description'>
        <p>{description}</p>
      </div>
    </div>
  );
};
