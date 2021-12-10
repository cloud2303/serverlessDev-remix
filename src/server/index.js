const {
    createRequestHandler
  } = require("remix-aliyunhttp");
  exports.handler = createRequestHandler({
    build: require("./build")
  });