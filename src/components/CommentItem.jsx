import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCommentApi, updateCommentApi } from '../apis/auth/comments.api'; // تأكدي من المسارات
import toast from 'react-hot-toast';

export default function CommentItem({ comment }) {
  const { commentCreator, content, _id, createdAt } = comment;
  const queryClient = useQueryClient();

  // حالات التحكم في التعديل والقائمة
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);

  // 1. Mutation حذف التعليق
  const { mutate: deleteComment, isLoading: isDeleting } = useMutation({
    mutationFn: () => deleteCommentApi(_id),
    onSuccess: () => {
      toast.success("Comment deleted");
      // تحديث البوستات عشان عدد الكومنتات يقل والكومنت يختفي
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['postItem']);
    },
    onError: () => toast.error("Failed to delete comment")
  });

  // 2. Mutation تعديل التعليق
  const { mutate: updateComment, isLoading: isUpdating } = useMutation({
    mutationFn: (data) => updateCommentApi(data),
    onSuccess: () => {
      toast.success("Comment updated");
      setIsEditing(false);
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['postItem']);
    },
    onError: () => toast.error("Failed to update comment")
  });

  const handleUpdate = () => {
    if (!newContent.trim() || newContent === content) {
      setIsEditing(false);
      return;
    }
    updateComment({ commentId: _id, content: newContent });
  };

  return (
    <div className="flex space-x-3 my-4 items-start px-2 group">
      {/* صورة صاحب التعليق */}
      <img 
        src={commentCreator?.photo} 
        className="w-8 h-8 rounded-full object-cover border dark:border-gray-700" 
        alt={commentCreator?.name} 
      />

      {/* صندوق التعليق */}
      <div className="flex flex-col flex-grow relative">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl transition-colors duration-300">
          <div className="flex justify-between items-start">
            <h6 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
              {commentCreator?.name}
            </h6>
            
            {/* أيقونات التحكم (تظهر عند الـ Hover على التعليق) */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
              <button 
                onClick={() => setIsEditing(true)} 
                className="text-gray-400 hover:text-blue-500 transition-colors"
                title="Edit"
              >
                <i className="fa-solid fa-pen text-[10px]"></i>
              </button>
              <button 
                onClick={() => {
                  if(window.confirm("Delete this comment?")) deleteComment();
                }} 
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Delete"
              >
                {isDeleting ? <i className="fa-solid fa-spinner fa-spin text-[10px]"></i> : <i className="fa-solid fa-trash text-[10px]"></i>}
              </button>
            </div>
          </div>
          
          {/* محتوى التعليق: نص عادي أو حقل تعديل */}
          {isEditing ? (
            <div className="mt-1">
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full p-2 text-sm bg-white dark:bg-gray-800 dark:text-white border border-blue-500 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                rows="2"
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button 
                  onClick={() => { setIsEditing(false); setNewContent(content); }} 
                  className="text-[10px] px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-md dark:text-white"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="text-[10px] px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">
              {content}
            </p>
          )}
        </div>
        
        {/* الوقت */}
        <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 ml-2">
          {createdAt ? "Just now" : ""} 
        </span>
      </div>
    </div>
  );
}