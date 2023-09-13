import { type TProduct } from "@/types";
import { Product } from "@/ui/molecules/Product";

export const ProductList = ({ products }: { products: TProduct[] }) => {
	return (
		<ul data-testid="products-list" className="mt-4 flex flex-wrap gap-6">
			{products.map((product, index) => (
				<li key={`${product.name}-${index}`}>
					<Product product={product} />
				</li>
			))}
		</ul>
	);
};
