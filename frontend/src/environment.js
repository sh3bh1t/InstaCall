let IS_PROD = true;
const server = IS_PROD ?
    "https://instacallbackend.onrender.com" :

    "http://localhost:3030"


export default server;