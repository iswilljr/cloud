import { Breadcrumbs, createStyles } from "@mantine/core";
import Link from "next/link";
import { useContext } from "react";
import { RepoIcon } from "@icons";
import { buttons as repoButtons } from "utils/repo-header-buttons";
import { buttons as navButtons } from "utils/repo-nav-buttons";
import { Button, useDefaultStyles } from "components";
import { LoadingContext } from "context/loading-context";

const useStyles = createStyles((theme) => ({
	control: { backgroundColor: "var(--background-color)", padding: "16px 0 0", color: "#c9d1d9", width: "100%" },
	top: { margin: "0 0 16px", padding: "0 32px", display: "flex", height: "32px", alignItems: "center" },
	topLeft: { flex: 1, flexWrap: "wrap", display: "flex", alignItems: "center", height: "30px" },
	topRight: { display: "flex", alignItems: "center", height: "30px" },
	icon: { marginRight: "8px", display: "flex", alignItems: "center", flexWrap: "nowrap" },
	anchor: { color: "var(--link-color) !important", fontSize: "20px !important", textDecoration: "none" },
	bottom: {
		padding: "0 32px",
		display: "flex",
		height: "48px",
		alignItems: "center",
		borderBottom: "1px solid rgba(240, 246, 252, .1)",
	},
	ul: { display: "flex", gap: "8px", alignItems: "center", listStyle: "none", margin: 0, padding: 0 },
	li: {
		position: "relative",
		height: "30px",
		display: "flex",
		alignItems: "center",
		padding: "0 8px",
		fontSize: "14px",
		whiteSpace: "nowrap",
		lineHeight: "38px",
		outlineOffset: "-8px",
		textAlign: "center",
		cursor: "pointer",
		backgroundColor: "transparent",
		border: 0,
		borderRadius: "6px",
		"&:before": {
			position: "absolute",
			top: "50%",
			left: "50%",
			width: "100%",
			height: "100%",
			minHeight: "48px",
			content: '""',
			transform: "translateX(-50%) translateY(-50%)",
		},
		boxSizing: "border-box",
		"&:hover": { backgroundColor: "rgba(177, 186, 196, .12)", transition: "background .12s ease-out" },
	},
	selected: {
		"&:before": { borderBottom: "2px solid var(--border-selected)", outlineOffset: "8px", boxSizing: "border-box" },
		fontWeight: "bold",
	},
	a: {
		textDecoration: "none",
		"&:visited": { textDecoration: "none", color: "var(--text-color)" },
		display: "flex",
		alignItems: "center",
		color: "var(--text-color)",
	},
}));

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
					<RepoIcon className={classes.icon} width="16" height="16" fill="var(--icon-color)" />
					<Breadcrumbs
						styles={{
							separator: { margin: "0 4px", fontSize: "20px", color: "var(--icon-color)" },
							breadcrumb: { color: "var(--link-color) !important", fontSize: "20px !important" },
							root: { marginRight: "4px" },
						}}
					>
						{paths.map((item, i, a) => {
							const href = `${basePath}${"../".repeat(a.length - i - 1)}`;
							const link = (
								<Link href={href}>
									<a
										onClick={(e) => {
											if (href !== basePath && i !== a.length - 1) context.setIsLoading(true);
											else e.preventDefault()
										}}
										className={classes.anchor}
									>
										{i === 0 ? "Home" : item}
									</a>
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
								<button.icon className={classes.icon} width="16" height="16" fill="var(--icon-color)" />
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
