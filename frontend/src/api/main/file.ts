import axios from 'axios';
import { axiosMain } from '../axios';
import { ax } from 'react-router/dist/development/register-DCE0tH5m';

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


export async function downloadFile(filename: string) {
  try {
    const response = await axiosMain.get(`/public/download/${filename}`, {
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download file.');
  }
}

