import { BellIcon, DropdownIcon, GithubIcon, PlusIcon } from "@icons";
import { Header as MantineHeader } from "@mantine/core";
import { useDefaultStyles } from "components/default.styles";
import Image from "next/image";
import Link from "next/link";
import useStyles from "./Header.styles";

export default function Header() {
  const { classes, cx } = useStyles();
  const { defaultClasses } = useDefaultStyles();

  return (
    <MantineHeader height={62} className={classes.control}>
      <div className={cx(classes.item, classes.logo)}>
        <Link href="/">
          <a className={classes.anchor}>
            <GithubIcon width="32" height="32" fill="#fff" />
          </a>
        </Link>
      </div>
      <div className={classes.middle} />
      <div className={cx(classes.item, classes.icon)}>
        <span className={classes.unreadNotifications} />
        <BellIcon width="16" height="16" fill="#fff" />
      </div>
      <div className={cx(classes.item, classes.icon)}>
        <PlusIcon width="16" height="16" fill="#fff" />
        <DropdownIcon width="16" height="16" fill="#fff" />
      </div>
      <div className={cx(classes.item, classes.icon)}>
        <Image
          src="https://avatars.githubusercontent.com/u/97823389?v=4"
          className={defaultClasses.avatar}
          alt="user"
          width="20"
          height="20"
        />
        <DropdownIcon width="16" height="16" fill="#fff" />
      </div>
    </MantineHeader>
  );
}
