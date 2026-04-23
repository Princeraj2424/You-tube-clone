import React from 'react'
import { Link } from 'react-router-dom'
import Time from '../loader/Time'
import { abbreviateNumber } from 'js-abbreviation-number'

function SuggestedVideo({ video }) {
    const thumbnailUrl = video?.thumbnails?.[0]?.url || video?.thumbnail

  return (
        <Link to={`/video/${video?.videoId}`}>
            <div className='flex gap-3 rounded-xl p-2 hover:bg-gray-100 duration-200'>
                <div className='relative w-40 min-w-40 lg:w-32 lg:min-w-32 xl:w-40 xl:min-w-40 overflow-hidden rounded-lg'>
                    <img
                        className='h-full w-full object-cover'
                        src={thumbnailUrl}
                        alt={video?.title || 'related video thumbnail'}
                    />
                    {video?.lengthSeconds && <Time time={video?.lengthSeconds} />}
                </div>

                <div className='flex flex-col overflow-hidden'>
                    <span className='text-sm lg:text-xs xl:text-sm font-bold line-clamp-2'>
                        {video?.title}
                    </span>
                    <span className='text-xs text-gray-600 truncate mt-1'>
                        {video?.author?.title}
                    </span>
                    <div className='flex items-center text-xs font-semibold text-gray-600 truncate mt-1'>
                        <span>{`${abbreviateNumber(video?.stats?.views || 0, 2)} views`}</span>
                        <span className='mx-1'>•</span>
                        <span className='truncate'>{video?.publishedTimeText}</span>
                    </div>
                </div>
            </div>
        </Link>
  )
}

export default SuggestedVideo
