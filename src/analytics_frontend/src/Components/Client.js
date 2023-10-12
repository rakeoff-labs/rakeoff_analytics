import { HttpAgent } from "@dfinity/agent";
import { LedgerCanister } from "@dfinity/nns";

import { AuthClient } from "@dfinity/auth-client";

export const startLedgerClient = async () => {
  const authClient = await AuthClient.create();
  const identity = await authClient.getIdentity();

  return LedgerCanister.create({
    agent: new HttpAgent({
      identity,
      host: "https://icp-api.io",
    }),
  });
};
