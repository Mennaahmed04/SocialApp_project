import React, { useState, useEffect } from "react";
import { formateDate } from "../utilities/formatedata";
import { Link } from "react-router-dom";
import CommentItem from "./CommentItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentApi } from "../apis/auth/comments.api";
import { deletePostApi, updatePostApi } from "../apis/auth/posts/handleCreatePost.api"; // تأكدي من استيراد updatePostApi
import toast from "react-hot-toast";

export default function PostItems({ post, isDetails = false }) {
  const [showComments, setShowComments] = useState(isDetails);
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false); // حالة التعديل
  const [editContent, setEditContent] = useState(post?.body || ""); // محتوى النص المراد تعديله
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isDetails) {
      setShowComments(true);
    }
  }, [isDetails, post]);

  if (!post || !post.user) return null;

  const { user: { name, photo }, image, body, createdAt, comments, _id } = post;

  // 1. Mutation إضافة تعليق
  const { mutate: addComment, isLoading: isAddingComment } = useMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["postItem", _id]);
      toast.success("Comment added!");
    },
  });

  // 2. Mutation حذف بوست
  const { mutate: deletePost } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      toast.success("Post deleted!");
      queryClient.invalidateQueries(["posts"]);
    },
  });

  // 3. Mutation تعديل البوست
  const { mutate: updatePost, isLoading: isUpdating } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => {
      toast.success("Post updated!");
      setIsEditing(false); // إغلاق واجهة التعديل بعد النجاح
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["postItem", _id]);
    },
  });

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addComment({ content: commentText, post: _id });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(_id);
    }
  };

  const handleUpdate = () => {
    if (!editContent.trim()) return;
    const formData = new FormData();
    formData.append("body", editContent);
    // نمرر الـ ID والـ FormData للدالة
    updatePost({ postId: _id, formData });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className={`bg-white dark:bg-gray-800 rounded-md shadow-md h-auto py-3 px-3 my-5 transition-colors duration-300 
        ${isDetails ? "w-[95%] md:w-[1000px]" : "w-[95%] md:w-[700px]"}`}>
        
        {/* هيدر البوست */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <img className="rounded-full w-10 h-10 mr-3 object-cover border dark:border-gray-700" src={photo} alt={name} />
            <div>
              <h5 className="text-md font-semibold dark:text-white">{name}</h5>
              <p className="text-xs text-gray-500">{formateDate(createdAt)}</p>
            </div>
          </div>

          <div className="relative group">
            <button className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors">
              <i className="fa-solid fa-ellipsis-h text-gray-500"></i>
            </button>
            <div className="hidden group-hover:block absolute right-0 w-32 bg-white dark:bg-gray-700 shadow-xl rounded-md border dark:border-gray-600 z-50 overflow-hidden">
              <button onClick={() => setIsEditing(true)} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border-b dark:border-gray-600">
                <i className="fa-solid fa-pen-to-square mr-2"></i> Edit
              </button>
              <button onClick={handleDelete} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                <i className="fa-solid fa-trash-can mr-2"></i> Delete
              </button>
            </div>
          </div>
        </div>

        {/* محتوى النص - يدعم التعديل */}
        <div className="my-3 text-gray-800 dark:text-gray-200 px-1">
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600 outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
              <div className="flex space-x-2 justify-end">
                <button onClick={() => setIsEditing(false)} className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded-md">Cancel</button>
                <button onClick={handleUpdate} disabled={isUpdating} className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md">
                   {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-base leading-relaxed">{body}</p>
          )}
        </div>

        {/* الصورة */}
        <Link to={`/postdetails/${_id}`} className="block overflow-hidden rounded-lg -mx-3 border-y dark:border-gray-700">
          <img src={image} className="w-full h-auto max-h-[600px] object-contain bg-gray-100 dark:bg-gray-900" alt="post" />
        </Link>

        {/* إحصائيات التفاعل */}
        <div className="w-full flex items-center justify-between px-2 py-3">
          <div className="flex items-center">
            <div className="flex -space-x-1">
              <div className="bg-blue-500 z-10 w-5 h-5 rounded-full flex items-center justify-center border border-white dark:border-gray-800">
                <i className="fa-solid fa-thumbs-up text-[10px] text-white"></i>
              </div>
              <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center border border-white dark:border-gray-800">
                <i className="fa-solid fa-heart text-[10px] text-white"></i>
              </div>
            </div>
            <p className="ml-2 text-sm text-gray-500 dark:text-gray-400 font-medium">8</p>
          </div>
          <p onClick={() => setShowComments(!showComments)} className="text-sm text-gray-500 dark:text-gray-400 hover:underline cursor-pointer font-medium">
            {comments?.length || 0} comments
          </p>
        </div>

        {/* أزرار التفاعل */}
        <div className="grid grid-cols-3 gap-1 w-full px-2 border-b dark:border-gray-700 mb-2 py-1">
          <button className="flex justify-center items-center py-2 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors group">
            <i className="fa-regular fa-thumbs-up dark:text-gray-400 group-hover:text-blue-500"></i>
            <span className="dark:text-gray-400 group-hover:text-blue-500 font-medium">Like</span>
          </button>
          
          <button onClick={() => setShowComments(!showComments)} className="flex justify-center items-center py-2 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors group">
            <i className={`fa-regular fa-comment group-hover:text-blue-500 ${showComments ? 'text-blue-500' : 'dark:text-gray-400'}`}></i>
            <span className={`font-medium group-hover:text-blue-500 ${showComments ? 'text-blue-500' : 'dark:text-gray-400'}`}>Comment</span>
          </button>

          <button className="flex justify-center items-center py-2 space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors group">
            <i className="fa-solid fa-share dark:text-gray-400 group-hover:text-blue-500"></i>
            <span className="dark:text-gray-400 group-hover:text-blue-500 font-medium">Share</span>
          </button>
        </div>

        {/* قسم التعليقات */}
        {showComments && (
          <div className="mt-4 px-2">
            <div className={`max-h-[500px] overflow-y-auto custom-scrollbar`}>
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <CommentItem key={comment._id} comment={comment} />
                ))
              ) : (
                <p className="text-xs text-gray-500 text-center py-5">
                  {isDetails ? "No comments on this post yet." : "No comments yet."}
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center space-x-2 border-t dark:border-gray-700 pt-4 pb-2">
              <img src={photo} className="w-8 h-8 rounded-full object-cover" alt="me" />
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  placeholder="Write a comment..." 
                  className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button onClick={handleAddComment} disabled={isAddingComment} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:scale-110 transition-transform">
                  {isAddingComment ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}