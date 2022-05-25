declare namespace NodeJS {
  export interface ProcessEnv {
    DB_URL: string
    EMAIL: string
    EMAIL_PASS: string
    REDIS_URL: string
    REDIS_PASS: string
  }
}
