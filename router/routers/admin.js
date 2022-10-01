const router = require("express").Router();
const auth = require("../../controllers/public/auth");
const Common = require("../../helpers/common");
const moment = require("moment");
const Model = require("../../models");

router.use("/", async (req, res, next) => {
  try {
    let {
      headers: { authorization },
    } = req;

    let [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
      res.sendUnauthorized(`type ${type} not support`);
    }

    if (!token) {
      res.sendUnauthorized("token not found");
    }

    let validToken = await Common.jwtVerify(token);
    if (!validToken) {
      res.sendUnauthorized("token wrong");
    }

    let dataToken = await Model.session_users.findOne({
      where: {
        token,
      },
    });

    if (!dataToken) {
      return res.sendUnauthorized("token not found in database");
    }

    if (moment(dataToken.expired).format("x") <= moment().format("x")) {
      return res.sendUnauthorized("token expired");
    }

    let dataUser = await Model.users.findOne({
      where: {
        id: validToken.user.id,
      },
    });
    req.users = dataUser;
    next();
  } catch (err) {
    return res.sendData(500, err.message);
  }
});

router.get("/", async (req, res) => {
  return res.sendData(200, "admin api");
});

module.exports = router;
