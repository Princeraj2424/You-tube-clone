import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";
import { fetchData } from "../utils/rapidapi";
import SuggestedVideo from "./SuggestedVideo";

const PlayingVideo = () => {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { id } = useParams();

  const channelTitle = video?.author?.title || "Channel";
  const channelAvatar =
    video?.author?.avatar?.[2]?.url ||
    video?.author?.avatar?.[1]?.url ||
    video?.author?.avatar?.[0]?.url ||
    video?.author?.avatar?.[0]?.thumbnails?.[0]?.url ||
    "";
  const channelInitials = channelTitle
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  useEffect(() => {
    if (!id) return;

    fetchData(`video/details/?id=${id}`).then((res) => {
      setVideo(res);
    });

    fetchData(`video/related-contents/?id=${id}`).then((res) => {
      const normalizedRelatedVideos = Array.isArray(res?.contents)
        ? res.contents
        : Array.isArray(res)
          ? res
          : [];
      setRelatedVideos(normalizedRelatedVideos);
    });
  }, [id]);

  return (
    <div className="w-full px-3 md:px-6 py-4">
      <div className="mx-auto flex w-full max-w-375 flex-col gap-6 xl:flex-row">
        <div className="min-w-0 flex-1">
          <div className="overflow-hidden rounded-2xl bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${id}?autoplay=1`}
              title="YouTube video player"
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <h1 className="mt-4 text-base font-bold text-gray-900 md:text-2xl">
            {video?.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700">
                {channelAvatar ? (
                  <img
                    className="h-full w-full object-cover"
                    src={channelAvatar}
                    alt={channelTitle}
                  />
                ) : (
                  <span>{channelInitials || "CH"}</span>
                )}
              </div>
              <div>
                <div className="flex items-center text-sm font-semibold text-gray-900 md:text-base">
                  {channelTitle}
                  {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="ml-1 text-xs text-gray-600" />
                  )}
                </div>
                <div className="text-xs text-gray-600 md:text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
              <button className="ml-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700">
                Subscribe
              </button>
            </div>

            <div className="flex w-full items-center gap-3 sm:ml-auto sm:w-auto">
              <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-800">
                <AiOutlineLike className="text-lg" />
                <span>{abbreviateNumber(video?.stats?.likes || 0, 2)}</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-800">
                <AiOutlineLike className="rotate-180 text-lg" />
                <span>{abbreviateNumber(video?.stats?.dislikes || 0, 2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-gray-100 p-4 text-sm text-gray-800">
            <div className="mb-2 font-semibold text-gray-900">
              {abbreviateNumber(video?.stats?.views || 0, 2)} views
            </div>
            <p className="whitespace-pre-wrap">{video?.description}</p>
          </div>
        </div>

        <aside className="w-full xl:w-95 xl:shrink-0">
          <h3 className="mb-2 text-sm font-semibold text-gray-700">Suggested videos</h3>
          <div className="space-y-3">
            {relatedVideos.map((item, index) => {
              const itemVideo = item?.video || item;
              if (!itemVideo?.videoId) return null;

              return <SuggestedVideo key={itemVideo.videoId || index} video={itemVideo} />;
            })}
            {relatedVideos.length === 0 && (
              <p className="text-sm text-gray-500">No suggested videos available for this item.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PlayingVideo;
 