const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("CHECK ROLE", allowedRoles);
    if (!req.user || !allowedRoles.includes(req.user.role.name)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient privileges." });
    }

    next();
  };
};

const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    console.log("check", requiredPermission);
    if (!req.user || !req.user.role.permissions.includes(requiredPermission)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient privileges." });
    }

    next();
  };
};

module.exports = { authorizeRoles, checkPermission };
