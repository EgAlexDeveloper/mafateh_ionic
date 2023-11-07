import { getDatabase } from "firebase/database";
import { FirebaseApp } from ".";

const DB = getDatabase(FirebaseApp);
export default DB;