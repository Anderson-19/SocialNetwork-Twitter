
import { useEffect, useState } from 'react';
import './styles.css';
import { getLikesByUserId } from '../../api';
import { useUserStore } from '../../store';
import { Card } from '../components';

export const Likes = () => {

  const [likesByUser, setLikesByUser] = useState<any[]>();
  const user = useUserStore(state => state.user);

  useEffect(() => {
    getLikesByUserId(user.token, user.uid!)
      .then(res => setLikesByUser(res.likes))
      .catch(console.log)
  }, []);
  
  return (
    <div className="w-full h-full justify-center overflow-x-hidden overflow-y-scroll scroll-ui">
      {likesByUser &&
        likesByUser?.map((like: any) => (
          <div key={like.post_id} className={`${like.user_id === user.uid ? 'hidden' : ''}`}>
            <Card key={like.post_id} post={like} />
          </div>
        ))
      }
    </div>
  )
}
