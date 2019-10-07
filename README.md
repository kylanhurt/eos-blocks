# EOS Block Explorer

The purpose of this project is to create a prototype for an application that can explore block data from the EOS blockchain

## Table of Contents

- [EOS Block Explorer](#eos-block-explorer)
  - [Table of Contents](#table-of-contents)
    - [Getting Started](#getting-started)
    - [Scope](#scope)
    - [Core Features](#core-features)


### Getting Started

This project is primarily written in Javascript and can most easily be run via our Dockerfile. It is also possible to start up the project without Docker but the latter process consists of many more steps and is less reliable. If you are *not* using Docker then you may need to install the following software on your computer:

* [Yarn]()
* [Sucrase]()
* [Jest]()
* [Flow]()
* [Rimraf]()
* [Chalk]()

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
