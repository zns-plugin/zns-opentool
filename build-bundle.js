const { exec } = require("child_process");

const version = require("./package.json").version;
const assetManifest = require("./build/asset-manifest.json");

const filesJs = assetManifest.entrypoints
  .filter((path) => path.endsWith("js"))
  .map((path) => `build/${path}`)
  .join(" ");

const filesCss = assetManifest.entrypoints
  .filter((path) => path.endsWith("css"))
  .map((path) => `build/${path}`)
  .join(" ");

const suffix = filesJs.includes("dev") ? "dev/" : "";

// Just shorthand for joining with a newline between the files
exec(`awk 1 ${filesJs} > ./build/static/${suffix}js/${version}/main.bundle.js`);
exec(
  `awk 1 ${filesCss} > ./build/static/${suffix}css/${version}/main.bundle.css`
);

console.log(
  "\x1b[36m",
  `Building and joining process is completed, version \x1b[35m${suffix}\x1b[1m${version}`,
  "\x1b[0m"
);
