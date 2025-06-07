import { axiosConsult } from "../axios"

export const sendMessage=async(messageContent:{message:string,receiver:string})=>{
    try{
        const res = await axiosConsult.post('/message/send',messageContent)
        return res.data

    }
    catch(err){
        console.log(err)
        throw err
    }

}

export const getSentMessages=async(receiverId:string)=>{
    try{
        const res = await axiosConsult.get(`/message/sent/${receiverId}`)
        return res.data

    }
    catch(err){
        console.log(err)
        throw err
    }

}
export const getReceivedMessages=async(senderId:string)=>{
    try{
        const res = await axiosConsult.get(`/message/received/${senderId}`)
        return res.data

    }
    catch(err){
        console.log(err)
        throw err
    }

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
