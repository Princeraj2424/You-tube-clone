import React from 'react'
import { Link } from 'react-router-dom'
import Time from '../loader/Time'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { abbreviateNumber } from 'js-abbreviation-number'

const SearchCard = ({video}) => {
  const thumbnailUrl = video?.thumbnails?.[0]?.url || "";
  const channelAvatar = video?.author?.avatar?.[0]?.url || "";

  return (
    <article className="group w-full">
      <Link to={`/video/${video?.videoId}`}>
        <div className="flex flex-col gap-3 rounded-xl p-2 transition-colors duration-200 hover:bg-gray-50 sm:flex-row sm:gap-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 sm:w-[360px] sm:min-w-[360px]">
            <img
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              src={thumbnailUrl}
              alt={video?.title || "video thumbnail"}
            />
            {video?.lengthSeconds && <Time time={video?.lengthSeconds} />}
          </div>

          <div className="min-w-0">
            <h3 className="line-clamp-2 text-[18px] font-semibold leading-6 text-gray-900">
              {video?.title}
            </h3>

            <div className="mt-2 flex items-center text-sm text-gray-600">
              <span>{`${abbreviateNumber(video?.stats?.views || 0, 2)} views`}</span>
              <span className="mx-2">•</span>
              <span>{video?.publishedTimeText}</span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
              <div className="h-7 w-7 overflow-hidden rounded-full border border-gray-200">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={channelAvatar}
                  alt={video?.author?.title || "channel avatar"}
                />
              </div>
              <span className="flex min-w-0 items-center truncate">
                {video?.author?.title}
                {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="ml-1 text-[12px] text-gray-600" />
                )}
              </span>
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-gray-600">
              {video?.descriptionSnippet || "Watch this video for more details."}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default SearchCard
