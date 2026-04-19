import React from "react";
import { Link } from "react-router-dom";
import Time from "../loader/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

function Video({ video }) {
  return (
    <article className="group">
      <Link to={`/video/${video?.videoId}`}>
        <div className="flex flex-col rounded-2xl border border-transparent bg-white p-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-md">
          {/* thumbnail & duration */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
            <img
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              src={video?.thumbnails[0]?.url}
              alt={video?.title || "video thumbnail"}
            />
            {video?.lengthSeconds && <Time time={video?.lengthSeconds} />}
          </div>
          {/* channerl logo & title */}
          <div className="flex mt-3 gap-3">
            <div className="flex items-start pt-0.5">
              <div className="flex h-10 w-10 rounded-full overflow-hidden border border-gray-200">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={video?.author?.avatar[0].url}
                  alt={video?.author?.title || "channel avatar"}
                />
              </div>
            </div>
            <div className="min-w-0">
              <span className="block text-[15px] font-semibold text-gray-900 line-clamp-2 leading-5">
                {video?.title}
              </span>
              <span className="flex items-center font-medium mt-1.5 text-[13px] text-gray-600 truncate">
                {video?.author?.title}
                {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-gray-600 ml-1 text-[12px]" />
                )}
              </span>
              <div className="flex items-center text-gray-500 text-xs mt-1">
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
    </article>
  );
}

export default Video;