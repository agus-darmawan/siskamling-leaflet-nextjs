import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import StatusUpdateForm from "./_status-update-form";
import { AlertModal } from "@/components/AlertModal";

import { Edit, Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [loading] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const onView = () => {
    router.push(`http://www.google.com/maps/place/${data.lat},${data.long}`);
  };

  const onConfirm = async () => {
    try {
      await axios.delete(`/reports/${data.id}`);
      toast({
        title: "Success",
        description: "Data berhasil dihapus",
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      if (error) {
        toast({
          title: "Failed",
          description: "Data tidak berhasil dihapus",
        });
      }
    } finally {
      setOpenDel(false);
    }
  };

  return (
    <div className="w-36">
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
      <AlertModal
        isOpen={openDel}
        onClose={() => setOpenDel(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <Button
        variant="destructive"
        className="px-2 py-2"
        onClick={() => setOpenDel(true)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
