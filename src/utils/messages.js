export const MESSAGES = {
  UPLOAD_COMPLETE: (type) => `${type} successfully uploaded!`,
  DELETE_COMPLETE: (type) => `${type} has successfully been deleted!`,
  EDIT_COMPLETE: (type) => `${type} successfully updated!`,
  ORDER_STATUS_0: "Order has been deleted!",
  ORDER_STATUS_1: "Order has been accepted!",
  ORDER_STATUS_2: "Order has been rejected!",

  EDIT_FAILURE: (type) => `Unexpected error while updating the ${type}!`,
  NO_USERNAME: "Please input your username!",
  NO_PASSWORD: "Please input your password!",
  USER_NOT_FOUND: "Admin account not found!",
  ERROR: "Unexpected error!",

  LOGIN: "You have successfully logged in!",
  LOGOUT: "You have been logged out",
  PW_NO_MATCH: "Passwords do not match!",
};
