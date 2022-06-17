/* eslint-disable jsx-a11y/alt-text */
import { MediaQuery } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { wrappers } from "utils/images";
import Button from "./Button";

const Error = () => {
	const router = useRouter();

	return (
		<div style={{ display: "flex", flex: "auto", flexDirection: "column" }}>
			<main style={{ position: "relative" }}>
				<div style={{ position: "absolute", width: "100%", height: "370px", top: 0, left: 0 }}>
					<Image layout="fill" src="/error_bg.jpeg" alt="" />
				</div>
				<div
					style={{
						maxWidth: "940px",
						height: "370px",
						clear: "both",
						display: "block",
						margin: "0 auto",
						position: "relative",
					}}
				>
					<div style={{ zIndex: 9, top: 72, left: 72, position: "absolute" }}>
						<Image width={271} height={249} src="/404.png" alt="" />
					</div>
					<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
						<div>
							{wrappers.map((wrapper, index) => (
								<div key={index} style={wrapper.style}>
									<Image {...wrapper.image} />
								</div>
							))}
						</div>
					</MediaQuery>
				</div>
			</main>
			<div style={{ margin: "32px auto" }}>
				<Button onClick={() => router.replace("/home")} label="Go Home" styleButton style={{ fontSize: "16px" }} />
			</div>
		</div>
	);
};

export default Error;
