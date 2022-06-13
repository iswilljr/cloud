import {
	ActionsIcon,
	CodeIcon,
	InsightsIcon,
	IssuesIcon,
	ProjectsIcon,
	PullIcon,
	SecurityIcon,
	SettingsIcon,
	WikiIcon,
} from "components/icons";


export const buttons = [
	{ icon: CodeIcon, label: "Code", href: "#code", selected: true, showOnMdScreen: true },
	{ icon: IssuesIcon, label: "Issues", href: "#issues", showOnMdScreen: true },
	{ icon: PullIcon, label: "Pull requests", href: "#pull", showOnMdScreen: true },
	{ icon: ActionsIcon, label: "Actions", href: "#actions", showOnMdScreen: false },
	{ icon: ProjectsIcon, label: "Projects", href: "#projects", showOnMdScreen: false },
	{ icon: WikiIcon, label: "Wiki", href: "#wiki", showOnMdScreen: false },
	{ icon: SecurityIcon, label: "Security", href: "#security", showOnMdScreen: false },
	{ icon: InsightsIcon, label: "Insights", href: "#insights", showOnMdScreen: false },
	{ icon: SettingsIcon, label: "Settings", href: "#settings", showOnMdScreen: true },
];
