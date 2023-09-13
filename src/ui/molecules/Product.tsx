import Image from "next/image";

import { type TProduct } from "@/types";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/ui/molecules/card";

export const Product = ({ product }: { product: TProduct }) => {
	return (
		<Card>
			<CardHeader>
				<Image width={200} height={200} src={product.image.src} alt={product.image.alt} />
			</CardHeader>
			<CardContent>
				<CardDescription>{product.category}</CardDescription>
				<CardTitle>{product.name}</CardTitle>
				<CardDescription>
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(product.price)}
				</CardDescription>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
};
