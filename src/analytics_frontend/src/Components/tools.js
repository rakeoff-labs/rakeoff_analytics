export function e8sToIcp(x) {
  if (!x) return 0;
  return x / Math.pow(10, 8);
}

export const getRakeoffStats = async () => {
  try {
    const response = await fetch(
      "https://jgvzt-eiaaa-aaaak-ae5kq-cai.raw.icp0.io/v1/rakeoff-stats"
    );
    if (!response.ok) {
      // If the response is not ok (e.g., 404, 500), return an empty object
      return {};
    }
    const data = await response.json();
    return data.icp_stats || {}; // Return icp_stats, or an empty object if icp_stats is undefined
  } catch (error) {
    // In case of a network error or json parsing error, return an empty object
    console.error("Error fetching rakeoff stats:", error);
    return {};
  }
};

export const icpToDollars = async (e8sIcp) => {
  const CoinApi = "https://api.coinbase.com/v2/prices/ICP-USD/buy";

  try {
    let resp = await fetch(CoinApi).then((x) => x.json());
    let price = resp["internet-computer"].usd;

    let formatCurrency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0, // No decimals
      maximumFractionDigits: 0, // No decimals
    });

    return formatCurrency.format(price * e8sToIcp(e8sIcp));
  } catch (e) {
    return "$0.00";
  }
};

// export const icpToDollars = async () => {
//     const CoinApi = "https://api.coinbase.com/v2/prices/ICP-USD/buy";

//     try {
//       let { data : { amount }} = await fetch(CoinApi).then((x) => x.json());
//       return Number(amount)
//     } catch (e) {
//       return "$0.00";
//     }
//   };
