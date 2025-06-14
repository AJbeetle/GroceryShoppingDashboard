/// <reference types="vite/client" />

// type definition for env file :-

interface ImportMetaEnv {
    readonly VITE_BACKEND_BASE_URL :string;
}

interface ImportMeta {
    readonly env : ImportMetaEnv;
}