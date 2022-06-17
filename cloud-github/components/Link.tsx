import NextLink from "next/link";

const Link = ({
	href,
	isLast,
	label,
	...props
}: React.HTMLProps<HTMLAnchorElement> & { href: string; label: string; isLast: boolean }) => {
	const item = (
		<NextLink href={href}>
			<a href={href} {...props}>
				{label}
			</a>
		</NextLink>
	);

	return isLast ? <strong>{item}</strong> : item;
};

export default Link;
