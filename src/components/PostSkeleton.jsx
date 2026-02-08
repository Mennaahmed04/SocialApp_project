export default function PostSkeleton() {
  return (
    <div className="w-[95%] md:w-[700px] mx-auto bg-white dark:bg-gray-800 rounded-md shadow-md p-4 my-5 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center mb-4">
        <div className="rounded-full bg-gray-300 dark:bg-gray-700 h-10 w-10 mr-3"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
        </div>
      </div>

      {/* Body Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>

      {/* Image Skeleton */}
      <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg w-full mb-4"></div>

      {/* Footer Skeleton */}
      <div className="flex justify-between border-t dark:border-gray-700 pt-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
      </div>
    </div>
  );
}