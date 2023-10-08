import { getCollections } from "@/api/products/getCollections";
import { getProducts } from "@/api/products/getProducts";
import { DEFAULT_TAKE } from "@/app/(products)/products/utils";
import { ActiveLink } from "@/ui/atoms/ActiveLink";
import { ProductList } from "@/ui/molecules/ProductList";

export default async function HomePage() {
	const collections = await getCollections();

	const { products } = await getProducts({
		take: DEFAULT_TAKE,
	});

	return (
		<>
			<h1 className="text-3xl font-bold">Home Page</h1>
			{collections.map((col) => (
				<li key={col.slug}>
					<ActiveLink href={`/collections/${col.slug}/1`} exact={false}>
						{col.name}
					</ActiveLink>
				</li>
			))}
			<ProductList products={products} />
		</>
	);
}
