/**
 * The `useConfirm` function in the provided TypeScript React code creates a confirm dialog with a
 * title and description, allowing users to confirm or cancel an action.
 * @param {string} title - The `title` parameter is a string that represents the title of the
 * confirmation dialog that will be displayed to the user. It typically provides a brief description of
 * the action that the user is confirming.
 * @param {string} description - The `description` parameter in the `useConfirm` function is a string
 * that represents the description or message that will be displayed in the confirmation dialog. It
 * provides additional information or context to the user before they confirm or cancel the action.
 * @returns The `useConfirm` function returns an array with two elements:
 */
import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
// import { string } from "better-auth";
import { JSX, useState } from "react";

export const useConfrim = (
  title: string,
  description: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  //   Confirm Dialog
  const confirmDialog = () => (
    <ResponsiveDialog
      open={promise !== null}
      onOpenChange={handleClose}
      title={title}
      description={description}
    >
      <div className="pt-4 w-full  flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
        <Button
          onClick={handleCancel}
          variant="outline"
          className="w-full lg:w-auto"
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          variant="outline"
          className="w-full lg:w-auto"
        >
          Confirm
        </Button>
      </div>
    </ResponsiveDialog>
  );

  return [confirmDialog, confirm];
};
