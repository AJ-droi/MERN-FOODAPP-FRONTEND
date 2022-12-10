import React from 'react'

import { useLocation, Navigate } from 'react-router-dom'

export const ProtectAdminRoute = ({children}) => {
    const location = useLocation()
    const isAuthenticated = localStorage.getItem('signature')
    const userRole = localStorage.getItem('role')

    if(!isAuthenticated || userRole === "user" || userRole === "vendor"){
        return (
            <Navigate to={{pathname: '/login', state: {from: location}}} />
        )
    }
    return children
}

export const ProtectVendorRoute = ({children}) => {
    const location = useLocation()
    const isAuthenticated = localStorage.getItem('signature')
    const userRole = localStorage.getItem('role')

    if(!isAuthenticated || userRole === "user" || userRole === "admin" || userRole === "superadmin"){
        return (
            <Navigate to={{pathname: '/login', state: {from: location}}} />
        )
    }
    return children
}

export default ProtectAdminRoute