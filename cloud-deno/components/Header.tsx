import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="relative py-6 z-10">
      <nav className="header">
        <Link href="/home">
          <a className="flex items-center">
            <Image width={40} height={40} className="image" src="/logo.jpeg" alt="Home cloud" />
            <div className="ml-5 flex flex-col justify-center">
              <div className="name">Will</div>
              <div className="page-name">Home Cloud</div>
            </div>
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
