import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import StatusUpdateForm from "./_status-update-form";

import { Edit, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onView = () => {
    router.push(`http://www.google.com/maps/place/${data.lat},${data.long}`);
  };

  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="m-0 p-0 max-w-lg"
      >
        <StatusUpdateForm modalClose={() => setOpen(false)} data={data} />
      </Modal>
      <Button
        variant="outline"
        className="mr-3 px-2 pl-2"
        onClick={() => setOpen(true)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="secondary" className="mr-3 px-2 pl-2" onClick={onView}>
        <Eye className="h-4 w-4" />
      </Button>
    </>
  );
};
