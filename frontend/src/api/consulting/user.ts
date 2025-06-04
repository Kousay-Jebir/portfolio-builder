import { axiosConsult } from "../axios"

export const getUsers = async () => {
    axiosConsult.get('/users').then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
        throw err
    })
}

export const getPortfoliosOfUser = async (userId: string) => {
    try {
        const res = await axiosConsult.get(`/users/${userId}/portfolios`);
        return res.data;
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
};