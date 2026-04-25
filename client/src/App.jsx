import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// CLIENT PAGES
import Home from './pages/Home'
import AllServices from './pages/AllServices'
import ServiceDetails from './pages/ServiceDetails'
import AITripPlanner from './pages/AITripPlanner'
import MyItineraries from './pages/MyItineraries'
import MyBookings from './pages/MyBookings'
import BecomePartner from './pages/BecomePartner'

// OWNER PAGES
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import ListService from './pages/owner/ListService'
import AddService from './pages/owner/AddService'
import Inventory from './pages/owner/Inventory'
import Bookings from './pages/owner/Bookings'
import Subscription from './pages/owner/Subscription'
import Settings from './pages/owner/Settings'
import Invoices from './pages/owner/Invoices'

import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/Users'
import OwnerApprovals from './pages/admin/Owners'
import ServiceApprovals from './pages/admin/Services'
import Packages from './pages/admin/Packages'
import Finance from './pages/admin/Finance'

const App = () => {
  const isOwnerPath = useLocation().pathname.startsWith('/owner')

  const isAdminPath = useLocation().pathname.includes('/admin')

  return (
    <div className="flex flex-col min-h-screen">
      {!isOwnerPath && !isAdminPath && <Navbar />}

      <main className={isOwnerPath || isAdminPath ? "h-screen" : "flex-1"}>
        <Routes>
          {/* CLIENT */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<AllServices />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/ai-planner" element={<AITripPlanner />} />
          <Route path="/my-itineraries" element={<MyItineraries />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/become-partner" element={<BecomePartner />} />

          {/* OWNER */}
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="list-service" element={<ListService />} />
            <Route path="add-service" element={<AddService />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="settings" element={<Settings />} />
            <Route path="invoices" element={<Invoices />} />
          </Route>

          {/* Admin Routes */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='users' element={<UserManagement />} />
            <Route path='owners' element={<OwnerApprovals />} />
            <Route path='services' element={<ServiceApprovals />} />
            <Route path='packages' element={<Packages />} />
            <Route path='finance' element={<Finance />} />
          </Route>
        </Routes>
      </main>

      {!isOwnerPath && !isAdminPath && <Footer />}
    </div>
  )
}

export default App