import { MediaQuery, Text } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { wrappers } from "utils/images";
import Button from "../Button/Button";
import useStyles from "./Error.styles";

const Error = () => {
	const { classes } = useStyles();
	const router = useRouter();

	return (
		<div className={classes.control}>
			<main className={classes.main}>
				<div className={classes.errorBg}>
					<Image layout="fill" src="/error_bg.jpeg" alt="" />
				</div>
				<div className={classes.container}>
					<div className={classes.error404}>
						<Image width={271} height={249} src="/404.png" alt="" />
					</div>
					<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
						<div>
							{wrappers.map((wrapper, index) => (
								<div key={index} style={wrapper.style}>
									<Image {...wrapper.image} alt={wrapper.image.alt} />
								</div>
							))}
						</div>
					</MediaQuery>
				</div>
			</main>
			<div className={classes.buttonWrapper}>
				{router.asPath === "/home" && (
					<div className={classes.path}>
						<p>
							Looks like the{" "}
							<Text inherit variant="gradient" component="span">
								Home cloud api
							</Text>{" "}
							is shut down
						</p>
						<p>
							if you already have it setup then run{" "}
							<Text inherit variant="gradient" component="span">
								yarn start
							</Text>
						</p>
						<p>
							if not, you can see how to set it up{" "}
							<Text inherit variant="gradient" component="span">
								<a href="/" target="_blank">
									here
								</a>
							</Text>
						</p>
					</div>
				)}
				<Button onClick={() => router.replace("/home")} label="Go Home" styleButton style={{ fontSize: "16px" }} />
			</div>
		</div>
	);
};

export default Error;
