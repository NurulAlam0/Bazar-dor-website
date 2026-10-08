import { CategoryProducts } from "@/components/CategoryProducts";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CategoryProducts slug={slug} />;
}
