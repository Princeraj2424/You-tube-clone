import React from 'react'
import { useNavigate } from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai'
import {CiSearch} from 'react-icons/ci'
import {MdKeyboardVoice} from 'react-icons/md'
import {RiVideoAddLine} from 'react-icons/ri'
import {AiOutlineBell} from 'react-icons/ai'

const Navbar = () => {
    const [searchQuery, setSearchQuery] = React.useState('')
    const navigate = useNavigate()

    const handleSearch = () => {
        const query = searchQuery.trim()
        if (!query) return
        navigate(`/search?q=${encodeURIComponent(query)}`)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

  return (
    <div className='flex items-center justify-between px-6 py-2'>
        <div className='flex items-center space-x-4'>
            <AiOutlineMenu className='text-2xl cursor-pointer'/>
            <img src='/logo.png' alt="Logo" className='w-28 cursor-pointer' />
        </div>
        <div className='flex items-center w-[40%]'>
            <div className='w-full px-3 py-2 border border-gray-300 rounded-l-full'>
                <input
                    type='text'
                    placeholder='search'
                    className='w-full outline-none'
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <button onClick={handleSearch} className='px-4 py-2 border border-l-0 border-gray-300 bg-gray-100 rounded-r-full'>
                <CiSearch size={24}/>
            </button>
            <button
                className='ml-3 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 duration-200'
                aria-label='Search with voice'
            >
                <MdKeyboardVoice size={20} />
            </button>
        </div>
        <div className='flex items-center space-x-5'>
            <RiVideoAddLine className='text-2xl cursor-pointer'/>
            <AiOutlineBell className='text-2xl cursor-pointer'/>
            <img src='/profile.jpg' alt='Profile' className='w-8 h-8 rounded-full cursor-pointer object-cover'/>

        </div>
    </div>
  )
}

export default Navbar
