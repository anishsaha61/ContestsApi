const cheerio = require("cheerio");

module.exports.collectData = (response, site) => {
  // console.log("Collecting data...");
  const currentContestDataArray = [];
  const futureContestDataArray = [];
  const previousContestsDataArray = [];
  const $ = cheerio.load(response);
  const currentContestCodes = $(
    `#primary-content > div > div:nth-child(16) > table > tbody > tr td:nth-child(1)`
  );
  const currentContestLinks = $(
    `#primary-content > div > div:nth-child(16) > table > tbody > tr td:nth-child(2) > a`
  );
  const currentContestStartDates = $(
    `#primary-content > div > div:nth-child(16) > table > tbody > tr td:nth-child(3)`
  );
  const currentContestEndDates = $(
    `#primary-content > div > div:nth-child(16) > table > tbody > tr td:nth-child(4)`
  );
  for (let i = 0; i < currentContestCodes.length; i++) {
    const code = currentContestCodes[`${i}`].children[0].data;
    const name = currentContestLinks[`${i}`].children[0].data;
    const link = `${site}${currentContestLinks[`${i}`]["attribs"]["href"]}`;
    const startDate = `${currentContestStartDates[
      `${i}`
    ].children[0].data.trim()} ${currentContestStartDates[
      `${i}`
    ].children[2].data.trim()}`;
    const endDate = `${currentContestEndDates[`${i}`].children[0].data} ${
      currentContestEndDates[`${i}`].children[2].data
    }`;
    const obj = {
      code,
      name,
      link,
      startDate,
      endDate,
    };
    currentContestDataArray.push(obj);
  }
  const futureContestCodes = $(
    `#primary-content > div > div:nth-child(19) > table > tbody > tr td:nth-child(1)`
  );
  const futureContestLinks = $(
    `#primary-content > div > div:nth-child(19) > table > tbody > tr td:nth-child(2) > a`
  );
  const futureContestStartDates = $(
    `#primary-content > div > div:nth-child(19) > table > tbody > tr td:nth-child(3)`
  );
  const futureContestEndDates = $(
    `#primary-content > div > div:nth-child(19) > table > tbody > tr td:nth-child(4)`
  );
  for (let i = 0; i < futureContestCodes.length; i++) {
    const code = futureContestCodes[`${i}`].children[0].data;
    const name = futureContestLinks[`${i}`].children[0].data;
    const link = `${site}${futureContestLinks[`${i}`]["attribs"]["href"]}`;
    const startDate = `${futureContestStartDates[
      `${i}`
    ].children[0].data.trim()} ${futureContestStartDates[
      `${i}`
    ].children[2].data.trim()}`;
    const endDate = `${futureContestEndDates[`${i}`].children[0].data} ${
      futureContestEndDates[`${i}`].children[2].data
    }`;
    const obj = {
      code,
      name,
      link,
      startDate,
      endDate,
    };
    futureContestDataArray.push(obj);
  }
  const pastContestCodes = $(
    `#primary-content > div > div:nth-child(22) > table > tbody > tr td:nth-child(1)`
  );
  const pastContestLinks = $(
    `#primary-content > div > div:nth-child(22) > table > tbody > tr td:nth-child(2) > a`
  );
  const pastContestStartDates = $(
    `#primary-content > div > div:nth-child(22) > table > tbody > tr td:nth-child(3)`
  );
  const pastContestEndDates = $(
    `#primary-content > div > div:nth-child(22) > table > tbody > tr td:nth-child(4)`
  );
  for (let i = 0; i < 10; i++) {
    const code = pastContestCodes[`${i}`].children[0].data;
    const name = pastContestLinks[`${i}`].children[0].data;
    const link = `${site}${pastContestLinks[`${i}`]["attribs"]["href"]}`;
    const startDate = `${pastContestStartDates[
      `${i}`
    ].children[0].data.trim()} ${pastContestStartDates[
      `${i}`
    ].children[2].data.trim()}`;
    const endDate = `${pastContestEndDates[`${i}`].children[0].data} ${
      pastContestEndDates[`${i}`].children[2].data
    }`;
    const obj = {
      code,
      name,
      link,
      startDate,
      endDate,
    };
    previousContestsDataArray.push(obj);
  }
  const jsonCollection = {
    Future_Contests: futureContestDataArray,
    Current_Contests: currentContestDataArray,
    Past_Contests: previousContestsDataArray,
  };
  // console.log("Data collected successfully! ✔");
  return jsonCollection;
};
