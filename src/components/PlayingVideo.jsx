import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { RiShareForwardLine, RiPlayListAddLine } from "react-icons/ri";
import { BiLike, BiDislike } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { BsPinAngleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";
import { fetchData } from "../utils/rapidapi";
import SuggestedVideo from "./SuggestedVideo";
import { useAuth } from "../Context/AuthContext";

const WATCH_HISTORY_KEY = "yt_watch_history";

const saveWatchHistory = (videoData) => {
  try {
    const cachedValue = localStorage.getItem(WATCH_HISTORY_KEY);
    const parsed = cachedValue ? JSON.parse(cachedValue) : [];
    const history = Array.isArray(parsed) ? parsed : [];

    const nextHistory = [
      videoData,
      ...history.filter((item) => item?.videoId !== videoData?.videoId),
    ].slice(0, 50);

    localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(nextHistory));
  } catch {
    // Ignore history persistence failures for private browsing/storage limits.
  }
};

const PlayingVideo = () => {
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

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

  const comments = [
    {
      id: 1,
      author: "Alex Dev",
      text: "Clean breakdown. This looks very close to the real YouTube watch flow now.",
      time: "2 hours ago",
      likes: 128,
      isPinned: true,
      creatorReply: "Thanks for watching. More UI upgrades are coming next.",
    },
    {
      id: 2,
      author: "Frontend Studio",
      text: "Great UI spacing and card proportions. Maybe add pinned comment next.",
      time: "5 hours ago",
      likes: 83,
    },
  ];

  useEffect(() => {
    if (!id) return;

    fetchData(`video/details/?id=${id}`).then((res) => {
      setVideo(res);
      if (res?.videoId) {
        saveWatchHistory({
          videoId: res.videoId,
          title: res.title,
          thumbnails: res.thumbnails,
          lengthSeconds: res.lengthSeconds,
          author: res.author,
          stats: res.stats,
          publishedTimeText: res.publishedTimeText,
          descriptionSnippet: res.description,
        });
      }
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

  const handleLoginToComment = () => {
    navigate(`/signin?next=${encodeURIComponent(location.pathname + location.search)}`);
  };

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
              <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
                <RiShareForwardLine className="text-lg" />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200">
                <RiPlayListAddLine className="text-lg" />
                <span>Save</span>
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-gray-100 p-4 text-sm text-gray-800">
            <div className="mb-2 font-semibold text-gray-900">
              {abbreviateNumber(video?.stats?.views || 0, 2)} views
            </div>
            <p className={`whitespace-pre-wrap ${showFullDescription ? "" : "line-clamp-4"}`}>
              {video?.description}
            </p>
            <button
              onClick={() => setShowFullDescription((previous) => !previous)}
              className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-700 hover:text-black"
            >
              {showFullDescription ? "Show less" : "Show more"}
            </button>
          </div>

          <section className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">{comments.length} Comments</h2>
              <span className="text-xs text-gray-500">Sort by Top comments</span>
            </div>

            <div className="mb-5 flex items-start gap-3">
              <img
                src={isAuthenticated ? user?.avatar || "/profile.jpg" : "/profile.jpg"}
                alt="Current user"
                className="h-9 w-9 rounded-full object-cover"
              />
              {isAuthenticated ? (
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full border-b border-gray-300 bg-transparent pb-2 text-sm outline-none placeholder:text-gray-500 focus:border-gray-500"
                />
              ) : (
                <button
                  onClick={handleLoginToComment}
                  className="rounded-full border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                >
                  Sign in to comment
                </button>
              )}
            </div>

            <div className="space-y-5">
              {comments.map((comment) => (
                <article key={comment.id} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                    {comment.author.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    {comment.isPinned && (
                      <div className="mb-1 flex items-center gap-1 text-[11px] text-gray-500">
                        <BsPinAngleFill className="text-[11px]" />
                        <span>Pinned by {channelTitle}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="font-semibold text-gray-800">{comment.author}</span>
                      <span>{comment.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-800">{comment.text}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
                      <button className="flex items-center gap-1 hover:text-gray-900">
                        <BiLike className="text-base" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="hover:text-gray-900">
                        <BiDislike className="text-base" />
                      </button>
                      <button className="font-medium hover:text-gray-900">Reply</button>
                    </div>

                    {comment.creatorReply && (
                      <div className="mt-3 rounded-xl bg-gray-50 px-3 py-2">
                        <div className="flex items-center gap-2 text-[11px] text-gray-500">
                          <span className="font-semibold text-gray-700">{channelTitle}</span>
                          <AiFillHeart className="text-red-500" />
                          <span>Creator heart</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">{comment.creatorReply}</p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
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
 