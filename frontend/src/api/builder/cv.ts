import { axiosBuilder } from "../axios"

export const getCvQuestions = async (id:string)=>{
    axiosBuilder.get(`/cv/portfolio/${id}/questions`).then((res)=>{
        return res.data
    }).catch((err)=>{
        console.log(err)
        throw err
    })
}

export const generateCv = async(cvData : any)=>{
    axiosBuilder.post('/cv/generate').then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })
}

export const createCv = async(cvData:{title:string,path:string})=>{
    axiosBuilder.post('/cv').then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })
}

export const uploadCv= async(file:any)=>{
    axiosBuilder.post('/cv/upload',file).then((res)=>{
        return res.data
    }).catch((err)=>{
        console.log(err)
        throw err
    })

}