import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getSinglePosts } from "../apis/auth/posts/getsinglepost.api";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import PostItems from "../components/PostItems";

export default function PostDetails() {
  const { id } = useParams();
  
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["postItem", id],
    queryFn: () => getSinglePosts(id),
  });

  if (isError) {
    return <h2 className="text-center py-10 dark:text-white">{error.message}</h2>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    // أضفنا min-h-screen لضمان أن اللون الداكن يملأ الشاشة بالكامل
    <div className="dark:bg-gray-900 min-h-screen py-5">
      <div className="container mx-auto">
        {/* التعديل الجوهري: إضافة isDetails={true} */}
        {data?.post && <PostItems post={data.post} isDetails={true} />}
      </div>
    </div>
  );
}