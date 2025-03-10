import React from 'react'

const Dashboard = () => {
    return (
        <div className="hero min-h-screen bg-base-200 bg-black text-white">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello Admin</h1>
                    <p className="py-6">Welcome to Abacus '25</p>
                    <button className="cursor-pointer w-full px-4 py-2 tracking-wide text-white font-bold bg-gradient-to-r from-[#702b2b] via-[#9d0505] to-[#8a1818] rounded-2xl shadow-lg hover:shadow-xl focus:outline-none transition-transform duration-200 transform hover:scale-105 active:scale-95">Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
