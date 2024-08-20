import { Link } from "react-router-dom";

function AppliedJobCardComponent({ appliedJobInfo, applied_at }) {

  return (
    <Link to={`/jobs/${appliedJobInfo?.id}`}>
      <div className="flex flex-col gap-4 md:flex-row w-full bg-slate-100 rounded-lg p-4 m-2">
        <div className="flex flex-row gap-4 md:gap-8 items-center w-full md:w-2/3">
          <div className="flex-shrink-0">
            <img
              className="w-16 h-16 bg-gray-200 rounded-full"
              src={appliedJobInfo.thumbnail || "https://d2jhcfgvzjqsa8.cloudfront.net/storage/2022/04/download.png.webp"}
              alt={`${appliedJobInfo.company_name} logo`}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <div>
              <a className="text-lg font-semibold text-gray-800 text-start line-clamp-1 hover:underline">
                {appliedJobInfo.title}
              </a>
            </div>
            <span className="text-gray-500 text-start leading-relaxed line-clamp-2">
              {appliedJobInfo.description}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start w-full md:w-1/3">
          <div>
            <a href="#" className="text-lg font-semibold text-gray-800 text-start line-clamp-1 hover:underline">
              {appliedJobInfo.company_name}
            </a>
          </div>
          <span className="text-gray-500 text-start leading-relaxed line-clamp-2">
            Location: {appliedJobInfo.location}
          </span>
          <div className="text-gray-500 text-start leading-relaxed line-clamp-2">
            Applied: {new Date(applied_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AppliedJobCardComponent;
