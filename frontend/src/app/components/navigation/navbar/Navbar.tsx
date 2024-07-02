import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const linkCSS = "hover:text-pastel-red";

  return (
    <div>
      <div className="w-full absolute italic top-0 pt-4 pl-4">
        <div className="flex flex-row gap-4 items-center">
          <div className={linkCSS}>
            <Link href="/">home</Link>
          </div>
          <div className={linkCSS}>
            <Link href="/upright">browse</Link>
          </div>
          <div className={linkCSS}>
            <Link href="/about">about</Link>
          </div>
        </div>
      </div>
      <div className="absolute right-0 p-4">
        <Image src="/ship.png" width={50} height={50} alt="BH logo" />
      </div>
    </div>
  );
}