 import axios from "axios";

export async function addUser(formData) {
  const { data } = await axios.post(
    "https://linked-posts.routemisr.com/users/signup",
    formData
  );
  return data;
}
