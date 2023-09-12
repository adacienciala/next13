import { products } from "@/app/products/products";
import { ProductList } from "@/ui/molecules/ProductList";

export default function ProductsPage() {
	return <ProductList products={products} />;
}
