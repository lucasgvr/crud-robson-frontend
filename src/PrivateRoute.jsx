import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "./hooks/useAuth"

const PrivateRoute = () => {
    const { user, loading } = useAuth()

    return loading ? <div>loading</div> : user ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute