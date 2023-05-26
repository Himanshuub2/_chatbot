import { ParticleAnimation } from "./ParticleAnimation";
import { useState } from "react";

const MainBody = ({loaderFlag})=>{
 
    return(
      
    <div className="w-[68%]  flex flex-col justify-center items-center">
      <div  className="absolute z-55 w-30 mb-6 text-center">
      {
        !loaderFlag?
        <>
           <div className="text-[50px] font-ExtraBold-Mars text-cyanBlue z-50">
            Company
          </div>
          <div className="text-[40px] font-Bold-Mars text-cyanBlue z-50">
            Assistant
          </div>
        </>
        :""
      }
         

      </div>
      
      <ParticleAnimation/>
    </div>

      

      
    
    )
}

export default MainBody;


