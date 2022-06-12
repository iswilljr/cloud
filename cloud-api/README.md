# HOME CLOUD API

This is the cloud api for cloud and github-clone projects

## DOCS

- [Installation](#installation)
- [Test](#test)
- [Scripts](#scripts)
- [HTTP requests](#http-requests)
- [HTTP responses](#http-responses)
- [License](#license)

## Installation

### Clone the repository

```bash
git clone https://github.com/iswilljr/cloud-api.git
```

### Install dependencies

With npm:

```bash
npm install
```

With yarn:

```bash
yarn
```

### Setup environment variables

With npm:

```bash
npm run setup
```

With yarn:

```bash
yarn setup
```

---

## Test

To pass the test, you need to make sure that the following directories and files are in the $HOME_CLOUD_STORAGE directory:

- `__cloud_api_test__`: the directory that contains the test files
- `__cloud_api_test__/test.txt`: the test file that contains the test data
  - content: "ok\n"
- `__cloud_api_test__/test.md`: the test md file
  - content: "# Test\n"

if $HOME_CLOUD_STORAGE is not set, see how to setup the environment variables in the [Setup](#setup-environment-variables) section.

## Scripts

- `yarn start`: Start the server
- `yarn start:build`: Build the server and start it
- `yarn setup`: Setup the environment variables
- `yarn dev`: Start the server in development mode
- `yarn dev:setup`: Setup the environment variables in development mode
- `yarn tsc`: TypeScript check
- `yarn build`: Build the server
- `yarn build:tsc`: TypeScript check and build the server
- `yarn lint`: Lint the code
- `yarn lint:fix`: Lint the code and fix the issues
- `yarn prettier`: Format the code
- `yarn test`: Run the tests
- `yarn test:build`: Build the server and run the tests

---

## HTTP requests

- `GET /`: Get the home page
- `GET /ls`: Get the list of files in the root directory
- `GET /ls/:path`: Get the list of files in the specified directory
- `GET /blob/:path`: Get the content of the specified file
- `GET /download/:path`: Download the specified file

---

## HTTP responses

- `GET 200 /ls`: Returns an object with the following properties:

```typescript
type Item = {
	id: number; // Directory id
	path: string; // Directory path
	name: string; // Directory name
	isDirectory: boolean; // Whether is a directory or not
	isFile: boolean; // Whether is a file or not
	size: string; // Directory size
	modified: number; // Directory modified date
	created: number; // Directory created date
};

type Response = {
	success: boolean; // Whether the request was successful
	path: string; // Directory path
	info: Item & {
		// Directory info
		readme: {
			// Information about the readme file
			has: boolean; // Whether Directory has a README.md file
			name?: string; // Name of the README.md file
			content?: string; // Content of the README.md file
		};
	};
	content: {
		// Directory content
		type: "directory"; // Content type
		data: {
			// Content data
			files: Item[]; // Files in the directory
			directories: Item[]; // Directories in the directory
		};
	};
};
```

- `GET 200 /blob/:path`: Returns an object with the following properties:

```typescript
type Response = {
	success: boolean; // Whether the request was successful
	path: string; // File path
	info: Item; // File info
	content: {
		// File content
		type: "file" | "media" | "markdown"; // Content type
		data: string; // Content data
	};
};
```

- `GET 400|404 /ls | /blob`: Returns an object with the following properties:

```typescript
type Response = {
	success: boolean; // Whether the request was successful
	message: string; // Error message
};
```

---

Thanks for reading!
