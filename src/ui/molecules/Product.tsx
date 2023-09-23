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
		<Card className="w-80">
			<CardHeader className="flex h-96 items-center justify-center overflow-hidden">
				<Image height={400} width={200} src={product.image} alt={product.title} />
			</CardHeader>
			<CardContent>
				<CardDescription>{product.category}</CardDescription>
				<CardTitle>{product.title}</CardTitle>
				<CardDescription>
					{new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(product.price)}
				</CardDescription>
			</CardContent>
			<CardFooter>
				Rating: {product.rating.rate} by {product.rating.count}
			</CardFooter>
		</Card>
	);
};
