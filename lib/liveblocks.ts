import { Liveblocks } from "@liveblocks/node";
// Initialize Liveblocks with the private key from environment variables
const key = process.env.LIVEBLOCKS_PRIVATE_KEY;
if (!key) {
  throw new Error("LIVEBLOCKS_PRIVATE_KEY is not defined");
}

const liveblocks = new Liveblocks({
  secret: key,
});
export default liveblocks;
