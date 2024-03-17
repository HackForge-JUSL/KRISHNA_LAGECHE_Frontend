import DoctorCard from "../../components/DoctorCard.jsx";
import { BASE_URL } from "../../config.js";
import useFetchData from "../../Hooks/useFetchData.jsx"
import Loader from "../../components/Loading.jsx";
import Error from "../../components/Error.jsx";
import { useState, useEffect } from "react";

const Doctors = () => {
  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    },700)
    return () => clearTimeout(timeout);
  },[query])
  console.log(debounceQuery);
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctor/all?query=${debounceQuery}`);
  return (
    <>
      {loading && !error && <Loader />}
      {error && !loading && <Error />}
      {
        !loading && !error && (
          <div>
            <section className="bg-[#fff9ea]">
              <div className="container text-center">
                <h2 className="heading">Find a Doctor</h2>
                <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
                  <input
                    type="search"
                    placeholder="Search doctor by name or specification"
                    className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none placeholder:text-textColor"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                  <button
                    className="btn mt-0 rounded"
                    onClick={handleSearch}
                  >Search</button>
                </div>
              </div>
            </section>
            <section>
              <div className="container">
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                  {
                    doctors?.map((doctor) => <DoctorCard doctor={doctor} key={doctor._id} />)
                  }
                </div>
              </div>
            </section>

          </div>)}
    </>
  )
}

export default Doctors
