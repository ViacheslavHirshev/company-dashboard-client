export type TSignInFormInput = {
  email: string;
  password: string;
};

export type TSignUpFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type TSignInResponse = {
  userRole: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
};

export type TSignUpResponse = {
  message: string;
};

export type TGetUserDataResponse = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    role: string;
  };
};

export type TRefreshAccessTokenResponse = {
  message: string;
  accessToken: string;
};
