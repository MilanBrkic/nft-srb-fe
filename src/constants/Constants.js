class Constants{
    static BACKEND_PORT = process.env.BACKEND_PORT ?? 3005;
    static BASE_BACKEND_URL = process.env.BASE_BACKEND_URL ?? "http://localhost"
    static BACKEND_URL = `${Constants.BASE_BACKEND_URL}:${Constants.BACKEND_PORT}`
}
export default Constants