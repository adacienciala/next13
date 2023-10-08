import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Open Graph Awesome Image";
export const size = {
	width: 1200,
	height: 600,
};

export const contentType = "image/png";

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
