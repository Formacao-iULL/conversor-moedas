export interface CurrencyCode {
  code: string;
  description: string;
}

export interface CurrencyResponse {
  supported_codes: [string, string][];
}
