import { AccessPage } from "../access-page";
export default async function Login({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  return <AccessPage next={(await searchParams).next} />;
}
