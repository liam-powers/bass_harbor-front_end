import { HomeIcon } from '@heroicons/react/24/solid';
import { GiGuitarBassHead, GiViolin } from "react-icons/gi";
import Link from 'next/link';
import Image from 'next/image';


export default function Navbar() {
  const linkCSS = "flex flex-col items-center hover:fill-white hover:text-white";

  return (
    <div className="w-full h-[100px] bg-blue-300 sticky top-0">
      <div className="h-full flex justify-center items-center">
        <Image className="flex justify-start items-center absolute top-4 left-4" src="/Logo.webp" alt="Logo" width={50} height={50}/>
        <ul className="flex flex-row gap-20">
          <li className="flex items-center">
            <Link href="/" className={linkCSS}>
              <HomeIcon href="/" size={55}/>
              Home
            </Link>
          </li>
          <li>
            <Link href="./electric" className={linkCSS}>
              <GiGuitarBassHead size={55} />
              Electric
            </Link>
          </li>
          <li>
            <Link href="./upright" className={linkCSS}>
              <GiViolin size={55} />
              Upright
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}