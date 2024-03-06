import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { User } from '../../interfaces/user';
import { getFollowingsById, getUsers, setFollowing, unFollow } from '../../services/actions';
import { useStore } from '../../hooks/useStore';

export const UsersForFollow = () => {

  const [dataUsers, setDataUsers] = useState<User[]>();
  const [dataFollowings, setDataFollowings] = useState<any[]>();
  const nav = useNavigate();
  const { user } = useStore();

  useEffect(() => {
    getUsers()
      .then((res: any) => setDataUsers(res.users))
      .catch(console.log)
  }, [dataUsers]);

  useEffect(() => {
    getFollowingsById(user.token, user.uid!)
      .then(res => setDataFollowings(res.dataFollowings))
      .catch(console.log)
  }, [dataFollowings])

  return (
    <div className="max-w-sm rounded-lg m-4 bg-slate-50">
      <div className="flex">
        <div className="flex-1 m-2">
          <h2 className="px-4 py-2 text-xl w-48 font-semibold text-black">Who to follow</h2>
        </div>
      </div>

      <hr className="bg-gray-50" />

      {/* <!--first person who to follow--> */}
      {
        dataUsers && dataUsers?.map(dataUser => (
          <>
            <div className={`${dataUser.user_id === user.uid ? 'hidden' : 'flex flex-shrink-0 hover:bg-slate-200 cursor-pointer'}`}>
              <div className="flex-1 ">
                <div className="flex items-center w-48" onClick={() => nav(`/profile`, { state: { user_id: dataUser.user_id } })}>
                  <div>
                    <img className="inline-block h-10 w-auto rounded-full ml-4 mt-2" src={dataUser.avatar} alt="" />
                  </div>
                  <div className="ml-3 mt-3">
                    <p className="text-base leading-6 font-medium text-black">
                      {dataUser.name} {dataUser.lastname}
                    </p>
                    <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      @{dataUser.username}
                    </p>
                  </div>
                </div>

              </div>

              <div className="px-4 py-2 m-2 text-lg font-medium text-slate-700 hover:text-blue-500 flex justify-center">
                {
                  (dataFollowings && dataUsers)
                    && dataFollowings?.find(f => f.following_id === dataUser?.user_id) ? (
                    <button
                      onClick={async () => await unFollow(dataUser?.user_id!, user.uid!, user.token!)}
                      className="bg-blue-600 font-semibold py-2 px-4 text-white rounded-full hover:bg-blue-500 border border-white hover:border-transparent">
                      Following
                    </button>
                  ) : (
                    <button
                      onClick={async () => await setFollowing(dataUser?.user_id!, user.uid!, user.token!)}
                      className="bg-blue-600 font-semibold py-2 px-4 text-white rounded-full hover:bg-blue-500 border border-white hover:border-transparent">
                      Follow
                    </button>
                  )
                }
              </div>
            </div>
          </>
        ))
      }

      {/* <!--show more--> */}
      <div className="flex">
        <div className="flex-1 p-4">
          <h2 className="px-4 ml-2 w-48 font-bold text-blue-400">Show more</h2>
        </div>
      </div>

    </div>
  )
}
