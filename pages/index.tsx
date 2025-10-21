import dynamic from "next/dynamic";

const USEKApp = dynamic(() => import("../components/USEKApp"), { ssr: false });

export default function Home() {
  return <USEKApp />;
}
