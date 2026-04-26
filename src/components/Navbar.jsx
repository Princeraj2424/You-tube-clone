import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import {AiOutlineMenu} from 'react-icons/ai'
import {CiSearch} from 'react-icons/ci'
import {MdKeyboardVoice} from 'react-icons/md'
import {RiVideoAddLine} from 'react-icons/ri'
import {AiOutlineBell} from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'

const RECENT_SEARCH_KEY = 'yt_recent_searches'
const SIDEBAR_COLLAPSE_KEY = 'yt_sidebar_collapsed'

const readRecentSearches = () => {
    try {
        const cachedValue = localStorage.getItem(RECENT_SEARCH_KEY)
        const parsed = cachedValue ? JSON.parse(cachedValue) : []
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

const saveRecentSearches = (items) => {
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(items.slice(0, 8)))
}

function Navbar() {

    const [searchQuery, setSearchQuery] = React.useState('')
    const [showSearchHistory, setShowSearchHistory] = React.useState(false)
    const [recentSearches, setRecentSearches] = React.useState(() => readRecentSearches())
    const inputRef = React.useRef(null)
    const profileMenuRef = React.useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    const {
        user,
        isAuthenticated,
        logout,
    } = useAuth()
    const [showProfileMenu, setShowProfileMenu] = React.useState(false)

    React.useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
                event.preventDefault()
                inputRef.current?.focus()
            }

            if (event.key === 'Escape' && showProfileMenu) {
                setShowProfileMenu(false)
            }
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [showProfileMenu])

    React.useEffect(() => {
        const onMouseDown = (event) => {
            if (showProfileMenu && profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false)
            }
        }

        document.addEventListener('mousedown', onMouseDown)
        return () => document.removeEventListener('mousedown', onMouseDown)
    }, [showProfileMenu])

    React.useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const currentQuery = searchParams.get('q') || ''
        setSearchQuery(currentQuery)
    }, [location.search])

    const updateRecentSearches = (query) => {
        const normalizedQuery = query.trim()
        if (!normalizedQuery) return

        const nextRecentSearches = [
            normalizedQuery,
            ...recentSearches.filter((item) => item.toLowerCase() !== normalizedQuery.toLowerCase())
        ]
        setRecentSearches(nextRecentSearches)
        saveRecentSearches(nextRecentSearches)
    }

    const handleSearch = () => {
        const query = searchQuery.trim()
        if (!query) return
        updateRecentSearches(query)
        setShowSearchHistory(false)
        navigate(`/search?q=${encodeURIComponent(query)}`)
    }

    const handleHistorySearch = (query) => {
        setSearchQuery(query)
        updateRecentSearches(query)
        setShowSearchHistory(false)
        navigate(`/search?q=${encodeURIComponent(query)}`)
    }

    const handleClearHistory = () => {
        setRecentSearches([])
        localStorage.removeItem(RECENT_SEARCH_KEY)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    const handleToggleSidebar = () => {
        const currentValue = localStorage.getItem(SIDEBAR_COLLAPSE_KEY) === 'true'
        const nextValue = !currentValue
        localStorage.setItem(SIDEBAR_COLLAPSE_KEY, String(nextValue))
        window.dispatchEvent(new CustomEvent('yt-sidebar-toggle', { detail: nextValue }))
    }

    const handleLogin = () => {
        navigate(`/signin?next=${encodeURIComponent(location.pathname + location.search)}`)
    }

    const handleLogout = () => {
        logout()
        setShowProfileMenu(false)
    }

  return (
    <header className='sticky top-0 z-50 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80 border-b border-gray-100'>
    <div className='flex h-14 items-center justify-between px-3 md:px-6 gap-2'>
        <div className='flex shrink-0 items-center space-x-2 md:space-x-4'>
            <button onClick={handleToggleSidebar} className='rounded-full p-2 hover:bg-gray-100' aria-label='Toggle sidebar'>
                <AiOutlineMenu className='text-2xl cursor-pointer'/>
            </button>
            <img src='/logo.png' alt="Logo" className='w-24 md:w-28 cursor-pointer' onClick={() => navigate('/')} />
        </div>
        <div className='flex min-w-0 items-center w-full max-w-xl'>
            <div className='relative w-full'>
            <div className='w-full px-3 py-2 border border-gray-300 rounded-l-full'>
                <input
                    ref={inputRef}
                    type='text'
                    placeholder='search'
                    className='w-full outline-none'
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSearchHistory(true)}
                    onBlur={() => setTimeout(() => setShowSearchHistory(false), 120)}
                />
            </div>
            {showSearchHistory && recentSearches.length > 0 && (
                <div className='absolute left-0 right-0 top-[110%] rounded-xl border border-gray-200 bg-white shadow-lg p-2'>
                    <div className='mb-1 flex items-center justify-between px-2'>
                        <span className='text-xs font-semibold text-gray-500'>Recent searches</span>
                        <button className='text-xs text-gray-500 hover:text-gray-700' onMouseDown={handleClearHistory}>Clear</button>
                    </div>
                    {recentSearches.map((item) => (
                        <button
                            key={item}
                            className='w-full rounded-lg px-2 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-100'
                            onMouseDown={() => handleHistorySearch(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
            </div>
            <button onClick={handleSearch} className='px-4 py-2 border border-l-0 border-gray-300 bg-gray-100 rounded-r-full'>
                <CiSearch size={24}/>
            </button>
            <button
                className='ml-2 md:ml-3 w-10 h-10 hidden sm:flex items-center justify-center rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 duration-200'
                aria-label='Search with voice'
            >
                <MdKeyboardVoice size={20} />
            </button>
        </div>
        <div className='flex shrink-0 items-center gap-2 lg:gap-3'>
            <button className='hidden md:flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100' aria-label='Create'>
                <RiVideoAddLine className='text-2xl cursor-pointer'/>
            </button>
            <button className='relative hidden md:flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100' aria-label='Notifications'>
                <AiOutlineBell className='text-2xl cursor-pointer'/>
                <span className='absolute right-1.5 top-1.5 flex h-4 min-w-4 translate-x-1/3 -translate-y-1/3 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white'>3</span>
            </button>
            {isAuthenticated ? (
                <div className='relative' ref={profileMenuRef}>
                    <button
                        onClick={() => setShowProfileMenu((previous) => !previous)}
                        className='rounded-full p-0.5 hover:bg-gray-100'
                        aria-label='Profile'
                    >
                        <img src={user?.avatar || '/profile.jpg'} alt='Profile' className='w-8 h-8 rounded-full cursor-pointer object-cover'/>
                    </button>

                    {showProfileMenu && (
                        <div className='absolute right-0 top-[120%] w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl'>
                            <div className='flex items-center gap-3 border-b border-gray-100 px-3 py-3'>
                                <img src={user?.avatar || '/profile.jpg'} alt='Profile' className='h-10 w-10 rounded-full object-cover'/>
                                <div className='min-w-0'>
                                    <div className='truncate text-sm font-semibold text-gray-900'>{user?.name}</div>
                                    <div className='truncate text-xs text-gray-500'>{user?.email}</div>
                                </div>
                            </div>
                            <div className='p-2'>
                                <button
                                    onClick={() => {
                                        navigate('/history')
                                        setShowProfileMenu(false)
                                    }}
                                    className='w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
                                >
                                    Your channel
                                </button>
                                <button
                                    onClick={() => {
                                        navigate('/history')
                                        setShowProfileMenu(false)
                                    }}
                                    className='mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
                                >
                                    Watch history
                                </button>
                            </div>
                            <div className='border-t border-gray-100 p-2'>
                            <button
                                onClick={handleLogout}
                                className='w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100'
                            >
                                Sign out
                            </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={handleLogin}
                    className='inline-flex items-center gap-1.5 rounded-full border border-blue-500 px-3 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-50'
                >
                    <AiOutlineUser className='text-base' />
                    Sign in
                </button>
            )}

        </div>
    </div>
    </header>
  )
}

export default Navbar
