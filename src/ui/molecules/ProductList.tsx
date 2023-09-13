import { type TProduct } from "@/types";
import { Product } from "@/ui/molecules/Product";

export const ProductList = ({ products }: { products: TProduct[] }) => {
	return (
		<div data-testid="products-list" className="mt-4 flex flex-wrap gap-6">
			{products.map((product, index) => (
				<Product key={`${product.name}-${index}`} product={product} />
			))}
		</div>
	);
};
