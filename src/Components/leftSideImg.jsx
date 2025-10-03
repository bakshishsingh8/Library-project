import logimg from "../assets/jpg/png/WhatsApp Image 2025-09-26 at 11.49.53_95bafd30.jpg"
function LogImg(){
    return(
        <div className="flex-1 relative h-full w-5xl">
          <img
            src={logimg}
            alt="Login"
            className="w-full h-full object-cover"
          />
          {/* <button className="absolute bottom-4 right-5 bg-white/20 backdrop-blur-sm text-white font-medium text-sm px-5 py-2 rounded-2xl hover:bg-white/35 transition duration-300">
            Back
          </button> */}
        </div>
        )}
export default LogImg;