# HOME CLOUD

## SETUP HOME CLOUD

```bash
mkdir cloud # create cloud directory
cd cloud
git clone https://github.com/iswilljr/home-files-and-folder-reader-api server
cd server
npm i # or yarn
npm run tsc && npm run setup
cd ..
git clone https://github.com/iswilljr/cloud home-cloud # clone cloud repository
cd home-cloud
npm i # or yarn
```
## START HOME CLOUD

```bash
cd server
npm start # or yarn start
cd ..
cd home-cloud
npm run dev # or yarn dev
```
