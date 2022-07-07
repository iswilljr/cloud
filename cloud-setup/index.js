const path = require("path");
const shelljs = require("shelljs");

const repo = process.argv[2];

if (!repo | !["api", "deno", "github"].includes(repo)) {
  console.log(repo);
  process.exit(1);
}

const repoPath = path.join(process.cwd(), `cloud-${repo}`);
const script = `
mkdir ${repoPath}
cd ${repoPath}
curl https://codeload.github.com/iswilljr/cloud/tar.gz/master | \
tar -xz --strip=2 cloud-master/cloud-${repo}
`;

shelljs.exec(script);
