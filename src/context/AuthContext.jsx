import { createContext, useState, useEffect } from 'react'

import axios from 'axios'
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem('userId')

                if(userId) {
                    const response = await axios.get(`http://localhost:8000/user?id=${userId}`)

                    setUser(response.data.user)
                }
            } catch (error) {
                console.error('Failed to fetch user: ', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    const signIn = async (email, password) =>  {
        try {
            const response = await axios.post('http://localhost:8000/signin', { email, password })

            const { token, user } = response.data

            localStorage.setItem('token', token)
            localStorage.setItem('userId', user.id)

            setToken(token)
            setError('')

            setUser(user)
            console.log(user)
            console.log('Signed in')
        } catch (error) {
            setError('Invalid Credentials')
        }
    }

    const signOut = () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, loading, token, error }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider