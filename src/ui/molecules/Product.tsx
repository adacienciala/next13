import Image from "next/image";

import { formatMoney } from "@/lib/formatMoney";
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
	const avgText = typeof product.averageRating === "number" ? `${product.averageRating} / 5` : "–";

	return (
		<Card className="w-80">
			<CardHeader className="flex h-96 items-center justify-center overflow-hidden">
				{product.image && <Image height={400} width={200} src={product.image} alt={product.name} />}
			</CardHeader>
			<CardContent>
				<CardDescription>{product.category}</CardDescription>
				<CardTitle>{product.name}</CardTitle>
				<CardDescription data-testid="product-price">{formatMoney(product.price)}</CardDescription>
			</CardContent>
			<CardFooter>
				Rating:
				<p className="ml-2" data-testid="product-rating">
					{avgText}
				</p>
			</CardFooter>
		</Card>
	);
};
