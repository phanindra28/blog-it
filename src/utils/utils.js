export const decode = (str) => {
  try {
    return decodeURIComponent(atob(str));
  } catch (err) {
    console.log(err);
    return str;
  }
};
