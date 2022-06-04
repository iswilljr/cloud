/* eslint-disable jsx-a11y/anchor-is-valid */
import { selectPathname, setLoading } from "app/appSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Link from "next/link";

const Tree = () => {
	const pathname = useAppSelector(selectPathname);
	const dispatch = useAppDispatch();

	return (
		<p className="text-gray-500 min-h-[24px]">
			<>
				{pathname.split(/\//g).map((p, i, a) => {
					const l = `${a.slice(0, i + 1).join("/")}`;
					const link = l.length ? l : "/"
					return (
						<span key={i}>
							<Link key={i} href={`/home${link}`}>
								<a
									className="link"
									onClick={() => {
										if (link !== pathname) dispatch(setLoading(true));
									}}
								>
									{i === 0 ? "Home" : p}
								</a>
							</Link>
							{(a.length > 1 && i < a.length - 1 && a[1]) && <span className="text-gray-500">{" / "}</span>}
						</span>
					);
				})}
			</>
		</p>
	);
};

export default Tree;
