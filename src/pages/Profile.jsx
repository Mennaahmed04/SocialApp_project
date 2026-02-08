import React, { useRef, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLoggedUserData, updateUserData} from '../apis/auth/user.api';
import PostItems from '../components/PostItems';
import { getUserPosts, handleCreatePost } from '../apis/auth/posts/handleCreatePost.api';
import toast from 'react-hot-toast';

export default function Profile() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  // States
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // 1. جلب بيانات المستخدم
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['loggedUser'],
    queryFn: getLoggedUserData
  });

  const myUser = userData?.user;

  // 2. جلب منشورات المستخدم
  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ['userPosts', myUser?._id],
    queryFn: () => getUserPosts(myUser?._id),
    enabled: !!myUser?._id
  });

  // 3. Mutations (تعديل الصورة - إضافة بوست)
  const { mutate: changePhoto, isLoading: isUpdatingPhoto } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      toast.success("Photo updated!");
      queryClient.invalidateQueries(['loggedUser']);
    }
  });

  const { mutate: createPost, isLoading: isCreatingPost } = useMutation({
    mutationFn: handleCreatePost,
    onSuccess: () => {
      toast.success("Post Shared!");
      setPostContent("");
      setSelectedImage(null);
      queryClient.invalidateQueries(['userPosts']);
    }
  });

  // Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      changePhoto(formData);
    }
  };

  const handleCreateNewPost = () => {
    if (!postContent.trim()) return;
    const formData = new FormData();
    formData.append('body', postContent);
    if (selectedImage) formData.append('image', selectedImage);
    createPost(formData);
  };

  if (userLoading || postsLoading) {
    return (
      <div className="text-center py-20 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <i className='fa-solid fa-3x fa-spin fa-spinner text-blue-600 dark:text-white'></i>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-10 transition-colors duration-300">
      
      {/* --- هيدر البروفايل --- */}
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 w-[95%] md:w-[700px] mx-auto p-8 rounded-lg shadow-md border dark:border-gray-700">
        <div className="relative group">
          <img 
            src={myUser?.photo} 
            className={`w-36 h-36 rounded-full object-cover border-4 border-blue-600 shadow-xl ${isUpdatingPhoto ? 'opacity-40' : ''}`} 
            alt="profile" 
          />
          <button onClick={() => fileInputRef.current.click()} className="absolute bottom-2 right-2 bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition-colors">
            <i className="fa-solid fa-camera"></i>
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        </div>

        <div className="mt-5 text-center w-full">
          <h2 className="text-3xl font-bold dark:text-white">
            {myUser?.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{myUser?.email}</p>
        </div>
      </div>

      {/* --- جزء إضافة بوست جديد (Add Post) --- */}
      <div className="mt-6 w-[95%] md:w-[700px] mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border dark:border-gray-700">
        <div className="flex space-x-3">
          <img src={myUser?.photo} className="w-10 h-10 rounded-full object-cover" alt="me" />
          <textarea 
            value={postContent}
            onChange={(e)=>setPostContent(e.target.value)}
            placeholder={`What's on your mind, ${myUser?.name?.split(' ')[0]}?`}
            className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white rounded-xl p-3 h-20 outline-none resize-none border border-transparent focus:border-blue-500 transition-all"
          />
        </div>
        {selectedImage && (
          <div className="relative mt-3">
            <img src={URL.createObjectURL(selectedImage)} className="h-32 rounded-lg w-full object-cover" alt="preview" />
            <i onClick={()=>setSelectedImage(null)} className="fa-solid fa-circle-xmark absolute top-1 left-1 text-red-500 cursor-pointer text-xl bg-white rounded-full"></i>
          </div>
        )}
        <div className="flex justify-between items-center mt-3 pt-3 border-t dark:border-gray-700">
          <label className="cursor-pointer flex items-center space-x-2 text-green-500 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-1 rounded-md transition-all">
            <i className="fa-solid fa-image"></i> 
            <span className="text-sm font-medium">Photo</span>
            <input type="file" className="hidden" onChange={(e)=>setSelectedImage(e.target.files[0])} accept="image/*" />
          </label>
          <button 
            onClick={handleCreateNewPost} 
            disabled={isCreatingPost || !postContent.trim()} 
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-1.5 rounded-md font-bold transition-all"
          >
            {isCreatingPost ? <i className="fa-solid fa-spinner fa-spin"></i> : "Post"}
          </button>
        </div>
      </div>

      {/* --- عرض منشوراتي --- */}
      <div className="mt-10 pb-20">
        <h3 className="text-center font-bold dark:text-white mb-6 uppercase tracking-widest text-gray-500">My Feed</h3>
        <div className="flex flex-col items-center">
            {postsData?.posts?.length > 0 ? (
              postsData.posts.map(post => <PostItems key={post._id} post={post} />)
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
            )}
        </div>
      </div>
    </div>
  );
}