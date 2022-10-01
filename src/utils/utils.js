export const parseImgUrl = (url) => {
  let parsedUrl;
  if (/https/.test(url) || /data:image/.test(url)) {
    parsedUrl = url;
  } else if (/ipfs/.test(url))
    parsedUrl = `https://ipfs.io/ipfs/${url.split("ipfs://")[1]}`;
  else return "";
  return parsedUrl;
};

export const urlWorks = (url) => {
  const res = fetch(url)
    .then((response) => {
      if (/video/.test(response.headers.get("Content-Type"))) {
        return false;
      }
      return true;
    })
    .catch(() => false);
  return res;
};

export const isValidUrl = (url) => {
  return url.length > 0;
};

export const getNftImageUrl = (nft) => {
  if (!nft.rawMetadata.image) return "";

  let parsedUrl = parseImgUrl(nft.rawMetadata.image);
  let finalUrl = "";

  if (parsedUrl.length > 0) finalUrl = parsedUrl;

  return finalUrl;
};
