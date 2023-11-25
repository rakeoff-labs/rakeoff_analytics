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
    // Fetch the USD conversion rate for ICP
    let {
      data: { amount },
    } = await fetch(CoinApi).then((x) => x.json());

    // Create a formatter for USD currency
    let formatCurrency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0, // No decimals
      maximumFractionDigits: 0, // No decimals
    });

    // Convert e8sIcp to the standard ICP unit
    const icpAmount = e8sIcp / Math.pow(10, 8);

    // Convert ICP to USD and then format as currency
    const convertedAmount = icpAmount * Number(amount);
    return formatCurrency.format(convertedAmount);
  } catch (e) {
    return "$0.00";
  }
};
export const GrabIcpPrice = async () => {
  try {
    const response = await fetch(
      "https://api.pro.coinbase.com/products/ICP-USD/candles?granularity=900"
    );
    if (!response.ok) {
      throw new Error("API not working");
    }
    const data = await response.json();
    const price = data[0][4]; // Assuming this is the correct path to the price
    return price; // Return the price
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null; // Return null or some default value in case of an error
  }
};
