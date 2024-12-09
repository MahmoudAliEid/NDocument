import {
  initializeApp,
  App,
  getApps,
  getApp,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceKey = {
  type: "service_account",
  project_id: "ndocument-beta",
  private_key_id: "2d26408436cc333308a7b37d377fb383c36a92e1",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDL10V01hTjcJMA\nKNbwYJ41wtZrpzhPFTyrYWDObqKG+5ZuFp9luOb8qZt4j5MHPe73LyS9SWwI7ruc\nE7jExM5zVfKfLfg5S2T9gHYQbRMRSpcj272ehmCpxWVrhgPHqIzlXh2RyIsEu/RX\nhyMYtBHu2XzO8CkqlDp/xoA8weUpn+KnP4If/t4xAa55lurkzLOP8ftRpIoV4IrZ\nufYj87SUOtx0V7MbI35yiYSr96aWcvs7m50QtwGCSSAMa/+yPWb0XfkKRusX1GIE\nN84XXQ+RN8GuCcDlttXHj1xVTkQiq5YB/GC4ouKnT8KDQkltO/rp2DasGqNWYDnF\nmUzBlxw/AgMBAAECggEAGmLp60dhGdXzOXSP6jrfj/8CKZpSWC5cFaU71k0M/eMo\nZGTKSm0mfXNpHDCdrDTQr6+rFlOgSAG7SGdnJhWB0f1AtGlLdgMz9frAjbzI2Jaq\nvOoPgCtN7PwP9ly5NYm0f2Zw9nOax0ibRw9HtEVvAtelZ9Y/xfK9JdgotnS0+O+t\nltZPGLcNb1UFySPyfcIgu9ZudMYBV/dDKiAuswpIKsA88Nb2Ukq0HxGoePCnJd08\nPfor3PL8NYQM054RdxlzWhdbgf6TwCvbP1EMG8iQ2+hBbvAtz/6A2m94uEfN3iY/\nFBwFcefkgBh8xPjBXD99L2u0kj6jnSQs1DCrmhgJsQKBgQD5GbiCfsH3m44lkO/O\nE9K21StJx+l43/4p8W4//VKaTGo25AFW5Wkpc36oacl9tkZt3MkprANE/TaVAzFj\nVNRlKa7ukouyEHp3Ur0BYSKUBoGx/lJiNf/kJDUTb+V3SV+pCLHTVF+2EtsxmOMP\n8kd6XHEzkYeFTS5fniMd95rA7wKBgQDRfKG4uuX1X6X8Y2cTG8PCwxmMbh7i+zvN\nRgr1aJw1NjmjnXeIuiupVKD8YM4ueQzhCutxBVmMy8w1A3+mySRP8meJC90mBnkP\no4tiPXkYDThKpRdDKRLpGZ5bjXHosBKJ6Nt091ih3DMeL86E/waf/6r/2KX7UyXf\ng7XcYoW5sQKBgQCdsTqs4bHJHiCOh4JH4ySxuaD9xCB49NPhmYVB3Qw9wcI7nXt7\nlx9LrmGwG8gCXTGYuvxd9Rbcxa+YBb1uNHWA1TJ4tSzaPLRKdYZRKTzKmJPiKi3d\nHnIv6vvuoheRvFFioK5yKietC6LXcwHLRoUZYQwIqUgxivqgbWutvOGq4QKBgAmh\nhjnc9deLFzF8TG/Xde+NUq5fHbJnxH8SekyAC7ZykMHR6n3xuTImvuP7e18tl4b9\nHofqrAxKDlBdoc/ELZQzW8k0L22hHI24gh75HokZin38Cw6+Y60tzVb+ML924NNQ\nTk6ZVIzUd9Eqd38rzl0qvuzWRANC9lnJT2IbcXRxAoGBALBuhXAGdWvqdb1cwpYD\n38f1a2epQ5Mw58iPTXc6il2XcEWf/RHtQaiyq7H3B5JeedbDOQHz7tabxPhNglIw\nsrPkRnlfT54boy9A3Cdk+vFazJ4/SHm8HFuYe7VI+SBH9NdqHKyyW5PCBlq+eidw\nAU54yv+xhHj90G5dLIokCgze\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-va33f@ndocument-beta.iam.gserviceaccount.com",
  client_id: "112290623765670291595",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-va33f%40ndocument-beta.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

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
