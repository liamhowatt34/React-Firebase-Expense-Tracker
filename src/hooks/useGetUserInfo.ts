export const useGetUserInfo = () => {
  const storedAuth = localStorage.getItem("auth");
  const auth = storedAuth ? JSON.parse(storedAuth) : null;

  if (auth) {
    const { name, profilePhoto, userID, isAuth } = auth;

    return { name, profilePhoto, userID, isAuth };
  } else {
    // Handle the case where auth is null (e.g., user is not authenticated)
  }
};
