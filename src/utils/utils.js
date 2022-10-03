export const parseImgUrl = (url) => {
  let parsedUrl;
  if (/https/.test(url) || /data:image/.test(url) || /http/.test(url)) {
    parsedUrl = url;
  } else if (/ipfs:/.test(url))
    parsedUrl = `https://ipfs.io/ipfs/${url.split("ipfs://")[1]}`;
  else return "";
  return parsedUrl;
};

export const urlWorks = (url) => {
  const res = fetch(url)
    .then((response) => {
      if (
        /video/.test(response.headers.get("Content-Type")) ||
        response.status !== 200
      ) {
        return false;
      }
      return true;
    })
    .catch(() => false);
  return res;
};

export const isValidUrl = (url) => {
  return !!url;
};

export const extractNftData = (nft) => {
  let parsedUrl = parseImgUrl(nft.rawMetadata.image);
  let finalUrl = "";

  if (parsedUrl.length > 0) finalUrl = parsedUrl;

  return {
    url: finalUrl,
    name: nft.contract.name || nft.rawMetadata.name,
    desc: nft.description,
    error: false,
  };
};
