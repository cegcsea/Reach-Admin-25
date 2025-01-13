import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from '../api/axios';
import ExportToExcel from './ExportToExcel'
export default function EventList() {
    const [data, setData] = useState([]);
    const [eventId, setEventId] = useState(null);
    const [hostCollege, setHostCollege] = useState("");
    const fetchData = async () => {
        try {
            Swal.fire({
                title: 'Loading...',
                allowOutsideClick: false,
                showConfirmButton: false
            });
            const response = await axios.post('/admin/event-registration-list', {
                eventId: parseInt(eventId),
                hostCollege: hostCollege
            }, {
                headers: {
                    "token": localStorage.getItem('token')
                }
            });
            setData(response.data.data);
            Swal.close();
        } catch (error) {
            Swal.close();
            Swal.fire({ title: error.response.data.error, text: error.response.data.message, icon: "error" })
        }
    }
    return (
        <>
            <div className='flex flex-row items-center mx-10 my-5'>
                <p className='text-xl font-bold mr-5'>Select Event: </p>
                <select className="select select-bordered w-full max-w-xs" onChange={(e) => setEventId(e.target.value)}>
                    <option disabled selected>--Select--</option>
                    <option value={2401}>Geek_Quiz</option>
                    <option value={2402}>OSPC</option>
                    <option value={2403}>UI/UX_design</option>
                    <option value={2404}>Reverse_Coding</option>
                </select>
            </div>
            <div className='flex flex-row items-center mx-10 my-5'>
                <p className='text-xl font-bold mr-5'>Select Host College: </p>
                <select className="select select-bordered w-full max-w-xs" onChange={(e) => setHostCollege(e.target.value)}>
                    <option disabled selected>--Select--</option>
                    <option value={"Government College of Technology, Coimbatore"}>Government College of Technology, Coimbatore</option>
                    <option value={"PSNA College of Engineering and Technology"}>PSNA College of Engineering and Technology</option>
                </select>
            </div>
            <button className="btn btn-primary ml-10" onClick={fetchData}>Fetch</button>
            {data.length !== 0 && <div className="overflow-x-auto">
                <ExportToExcel apiData={data} fileName={`Event_${eventId}_${hostCollege}`} />
                <table className='table'>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>AbacusId</th>
                            <th>Name</th>
                            <th>College</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Dept</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.abacusId}</td>
                                <td>{item.name}</td>
                                <td>{item.college}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>{item.dept}</td>
                                <td>{item.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </>
    )
}
