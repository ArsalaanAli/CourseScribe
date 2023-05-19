import Link from "next/link";
export default function Navbar() {
  return (
    <div className="flex items-center bg-gray-100 p-2 md:px-14 lg:px-20 xl:px-48">
      <Link href="/">
        <h3 className="text-4xl font-bold text-gray-800">CourseScribe</h3>
      </Link>
      <div className="flex flex-grow flex-row-reverse items-center gap-4">
        <Link href="/login" className="px-4">
          Login
        </Link>
      </div>
    </div>
  );
}
