import axios from "axios";

export async function getPosts(page = 1) {
    const token = localStorage.getItem('token');
    // بنضيف ?page=${page} للرابط عشان الـ API يبعت صفحة معينة
    const { data } = await axios.get(`https://linked-posts.routemisr.com/posts?page=${page}&limit=10`, {
        headers: { token }
    });
    return data;
}
