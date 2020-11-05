# Node JS application with passport authentication

[![N|Solid](https://nodejs.org/static/images/logo-light.svg)](https://nodejs.org/)

Node JS with passport authentication is a node JS app that use express and passport services to authenticate users.

Node.js is an open-source, cross-platform, JavaScript runtime environment. It executes JavaScript code outside of a browser. For more information on using Node.js, see the [Node.js](https://nodejs.org/) Website.

The [OpenJS Foundation](https://openjsf.org/) provides support for the project.

## Tech

Node uses a number of open source projects to work properly:
* [node.js](https://github.com/nodejs/node) - evented I/O for the backend
* [express.js](https://github.com/expressjs/express) - fast node.js network app framework

And of course node JS with express itself is open source with a [public repository](https://github.com/titoapiguoqui/nodejs-with-express) on GitHub.

## Installation
Requires [Node.js](https://nodejs.org/) to run. Use the package manager [npm](https://www.npmjs.com/) to install node JS application.

1. In terminal go to app route.
```sh
> cd nodejs
```

2. Install the dependencies and devDependencies and start the server.
* For develop environments:
```sh
> npm install -d
or
> npm i -d
```

* For production environments:
```sh
> npm install --production
$ NODE_ENV=production node app
```

3. Launch the application:
* For develop environments
```bash
> npm run dev
```

* Or launch the application in production mode:
```sh
> npm start
```

4. Visit app in your browser at:
[http://localhost:9999](http://localhost:9999)