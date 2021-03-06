# hthreejs

Rendering [h3-js](https://github.com/uber/h3-js) using [three.js](https://github.com/mrdoob/three.js).

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/60d1311220694a2ea64874bd4631e1f5)](https://www.codacy.com/gh/nelson-mig-l/hthreejs/dashboard?utm_source=github.com&utm_medium=referral&utm_content=nelson-mig-l/hthreejs&utm_campaign=Badge_Grade)
[![CI](https://github.com/nelson-mig-l/hthreejs/actions/workflows/build.yml/badge.svg)](https://github.com/nelson-mig-l/hthreejs/actions/workflows/build.yml)

[**Live demo**](https://nelson-mig-l.github.io/hthreejs/)

## Setup

Run the following commands from within the repository's root folder to setup the application:

1. `npm install`

## Running

Run the following commands from within the repository's root folder to run the project using `webpack-dev-server`:

1. `npm start`

## Build

Run the following commands from within the repository's root folder to build the project using `webpack`:

1. `npm run build`

## Structure

- `src/` _source code folder_

  - `index.ts` _application entry point_

  - `...`

- `public` _folder containing static assets_

  - `index.html` _HTML entry point_

- `dist` _folder containing output of build process_

## Chunks

See comments in `webpack.config.common.js`

```
MAIN 1.23 MB (1,300,090 bytes)
---- 1.23 MB (1,300,090 bytes)


MAIN 4.42 KB (    4,535 bytes)
DEPS 1.23 MB (1,296,213 bytes)
---- 1.24 MB (1,300,748 bytes)

MAIN 4.43 KB (    4,537 bytes)
3DJS 1.08 MB (1,136,428 bytes)
DEPS  156 KB (  159,850 bytes)
---- 1.24 MB (1,300,815 bytes)
```
