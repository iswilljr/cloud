import { BranchIcon, TagsIcon } from "@icons";

interface Button {
	label: string;
	icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
	dropdownIcon?: boolean;
	styleButton?: boolean;
	style?: React.CSSProperties;
	dropdownColor?: string;
}

export const buttons: (Button | "divider")[] = [
	{
		label: "master",
		icon: BranchIcon,
		dropdownIcon: true,
		styleButton: true,
		style: { fontSize: "14px", padding: "8px 12px", height: "32px" },
	},
	{
		label: "1 branch",
		icon: BranchIcon,
		style: { fontSize: "14px", padding: "8px 12px", height: "32px", marginRight: 0 },
	},
	{
		label: "0 tags",
		icon: TagsIcon,
		style: { fontSize: "14px", padding: "8px 12px", height: "32px" },
	},
	"divider",
	{
		label: "Go to file",
		styleButton: true,
		style: { fontSize: "14px", padding: "8px 12px", height: "32px" },
	},
	{
		label: "Add file",
		dropdownIcon: true,
		styleButton: true,
		style: { fontSize: "14px", padding: "8px 12px", height: "32px" },
	},
	{
		label: "Code",
		dropdownIcon: true,
		dropdownColor: "#fff",
		styleButton: true,
		style: { fontSize: "14px", padding: "8px 12px", height: "32px", background: "var(--succes-color)", color: "#fff" },
	},
];
