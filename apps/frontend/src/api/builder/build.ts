import { axiosBuilder } from "../axios"

export const savePortfolio = async(portfolioData : {code : string,content:JSON})=>{
    axiosBuilder.post('/save',portfolioData).then((res)=>{
        return res.data
    }).catch((err)=>{
        console.log(err)
        throw err
    })

}