import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

import Error from "../components/Error.jsx";
import useFetchData from "../Hooks/useFetchData.jsx";
import Loading from "../components/Loading";
import { BASE_URL } from "../config.js";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate= useNavigate();
  const { data, loading, error } = useFetchData(
    `${BASE_URL}/appointment/all`
  );

  useEffect(() => {
    if (data) {
      setAppointments(data.data);
    }
  }, [data]);

  const handleConnect = ()=>{
    navigate("/room");
  }

  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      {!error && !loading && (
        <section className="container notif-section">
          <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>

          {appointments?.length > 0 ? (
            <div className="appointments">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4">S.No</th>
                    <th className="py-2 px-4">Doctor</th>
                    <th className="py-2 px-4">Patient</th>
                    <th className="py-2 px-4">Appointment Date</th>
                    <th className="py-2 px-4">Appointment Time</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Connect/Prescription</th>
                    {user._id === appointments[0]?.doctorId?._id && (
                      <th className="py-2 px-4">Action</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((appointment, index) => (
                    <tr key={appointment._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{appointment.doctor.name}</td>
                      <td className="py-2 px-4">{appointment.user.name}</td>
                      <td className="py-2 px-4">{appointment.date}</td>
                      <td className="py-2 px-4">{appointment.time}</td>
                      <td className="py-2 px-4">{appointment.status}</td>
                      <td className="py-2 px-4">
                      {
                        appointment.status==="pending"?
                        <div>
                          <button
                            onClick={handleConnect}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8"
                          >
                            Connect
                          </button>
                        </div>
                        :
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-8">Download</button>
                      }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No appointments found.</div>
          )}
        </section>
      )}
    </>
  );
};

export default Appointments;
