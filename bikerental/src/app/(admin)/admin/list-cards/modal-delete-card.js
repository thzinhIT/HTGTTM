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

export function ModalDeleteCard(props) {
  const { open, setIsOpenModalDelete, fecthCard, dataDelete } = props;
  console.log(dataDelete); // Destructure props to get open and onOpenChange
  const handleClose = () => {
    setIsOpenModalDelete(false); // Close the modal
  };
  const fecthDeleteCard = async () => {
    const res = await fetch("http://localhost:3000/api/auth/card/deleteCard", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        the_id: dataDelete.the_id,
      }),
    });
    const req = await res.json();
    if (res.ok) {
      toast.success(req.message);
      handleClose(); // Close modal after successful submission
      fecthCard();
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
              <AlertDialogTitle>Xóa người dùng</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa thẻ này? Hành động này không thể hoàn
                tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-700"
                onClick={fecthDeleteCard}
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
