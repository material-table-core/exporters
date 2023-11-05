# @material-table/exporters

À la carte exporters for `@material-table/core`

# Installation

```
// npm
npm i @material-table/exporters

// yarn
yarn add @material-table/exporters
```

# Supported Formats

- `import { ExportCsv } from "@material-table/exporters";`
- `import { ExportPdf } from "@material-table/exporters";`

# Contributing

### Project Commands

| Command                  | Description                                                                |
| ------------------------ | -------------------------------------------------------------------------- |
| `npm run build:root`     | builds src/index.js                                                        |
| `npm run build:children` | builds everything in `src` while specifically ignoring `src/index.js`      |
| `npm run build`          | runs the following command: `npm run build:root && npm run build:children` |

### Publish NPM Package

- Run `npm version patch -m "Release x.x.x"`
  - This example targets "patch"
  - If the message (`-m "..."`) starts with `Release` we have a GitHub Action that will automatically attempt to publish
