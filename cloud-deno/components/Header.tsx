import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="relative py-6 z-10">
      <nav className="header">
        <Link href="/home">
          <a className="flex items-center">
            <Image width={40} height={40} className="image" src="/logo.svg" alt="Home cloud" />
            <div className="ml-5 flex flex-col justify-center">
              <div className="name">Cloud</div>
              <div className="page-name">The fullstack cloud project</div>
            </div>
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
