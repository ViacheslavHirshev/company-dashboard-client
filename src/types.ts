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

export type TGetUserDashboardResponse = {
  companiesNumber: number;
  totalCapital: number;
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

export type TCompany = {
  id: number;
  name: string;
  createdAt: string;
  capital: number;
  address: string;
  service: string;
  logoPath: string;
};

export type TGetCompanyResponse = {
  company: {
    id: number;
    name: string;
    createdAt: string;
    capital: number;
    address: string;
    service: string;
    logoPath: string;
  };
};

export type TUpdateCompanyData = {
  companyName: string;
  createdAt: string;
  capital: number;
  service: string;
  country: string;
  city: string;
  street: string;
  streetNumber: string;
};

export type TUpdateCompanyResponse = {
  company: {
    id: number;
    name: string;
    createdAt: string;
    capital: number;
    address: string;
    service: string;
  };
};

export type TUpdateLogoResponse = {
  message: string;
  logoPath: string;
};

export type TGetCompaniesResponse = {
  companies: Partial<TCompany>[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
};

export type TGetCompaniesQueryArgs = {
  page?: number;
  limit?: number;
  sortBy?: "company_name" | "service";
  sortOrder?: "asc" | "desc";
  minCapital?: number;
  maxCapital?: number;
  startDate?: string;
  endDate?: string;
};
