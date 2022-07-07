// This is copied from https://github.com/antoniosarosi/home-cloud/blob/master/server/src/middlewares/base.js

export const manageErr = (err: any, settings: any) => {
  if (err.code !== settings.code) {
    return false;
  }
  err.message = settings.message;
  err.statusCode = settings.statusCode;

  return true;
};
