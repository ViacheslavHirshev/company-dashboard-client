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
  userData: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    role: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
};

export type TSignUpResponse = {
  message: string;
};
