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
	const reviewAvg =
		product.reviews.reduce((acc, curr) => acc + curr.rating, 0) / product.reviews.length;

	return (
		<Card className="w-80">
			<CardHeader className="flex h-96 items-center justify-center overflow-hidden">
				{product.image && <Image height={400} width={200} src={product.image} alt={product.name} />}
			</CardHeader>
			<CardContent>
				<CardDescription>{product.category}</CardDescription>
				<CardTitle>{product.name}</CardTitle>
				<CardDescription>{formatMoney(product.price)}</CardDescription>
			</CardContent>
			{product.reviews.length > 0 && (
				<CardFooter>
					Rating: {reviewAvg.toFixed(2)} by {product.reviews.length}
				</CardFooter>
			)}
		</Card>
	);
};
