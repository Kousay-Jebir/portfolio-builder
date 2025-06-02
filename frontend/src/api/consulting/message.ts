import { axiosConsult } from "../axios"

export const sendMessage=async(messageContent:{message:string,receiver:string})=>{

    axiosConsult.post('/message/send',messageContent).then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })

}

export const getConversation=async(id:string)=>{
    axiosConsult.get(`/message/${id}`).then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })
}

export const makeMessageSeen = async(id:string)=>{
    axiosConsult.post(`/message/seen/${id}`).then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })
}
