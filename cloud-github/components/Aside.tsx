import { createStyles } from "@mantine/core";
import { SettingsIcon } from "@icons";
import { useDefaultStyles } from "components";
import { buttons } from "utils/repo-aside-buttons";

const useStyles = createStyles((theme) => ({
	control: { gridClumn: "2/span 2", [theme.fn.smallerThan("md")]: { display: "none" }, width: "296px" },
	navbar: { display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" },
	navbarRow: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		height: "24px",
		marginBottom: "16px",
	},
	h2: { fontWeight: "bold", fontSize: "16px" },
	desc: { fontStyle: "italic", fontSize: "16px", marginBottom: "16px", color: "var(--icon-color)" },
	anchor: { textDecoration: "none", color: "var(--icon-color)" },
	button: {
		marginTop: "8px",
		"&:hover": { color: "var(--link-color)" },
		"& svg": { marginRight: "8px" },
		"&:hover svg": { fill: "var(--link-color)" },
		display: "flex",
		alignItems: "center",
		fontSize: "14px",
	},
	hide: { display: "none" },
}));

const Aside = ({ hide }: { hide: boolean }) => {
	const { classes, cx } = useStyles();
	const { defaultClasses } = useDefaultStyles();

	return (
		<aside className={cx(classes.control, hide ? defaultClasses.hide : "")}>
			<div className={classes.navbar}>
				<div className={classes.navbarRow}>
					<h2 className={classes.h2}>About</h2>
					<SettingsIcon height="16" width="16" fill="var(--icon-color)" />
				</div>
				<div className={classes.desc}>No description, website, or topics provided.</div>
				{buttons.map((button) => (
					<a key={button.href} href={button.href} className={cx(classes.anchor, classes.button)}>
						<button.icon height="16" width="16" fill="var(--icon-color)" />
						{button.label}
					</a>
				))}
			</div>
		</aside>
	);
};

export default Aside;
