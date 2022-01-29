import React from 'react';
import { AnnotationIcon, ChartBarIcon, DotverticalIcons, PhoneMissedCallIcon } from "@heroicons/react/solid";
import { Menu} from "@headlessui/react";
import {
  DotsVerticalIcon,
  LogoutIcon,
  MenuIcon,
} from "@heroicons/react/outline";

function Header() {
  return(
    <nav class="flex justify-between w-full bg-slate-800">
    <img
        className=" p-2 ml-4"
        src="/Photos/palm.png"
        height={16}
        width={60}
      ></img>
      <div className=" flex space-x-2 mr-4 justify-center items-center">

      < PhoneMissedCallIcon
           className=" h-8 w-8 text-white text-2xl pt-2 "
           aria-hidden="true"
           />
         <div>
           <AnnotationIcon
           className=" h-8 w-8 text-white text-2xl pt-2 "
           aria-hidden="true"
           />
         </div>
         <div>
         
            <Menu as="div" className="relative inline-block ">
      <  DotsVerticalIcon
              className=" h-8 w-8 text-white text-2xl pt-2 "
              aria-hidden="true"
            />
           </Menu>
         </div>
        
        </div>
    </nav>

  ) 
}



export default Header;
