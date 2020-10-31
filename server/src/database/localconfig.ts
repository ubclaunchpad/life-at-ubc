import dotenv from "dotenv";
dotenv.config();

const localconfig = {
    user: process.env.LOCAL_USER,
    database: process.env.LOCAL_DB,
    password: process.env.LOCAL_PASSWORD,
    host: process.env.LOCAL_HOST,
    port: Number(process.env.LOCAL_PORT),
};

export default localconfig;
