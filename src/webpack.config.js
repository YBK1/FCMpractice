const fs = require("fs");

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync("localhost+2-key.pem"),
      cert: fs.readFileSync("localhost+2.pem"),
    },
    port: 3000, // or any other port you use
  },
};
