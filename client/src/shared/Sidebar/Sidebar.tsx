import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
/* import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'; */

import { 
    IoHomeOutline, 
    IoNotificationsOutline, 
    IoSendOutline, 
    IoBookmarkOutline, 
    IoPersonOutline, 
    IoHeartDislikeOutline } from 'react-icons/io5';

import { useUIStore, useUserStore } from '../../store';

export const Sidebar = () => {

    const [profile, setProfile] = useState<boolean>(false);
    const nav = useNavigate();
    const location = useLocation();
    const openSideMenu = useUIStore( state => state.openSideMenu );
    const user = useUserStore( state => state.user );

    const selectPage = (page: string): string => {
        if (location.pathname === `/${page}`) return 'text-blue-500';

        return 'text-slate-700';
    }

    return (
        <div className="h-full pt-10 px-5">
            <div className={`mt-4 py-1.5 text-lg font-medium ${selectPage('home')} hover:text-blue-500 group cursor-pointer flex justify-start`} onClick={() => {setProfile(false); nav('/home');}}>
                <IoHomeOutline />
                <p className="ml-3">Home</p>
            </div>

            <div className={`mt-4 py-1.5 text-lg font-medium ${selectPage('notifications')} hover:text-blue-500 group cursor-pointer flex justify-start`} onClick={() => {setProfile(false); nav('/notifications');}}>
                <IoNotificationsOutline />
                <p className="ml-3">Notifications</p>
            </div>

            <div className={`mt-4 py-1.5 text-lg font-medium ${selectPage('messages')} hover:text-blue-500 group cursor-pointer flex justify-start`} onClick={() => {setProfile(false); nav('/messages');}}>
                <IoSendOutline />
                <p className="ml-3">Messages</p>
            </div>

            <div className={`mt-4 py-1.5 text-lg font-medium ${selectPage('bookmarks')} hover:text-blue-500 group cursor-pointer flex justify-start`} onClick={() => {setProfile(false); nav('/bookmarks');}}>
                <IoBookmarkOutline />
                <p className="ml-3">Bookmarks</p>
            </div>

            <div className={`mt-4 py-1.5 text-lg font-medium ${selectPage('likes')} hover:text-blue-500 group cursor-pointer flex justify-start`} onClick={() => {setProfile(false); nav('/likes');}}>
                <IoHeartDislikeOutline />
                <p className="ml-3">Likes</p>
            </div>

            <div
                className={`${ profile ? 'mt-4 py-1.5 text-lg font-medium text-blue-500 hover:text-blue-500 group cursor-pointer flex justify-start' : 'mt-4 py-1.5 text-lg font-medium text-slate-700 hover:text-blue-500 group cursor-pointer flex justify-start' }`}
                onClick={() => {
                    setProfile(true);
                    nav(`/profile`, { state: { user_id: user.uid } });
                }}
            >
                <IoPersonOutline />
                <p className="ml-3">Profile</p>
            </div>

            <div className="mt-4 py-1.5 text-lg font-medium text-slate-700 hover:text-blue-500 flex justify-center">
                <button onClick={openSideMenu} className="bg-blue-600 px-3 md:px-16 py-1 md:py-2 font-semibold text-white rounded-full hover:bg-blue-500 border border-white hover:border-transparent">Post</button>
            </div>

            <div
                className="absolute cursor-pointer" style={{ bottom: '2rem' }}
                onClick={() => {
                    setProfile(false);
                    nav(`/profile`, { state: { user_id: user.uid } })
                }}>
                <div className="flex bg-gray-200 hover:bg-gray-50 rounded-full px-4 py-3 mt-12 mr-2">
                    <div className="flex flex-shrink-0 group items-center">
                        <div>
                            <img className="inline-block h-10 w-10 rounded-full" src={user.avatar} alt="" />
                        </div>
                        <div className="ml-3">
                            <p className="text-base leading-6 font-medium text-black">
                                {user.name} {user.lastname}
                            </p>
                            <p className="text-sm leading-5 font-medium text-gray-600 group-hover:text-gray-300 transition ease-in-out duration-150">
                                @{user.username}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
