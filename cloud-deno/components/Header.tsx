/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from "next/image";
import Link from "next/link";

const Header = () => {
	return (
		<div className="relative py-6 z-10">
			<nav className="mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 max-w-screen-xl">
				<Link href="/home">
					<a className="flex items-center">
						<Image
							width={40}
							height={40}
							className="h-10 w-auto sm:h-12 my-2 rounded-full"
							src="/logo.jpeg"
							alt="Home cloud"
						/>
						<div className="ml-5 flex flex-col justify-center">
							<div className="font-bold text-gray-900 leading-tight text-2xl sm:text-3xl tracking-tight">Will</div>
							<div className="font-normal text-sm sm:text-lg leading-tight tracking-tight">Home Cloud</div>
						</div>
					</a>
				</Link>
			</nav>
		</div>
	);
};

export default Header;
