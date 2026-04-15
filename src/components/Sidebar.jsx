import React from 'react'
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

const Sidebar = () => {
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
    <div className='w-60 max-h-[calc(100vh-64px)] overflow-y-auto border-r border-gray-200'>
        {/*Home*/}
        <div className='space-y-1 px-2 py-2'>
            {sidebarItems.map((item)=>(
                <div key={item.id} className='flex items-center gap-4 hover:bg-gray-200 duration-200 rounded-xl px-3 py-2 cursor-pointer'>
                    <div className='text-xl cursor-pointer'>{item.icon}</div>
                    <span className='text-sm'>{item.name}</span>
                </div>
            ))}

             </div>
            <hr className='border-gray-200 mx-2' />
            {/*you*/}
             <div className='px-2 py-2'>
                <div className='flex items-center gap-2 px-3 py-1'>
                    <span className='text-sm font-medium'>You</span>
                    <FaChevronRight className='text-xs' />
                </div>
            {sidebarItems2.map((item)=>(
                <div key={item.id} className='flex items-center gap-4 hover:bg-gray-200 duration-200 rounded-xl px-3 py-2 cursor-pointer'>
                    <div className='text-xl cursor-pointer'>{item.icon}</div>
                    <span className='text-sm'>{item.name}</span>
                </div>
            ))}

             </div>
            <hr className='border-gray-200 mx-2' />

            {/*Explore*/}

             <div className='px-2 py-2'>
                <div className='flex items-center gap-2 px-3 py-1'>
                    <span className='text-sm font-medium'>Explore</span>
                </div>
            {sidebarItems3.map((item)=>(
                <div key={item.id} className='flex items-center gap-4 hover:bg-gray-200 duration-200 rounded-xl px-3 py-2 cursor-pointer'>
                    <div className='text-xl cursor-pointer text'>{item.icon}</div>
                    <span className='text-sm'>{item.name}</span>
                </div>
            ))}

             </div>

            <hr className='border-gray-200 mx-2' />
            {/*More from youtube*/}

            <div className='px-2 py-2'>
                <div className='flex items-center gap-2 px-3 py-1'>
                    <span className='text-sm font-medium'>More from YouTube</span>
                </div>
            {sidebarItems4.map((item)=>(
                <div key={item.id} className='flex items-center gap-4 hover:bg-gray-200 duration-200 rounded-xl px-3 py-2 cursor-pointer'>
                    <div className='text-xl cursor-pointer text-red-500'>{item.icon}</div>
                    <span className='text-sm'>{item.name}</span>
                </div>
            ))}

             </div>
                <hr className='border-gray-200 mx-2' />
             {/*settings*/}

              <div className='px-2 py-2'>
                <div className='flex items-center gap-2 px-3 py-1'>
                    <span className='text-sm font-medium'>Settings</span>
                </div>
            {sidebarItems5.map((item)=>(
                <div key={item.id} className='flex items-center gap-4 hover:bg-gray-200 duration-200 rounded-xl px-3 py-2 cursor-pointer'>
                    <div className='text-xl cursor-pointer'>{item.icon}</div>
                    <span className='text-sm'>{item.name}</span>
                </div>
            ))}

             <hr/>
             </div>

             <div className='px-5 py-3 space-y-5 text-sm font-semibold text-gray-500'>
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

                <span className='block text-base text-gray-500'>© 2026 Google LLC</span>
             </div>

         </div>
    )

}

export default Sidebar
