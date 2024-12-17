import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmFn: () => void;
};

export function CartAlert({ open, setOpen, confirmFn }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h2>You have to place order in one shop</h2>
        </div>
        <DialogFooter>
          <Button onClick={() => confirmFn()}>Replace Cart</Button>
          <Button onClick={() => setOpen(false)}>Discard Change</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
