class Constants{
    static BACKEND_PORT = process.env.BACKEND_PORT ? Number(process.env.BACKEND_PORT,10) : 3005;
    static BASE_BACKEND_URL = process.env.BASE_BACKEND_URL ?? "http://localhost"
    static BACKEND_URL = `${Constants.BASE_BACKEND_URL}:${Constants.BACKEND_PORT}`
    static EXPECTED_CHAIN_ID = process.env.CHAIN_ID ?  Number(process.env.CHAIN_ID) : 31337;
    static GOOGLE_DRIVE_URL = "https://drive.google.com/uc?id="
}
export default Constants