export const getMarketData = async () => {
  const amountOfEntries = 96; // 24 hours * 4 (15 minutes intervals)

  const urls = [
    "https://api.pro.coinbase.com/products/ICP-USD/candles?granularity=900",
  ];

  try {
    const fetchPromises = urls.map((url) => fetch(url).then((x) => x.json()));
    const [icpData] = await Promise.all(fetchPromises);

    if (icpData.length < amountOfEntries || btcData.length < amountOfEntries) {
      console.error("Not enough data points returned from the API.");
      return;
    }

    const slicedIcpData = icpData.slice(0, amountOfEntries);

    const icp24hrPercentChange =
      ((slicedIcpData[0][4] - slicedIcpData[95][4]) / slicedIcpData[95][4]) *
      100;

    const formatPercentChange = (change) => {
      const fixedChange = change.toFixed(2);
      return change > 0 ? `+${fixedChange}%` : `${fixedChange}%`;
    };

    return {
      icpUsdPrice: slicedIcpData[0][4].toFixed(2).toLocaleString(),
      icp24hrPercentChange: formatPercentChange(icp24hrPercentChange),
      icpMiniChartData: slicedIcpData.map((entry) => ({
        time: entry[0],
        price: parseFloat(entry[4]),
      })),
    };
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
