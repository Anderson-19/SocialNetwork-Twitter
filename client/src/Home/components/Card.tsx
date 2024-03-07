import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/* import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'; */
import {
    IoHeartOutline,
    IoChatbubbleOutline,
    IoRemoveOutline,
    IoSync,
    IoEllipsisVerticalSharp
} from 'react-icons/io5'

import { dayAndMonth } from "../../helpers";
import { useUserStore } from '../../store';

//import { addLike, deletePost, disLike } from '../../services/actions';

interface Props {
    post: any;
    likes?: any[];
    dataFollowings?: any[];
}

export const Card = ({ post }: Props) => {

    const [showDrowDown, setShowDrowDown] = useState(false);
    const user = useUserStore(state => state.user);
    const nav = useNavigate();

    const interactions = (interaction: any) => post[interaction] ?? 0; 

    return (
        <ul className="list-none">
            <li>
                <article className="hover:bg-gray-50 bg-white p-8 rounded-lg shadow-md">
                    <div className="flex flex-shrink-0 p-4 pb-0">
                        <a className="flex-shrink-0 group block">
                            <div className="flex items-center" onClick={() => nav(`/profile`, { state: { user_id: post.user_id } })}>
                                <div>
                                    <img className="inline-block h-10 w-10 rounded-full" src={post.avatar} alt="" />
                                </div>
                                <div className="ml-3 cursor-pointer">
                                    <p className="text-base leading-6 font-medium text-black">
                                        {post.name} {post.lastname}
                                        <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150 ml-2">
                                            @{post.username} . { dayAndMonth(post.created_at) }
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="pl-16">
                        <p className="text-base width-auto font-medium text-black flex-shrink">
                            {post.content}
                        </p>

                        {
                            post.img && (
                                <div className="md:flex-shrink pr-6 pt-3">
                                    <div className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64" style={{ height: '200px', backgroundImage: `url(${post.img})` }} >
                                        <img className="opacity-0 w-full h-full" src={post.img} alt="" />
                                    </div>
                                </div>
                            )
                        }

                        <div className="flex items-center py-4 px-6 mb-2">
                            <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out cursor-pointer">
                                {/* <CommentOutlinedIcon titleAccess='Replay' /> */}
                                <IoChatbubbleOutline className="mr-2" size={25}/>
                                { interactions( "comments" ) }
                            </div>
                            <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-green-400 transition duration-350 ease-in-out cursor-pointer">
                                {/* <LoopOutlinedIcon titleAccess='Repost' /> */}
                                <IoSync className="mr-2" size={25}/>
                                { interactions( "forwarded" ) }
                            </div>
                            <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-red-600 transition duration-350 ease-in-out cursor-pointer">
                                {/* {
                                    likeId 
                                        ? <FavoriteBorderOutlinedIcon style={{ color: '#FF0000' }} titleAccess='Like' onClick={() => disLike(post.post_id, user.token!)}/>
                                        : <FavoriteBorderOutlinedIcon titleAccess='Like' onClick={() => addLike(post.post_id, user.uid!, user.token!) }/>
                                } */}
                                <IoHeartOutline className="mr-2" size={25}/>

                                { interactions( "likes" ) }
                            </div>
                            <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out cursor-pointer">
                                <a onClick={() => setShowDrowDown(!showDrowDown)}>
                                    {/* <MoreVertOutlinedIcon titleAccess='More' /> */}
                                    <IoEllipsisVerticalSharp className="mr-2" size={25}/>

                                    <div className={` ${showDrowDown ? 'flex items-center justify-center bg-gray-100' : 'hidden'}`}>
                                        <div className="relative inline-block text-left">
                                            <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2 py-2">
                                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Save</a>

                                                <div className={`${post.user_id === user.uid ? 'cursor-pointer' : 'hidden'}`} /* onClick={async () => await deletePost(user.token, post.post_id)} */>
                                                    <a className="block px-4 py-2 text-sm text-red-500 hover:bg-red-100 rounded-md">
                                                        {/* <DeleteForeverOutlinedIcon /> */}
                                                        <IoRemoveOutline size={25}/>  Delete
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </div >

                    </div >
                </article >
            </li >
        </ul >

    )
}
