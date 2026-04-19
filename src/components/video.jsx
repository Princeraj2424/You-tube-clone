import React from "react";
import { Link } from "react-router-dom";
import Time from "../loader/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

function Video({ video }) {
  console.log(video);

  return (
    <div className="group">
      <Link to={`/video/${video?.videoId}`}>
        <div className="flex flex-col">
          {/* thumbnail & duration */}
          <div className="relative h-48 md:h-52 rounded-xl overflow-hidden bg-gray-100 transition-all duration-200 group-hover:rounded-none">
            <img
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              src={video?.thumbnails[0]?.url}
              alt={video?.title || "video thumbnail"}
            />
            {video?.lengthSeconds && <Time time={video?.lengthSeconds} />}
          </div>
          {/* channerl logo & title */}
          <div className="flex mt-3 gap-3">
            <div className="flex items-start pt-0.5">
              <div className="flex h-9 w-9 rounded-full overflow-hidden border border-gray-200">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={video?.author?.avatar[0].url}
                  alt={video?.author?.title || "channel avatar"}
                />
              </div>
            </div>
            <div className="min-w-0">
              <span className="block text-sm font-semibold text-gray-900 line-clamp-2 leading-5">
                {video?.title}
              </span>
              <span className="flex items-center font-medium mt-1.5 text-[12px] text-gray-600 truncate">
                {video?.author?.title}
                {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-gray-600 ml-1 text-[12px]" />
                )}
              </span>
              <div className="flex items-center text-gray-500 text-[12px] mt-0.5">
                <span>{`${abbreviateNumber(
                  video?.stats?.views,
                  2
                )} views`}</span>
                <span className="mx-1.5 text-[10px] leading-none">•</span>
                <span className="truncate">{video?.publishedTimeText}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Video;