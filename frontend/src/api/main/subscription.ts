import { axiosMain } from "../axios";

export const subscribe = async (subData: { title: string; type: string }) => {
  try {
    const res = await axiosMain.post('/subscription', subData);
    return res.data;
  } catch (err) {
    console.error('Subscription error:', err);
    throw err;
  }
};


export const confirmSub=async(paymentId:string)=>{
     if (!paymentId) return;

      try {
        const res = await axiosMain.get(
          `http://localhost:5000/main/subscription/success?payment_id=${paymentId}`,
          { withCredentials: true } // include the cookie with pay_token
        );
        return res.data
      }
      catch(err){
         console.error('Subscription error:', err);
    throw err;

      }

}