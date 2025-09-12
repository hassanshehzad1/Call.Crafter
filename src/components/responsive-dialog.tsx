/**
 * The `ResponsiveDialog` component renders either a `Drawer` or a `Dialog` based on the device being
 * used.
 * @param {ResoponsiveDialogProps}  - The code you provided is a React component called
 * `ResponsiveDialog` that renders either a `Drawer` or a `Dialog` based on the screen size.
 * @returns The `ResponsiveDialog` component is being returned based on the condition of whether the
 * user is on a mobile device or not. If the user is on a mobile device (`isMobile` is true), then a
 * `Drawer` component is returned with the provided `title`, `description`, and `children`. If the user
 * is not on a mobile device, a `Dialog` component is returned with the
 */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResoponsiveDialogProps {
  title: String;
  description: String;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveDialog = ({
  title,
  description,
  children,
  open,
  onOpenChange,
}: ResoponsiveDialogProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          <div className="p-4">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ResponsiveDialog;
