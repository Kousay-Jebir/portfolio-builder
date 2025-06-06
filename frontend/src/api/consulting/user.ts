import { axiosConsult } from "../axios"

export const getUsers = async (field:string) => {
    try {
        const res = await axiosConsult.get(`/users?field=${field}`);
        return res.data;
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
};

export const getPortfoliosOfUser = async (userId: string) => {
    try {
        const res = await axiosConsult.get(`/users/${userId}/portfolios`);
        return res.data;
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
};

export const searchUser = async (searchValue: string) => {
    try {
        const res = await axiosConsult.post(`/users/search`,{offset:0,limit:0,field:searchValue});
        return res.data;
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
};