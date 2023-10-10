import { Input } from "@/ui/atoms/Input";

export const ReviewForm = ({ action }: { action: (formData: FormData) => void }) => {
	const formFields = [
		{ prompts: "Review title", name: "headline", type: "text" },
		{ prompts: "Review content", name: "content", type: "text" },
		{ prompts: "Rating", name: "rating", type: "number" },
		{ prompts: "Name", name: "name", type: "text" },
		{ prompts: "Email", name: "email", type: "email" },
	];

	return (
		<form data-testid="add-review-form" className="w-1/2 px-4" action={action}>
			<h3 className="text-2xl font-bold">Share your thoughts</h3>
			<p className="mb-8">If you’ve used this product, share your thoughts with other customers.</p>
			<div>
				{formFields.map((field) => (
					<div className="mb-4" key={field.name}>
						<p className="text-sm">{field.prompts}</p>
						<Input type={field.type} name={field.name} required autoComplete="off" />
					</div>
				))}
				<button
					className="rounded-sm border bg-slate-100 px-8 py-2 shadow-sm transition-colors hover:bg-slate-200"
					type="submit"
				>
					Submit Review
				</button>
			</div>
		</form>
	);
};
