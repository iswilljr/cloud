import { createStyles } from "@mantine/core";

export default createStyles(() => ({
  control: {
    display: "flex",
    padding: "16px 32px",
    alignItems: "center",
    fontSize: "14px",
    lineHeight: 1.5,
    backgroundColor: "var(--background-hover-color)",
    border: "none",
  },
  item: { display: "flex", marginRight: "16px", alignItems: "center", flexWrap: "nowrap" },
  logo: { width: 32, height: 38 },
  anchor: { fontWeight: 600, whitespace: "nowrap", width: 32, height: 32 },
  middle: { display: "flex", alignItems: "center", flex: 1 },
  icon: { position: "relative", cursor: "pointer", "&:hover": { opacity: 0.6 } },
  unreadNotifications: {
    display: "inline-block",
    position: "absolute",
    top: -4,
    left: 8,
    zIndex: 2,
    width: 10,
    height: 10,
    color: "#fff",
    backgroundImage: "linear-gradient(#54a3ff, #006eed)",
    backgroundClip: "padding-box",
    border: "2px solid var(var(--background-hover-color))",
    borderRadius: "50%",
  },
}));
