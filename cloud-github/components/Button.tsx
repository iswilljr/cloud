import { createStyles, UnstyledButton } from "@mantine/core";
import { DropdownIcon } from "@icons";
import { useDefaultStyles } from "components";

const useStyles = createStyles((theme) => ({
	control: {
		color: "var(--text-color)",
		padding: "3px 12px",
		fontSize: "12px",
		lineHeight: "20px",
		display: "flex",
		alignItems: "center",
		borderRadius: "6px",
		height: "28px",
		cursor: "pointer",
		marginRight: "8px",
		// truncate
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	style: {
		backgroundColor: "var(--border-color)",
		border: "1px solid rgba(240, 246, 252, .1)",
		"&:hover": {
			backgroundColor: "var(--border-hover-color)",
			borderColor: "var(--icon-color)",
			transitionDuration: "0.1s",
		},
	},
	icon: { marginRight: "4px" },
}));

interface ButtonProps {
	icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
	label: string;
	dropdownIcon?: boolean;
	dropdownColor?: string;
	styleButton?: boolean;
}

const Button = ({
	icon: Icon,
	label,
	dropdownIcon,
	styleButton,
	className,
	style,
	dropdownColor,
}: ButtonProps & React.HTMLProps<HTMLButtonElement>) => {
	const { classes, cx } = useStyles();
	const { defaultClasses } = useDefaultStyles();

	return (
		<UnstyledButton className={cx(classes.control, className, styleButton ? classes.style : "")} style={style}>
			{Icon && <Icon className={classes.icon} width="16" height="16" fill="var(--icon-color)" />}
			{label}
			{dropdownIcon && <DropdownIcon fill={dropdownColor ?? "var(--icon-color)"} />}
		</UnstyledButton>
	);
};

export default Button;
