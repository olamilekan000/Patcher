# A Simple Nodejs API
A serverless microservice to demonstrate json-patch, image resizing
and jwt authentication and authorization usage in nodejs.

## Features

- Login to obtain a JWT token
- JSON patch to apply patches to a JSON object
- Image Upload (Google Cloud Storage)
- Image resize to resize an image to a thumbnail size of 50x50
- Containerization

## Technologies

- [Express.js](https://expressjs.com/) as the web framework.
- TypeScript [TypeScript](https://www.typescriptlang.org/).
- Linting with [TSlint](https://palantir.github.io/tslint/).
- Testing with [Mocha](https://mochajs.org/).
- Testing with [Chai](https://www.chaijs.com/).
- Testing with [Chai-Http](https://www.chaijs.com/plugins/chai-http/).

## Getting started

```sh
# Install TypeScript Globally
npm install -g typescript

# Clone the project
git clone https://github.com/olamilekan000/Patcher.git
cd Patcher && cd functions

# Install dependencies
npm install

# Build app
tsc

```

Then you can start the application:

```sh
npm start
```

This will launch the server [node](https://nodejs.org/en/) process on port 9093

### Testing

Testing is powered by [Mocha](https://mochajs.org/).

Start the test runner with the command below:

```sh
npm test
```

You can also generate coverage with:

```sh
npm run coverage
```

### Documentation

API documentation is also important so I am using APIDOC.js to document the api endpoints

Install apidoc:

```sh

npm install apidoc -g
```

Generate API docs using:

```sh
npm run docs
```

Linting is set up using [TSLint](https://palantir.github.io/tslint/).
It uses the rules as specificed in the tslint.json file which can be found in the
functions directory.

Begin linting with the following command:

```sh
npm run lint
```

### License

MIT License. See the [LICENSE](LICENSE) file.
