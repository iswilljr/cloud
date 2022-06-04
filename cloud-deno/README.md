# HOME CLOUD

## INIT

```bash
mkdir cloud # create cloud directory
cd cloud
git clone https://github.com/iswilljr/home-files-and-folder-reader-api server
cd server
npm i # or yarn
npm run tsc && npm run setup && npm start
cd ..
git clone https://github.com/iswilljr/cloud home-cloud # clone cloud repository
cd home-cloud
npm i # or yarn
npm run dev # or yarn dev
```
