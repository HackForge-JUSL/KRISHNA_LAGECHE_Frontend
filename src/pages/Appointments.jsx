import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

import Error from "../components/Error.jsx";
import useFetchData from "../Hooks/useFetchData.jsx"
import Loading from "../components/Loading";
import { BASE_URL } from "../config.js";
//TODO: on click Appointment a particular appointment will be shown
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetchData(
    `${BASE_URL}/appointment/all`
  );

  useEffect(() => {
    if (data) {
      setAppointments(data.data);
    }
  }, [data]);
  console.log(data.data);
  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      {(!error && !loading && (
        <section className="container notif-section">
          <h2 className="page-heading">Your Appointments</h2>

          {appointments?.length > 0 ? (
            <div className="appointments">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
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
                    console.log(ele);
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {ele?.doctor?.name}
                        </td>
                        <td>
                          {ele?.user?.name}
                        </td>
                        <td>{ele?.date}</td>
                        <td>{ele?.time}</td>
                          <div>{ele?.status}</div>
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