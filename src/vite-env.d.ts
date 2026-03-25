/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
}

declare module 'swiper/css' {
  const content: string;
  export default content;
}

declare module 'swiper/css/navigation' {
  const content: string;
  export default content;
}

