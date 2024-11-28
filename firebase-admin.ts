import {
  initializeApp,
  App,
  getApps,
  getApp,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import serviceKey from "./service_key.json";

let app: App;
if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey as ServiceAccount),
  });
} else {
  app = getApp();
}
const adminDb = getFirestore(app);
export { app as adminApp, adminDb };
