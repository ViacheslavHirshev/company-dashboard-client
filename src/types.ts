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

export type TRefreshAccessTokenResponse = {
  message: string;
  accessToken: string;
};

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
};

export type TCompany = {
  id: number;
  name: string;
  createdAt: string;
  capital: number;
  address: string;
  service: string;
  logoPath: string;
};

export type TGetProfileResponse = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    role: string;
  };
};

export type TUpdateProfileData = {
  firstName: string;
  lastName: string;
};

export type TUpdateProfileResponse = {
  message: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
};

export type TUpdateAvatarResponse = {
  message: string;
  avatarPath: string;
};

export type TUserGetDashboardResponse = {
  companiesNumber: number;
  totalCapital: {
    _sum: {
      capital: string;
    };
  };
  companies: [
    {
      id: number;
      name: string;
      service: string;
      capital: number;
    }
  ];
  totalPages: number;
  currentPage: number;
};

export type TGetCompaniesArgs = {
  page?: number;
  limit?: number;
  sortBy?: "company_name" | "service";
  sortOrder?: "asc" | "desc";
  minCapital?: number;
  maxCapital?: number;
  startDate?: string;
  endDate?: string;
};

export type TUserGetCompaniesResponse = {
  companies: Partial<TCompany>[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

export type TUserGetCompanyResponse = {
  company: TCompany;
};

export type TUserCreateCompanyResponse = {
  message: string;
  company: Partial<TCompany>;
};

export type TUserUpdateCompanyData = {
  companyName: string;
  createdAt: string;
  capital: number;
  service: string;
  country: string;
  city: string;
  street: string;
  streetNumber: string;
};

export type TUserUpdateCompanyResponse = {
  company: Partial<TCompany>;
};

export type TUserUpdateLogoResponse = {
  message: string;
  logoPath: string;
};

export type TUserDeleteCompany = {
  message: string;
};

export type TGetDashboardCompaniesResponse = {
  companies: Partial<TCompany>[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

export type TAdminGetCompany = {
  company: TCompany & { owner: { firstName: string; lastName: string } };
};

export type TGetAllUsersArgs = {
  page?: number;
  limit?: number;
};

export type TGetAllUsersResponse = {
  users: TUser[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

export type TAddAdminResponse = {
  message: string;
};

export type TGetUserByIdResponse = {
  user: TUser;
};

export type TChangeUserResponse = {
  message: string;
  user: Partial<TUser>;
};

export type TChangePasswordData = {
  currentPassword: string;
  newPassword: string;
};
