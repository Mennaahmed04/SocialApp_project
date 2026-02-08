import axios from "axios";

// دالة إنشاء بوست (موجودة عندك)
export async function handleCreatePost(formData) {
    const token = localStorage.getItem('token');
    const { data } = await axios.post(`https://linked-posts.routemisr.com/posts`, formData, {
        headers: {
            token: token,
            "Content-Type": "multipart/form-data"
        }
    });
    return data;
}

// --- ضيفي الدالة دي تحتها عشان الـ Error يختفي ---
export async function deletePostApi(postId) {
    const token = localStorage.getItem('token');
    
    // سطر للتأكد: افتحي الـ console وشوفي الـ ID اللي رايح سليم ولا undefined
    console.log("Deleting Post with ID:", postId);

    const { data } = await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: {
            token: token 
        }
    });
    return data;
}
export async function updatePostApi({ postId, formData }) {
  const token = localStorage.getItem('token');
  const { data } = await axios.put( // جربي استخدام PUT بدلاً من PATCH
    `https://linked-posts.routemisr.com/posts/${postId}`, 
    formData, 
    { headers: { token } }
  );
  return data;
}
// ضيفي الدالة دي تحت دالة الـ deletePostApi
export async function getUserPosts(userId) {
    const token = localStorage.getItem('token');
    // الرابط ده هو اللي كان ظاهر عندك في بوستمان لجلب بوستات مستخدم معين
    const { data } = await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts`, {
        headers: { token }
    });
    return data;
}
