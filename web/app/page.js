import Image from "next/image";
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <div className="m-8 flex space-x-4">
      <Button>Admin</Button>

      <Button>User</Button>

    </div>
  );
}

