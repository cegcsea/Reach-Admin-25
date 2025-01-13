import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from '../api/axios'
const AddAdmin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === "" || data.email === "" || data.name === "") {
      setError("Please enter a valid name, email and password");
      return;
    }
    try {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        showConfirmButton: false
      });
      const token = localStorage.getItem('token');
      await axios.post('/admin/add-admin', {
        password: data.password.toString(),
        email: data.email.toString(),
        name: data.name.toString()
      }, {
        headers: { token: token }
      })
      Swal.close();
      Swal.fire({ title: "New Admin added successfully", icon: "success" })
      navigate('/dashboard')
    } catch (error) {
      Swal.close();
      Swal.fire({ title: error.response.data.error, text: error.response.data.message, icon: "error" })
    }
  }
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto  rounded-md shadow-md lg:max-w-xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          New Admin
        </h2>
        <form className='mt-6'>
          <div className='mb-2'>
            <label className='block text-sm font-semibold'>Name:</label>
            <input type="text" name="name" value={data.name} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40' required></input><br></br>
          </div>
          <div className='mb-2'>
            <label className='block text-sm font-semibold'>Email:</label>
            <input type="email" name="email" value={data.email} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40' required></input><br></br>
          </div>
          <div>
            <label className='block text-sm font-semibold'>Password: </label>
            <input type="password" name="password" value={data.password} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40' required ></input><br></br>
          </div>
          {error &&
            <div className='text-orange-500 font-serif'>
              {error}
            </div>}
          <div className='mt-6'>
            <input type="submit" value="Add" onClick={handleSubmit} className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'></input>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAdmin
