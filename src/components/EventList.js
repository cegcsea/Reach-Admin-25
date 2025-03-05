import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "../api/axios";
import ExportToExcel from "./ExportToExcel";
export default function EventList() {
  const [data, setData] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [hostCollege, setHostCollege] = useState("");
  const fetchData = async () => {
    try {
      if (!eventId) {
        Swal.fire({ title: "Please select an event", icon: "warning" });
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({ title: "Login Required", icon: "error" });
        return;
      }

      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      // API Request
      const response = await axios.post(
        "http://localhost:3001/admin/event-registration-list",
        { eventId: parseInt(eventId) },
        { headers: { token } }
      );

      console.log("Full API Response:", response);

      if (!response || !response.data) {
        throw new Error("Invalid API response structure");
      }

      setData(response.data?.data || response.data || []);
      Swal.close();
    } catch (error) {
      Swal.close();

      // Log detailed error message
      console.error("API Error:", error);
      console.error("Error Response:", error.response);

      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="flex flex-row items-center mx-10 my-5">
        <p className="text-xl font-bold mr-5">Select Event: </p>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setEventId(e.target.value)}
        >
          <option disabled selected>
            --Select--
          </option>
          <option value={1}>OSPC</option>
          <option value={2}>Byte Begin</option>
          <option value={3}>BRAINWAVE.ML</option>

          <option value={4}>CTRL+ESCAPE</option>
          <option value={6}>READY.SET.HIRE!</option>
          <option value={8}>TREASURE HUNT</option>
          <option value={9}>IPL AUCTION</option>
          <option value={7}>Glitch Snitch</option>
          <option value={10}>CHATGPT PULSE</option>
          <option value={11}>Checkmate Chronicles</option>
          <option value={12}>OLPC</option>
          <option value={14}>WAR OF THE RACKETS</option>
        </select>
      </div>
      
      <button
        className="cursor-pointer ml-10  px-6 py-2 tracking-wide text-white font-bold bg-gradient-to-r from-[#702b2b] via-[#9d0505] to-[#8a1818] rounded-2xl shadow-lg hover:shadow-xl focus:outline-none transition-transform duration-200 transform hover:scale-105 active:scale-95"
        onClick={fetchData}
      >
        Fetch
      </button>
      {data.length !== 0 && (
        <div className="overflow-x-auto">
          <ExportToExcel
            apiData={data}
            fileName={`Event_${eventId}_${hostCollege}`}
          />
          <table className="table">
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
        </div>
      )}
    </>
  );
}
