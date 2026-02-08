import axios from "axios";

export async function getLoggedUserData() {
  const token = localStorage.getItem('token');
  
  // الرابط الصحيح بنسبة 100% هو profile-data
  const { data } = await axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
    headers: { token }
  });
  return data;
}

export async function updateUserData(formData) {
  const token = localStorage.getItem('token');
  const { data } = await axios.put(`https://linked-posts.routemisr.com/users/upload-photo`, formData, {
    headers: { 
      token,
      "Content-Type": "multipart/form-data" 
    }
  });
  return data;
}

export async function changePasswordApi(passwords) {
  const token = localStorage.getItem('token');
  const { data } = await axios.patch(
    `https://linked-posts.routemisr.com/users/change-password`, 
    passwords, 
    { headers: { token } }
  );
  return data;
}