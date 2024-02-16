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

const getCommitContribution = async (link) => {
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  const res = await fetch(link[1], {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error(`Could not fetch ${link} data`);

    throw new Error();
  }

  let result = {};
  result[link[0]] = await res.json();

  return result;
};

export const getTotalCommits = async () => {
  const rAPIs = {
    home: "https://api.github.com/repos/rakeoff-labs/rakeoff_landing/contributors",

    analytics:
      "https://api.github.com/repos/rakeoff-labs/rakeoff_analytics/contributors",

    stats:
      "https://api.github.com/repos/rakeoff-labs/rakeoff_statistics/contributors",

    achievements:
      "https://api.github.com/repos/rakeoff-labs/rakeoff_achievements/contributors",

    dApp: "https://api.github.com/repos/rakeoff-labs/rakeoff/contributors",

    rICP: "https://api.github.com/repos/rakeoff-labs/rakeoff_liquid/contributors",
  };

  const apiPromises = Object.entries(rAPIs).map((objectItem) => {
    return getCommitContribution(objectItem);
  });

  const results = await Promise.allSettled(apiPromises);

  // mapping through results which is an array of objects
  const fulfilledResults = results.map((response) => {
    /// if results response status = fulfilled return their values, else null
    if (response.status === "fulfilled") {
      //objectValues returns the values of each api, some contain two arrays as there are two devs for some repos
      const objectValues = Object.values(response.value);
      // some individual repo commitsc ontain two arrays and we need to add to get the total sum for each repo commit
      const getRepoCommits = objectValues.reduce((total, iter) => {
        // mapping through the names to get the dev count
        const devContributions = iter.map((dev) => dev.contributions);
        // getting total developer contributions, we are now inside the contributions, so no need to do iter.contributions
        const getTallyOfContributions = devContributions.reduce(
          (total, iter) => total + iter,
          0
        );
        // returns total contribution
        return total + getTallyOfContributions;
      }, 0);

      let result = {
        name: Object.keys(response.value)[0],
        commits: getRepoCommits,
      };
      return result;
    } else {
      return null;
    }
  });

  return fulfilledResults;
};
