export const editProfileValidation = (setState, state) => {
  const errorArr = [];
  const { name, email, photo } = state;
  setState({ error: null });
  if (name.trim().length === 0) errorArr.push("name field cant be empty");
  if (email.trim().length === 0) errorArr.push("email field cant be empty");
  if (!email.match(/.+@.+\..+/)) errorArr.push("email is invalid");
  if (photo && photo.size > 1000000)
    errorArr.push("photo must be less then 1MB");
  if (errorArr.length > 0) setState({ error: errorArr.join(", ") });
  return errorArr.length > 0;
};
