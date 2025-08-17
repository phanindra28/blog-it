export const validateEmail = (email) => {
  if (email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      return false;
    }
  }
  return true;
};
export const validatePassword = (password) => {
  if (password) {
    if (password.length < 6) {
      return false;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      return false;
    }
  }
  return true;
};
