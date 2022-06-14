import { Tooltip } from "@mantine/core";
import NextLink from "next/link";

const Link = ({
	href,
	isLast,
	label,
	...props
}: React.HTMLProps<HTMLAnchorElement> & { href: string; label: string; isLast: boolean }) => {
	const item = (
		<Tooltip label={label} position="bottom" placement="start">
			<NextLink href={href}>
				<a href={href} {...props}>
					{label}
				</a>
			</NextLink>
		</Tooltip>
	);

	return isLast ? <strong>{item}</strong> : item;
};

export default Link;
