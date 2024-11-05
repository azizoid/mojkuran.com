import { Empty } from "@/components/Empty/Empty";
import { WithFormProvider } from "@/providers/WithFormProvider";

export default function Home() {
  return (
    <WithFormProvider>
      <Empty />
    </WithFormProvider>
  );
}
