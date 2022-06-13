import { Breadcrumbs, UnstyledButton } from "@mantine/core";
import { RepoIcon } from "components/icons";
import { useStyles } from "./styles";
import { buttons as repoButtons } from "utils/repo-header-buttons";
import { buttons as navButtons } from "utils/repo-nav-buttons";
import { useDefaultStyles } from "components/defaultStyles";
import Button from "components/Button/Button";
import Link from "next/link";
import { LoadingContext } from "context/loading-context";
import { useContext } from "react";

const Header = ({ pathname }: { pathname: string }) => {
	const { classes, cx } = useStyles();
	const { defaultClasses } = useDefaultStyles();
	const context = useContext(LoadingContext);
	const paths = ("/home" + pathname).split(/\/+/g).filter(Boolean);
	const basePath = `/home${pathname}${pathname.endsWith("/") ? "" : "/"}`;

	return (
		<div className={classes.control}>
			<div className={classes.top}>
				<div className={classes.topLeft}>
					<RepoIcon className={classes.icon} width="16" height="16" fill="#8B949E" />
					<Breadcrumbs
						styles={{
							separator: { margin: "0 4px", fontSize: "20px", color: "$8b949e" },
							breadcrumb: { color: "#58a6ff !important", fontSize: "20px !important" },
							root: { marginRight: "4px" },
						}}
					>
						{paths.map((item, i, a) => {
							const href = `${basePath}${"../".repeat(a.length - i - 1)}`;
							const link = (
								<Link href={href}>
									<a onClick={()=>{href !== basePath &&context.setIsLoading(true)}} className={classes.anchor}>{i === 0 ? "Home" : item}</a>
								</Link>
							);
							return <span key={item}>{i === a.length - 1 ? <strong>{link}</strong> : link}</span>;
						})}
					</Breadcrumbs>
				</div>
				<div className={classes.topRight}>
					{repoButtons.map((button) => (
						<Button label={button.label} styleButton icon={button.icon} key={button.label} />
					))}
				</div>
			</div>
			<div className={classes.bottom}>
				<ul className={classes.ul}>
					{navButtons.map((button) => (
						<li
							key={button.href}
							className={cx(
								classes.li,
								button?.selected ? classes.selected : "",
								button.showOnMdScreen ? "" : defaultClasses.hidden
							)}
						>
							<a className={cx(classes.a)} href={button.href}>
								<button.icon className={classes.icon} width="16" height="16" fill="#8B949E" />
								{button.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Header;
