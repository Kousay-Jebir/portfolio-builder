import { axiosConsult } from "../axios"

export const seePortfolio = async(id:string)=>{
    axiosConsult.get(`/portfolios/${id}`).then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })
}
export const getUserPortfoliosUrls = async () => {
  try {
    const res = await axiosConsult.get('/portfolio/urls');
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const makeSeen = async(id:string)=>{
    axiosConsult.patch(`/notification/${id}`).then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })

} 