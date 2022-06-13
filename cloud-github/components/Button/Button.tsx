import { UnstyledButton } from "@mantine/core";
import { useDefaultStyles } from "components/defaultStyles";
import { DropdownIcon } from "components/icons";
import React from "react";
import { useStyles } from "./style";

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
			{Icon && <Icon className={classes.icon} width="16" height="16" fill="#8B949E" />}
			{label}
			{dropdownIcon && <DropdownIcon fill={dropdownColor ?? "#8B949E"} />}
		</UnstyledButton>
	);
};

export default Button;
