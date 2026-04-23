import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'
import HotelReg from './components/HotelReg'
import Layout from './pages/hotelOwner/Layout'
import Dashboard from './pages/hotelOwner/Dashboard'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'

import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/Users'
import OwnerApprovals from './pages/admin/Owners'
import ServiceApprovals from './pages/admin/Services'
import Packages from './pages/admin/Packages'
import Finance from './pages/admin/Finance'
import AdminBank from './pages/admin/AdminBank'
import PaymentSettings from './pages/admin/Payment'
import AdminProfile from './pages/admin/AdminProfile'

const App = () => {

  const isOwnerPath = useLocation().pathname.includes('/owner')

  const isAdminPath = useLocation().pathname.includes('/admin')

  return (
    <div>
      {!isOwnerPath && !isAdminPath && <Navbar />}
      {false && <HotelReg />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />

          {/* Owner Routes */}
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>

          {/* Admin Routes */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='users' element={<UserManagement />} />
            <Route path='owners' element={<OwnerApprovals />} />
            <Route path='services' element={<ServiceApprovals />} />
            <Route path='packages' element={<Packages />} />
            <Route path='finance' element={<Finance />} />
            <Route path="payment" element={<PaymentSettings />} />
            <Route path='bank' element={<AdminBank />} />
            <Route path='profile' element={<AdminProfile />} />
          </Route>
        </Routes>
      </div>

      {/* Footer */}
      {!isOwnerPath && !isAdminPath && <Footer />}
    </div>
  )
}

export default App