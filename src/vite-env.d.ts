// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_FIREBASE_API_KEY: any;
  readonly VITE_STRIPE_PUBLIC_KEY: string;
  readonly VITE_OPENAI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
