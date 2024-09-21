export const useGetUserInfo = () => {
  const storedAuth = localStorage.getItem("auth");
  const auth = storedAuth ? JSON.parse(storedAuth) : null;

  if (auth) {
    const { name, profilePhoto, userID, isAuth } = auth;

    return { name, profilePhoto, userID, isAuth };
  } else {
    console.error("User is not authenticated");
    return {};
  }
};
