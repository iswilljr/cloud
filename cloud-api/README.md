# CLOUD - API

This is the cloud api for the fullstack cloud project

## DOCS

See the [docs](https://iswilljr.github.io/cloud/docs/cloud-api/installation) for more information.

## Get Started

start the server with the following command:

```bash
yarn setup # or npm run
yarn start # or npm
```

## Scripts

- `start`: Start the server
- `start:build`: Build the server and start it
- `setup`: Setup the environment variables
- `dev`: Start the server in development mode
- `dev:setup`: Setup the environment variables in development mode
- `typecheck`: TypeScript check
- `build`: Build the server
- `build:tsc`: TypeScript check and build the server

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
  info: Item; // Directory info
  readme: {
    // Information about the readme file
    has: boolean; // Whether Directory has a README.md file
    name?: string; // Name of the README.md file
    content?: string; // Content of the README.md file
  };
  content: {
    // Content data
    files: Item[]; // Files in the directory
    directories: Item[]; // Directories in the directory
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
