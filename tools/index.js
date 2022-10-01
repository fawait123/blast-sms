const decorate = (app) => {
  app.response.sendData = function (
    status,
    message,
    data = {},
    errorCode = ""
  ) {
    // code is intentionally kept simple for demonstration purpose
    return this.contentType("application/json").status(status).send({
      status,
      message,
      errorCode,
      results: { data },
    });
  };

  app.response.sendDataList = function (
    status,
    message,
    data = {},
    errorCode = ""
  ) {
    // code is intentionally kept simple for demonstration purpose
    return this.contentType("application/json").status(200).send({
      status,
      message,
      errorCode,
      results: data,
    });
  };
  app.response.sendInvalidData = function (data = {}) {
    // code is intentionally kept simple for demonstration purpose
    let message = "";
    if (data) {
      for (var key in data) {
        // skip loop if the property is from prototype
        if (!data.hasOwnProperty(key)) continue;

        message += data[key][0] + "\n";
        data[key] = data[key][0];
      }
    }
    return this.contentType("application/json").status(412).send({
      status: 412,
      message,
      errorCode: "error_validation",
      results: { data },
    });
  };
  app.response.sendUnauthorized = function (error = "") {
    // code is intentionally kept simple for demonstration purpose
    return this.contentType("application/json")
      .status(401)
      .send({
        status: 401,
        message: "Unauthorized",
        errorCode: error,
        results: { data: {} },
      });
  };
  app.response.sendNotFound = function () {
    // code is intentionally kept simple for demonstration purpose
    return this.contentType("application/json")
      .status(404)
      .send({
        status: 404,
        message: "Not Found",
        errorCode: "",
        results: { data: {} },
      });
  };
};

module.exports = decorate;
