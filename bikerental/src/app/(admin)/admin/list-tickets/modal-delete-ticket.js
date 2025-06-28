import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export function ModalDeleteTicket(props) {
  const { open, setIsOpenModalDelete, refetch, dataDelete } = props;

  const handleClose = () => {
    setIsOpenModalDelete(false); // Close the modal
  };
  const fecthDeleteTicket = async () => {
    const res = await fetch(
      "http://localhost:3000/api/auth/tickets/deleteTickets",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ve_id: dataDelete.ve_id,
        }),
      }
    );
    const req = await res.json();
    if (res.ok) {
      toast.success(req.message);
      handleClose(); // Close modal after successful submission
      refetch();
    } else {
      toast.error(req.message);
    }
  };

  return (
    <>
      {dataDelete && (
        <AlertDialog open={open} onOpenChange={setIsOpenModalDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xóa vé này chứ</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa thẻ này? Hành động này không thể hoàn
                tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-700"
                onClick={fecthDeleteTicket}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
