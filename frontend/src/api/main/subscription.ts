import { axiosMain } from "../axios"

export const subscribe = async(subData:{title:string,type:string})=>{
    axiosMain.post('/subscription',subData).then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })

}