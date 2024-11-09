export const SkeletonLoader = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="animate-pulse">
        <div className="h-40 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 mb-2"></div>
          <div className="flex items-center">
            <div className="h-5 w-5 bg-gray-300 rounded-full mr-1"></div>
            <div className="h-4 bg-gray-300 w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );