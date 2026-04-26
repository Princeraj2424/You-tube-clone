import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {GoHome} from 'react-icons/go'
import {SiYoutubeshorts} from 'react-icons/si'
import {MdOutlineSubscriptions} from 'react-icons/md'
import {FaChevronRight} from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'  
import { SiYoutubestudio } from 'react-icons/si'
import { SiYoutubekids } from 'react-icons/si'
import { SiYoutubemusic } from 'react-icons/si'
import { SiTrendmicro } from 'react-icons/si'
import {HiOutlineShoppingBag} from 'react-icons/hi'
import {PiMusicNoteLight} from 'react-icons/pi'
import {PiFilmSlateLight} from 'react-icons/pi'
import {CgMediaLive} from 'react-icons/cg'
import {SiYoutubegaming} from 'react-icons/si'
import { FaRegNewspaper } from 'react-icons/fa'
import {TfiCup} from 'react-icons/tfi'
import {PiLightbulbLight} from 'react-icons/pi'
import {SiStylelint} from 'react-icons/si'
import {MdPodcasts} from 'react-icons/md'
import {BiVideo} from 'react-icons/bi'
import {BiLike} from 'react-icons/bi'
import {MdWatchLater} from 'react-icons/md'

const SIDEBAR_COLLAPSE_KEY = 'yt_sidebar_collapsed';

const getInitialSidebarCollapsed = () => {
    try {
        return localStorage.getItem(SIDEBAR_COLLAPSE_KEY) === 'true';
    } catch {
        return false;
    }
};

const Sidebar = () => {
    const itemClass = 'flex items-center gap-4 rounded-xl px-3 py-2.5 text-[15px] font-normal text-gray-700 hover:bg-gray-100 hover:text-black duration-150 cursor-pointer';
    const navigate = useNavigate();
    const location = useLocation();
    const currentQuery = new URLSearchParams(location.search).get('q') || '';
    const [isCollapsed, setIsCollapsed] = useState(getInitialSidebarCollapsed());

    useEffect(() => {
        const handleSidebarToggle = (event) => {
            const nextCollapsedValue = Boolean(event.detail);
            setIsCollapsed(nextCollapsedValue);
        };

        window.addEventListener('yt-sidebar-toggle', handleSidebarToggle);
        return () => window.removeEventListener('yt-sidebar-toggle', handleSidebarToggle);
    }, []);

    const externalLinks = {
        'YouTube premium': 'https://www.youtube.com/premium',
        'YouTube studio': 'https://studio.youtube.com',
        'YouTube Music': 'https://music.youtube.com',
        'YouTube kids': 'https://www.youtubekids.com',
        Help: 'https://support.google.com/youtube',
        'Send feedback': 'https://support.google.com/youtube/answer/4347644',
    };

    const routeLinks = {
        Settings: '/search?q=Settings',
        'Report history': '/search?q=Report%20history',
        History: '/history',
    };

    const handleSidebarClick = (name) => {
        if (name === 'Home') {
            navigate('/');
            return;
        }

        if (externalLinks[name]) {
            window.open(externalLinks[name], '_blank', 'noopener,noreferrer');
            return;
        }

        if (routeLinks[name]) {
            navigate(routeLinks[name]);
            return;
        }

        navigate(`/search?q=${encodeURIComponent(name)}`);
    };

    const isItemActive = (name) => {
        if (name === 'Home') return location.pathname === '/';
        if (name === 'History') return location.pathname === '/history';
        return location.pathname === '/search' && currentQuery.toLowerCase() === name.toLowerCase();
    };

    const sidebarItems = [
        {
            id:1,
            name:'Home',
            icon:<GoHome/>
        },
        {
            id:2,
            name:"Shorts",
            icon:<SiYoutubeshorts/>
        },
        {
            id:3,
            name:"Subscriptions",
            icon:<MdOutlineSubscriptions/>
        }
    ];

    const sidebarItems2 = [
        {
            id:4,
            name:"Your Channel",
            icon:<GoHome/>
        },
        {
            id:5,
            name:"History",
            icon:<SiYoutubeshorts/>
        },
        {
            id:6,
            name:"Playlists",
            icon:<MdOutlineSubscriptions/>
        },
        {
            id:7,
            name:"Your Videos",
            icon:<BiVideo/>
        },
        {
            id:8,
            name:"Watch later",
            icon:<MdWatchLater/>
        },
        {
            id:9,
            name:"Liked videos",
            icon:<BiLike/>
        }
    ];
        const sidebarItems3 = [
        {
            id:10,
            name:"Trending",
            icon:<SiTrendmicro/>
        },  
        {
            id:11,
            name:"Shopping",
            icon:<HiOutlineShoppingBag/>
        },
        {
            id:12,          
            name:"Music",
            icon:<PiMusicNoteLight/>
        },
        {
            id:13,
            name:"Films",
            icon:<PiFilmSlateLight/>
        },
        {
            id:14,
            name:"Live",
            icon:<CgMediaLive/>
        },  
        {
            id:15,
            name:"Gaming",
            icon:<SiYoutubegaming/>
        },
        {
            id:16,
            name:"News",
            icon:<FaRegNewspaper/>
        },
        {
            id:17,
            name:"Sports",
            icon:<TfiCup/>
        },
        {
            id:18,
            name:"Courses",
            icon:<PiLightbulbLight/>
        },
        {
            id:19,
            name:"Fashion & Beauty",
            icon:<SiStylelint/>
        },
        {
            id:20,
            name:"Podcasts",
            icon:<MdPodcasts/>
        },
    ];
    const sidebarItems4 = [
        {
            id:21,
            name:"YouTube premium",
            icon:<FaYoutube/>
        },
        {
            id:22,
            name:"YouTube studio",
            icon:<SiYoutubestudio/>
        },
        {
            id:23,
            name:"YouTube Music",
            icon:<SiYoutubemusic/>
        },
        {
            id:24,
            name:"YouTube kids",
            icon:<SiYoutubekids/>
        },
    ];
    const sidebarItems5 = [
        {
            id:25,
            name:"Settings",
            icon:<FaYoutube/>
        },
        {
            id:26,
            name:"Report history",
            icon:<SiYoutubestudio/>
        },
        {
            id:27,
            name:"Help",
            icon:<SiYoutubemusic/>
        },
        {
            id:28,
            name:"Send feedback",
            icon:<SiYoutubekids/>
        },
    ];



  return (
    <aside className={`hidden lg:block shrink-0 h-[calc(100vh-72px)] overflow-y-auto border-r border-gray-200 pr-1 transition-all duration-200 ${isCollapsed ? 'w-20' : 'w-60'}`}>
        {isCollapsed ? (
            <div className='space-y-1 px-1 py-2'>
                {sidebarItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleSidebarClick(item.name)}
                        className={`w-full rounded-xl px-1 py-3 text-gray-700 hover:bg-gray-100 ${isItemActive(item.name) ? 'bg-gray-100 text-black' : ''}`}
                    >
                        <div className='flex flex-col items-center gap-1'>
                            <span className='text-xl'>{item.icon}</span>
                            <span className='text-[11px] font-medium leading-3'>{item.name}</span>
                        </div>
                    </button>
                ))}
            </div>
        ) : (
            <>
        {/*Home*/}
        <div className='space-y-1 px-2 py-3'>
            {sidebarItems.map((item)=>(
                <div
                    key={item.id}
                    onClick={() => handleSidebarClick(item.name)}
                    className={`${itemClass} ${isItemActive(item.name) ? 'bg-gray-100 text-black font-semibold' : ''}`}
                >
                    <div className='text-xl'>{item.icon}</div>
                    <span className='leading-6'>{item.name}</span>
                </div>
            ))}

             </div>
            <hr className='border-gray-200 mx-2' />
            {/*you*/}
             <div className='px-2 py-3'>
                <div className='flex items-center gap-2 px-3 py-1.5'>
                    <span className='text-lg font-semibold text-gray-800'>You</span>
                    <FaChevronRight className='text-xs' />
                </div>
            {sidebarItems2.map((item)=>(
                <div
                    key={item.id}
                    onClick={() => handleSidebarClick(item.name)}
                    className={`${itemClass} ${isItemActive(item.name) ? 'bg-gray-100 text-black font-semibold' : ''}`}
                >
                    <div className='text-xl'>{item.icon}</div>
                    <span className='leading-6'>{item.name}</span>
                </div>
            ))}

             </div>
            <hr className='border-gray-200 mx-2' />

            {/*Explore*/}

             <div className='px-2 py-3'>
                <div className='flex items-center gap-2 px-3 py-1.5'>
                    <span className='text-lg font-semibold text-gray-800'>Explore</span>
                </div>
            {sidebarItems3.map((item)=>(
                <div
                    key={item.id}
                    onClick={() => handleSidebarClick(item.name)}
                    className={`${itemClass} ${isItemActive(item.name) ? 'bg-gray-100 text-black font-semibold' : ''}`}
                >
                    <div className='text-xl'>{item.icon}</div>
                    <span className='leading-6'>{item.name}</span>
                </div>
            ))}

             </div>

            <hr className='border-gray-200 mx-2' />
            {/*More from youtube*/}

            <div className='px-2 py-3'>
                <div className='flex items-center gap-2 px-3 py-1.5'>
                    <span className='text-lg font-semibold text-gray-800'>More from YouTube</span>
                </div>
            {sidebarItems4.map((item)=>(
                <div
                    key={item.id}
                    onClick={() => handleSidebarClick(item.name)}
                    className={`${itemClass} ${isItemActive(item.name) ? 'bg-gray-100 text-black font-semibold' : ''}`}
                >
                    <div className='text-xl text-red-500'>{item.icon}</div>
                    <span className='leading-6'>{item.name}</span>
                </div>
            ))}

             </div>
                <hr className='border-gray-200 mx-2' />
             {/*settings*/}

              <div className='px-2 py-3'>
                <div className='flex items-center gap-2 px-3 py-1.5'>
                    <span className='text-lg font-semibold text-gray-800'>Settings</span>
                </div>
            {sidebarItems5.map((item)=>(
                <div
                    key={item.id}
                    onClick={() => handleSidebarClick(item.name)}
                    className={`${itemClass} ${isItemActive(item.name) ? 'bg-gray-100 text-black font-semibold' : ''}`}
                >
                    <div className='text-xl'>{item.icon}</div>
                    <span className='leading-6'>{item.name}</span>
                </div>
            ))}

             <hr/>
             </div>

             <div className='px-5 py-3 space-y-5 text-[11px] font-medium text-gray-500'>
                <div className='flex flex-wrap gap-x-3 leading-6'>
                    <span>About</span>
                    <span>Press</span>
                    <span>Copyright</span>
                    <span>Contact us</span>
                    <span>Creators</span>
                    <span>Advertise</span>
                    <span>Developers</span>
                </div>

                <div className='flex flex-wrap gap-x-3 leading-6'>
                    <span>Terms</span>
                    <span>Privacy</span>
                    <span>Policy & Safety</span>
                    <span>How YouTube works</span>
                    <span>Test new features</span>
                </div>

                  <span className='block text-xs text-gray-500'>© 2026 Google LLC</span>
             </div>
            </>
        )}
              </aside>
    )

}

export default Sidebar
