export interface ISignInResponse {
  access_token: string;
  refresh_token: string;
  ttl: number;
  expires_in: number;
  token_type: string;
}

enum EnumTypeOfWork {
  "полный день" = 6,
  "неполный день" = 10,
  "сменный график" = 12,
  "частичная занятость" = 13,
  "временная работа" = 7,
  "вахтовым методом" = 9,
}

export interface IGetVacanciesRequest {
  published: number;
  keyword: string;
  payment_from: number;
  payment_to: number;
  catalogues: number;
}

export interface IGetVacanciesResponseDataItem {
  id: number;
  payment_from: number | null;
  payment_to: number | null;
  profession: string;
  currency: string;
  type_of_work: {
    id: number;
    title: EnumTypeOfWork;
  };
  town: {
    id: number;
    title: string;
    declension: string;
    genitive: string;
  };
  firm_name: string;
}

export interface IGetVacanciesResponse {
  objects: IGetVacanciesResponseDataItem[];
  total: number;
  corrected_keyword: string | null;
  more: boolean;
}

export interface IError {
  code: number;
  message: string;
  error: string;
}
