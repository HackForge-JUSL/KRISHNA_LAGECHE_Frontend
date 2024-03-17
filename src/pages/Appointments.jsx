import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

import Error from "../components/Error.jsx";
import useFetchData from "../Hooks/useFetchData.jsx"
import Loading from "../components/Loading";
//TODO: on click Appointment a particular appointment will be shown
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetchData(
    `/appointment/all`
  );

  useEffect(() => {
    if (data) {
      setAppointments(data);
    }
  }, [data]);
  console.log(appointments);
  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      {(!error && !loading && (
        <section className="container notif-section">
          <h2 className="page-heading">Your Appointments</h2>

          {appointments.length > 0 ? (
            <div className="appointments">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                    {user._id === appointments[0].doctorId?._id ? (
                      <th>Action</th>
                    ) : (
                      <></>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {ele?.doctorId?.name}
                        </td>
                        <td>
                          {ele?.userId?.name}
                        </td>
                        <td>{ele?.date}</td>
                        <td>{ele?.time}</td>
                        <td>{ele?.createdAt.split("T")[0]}</td>
                        <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                        <td>{ele?.status}</td>
                        {userId === ele?.doctorId?._id ? (
                          <td>
                            <button
                              className={`btn user-btn accept-btn ${ele?.status === "Completed" ? "disable-btn" : ""
                                }`}
                              disabled={ele?.status === "Completed"}
                              onClick={() => complete(ele)}
                            >
                              Complete
                            </button>
                          </td>
                        ) : (
                          <div>No appointments available</div>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div></div>
          )}
        </section>
      )
      )}
    </>
  );
};
export default Appointments;