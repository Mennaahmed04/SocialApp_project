import axios from "axios";

export async function getSinglePosts(postId) {
  // لازم نجيب التوكن "جوه" الـ function عشان يتقرأ في لحظة الطلب
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    `https://linked-posts.routemisr.com/posts/${postId}`,
    {
      headers: {
        // تأكدي أن Key Headers هو 'token' كما يتطلب API RouteMisr
        token: token 
      },
    }
  );

  return data;
}