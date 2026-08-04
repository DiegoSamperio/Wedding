import { notFound } from "next/navigation";
import { WeddingPage } from "@/components/WeddingPage";
import { weddingRoutePaths } from "@/lib/weddingRoutes";

export function generateStaticParams() {
  return weddingRoutePaths
    .filter((path) => path !== "/")
    .map((path) => ({ route: path.slice(1) }));
}

type WeddingRoutePageProps = {
  params: Promise<{ route: string }>;
};

export default async function WeddingRoutePage({ params }: WeddingRoutePageProps) {
  const { route } = await params;
  const routePath = `/${route}`;

  if (!weddingRoutePaths.some((path) => path === routePath)) {
    notFound();
  }

  return <WeddingPage />;
}
