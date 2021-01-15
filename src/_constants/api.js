const prod = {
     API_URL: "http://api.fuze.life",
};
const dev = {
    API_URL: "http://localhost:3000"
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;