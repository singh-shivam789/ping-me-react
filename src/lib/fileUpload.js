import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebase"
const isFileUploaded = async function (file) {
  const fileName = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `images/${fileName}`);
  try {
    // Perform the upload without progress tracking
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef); // Get download URL after upload
    return downloadURL;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;  // Ensure error is propagated
  }
}

export default isFileUploaded;