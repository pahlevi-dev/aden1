import 'next';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ORIGIN_URL: string;
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_TOKEN: string;
      NEXT_PUBLIC_BASE_URL_BLOG: string;
      NEXT_PUBLIC_TOKEN_BLOG: string;

      NEXT_PUBLIC_IG_CREDENTIAL: string;
      NEXT_PUBLIC_IG_USER_ID: string;
      NEXT_PUBLIC_IG_URL: string;

      NEXT_PUBLIC_GOOGLE_VERIFICATION_CODE: string;
    }
  }
}
