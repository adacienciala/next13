"use client";

import { experimental_useOptimistic as useOptimistic } from "react";

import { changeItemQuantity } from "@/app/cart/actions";

export const AdjustableQuantity = ({
	itemId,
	price,
	quantity,
}: {
	itemId: string;
	price: number;
	quantity: number;
}) => {
	const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
		quantity,
		(_state, newQuantity: number) => newQuantity,
	);

	return (
		<form className="flex">
			<button
				data-testid="decrement"
				className="h-6 w-6 border"
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity - 1);
					await changeItemQuantity(itemId, price, optimisticQuantity - 1);
				}}
			>
				-
			</button>
			<span data-testid="quantity" className="w-8 text-center">
				{optimisticQuantity}
			</span>
			<button
				data-testid="increment"
				className="h-6 w-6 border"
				type="submit"
				formAction={async () => {
					setOptimisticQuantity(optimisticQuantity + 1);
					await changeItemQuantity(itemId, price, optimisticQuantity + 1);
				}}
			>
				+
			</button>
		</form>
	);
};
