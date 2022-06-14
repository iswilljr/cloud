import { UnstyledButton } from "@mantine/core";
import { DropdownIcon } from "@icons";
import { useDefaultStyles, useButtonStyles as useStyles } from "components";

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
	...props
}: ButtonProps & React.HTMLProps<HTMLButtonElement>) => {
	const { classes, cx } = useStyles();
	const { defaultClasses } = useDefaultStyles();

	return (
		<UnstyledButton
			className={cx(classes.control, className, styleButton ? classes.style : "")}
			style={style}
			{...props}
		>
			{Icon && <Icon className={classes.icon} width="16" height="16" fill="var(--icon-color)" />}
			{label}
			{dropdownIcon && <DropdownIcon fill={dropdownColor ?? "var(--icon-color)"} />}
		</UnstyledButton>
	);
};

export default Button;
