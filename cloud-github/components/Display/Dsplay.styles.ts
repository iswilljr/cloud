import { createStyles, CSSObject } from "@mantine/core";

const truncate: CSSObject = { whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" };

export default createStyles(() => ({
  control: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 16px",
    height: "38px",
    maxHeight: "38px",
    border: "1px solid var(--border-color)",
    fontSize: "14px",
    color: "#c9d1d9",
    "&:hover": { backgroundColor: "var(--background-hover-color)" },
    "&:last-child": { borderBottomLeftRadius: "6px", borderBottomRightRadius: "6px" },
    ...truncate,
  },
  info: { display: "flex", alignItems: "center", fontSize: "14px", color: "#c9d1d9", ...truncate },
  icon: { marginRight: "16px" },
  modified: { color: "var(--icon-color) !important" },
  name: truncate,
}));
