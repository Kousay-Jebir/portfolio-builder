import { axiosMain } from '../axios';

export const getConnectedUser = async () => {
  axiosMain
    .get('/user')
    .then((res:any) => {
      return res.data;
    })
    .catch((err:any) => {
      console.log(err);
      throw err;
    });
};

export const createProfile = async (profileData: {
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  status: string;
  contacts: object;
  socialLinks: object;
  file: any;
}) => {
  axiosMain
    .post('/user/profile', profileData)
    .then((res:any) => {
      return res.data;
    })
    .catch((err:any) => {
      console.log(err);
      throw err;
    });

};

export const getSubscriptionStatus = async ()=>{
  axiosMain.get('/user/subscription').then((res:any)=>{
    return res.data
  })
  .catch((err:any)=>{
    console.log(err)
  })
  
}
