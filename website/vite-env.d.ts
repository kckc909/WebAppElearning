/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACK_END_API_PATH: string;
    readonly VITE_API_MODE: string;
    // Add more env variables as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
