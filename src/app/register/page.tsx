import { AccessPage } from "../access-page";
export default async function Register({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  return <AccessPage register next={(await searchParams).next} />;
}
