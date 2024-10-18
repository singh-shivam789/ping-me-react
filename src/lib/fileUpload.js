import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebase"
const isFileUploaded = async function (file) {
  const fileName = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `images/${fileName}`);
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
}

export default isFileUploaded;