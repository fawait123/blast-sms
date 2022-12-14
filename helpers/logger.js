const colors = require("colors/safe");

const loggingOption = {
  logging: (logStr, execTime, options) => {
    let color;
    if (options.type === "SELECT") {
      color = colors.green(colors.italic(logStr));
    }
    if (options.type === "UPDATE") {
      color = colors.yellow(colors.italic(logStr));
    }
    if (options.type === "INSERT") {
      color = colors.yellow(colors.italic(logStr));
    }
    if (color) {
      console.log(colors.magenta.bold(`[${execTime} ms]`), color);
    } else {
      console.log(logStr);
    }
  },
};

module.exports = loggingOption;
