# Astro Test Site

Requires:

- NodeJS installed
- A running copy of the database: https://github.com/FrameworkBenchFullStack-RepPack/database-seed

## Build and run:

Do this when you need to run the server for benchmarking purposes.

Install dependencies:

```sh
npm install-clean
```

Build server:

```sh
npm run build
```

Run server:

```sh
DATABASE_URL=postgresql://USER:PASS@localhost:PORT/benchmark PORT=4321 node ./dist/server/entry.mjs
```

When server is ready, it logs:

```sh
08.42.16 [@astrojs/node] Server listening on http://localhost:4321
```

More details: https://docs.astro.build/en/guides/integrations-guide/node/#standalone

## Run test-server for development:

Do this if you need a quick preview of the website, or are actively working on it.

Install dependencies:

```sh
npm install
```

Add a `.env` file that points to the database:

```
DATABASE_URL=postgresql://benchmark:benchmark@localhost:5432/benchmark
```

Run the development server:

```sh
npm run dev
```
