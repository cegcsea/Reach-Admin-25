import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "../api/axios";
import ExportToExcel from "./ExportToExcel";
export default function EventList() {
  const [data, setData] = useState([]);
  const [eventId, setEventId] = useState(null);
  //const [hostCollege, setHostCollege] = useState("");
  const fetchData = async () => {
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      const response = await axios.post(
        "/admin/event-registration-list",
        {
          eventId: parseInt(eventId),
          //hostCollege: hostCollege,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setData(response.data.data);
      Swal.close();
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: error.response.data.error,
        text: error.response.data.message,
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
          <option value={2}>BYTE BEGIN</option>
          <option value={3}>BRAINWAVE.ML</option>
          <option value={4}>CTRL+ESCAPE</option>
          <option value={5}>READY.SET.HIRE!</option>
          <option value={6}>GLITCH SNITCH</option>
          <option value={7}>ACM Special</option>
          <option value={8}>CSAU Special</option>
          <option value={9}>TREASURE HUNT</option>
          <option value={10}>IPL AUCTION</option>
          <option value={11}>CHATGPT PULSE</option>
          <option value={12}>Checkmate Chronicles</option>
          <option value={13}>Collab with Quizzers Anonymous</option>
          <option value={14}>OLPC</option>
          <option value={15}>LIGHTS, CAMERA, REEL!</option>
          <option value={16}>WAR OF THE RACKETS</option>
          <option value={17}>Grand Cricket League (GCL)</option>
          <option value={18}>
            CSEA SUPER LEAGUE (CSL) - Kick, Pass, Goal!
          </option>
        </select>
      </div>
      {/* <div className="flex flex-row items-center mx-10 my-5">
        <p className="text-xl font-bold mr-5">Select Host College: </p>
        <select
          className="select select-bordered w-full max-w-xs"
          //onChange={(e) => setHostCollege(e.target.value)}
        >
          <option disabled selected>
            --Select--
          </option>
          <option
            value={
              "J.J. College of Engineering and Technology, Tiruchirappalli"
            }
          >
            J.J. College of Engineering and Technology,Tiruchirappalli
          </option>
        </select>
      </div> */}
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
            fileName={`Event_${eventId}_2025`}
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
