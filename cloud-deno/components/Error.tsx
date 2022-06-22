import Link from "next/link";
import { LoadingContext } from "context/loading-context";
import { useContext } from "react";

const Error = ({ pathname = "/", message, href }: { pathname?: string; message?: string; href?: string }) => {
	const loading = useContext(LoadingContext);

	return (
		<div className="w-full h-64 flex flex-col items-center justify-center">
			<svg width="96" height="96" fill="none" className="mb-6 text-gray-900">
				<path
					d="M36 28.024A18.05 18.05 0 0025.022 39M59.999 28.024A18.05 18.05 0 0170.975 39"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<ellipse cx="37.5" cy="43.5" rx="4.5" ry="7.5" fill="currentColor"></ellipse>
				<ellipse cx="58.5" cy="43.5" rx="4.5" ry="7.5" fill="currentColor"></ellipse>
				<path
					d="M24.673 75.42a9.003 9.003 0 008.879 5.563m-8.88-5.562A8.973 8.973 0 0124 72c0-7.97 9-18 9-18s9 10.03 9 18a9 9 0 01-8.448 8.983m-8.88-5.562C16.919 68.817 12 58.983 12 48c0-19.882 16.118-36 36-36s36 16.118 36 36-16.118 36-36 36a35.877 35.877 0 01-14.448-3.017"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				></path>
				<path
					d="M41.997 71.75A14.94 14.94 0 0148 70.5c2.399 0 4.658.56 6.661 1.556a3 3 0 003.999-4.066 12 12 0 00-10.662-6.49 11.955 11.955 0 00-7.974 3.032c1.11 2.37 1.917 4.876 1.972 7.217z"
					fill="currentColor"
				></path>
			</svg>
			<p className="text-lg leading-5 font-medium text-gray-900 mb-3">
				{message || `Sorry! There is no such a file or directory named "${pathname.split(/\/+/g).pop()}".`}
			</p>
			<p>
				We suggest you to go back to{" "}
				<Link replace href={href || "/home"}>
					<a onClick={() => loading.setIsLoading(true)} className="link transition-colors duration-150">
						Home
					</a>
				</Link>
				.
			</p>
		</div>
	);
};

export default Error;
