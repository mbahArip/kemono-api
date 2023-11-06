const path = require("path");
const fs = require("fs");

const timeStart = Date.now();
async function main() {
  console.log("Fetching data...");
  const endpointKemono = `https://kemono.su/api/v1/creators`;
  const endpointCoomer = `https://coomer.su/api/v1/creators`;

  const creatorsKemono = await fetch(endpointKemono)
    .then((res) => res.text())
    .then((data) => JSON.parse(data));
  const creatorsCoomer = await fetch(endpointCoomer)
    .then((res) => res.text())
    .then((data) => JSON.parse(data));

  console.log("Fetch time: ", Date.now() - timeStart, "ms");

  return {
    kemono: creatorsKemono,
    coomer: creatorsCoomer,
  };
}

main()
  .then((data) => {
    console.log("Writing data to file...");

    const staticKemono = path.join(__dirname, "../static", `kemono.json`);
    const staticCoomer = path.join(__dirname, "../static", `coomer.json`);

    fs.writeFileSync(staticKemono, JSON.stringify(data.kemono, null, 2));
    fs.writeFileSync(staticCoomer, JSON.stringify(data.coomer, null, 2));

    console.log("Total time: ", Date.now() - timeStart, "ms");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
