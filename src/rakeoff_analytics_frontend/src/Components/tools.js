export function e8sToIcp(x) {
  if (!x) return 0;
  return x / Math.pow(10, 8);
}

export const getRakeoffStats = async () => {
  try {
    const response = await fetch(
      "https://jgvzt-eiaaa-aaaak-ae5kq-cai.icp0.io/v1/rakeoff-stats"
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

// take in the dollar value for the calculation
export const icpToDollars = (icpPrice, e8sIcp) => {
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
  const convertedAmount = icpAmount * Number(icpPrice);
  return formatCurrency.format(convertedAmount);
};

// returns ICP price as a workable number
export const GrabIcpPrice = async () => {
  const CoinApi = "https://api.coinbase.com/v2/prices/ICP-USD/buy";

  try {
    // Fetch the USD conversion rate for ICP
    let {
      data: { amount },
    } = await fetch(CoinApi).then((x) => x.json());

    return Number(amount);
  } catch (e) {
    return 0;
  }
};

export const getRakeoffCommitHistory = async () => {
  const query = `
    query ($orgName: String!, $repoName: String!) {
      repository(owner: $orgName, name: $repoName) {
        defaultBranchRef {
          target {
            ... on Commit {
              history {
                totalCount
                edges {
                  node {
                    committedDate
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const token = process.env.REACT_APP_GITHUB_TOKEN;

  const variables = {
    orgName: "rakeoff-labs",
    repoName: "rakeoff",
  };

  const body = {
    query,
    variables,
  };

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      // If the response status code is not in the 200-299 range,
      // throw an error.
      throw new Error();
    }

    const gitHub = await res.json();
    const history = gitHub.data.repository.defaultBranchRef.target.history;
    return history;
  } catch (e) {
    console.error("Could not fetch github data");
    return null;
  }
};

export const getRakeoffTvl = async () => {
  try {
    const res = await fetch("https://api.llama.fi/protocol/rakeoff");

    if (!res.ok) {
      // If the response status code is not in the 200-299 range,
      // throw an error.
      throw new Error();
    }

    return await res.json();
  } catch (e) {
    console.error("Could not fetch defiLLama data");
    return null;
  }
};

export function roundUplatest(number, factor) {
  return Math.ceil(number / factor) * factor;
}

// array for multiple apis for rakeoff and loop through below
export const rAPIs = {
  landing:
    "https://api.github.com/repos/rakeoff-labs/rakeoff_landing/contributors",

  analytics:
    "https://api.github.com/repos/rakeoff-labs/rakeoff_analytics/contributors",

  statistics:
    "https://api.github.com/repos/rakeoff-labs/rakeoff_statistics/contributors",

  achievements:
    "https://api.github.com/repos/rakeoff-labs/rakeoff_achievements/contributors",

  dApp: "https://api.github.com/repos/rakeoff-labs/rakeoff/contributors",

  liquid:
    "https://api.github.com/repos/rakeoff-labs/rakeoff_liquid/contributors",
};

export const apiOBject = Object.entries(rAPIs);

export const getTotalCommits = async () => {
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  // initialise with an obect
  const results = {};
  // added an array to loop through each commit to produce sum
  const totals = [];

  // using the Promise.all so no await
  const getALLpromise = apiOBject.map(([key, API]) => {
    return (
      fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          return response.json();
        })
        /// response returns data now we use reduce to grab the total count of each api
        // first getting the individual contributions sum
        .then((data) => {
          const individualCommits = data.reduce(
            (total, contributor) => total + contributor.contributions,
            0
          );

          // outputed as object
          // now getting the total commit sum
          results[key] = { name: key, commits: individualCommits };
          const total = results[key].commits;
          totals.push(total);
        })
        .catch((e) => {
          console.error("Error:", e.message);
        })
    );
  });

  await Promise.all(getALLpromise);

  const sumOfCommits = totals.reduce((total, iter) => total + iter, 0);
  // console.log("grabbing total", sum);
  // console.log("totallllllss", totals);
  // console.log("Results", results);
  /// returning results which is the objects of the apis with name and individual commits, and the sum of all commits
  return { results, sumOfCommits };
};
