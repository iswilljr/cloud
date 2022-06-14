import { MediaQuery, UnstyledButton } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";

const Error = () => {

	const router = useRouter()

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
							<div style={{ zIndex: 9, top: 94, left: 356, position: "absolute" }}>
								<Image width={188} height={230} src="/avatar.png" alt="" />
							</div>
							<div style={{ zIndex: 8, top: 150, left: 432, position: "absolute" }}>
								<Image width={440} height={156} src="/boat.png" alt="" />
							</div>
							<div style={{ zIndex: 7, top: 297, left: 371, position: "absolute" }}>
								<Image width={166} height={49} src="/avatar-shadow.png" alt="" />
							</div>
							<div style={{ zIndex: 6, top: 263, left: 442, position: "absolute" }}>
								<Image width={430} height={75} src="/boat-shadow.png" alt="" />
							</div>
							<div style={{ zIndex: 5, top: 73, left: 467, position: "absolute" }}>
								<Image width={304} height={123} src="/1.png" alt="" />
							</div>
							<div style={{ zIndex: 4, top: 113, left: 762, position: "absolute" }}>
								<Image width={116} height={50} src="/2.png" alt="" />
							</div>
						</div>
					</MediaQuery>
				</div>
			</main>
			<div style={{ margin: "32px auto" }}>
				<Button onClick={()=>router.replace("/home")} label="Go Home" styleButton style={{ fontSize: "16px" }}></Button>
			</div>
		</div>
	);
};

export default Error;
