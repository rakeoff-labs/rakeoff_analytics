import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as analytics_backendIDL } from "../../../declarations/analytics_backend/index";

export const startAnalyticsClient = async () => {
  const canisterId = process.env.REACT_APP_RAKEOFF_ANALYTICS_CANISTER_ID;

  console.log("my canisterID", canisterId);

  return Actor.createActor(analytics_backendIDL, {
    agent: new HttpAgent({
      host: "https://icp-api.io",
    }),
    canisterId: canisterId,
  });
};
