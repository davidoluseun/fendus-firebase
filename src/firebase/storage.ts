import "firebase/storage";
import app from "./app";

const storage = app.storage();
storage.setMaxUploadRetryTime(120000);

export { storage };
