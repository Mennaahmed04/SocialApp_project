import axios from "axios";

// دالة جلب التعليقات (التي أرسلتِها)
export async function getPostComments(postId) {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`, {
    headers: { token }
  });
  return data;
}

// --- دالة إضافة تعليق جديد (ضيفي هذه الدالة) ---
export async function createCommentApi(commentData) {
  const token = localStorage.getItem('token');
  const { data } = await axios.post(
    `https://linked-posts.routemisr.com/comments`, 
    commentData, // يحتوي على content و post (ID)
    {
      headers: { token }
    }
  );
  return data;
}

// حذف تعليق
export async function deleteCommentApi(commentId) {
  const token = localStorage.getItem('token');
  const { data } = await axios.delete(
    `https://linked-posts.routemisr.com/comments/${commentId}`, 
    { headers: { token } }
  );
  return data;
}

// تعديل تعليق
export async function updateCommentApi({ commentId, content }) {
  const token = localStorage.getItem('token');
  const { data } = await axios.put(
    `https://linked-posts.routemisr.com/comments/${commentId}`, 
    { content }, 
    { headers: { token } }
  );
  return data;
}