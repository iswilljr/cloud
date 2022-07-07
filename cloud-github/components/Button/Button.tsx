import { UnstyledButton, UnstyledButtonProps } from "@mantine/core";
import { useDefaultStyles } from "components";
import { DropdownIcon } from "@icons";
import useStyles from "./Button.styles";

interface ButtonProps extends UnstyledButtonProps<"button"> {
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  label: string;
  dropdownIcon?: boolean;
  dropdownColor?: string;
  styleButton?: boolean;
  shouldHideOnMd?: boolean;
}

const Button = ({
  icon: Icon,
  label,
  dropdownIcon,
  styleButton,
  className,
  dropdownColor,
  shouldHideOnMd,
  ...props
}: ButtonProps) => {
  const { classes, cx } = useStyles();
  const { defaultClasses } = useDefaultStyles();

  return (
    <UnstyledButton
      className={cx(
        classes.control,
        className,
        styleButton ? classes.style : "",
        shouldHideOnMd ? defaultClasses.hidden : ""
      )}
      {...props}
    >
      {Icon && <Icon className={classes.icon} width="16" height="16" fill="var(--icon-color)" />}
      {label}
      {dropdownIcon && <DropdownIcon fill={dropdownColor ?? "var(--icon-color)"} />}
    </UnstyledButton>
  );
};

export default Button;
