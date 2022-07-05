import NextLink from "next/link";

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
	href: string;
	label: string;
	isLast: boolean;
}

const Link = ({ href, isLast, label, ...props }: LinkProps) => {
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
