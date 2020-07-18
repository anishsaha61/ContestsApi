const fs = require("fs");
const path = require("path");

module.exports.convertToJSON = (jsonCollection) => {
  // console.log("Creating JSON file...");
  const JSON_Object = {
    Last_Updated: new Date().toUTCString(),
    ...jsonCollection,
  };
  fs.writeFileSync(
    path.join(__dirname, "/contests.json"),
    JSON.stringify(JSON_Object, undefined, 2)
  );
  console.log(`Scraped Successfully! ✔ at ${new Date().toUTCString()}`);
};
