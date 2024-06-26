import Link from 'next/link';

export default function Navbar() {
  const linkCSS = "hover:text-pastel-red";

  return (
    <div className="w-full absolute italic top-0 pt-4 pl-4">
      <div className="flex flex-row gap-4">
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
  );
}