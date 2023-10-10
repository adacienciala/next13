"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const ButtonAddToCart = () => {
	const status = useFormStatus();

	return (
		<button
			data-testid="add-to-cart-button"
			disabled={status.pending}
			type="submit"
			className="w-full rounded-md border bg-slate-500 px-8 py-3 text-white shadow-slate-700 transition-shadow hover:bg-slate-700 hover:shadow-lg disabled:cursor-wait disabled:bg-slate-300"
		>
			{status.pending ? "Adding..." : "Add to cart"}
		</button>
	);
};
