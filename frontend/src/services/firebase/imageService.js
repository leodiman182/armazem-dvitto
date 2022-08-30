import { getStorage, ref, getDownloadURL } from "firebase/storage";

async function getImage (fullPath) {
  const storage = getStorage();
  return getDownloadURL(ref(storage, fullPath))
      .then((url) => {
          return url
      })
      .catch(() => {
          return ''
      });
}

export default getImage;
