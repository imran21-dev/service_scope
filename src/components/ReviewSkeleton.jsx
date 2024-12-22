

const ReviewSkeleton = () => {
    return (
        <div className="flex  flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="skeleton h-9 w-9 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-1 w-20"></div>
            <div className="skeleton h-1 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-20 w-full"></div>
        <div className="flex items-center gap-2">
          <div className="skeleton h-9 w-9 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-6 w-32"></div>
           
          </div>
        </div>
      </div>
    );
};

export default ReviewSkeleton;