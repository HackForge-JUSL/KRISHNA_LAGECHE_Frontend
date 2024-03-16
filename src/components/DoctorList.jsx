import DoctorCard from './DoctorCard.jsx';
import { BASE_URL } from "../config.js";
import useFetchData from "../Hooks/useFetchData.jsx";
import Loader from "./Loading.jsx";
import Error from "./Error.jsx";

const DoctorList = () => {
  const { data:doctors, loading, error } = useFetchData(`${BASE_URL}/doctor/all`);
  console.log(doctors);
  return (
    <>
      {loading && <Loader />}
      {error && <Error />}
      {!loading && !error && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
          {
            doctors?.map(doctor => 
              <DoctorCard doctor={doctor} key={doctor._id} />
            )
          }
        </div>
      )}
    </>
  )
}

export default DoctorList