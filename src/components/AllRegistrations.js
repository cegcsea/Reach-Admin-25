import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "../api/axios";

const AllRegistrations = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("name");
  const [filterData, setFilterData] = useState("");

  const handleFilterDataChange = (e) => {
    const newFilterData = e.target.value.toLowerCase();
    setFilterData(newFilterData);
    if (filter !== "") {
      const tempData = data.filter((d) =>
        d[filter]?.toString().toLowerCase().includes(newFilterData)
      );
      setFilteredData(tempData);
    } else {
      setFilteredData(data);
    }
  };

  const fetchData = async () => {
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      const response = await axios.get("/admin/all-registrations", {
        headers: { token: localStorage.getItem("token") },
      });
      setData(response.data.data);
      setFilteredData(response.data.data);
      Swal.close();
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: error.response?.data?.error || "Error",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="flex items-center mx-10 my-5">
        <button
          className="btn btn-primary px-4 py-2 font-bold rounded-2xl shadow-lg hover:shadow-xl"
          onClick={fetchData}
        >
          Fetch All Registrations
        </button>
      </div>

      {data.length !== 0 && (
        <div className="p-5">
          {/* Filter */}
          <div className="flex flex-row items-center mb-4">
            <select
              className="select select-bordered mr-3"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="mobile">Mobile</option>
            </select>
            <input
              type="text"
              placeholder={`Type ${filter} here`}
              className="input input-bordered w-full"
              value={filterData}
              onChange={handleFilterDataChange}
            />
          </div>

          {/* Registration Table */}
          <div className="overflow-x-auto">
            <table className="table w-full text-white">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Workshops</th>
                  <th>Events</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>
                      {user.workshops.map((w, idx) => (
                        <div key={idx}>
                          {w.title} - {w.paymentStatus}
                        </div>
                      ))}
                    </td>
                    <td>
                      {user.events.map((e, idx) => (
                        <div key={idx}>
                          {e.title} - {e.paymentStatus}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AllRegistrations;
