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
} from "@icons";

export const buttons = [
  { icon: CodeIcon, label: "Code", href: "#code", selected: true, shouldHideOnMd: false },
  { icon: IssuesIcon, label: "Issues", href: "#issues", shouldHideOnMd: true },
  { icon: PullIcon, label: "Pull requests", href: "#pull", shouldHideOnMd: true },
  { icon: ActionsIcon, label: "Actions", href: "#actions", shouldHideOnMd: true },
  { icon: ProjectsIcon, label: "Projects", href: "#projects", shouldHideOnMd: true },
  { icon: WikiIcon, label: "Wiki", href: "#wiki", shouldHideOnMd: true },
  { icon: SecurityIcon, label: "Security", href: "#security", shouldHideOnMd: true },
  { icon: InsightsIcon, label: "Insights", href: "#insights", shouldHideOnMd: true },
  { icon: SettingsIcon, label: "Settings", href: "#settings", shouldHideOnMd: false },
];
