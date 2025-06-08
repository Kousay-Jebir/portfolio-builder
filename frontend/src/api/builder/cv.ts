import { axiosBuilder } from "../axios"

export const getCvQuestions = async (id: string) => {
  try {
    const res = await axiosBuilder.get(`/cv/portfolio/${id}/questions`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const generateCv = async (portfolioId: string, cvData?: any) => {
  try {
    const cvDataDto = cvData ?? null;
    const res = await axiosBuilder.post(`/cv/generate/portfolio/${portfolioId}`, cvDataDto);
    return res.data;
  } catch (err) {
    console.error("Error generating CV:", err);
    throw err;
  }
};


export const createCv = async(cvData:{title:string,path:string})=>{
    axiosBuilder.post('/cv').then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.log(err)
        throw err
    })
}

export const uploadCv = async (file:any) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosBuilder.post('/cv/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('CV upload failed:', error);
    throw error;
  }

};


export const getCv=async()=>{
  try{
    const response=await axiosBuilder.get('/cv')
    return response.data

  }
  catch(error){
    console.error('CV fetching failed:', error);
    throw error;

  }
}

export const getCvByUser=async(userId:string)=>{
  try{
    const response=await axiosBuilder.get(`/cv/user/${userId}`)
    return response.data

  }
  catch(error){
    console.error('CV fetching failed:', error);
    throw error;

  }
}
