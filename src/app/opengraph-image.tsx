import { ImageResponse } from "next/server";

export const alt = "Open Graph Awesome Image";
export const size = {
	height: 600,
	width: 1200,
};

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<>
				<div
					style={{
						fontSize: 64,
						fontWeight: "bold",
						flexDirection: "column",
						height: "100%",
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					Awesome Shop, Mate
				</div>
			</>
		),
	);
}
