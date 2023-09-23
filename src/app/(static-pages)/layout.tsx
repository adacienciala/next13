export default function StaticLayout({ children }: { children: React.ReactNode }) {
	return <article className="prose">{children}</article>;
}
