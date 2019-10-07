# EOS Block Explorer

The purpose of this project is to create a prototype for an application that can explore block data from the EOS blockchain

## Table of Contents

- [EOS Block Explorer](#eos-block-explorer)
  - [Table of Contents](#table-of-contents)
    - [Getting Started](#getting-started)
    - [Scope](#scope)
    - [Core Features](#core-features)
    - [Extra Features](#extra-features)
      - [Static Type-Checking](#static-type-checking)
      - [Unit Testing, Integration Testing, and Snapshots](#unit-testing--integration-testing--and-snapshots)
      - [Multi-Language Support](#multi-language-support)


### Getting Started

This project is primarily written in Javascript and can most easily be run via our Dockerfile. It is also possible to start up the project without Docker but the latter process consists of many more steps and is less reliable. If you are *not* using Docker then you may need to install the following software on your computer:

* [Yarn](https://yarnpkg.com)
* [Sucrase](https://www.npmjs.com/package/sucrase)
* [Jest](https://jestjs.io/)
* [Flow](https://flow.org/)
* [Rimraf](https://www.npmjs.com/package/rimraf)
* [Chalk](https://www.npmjs.com/package/chalk)

Simply clone the repository, then type `yarn && yarn start` into your terminal from within the repositories top-level directory (which should include a `package.json` file)

If you **do** have Docker installed, then you should simply be able to execute the following command to pull the latest Docker image:
```
docker image pull datagonia/eos-block-explorer:latest
```

To run the image then just run the image with the following command:
```
docker run -p 3000:3000 datagonia/eos-block-explorer:latest
```

If the Docker image is run correctly then you should see the following output:
```
Compiled successfully!

You can now view eos-block-explorer in the browser.

  Local:            http://localhost:3000/
```

At this point you can open your browser to `localhost:3000` to see the web application

More information about the Docker repository can be found here:

[EOS-Block-Explorer Dockerhub Repo](https://cloud.docker.com/repository/docker/datagonia/eos-block-explorer/)

### Scope

The primary scope of this project is to demonstrate the ability to navigate EOS blocks and transactions, and display this data to users. Since the critical parts of the task are the interactions with the EOS blockchain, I decided to use a layout template as boilerplate so that I could focus on the functionality rather than re-inventing the wheel designing / developing headers, sidebars, and other layout components.

Within the `src` folder, files within the following folders had limited-to-no work contributed by me (ie I used a template and built on-top of it).

- `scripts`
- `src/components/App`
- `src/components/Layout`
- `src/scss` (excluding `recentBlocks.scss`, which was created by me to add styles on-top of the themed layout)

### Core Features

As requested by the task, this page, upon loading, fetches the latest 10 EOS blocks, first by hitting the `/chain/get_info` API endpoint to determine the current block number, then individually fetching the `/chain/get_block` API endpoint for each of the ten blocks. Although simultaneously executing 10 HTTP requests is not ideal, it is my understanding that the Hyperion API may have an endpoint in the future that takes an array of block numbers and returns an array of the block information for all of blocks requested. This would be a decent improvement over the current procedure.

Once each block data is stored in Redux and displayed in the table, the user has the option to click on the "Show" button in order to display a sample of the block's contents in JSON format (with the option to **Download** the output as an HTML file, as well), as well as the contents of any Ricardian Contracts from within that block.

  *Please note that some Ricardian Contracts will cause Mustache to break if they are trying to display contract variables that are not defined*

### Extra Features

In addition to its core functionality I would like to highlight a fiew relevant points regarding this repository:

#### Static Type-Checking

Since the themed layout that I was using was not implementing TypeScript, and the `*.ts` file-extension factor for TypeScript can make migrating from Javascript to TypeScript a bit of a hassle, I decided to use [Flow](Flow.com) instead since it uses annotations rather file-extensions. I am also familiar with TypeScript but I made the decision to go with Flow. If I were working on a longer / larger project then it would make more sense to use TypeScript since EOSJS already uses it and has the relevant interfaces included as part of its repository. To see some of the EOS-related types that I defined for Flow you can look in the `src/types/types.js` file.

#### Unit Testing, Integration Testing, and Snapshots

Within the `src/tests` folder you can see a small sample of tests that I wrote to demonstrate my understanding of different types of testing.

I used mocha + chai for integration testing to make sure that the block-producer API endpoints are returning correctly-typed data. Naturally, any integration test that requires an HTTP request can fail due to internet connectivity issues, so one must keep reports of failed tests in perspective.

I also used mocha + chai for unit-testing, although the limited scope of this project (and limited time) meant that I kept unit test to a minimum. Unit-testing is limited to checking that my `ellipsizeString` function is working correctly.

React and React Native both have the ability to test their JSX components + styling with Jest. Jest can use snapshots to determine whether any JSX or styling has changed within your components. This way the developer is alerted to any potential changes in the appearance of their application.

In order to run the test just type in `yarn test` from the root directory of the repository. This suite of tests is also executed before every commit in order to make sure that non-failing code changes cannot enter the repository (although there are always work-arounds).

#### Multi-Language Support

No web application that is looking to go mainstream will be able to do so without preparing for internationalization. Rather than hard-code text strings within the application I have used variables that choose the text based on the currently-selected language. This repo only supports English (EN) and Spanish (ES), and you can toggle between the two by clicking the drop-down in the upper-right hand side of the header.

This application uses the `window` object to store the language setting, and changing the setting will force a refresh of the entire application. This may or may not be optimal, depending on the needs of your application. Theoretically I could have kept the language setting in Redux or just pulled it directly out of the browser's information, but I wanted to give users the ability to change the setting, and I believe tha the overhead for storing this data in Redux made that option undesirable.