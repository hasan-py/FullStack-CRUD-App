import { Text } from '@chakra-ui/react'
import { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { getLocalStorageData } from '../_helper/localstorage'
import Login from './auth'
import ListView from './crud/tableView'

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const token = getLocalStorageData('token')

  if (!token) {
    return children
  }
  return <Navigate to="/" />
}

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = getLocalStorageData('token')

  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}

export default function Pages() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ListView />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="*"
            element={<Text textAlign={'center'}>404 Not found</Text>}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
