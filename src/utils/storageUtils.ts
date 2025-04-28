
const ACCESS_TOKEN_KEY = 'accessToken';
const USER_TYPE_KEY = 'userType';
const USERNAME = 'username';

export const saveAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const saveUserType = (userType: string) => {
  localStorage.setItem(USER_TYPE_KEY, userType);
};

export const getUserType = (): string | null => {
  return localStorage.getItem(USER_TYPE_KEY);
};

export const removeUserType = () => {
  localStorage.removeItem(USER_TYPE_KEY);
};


export const saveUsername = (username: string) => {
  localStorage.setItem(USERNAME, username);
};

export const getUsername = (): string | null => {
  return localStorage.getItem(USERNAME);
};

export const removeUsername = () => {
  localStorage.removeItem(USERNAME);
};

export const clearAuthData = () => {
  removeAccessToken();
  removeUserType();
  removeUsername();
};
