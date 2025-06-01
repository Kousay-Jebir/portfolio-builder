import { axiosConsult } from "../axios"

export const getUsers = async()=>{
    axiosConsult.get('/users').then((res)=>{
        return res.data
    }).catch((err)=>{
        console.log(err)
        throw err
    })
}

export const getPortfoliosOfUser = async (userId:string)=>{
    axiosConsult.get(`/users/${userId}/portfolios`).then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })
}