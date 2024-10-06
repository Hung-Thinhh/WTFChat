require("dotenv").config();
import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  let key = process.env.JWT_SECRET_KEY;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (error) {
    console.log("error create token: ", error);
  }
  return token;
};

export const verifyToken = (token) => {
  let key = process.env.JWT_SECRET_KEY;
  let decode = null;

  try {
    decode = jwt.verify(token, key);
  } catch (error) {
    console.log("error verifying token: ", error);
  }
  return decode;
};

const SecurePaths = ["/user", "/profile", "/getInfor", "/editInfor"];

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

export const checkUserJWT = (req, res, next) => {
  if (!SecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;
  let tokenFromHeader = extractToken(req);
  if ((cookies && cookies.jwt) || tokenFromHeader) {
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    // console.log(token)
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EM: "Not authenticated the user",
        EC: "-1",
        DT: "",
      });
    }
  } else {
    return res.status(401).json({
      EM: "Not authenticated the user",
      EC: "-1",
      DT: "",
    });
  }
};

export const checkUserPermission = (req, res, next) => {
  if (!SecurePaths.includes(req.path) || req.path === "/account") return next();

  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRole.Roles;
    let currUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: "-1",
        DT: "",
        EM: `You don't have permission to access this resource...`,
      });
    }
    let canAccess = roles.some(
      (item) => item.url === currUrl || currUrl.includes(item.url)
    );
    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        EC: "-1",
        DT: "",
        EM: `You don't have permission to access this resource...`,
      });
    }
  } else {
    return res.status(401).json({
      EC: "-1",
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};

