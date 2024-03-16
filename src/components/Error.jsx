
const Error = ({error}) => {
    return (
      <div className="flex items-center justify-center w-full h-full mt-8">
        <h3 className="text-red-500 text-lg font-semibold">{error}</h3>
      </div>
    )
  }
  
  export default Error