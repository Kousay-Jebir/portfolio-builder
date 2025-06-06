import { axiosMain } from '../axios';

export async function openFile(filename: string) {
  try {
    const response = await axiosMain.get(`/public/${filename}`, {
      responseType: 'blob', 
    });

    const blob = response.data;
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, '_blank');
  } catch (error) {
    console.error('Error opening file:', error);
    alert('Could not open file. Please try again.');
  }
}
