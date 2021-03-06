import React, { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import {Link} from 'gatsby'
import {VscOctoface} from 'react-icons/vsc'

const HeaderItem = ({text, to}) => {
    return (
        <Link to={to}>
            <a class="px-5 py-3 rounded-md hover:bg-background-hover block lg:inline-block lg:mt-0 text-font">
                {text}
            </a>
        </Link>
    )
}

const Header = ({ title }) => {
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const handleMenuClicked = (e) => {
        setIsMenuOpened(!isMenuOpened)
    }

    const menuButton = (
        <button onClick={handleMenuClicked}>
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
    )
    return (
        <nav class="flex items-center justify-between flex-wrap p-6">
            <div class="flex items-center flex-shrink-0 text-textTitle mr-6">
                <VscOctoface className='fill-current h-8 w-8 mr-2'/>
                <Link to='/'>
                    <span class="font-semibold text-xl tracking-tight">{title}</span>
                </Link>
            </div>
            <div class="block lg:hidden">
                <button class="flex items-center px-3 py-2 border rounded text-font border-font hover:border-white">
                    {menuButton}
                </button>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto` + (isMenuOpened ? '' : ' hidden')}>
                {/* LEFT HEADER */}
                <div class="text-sm lg:flex-grow">
                    <HeaderItem text='Blog' to='/'/>
                    <HeaderItem text='About' to='/resume'/>
                </div>
                {/* RIGHT HEADER */}
                <div>
                    <div className='ml-4'>
                        <ThemeToggle />
                    </div>
                    {/* <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a> */}
                </div>
            </div>
        </nav>
    )

    // return (
    //     <div className="w-full flex justify-between items-center py-8 px-4">
    //         <div>
    //             <Link
    //                 className="border-none text-textTitle font-medium text-2xl"
    //                 style={{
    //                     boxShadow: 'none',
    //                     textDecoration: 'none',
    //                 }}
    //                 to={'/'}
    //             >
    //                 {title}
    //             </Link>
    //         </div>
    //         <div className="font-normal text-xl flex items-center">
    //             <span className="px-5 py-3 hover:bg-background-hover rounded-md mr-3">
    //                 About
    //             </span>
    //             <ThemeToggle />
    //         </div>
    //     </div>
    // )
}

export default Header