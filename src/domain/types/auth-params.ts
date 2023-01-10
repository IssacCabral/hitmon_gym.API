export type AuthParams = {
  email: string;
  password: string;
};

export type AuthResult = {
  token: string;
  user: {
    email: string;
  };
};
