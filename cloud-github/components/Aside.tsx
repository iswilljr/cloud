import { SettingsIcon } from "@icons";
import { useDefaultStyles, useAsideStyles as useStyles } from "components";
import { buttons } from "utils/repo-aside-buttons";

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
