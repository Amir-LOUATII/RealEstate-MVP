export type actionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{
  success?: boolean;
  error?: boolean;
  message?: string;
  errors?: Record<string, string>;
} | void>;

export type PropertiesQueryParams = {
  search?: string;
  page?: string;
  pageSize?: string;
  minPrice?: number;
  maxPrice?: number;
};
