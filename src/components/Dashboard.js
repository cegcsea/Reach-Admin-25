import React from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Register New User", path: "/register-user" },
    { title: "Workshop Registrations", path: "/workshop-list" },
    { title: "Event Registrations", path: "/event-list" },
    { title: "Verify Payments", path: "/verify-workshop-payment" },
    { title: "Workshop Payments", path: "/workshop-payments" },
    { title: "All Registrations", path: "/all-registrations" },
    { title: "Add Admin", path: "/add-admin" },
    { title: "Queries", path: "/queries" },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-10 py-12">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">Hello Admin 👋</h1>
        <p className="mt-4 text-lg text-gray-300">
          Welcome to Abacus '25
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-gradient-to-br from-[#702b2b] via-[#9d0505] to-[#8a1818]
                       rounded-2xl p-6 text-center shadow-lg
                       hover:scale-105 transition-transform duration-200"
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm text-gray-200">
              Click to manage
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Dashboard
