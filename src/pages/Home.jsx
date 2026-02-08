import React, { useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer"; // 1. استيراد المكتبة
import { getPosts } from "../apis/auth/posts/getposts.api";
import { getLoggedUserData } from "../apis/auth/user.api";
import PostItems from "../components/PostItems";
import PostSkeleton from "../components/PostSkeleton";
import CreatePost from "../components/CreatePost";

export default function Home() {
  const { ref, inView } = useInView(); // 2. تعريف المراقب

  const { data: userData } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: getLoggedUserData,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.paginationInfo.currentPage + 1;
      return nextPage <= lastPage.paginationInfo.numberOfPages ? nextPage : undefined;
    },
  });

  // 3. مراقبة الـ Scroll: لو العنصر ظهر (inView) وهناك صفحات تالية، اطلب الصفحة الجديدة
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-5 dark:bg-gray-900 min-h-screen">
        {[1, 2, 3].map((n) => <PostSkeleton key={n} />)}
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-900 min-h-screen py-5 transition-colors duration-300">
      <div className="flex flex-col items-center">
        
        <CreatePost user={userData?.user} />

        {data?.pages?.map((page) =>
          page.posts.map((post) => <PostItems key={post._id} post={post} />)
        )}
        
        {/* 4. عنصر المراقبة (The Sentinel) */}
        <div ref={ref} className="h-20 flex justify-center items-center w-full my-10">
          {isFetchingNextPage ? (
            <div className="flex flex-col items-center space-y-2">
              <i className="fa-solid fa-spinner fa-spin fa-2x text-blue-600"></i>
              <span className="text-gray-500 text-sm">Loading more posts...</span>
            </div>
          ) : hasNextPage ? (
            <div className="h-10"></div> // مساحة فارغة للمراقبة
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No more posts to show ✨
            </p>
          )}
        </div>
      </div>
    </div>
  );
}