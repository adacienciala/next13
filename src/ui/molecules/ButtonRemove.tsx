"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { removeItem } from "@/app/cart/actions";

export const ButtonRemove = ({ itemId }: { itemId: string }) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<button
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					await removeItem(itemId);
					router.refresh();
				})
			}
			className="text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-wait disabled:text-slate-400"
		>
			{isPending ? "Removing..." : "Remove"}
		</button>
	);
};
