import { createStyles, Header as MantineHeader } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { BellIcon, DropdownIcon, GithubIcon, PlusIcon } from "@icons";
import { useDefaultStyles } from "components";

const useStyles = createStyles((theme) => ({
	control: {
		display: "flex",
		padding: "16px 32px",
		alignItems: "center",
		fontSize: "14px",
		lineHeight: 1.5,
		backgroundColor: "var(--background-hover-color)",
		border: "none",
	},
	item: { display: "flex", marginRight: "16px", alignItems: "center", flexWrap: "nowrap" },
	logo: { width: 32, height: 38 },
	anchor: { fontWeight: 600, whitespace: "nowrap", width: 32, height: 32 },
	middle: { display: "flex", alignItems: "center", flex: 1 },
	icon: { position: "relative", cursor: "pointer", "&:hover": { opacity: 0.6 } },
	unreadNotifications: {
		display: "inline-block",
		position: "absolute",
		top: -4,
		left: 8,
		zIndex: 2,
		width: 10,
		height: 10,
		color: "#fff",
		backgroundImage: "linear-gradient(#54a3ff, #006eed)",
		backgroundClip: "padding-box",
		border: "2px solid var(var(--background-hover-color))",
		borderRadius: "50%",
	},
}));

export default function Header() {
	const { classes, cx } = useStyles();
	const { defaultClasses } = useDefaultStyles();

	return (
		<MantineHeader height={62} className={classes.control}>
			<div className={cx(classes.item, classes.logo)}>
				<Link href="/">
					<a className={classes.anchor}>
						<GithubIcon width="32" height="32" fill="#fff" />
					</a>
				</Link>
			</div>
			<div className={classes.middle}></div>
			<div className={cx(classes.item, classes.icon)}>
				<span className={classes.unreadNotifications}></span>
				<BellIcon width="16" height="16" fill="#fff" />
			</div>
			<div className={cx(classes.item, classes.icon)}>
				<PlusIcon width="16" height="16" fill="#fff" />
				<DropdownIcon width="16" height="16" fill="#fff" />
			</div>
			<div className={cx(classes.item, classes.icon)}>
				<Image
					src="https://avatars.githubusercontent.com/u/97823389?v=4"
					className={defaultClasses.avatar}
					alt="user"
					width="20"
					height="20"
				/>
				<DropdownIcon width="16" height="16" fill="#fff" />
			</div>
		</MantineHeader>
	);
}
