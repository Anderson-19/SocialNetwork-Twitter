import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from './store';

export const App: FC = () => {
  
  const user = useUserStore( state => state.user );

  if (!user.isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-3 h-screen w-full bg-blue-600" >
      <div className=" h-full bg-white overflow-hidden flex flex-col rounded-xl shadow-xl">
        {/* <!-- navbar --> */}

        <div className="h-full flex">
          {/* <!-- slidebar 1 --> */}
          <div className="h-full w-1/2 pt-10 px-5 "></div>

          <Outlet />
          

        </div>
      </div>
    </div>
  )
}

export default App
