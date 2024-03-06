import { useState } from 'react';

import { IoSearchOutline, IoSettingsOutline } from 'react-icons/io5';

import Logo from '../../assets/react.svg';

import { type User } from '../../interfaces';
//import { useSearch } from '../../hooks/useSearch';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';

interface Props {
    avatar: string;
}

export const TopMenu = ({ avatar }: Props) => {

    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState([]);
    const [text, setText] = useState('');
    const nav = useNavigate();

    /* const { usersQuery: { data } } = useSearch();

    const handleSearch = (termSearch: string = '') => {
        const resultSearch = data?.users.filter((user: any) => {
            if (user.name.toString().toLowerCase().includes(termSearch.toLowerCase())) {
                return user;
            }
        });

        setSearch(resultSearch);

    } */


    return (
        <div className=" border-b px-5 py-1 flex justify-between items-center">
            <span>
                <img src={Logo} alt="" />

            </span>

            {/* <!-- search --> */}
            <div className=" w-1/2 relative focus-within:shadow-lg" >
                <div className="flex items-center w-full focus-within:border px-3 py-2  focus-within:border-b-0">
                    <IoSearchOutline className="h-5 stroke-slate-300 mr-5" />
                    <input
                        type="text"
                        placeholder="Search....."
                        className=" w-full outline-none placeholder:text-slate-300 font-semibold"
                        onChange={(e) => {
                            if (e.target.value.length < 0) {
                                setShowSearch(false)
                            } else {
                                /* handleSearch(e.target.value); */
                                setShowSearch(true);
                            }
                        }}
                        onClick={() => showSearch ? setShowSearch(false) : setShowSearch(true)}
                    />
                </div>

                {/* <!-- search results --> */}
                <div className={`absolute w-full border bg-white ${showSearch ? 'block' : 'hidden'}`} x-show="search">
                    <div className="flex flex-col border-b hover:bg-slate-100">
                        <p className="px-4 py-1 text-sm font-medium text-slate-600 cursor-pointer">Users</p>
                    </div>
                    <div className="flex flex-col border-b hover:bg-slate-100">
                        <p className="px-4 py-1 text-sm font-medium text-slate-600 cursor-pointer">Posts</p>
                    </div>
                    {/* <div className="flex flex-col border-b">
                        {
                            search.length > 0 &&
                            search.map((user: any) => (
                                <div
                                    className="px-4 py-1 flex flex-row w-full hover:bg-slate-100 cursor-pointer"
                                    onClick={() => {
                                        nav(`/profile`, { state: { user_id: user.user_id } });
                                        setShowSearch(false);
                                    }}>
                                    <img src={user.avatar} className="h-10 w-10 rounded-full" alt="" />
                                    <p key={user.user_id} className="text-sm font-medium mt-2 ml-2 text-slate-600"> {user.name} {user.lastname}</p>
                                </div>
                            ))
                        }
                    </div> */}

                </div>

            </div>

            {/* <!-- profile --> */}
            <div className="flex space-x-4 items-center">
                <IoSettingsOutline className="h-6 w-6 stroke-slate-400" />
                <img src={avatar} className="h-10 w-10 rounded-full" alt="" />
            </div>
        </div>
    )
}
