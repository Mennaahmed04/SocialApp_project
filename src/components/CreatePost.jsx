import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCreatePost } from "../apis/auth/posts/handleCreatePost.api"; 
import toast from "react-hot-toast";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null); // لتخزين الملف نفسه للـ API
  const [imgPreview, setImgPreview] = useState(""); // للمعاينة فقط
  const queryClient = useQueryClient();

  // تفعيل الـ Mutation
  const { mutate, isLoading } = useMutation({
    mutationFn: handleCreatePost,
    onSuccess: () => {
      toast.success("Post created successfully!");
      setContent("");
      setImgPreview("");
      setImageFile(null);
      // تحديث قائمة البوستات في الهوم فوراً
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error || "Failed to post");
    }
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content && !imageFile) return toast.error("Please add text or an image");

    // تجهيز الـ FormData
    const formData = new FormData();
    formData.append("body", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    mutate(formData);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[95%] md:w-[700px] bg-white dark:bg-gray-800 rounded-md shadow-md p-4 mt-5 transition-colors">
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white p-3 h-28 outline-none rounded-md resize-none border dark:border-gray-600"
            placeholder="What's on your mind?"
          />

          {imgPreview && (
            <div className="mt-3 relative">
              <img src={imgPreview} className="w-full h-48 object-cover rounded-md" alt="preview" />
              <button onClick={() => {setImgPreview(""); setImageFile(null)}} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs">✕</button>
            </div>
          )}

          <div className="flex items-center mt-3 justify-between">
            <div className="flex space-x-4 text-gray-500 dark:text-gray-400">
              <input type="file" id="file" hidden onChange={handleFileChange} />
              <label htmlFor="file" className="cursor-pointer hover:text-blue-500">
                <i className="fa-solid fa-image text-xl"></i>
              </label>
            </div>
            
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-600 text-white px-6 py-1.5 rounded-md font-bold disabled:bg-gray-400"
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}