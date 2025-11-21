// import logimg from "../assets/jpg/png/WhatsApp Image 2025-09-26 at 11.49.53_95bafd30.jpg"
// function LogImg(){
//     return(
//         <div className="flex-1 relative h-full w-5xl">
//           <img
//             src={logimg}
//             alt="Login"
//             className="w-full h-full object-cover"
//           />
//           {/* <button className="absolute bottom-4 right-5 bg-white/20 backdrop-blur-sm text-white font-medium text-sm px-5 py-2 rounded-2xl hover:bg-white/35 transition duration-300">
//             Back
//           </button> */}
//         </div>
//         )}
// export default LogImg;

import logimg from "../assets/jpg/png/WhatsApp Image 2025-09-26 at 11.49.53_95bafd30.jpg";

function LogImg() {
  return (
    <div className="flex-1 relative w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px]">
      <img
        src={logimg}
        alt="Login"
        className="w-full h-full object-cover rounded-lg"
      />
      {/* Optional Back Button */}
      {/* 
      <button className="absolute bottom-4 right-5 bg-white/20 backdrop-blur-sm text-white font-medium text-sm px-5 py-2 rounded-2xl hover:bg-white/35 transition duration-300">
        Back
      </button> 
      */}
    </div>
  );
}

export default LogImg;
