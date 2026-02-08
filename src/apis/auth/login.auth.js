 import axios from "axios";

export async function loginUser(formData) {
  const { data } = await axios.post(
    "https://linked-posts.routemisr.com/users/signin",
    formData
  );
  return data;
}
