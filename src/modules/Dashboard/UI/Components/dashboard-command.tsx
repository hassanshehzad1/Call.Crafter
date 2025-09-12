/**
 * The `DashboardCommand` component is a TypeScript React component that renders a command dialog with
 * an input field and a list item.
 * @param {Props}  - The code you provided is a TypeScript React component called `DashboardCommand`.
 * It takes two props:
 * @returns The `DashboardCommand` component is being returned. It consists of a
 * `CommandResponsiveDialog` component with an `open` prop and an `onOpenChange` prop set to the
 * `setOpen` function. Inside the `CommandResponsiveDialog`, there is a `CommandInput` component with a
 * placeholder text "Find a meeting or agent" and a `CommandList` component containing a `Command
 */
/**
 * The `DashboardCommand` component is a TypeScript React component that renders a command dialog with
 * an input field and a list item.
 * @param {Props}  - The code you provided is a React component called `DashboardCommand` that takes
 * two props: `open` and `setOpen`.
 * @returns The `DashboardCommand` component is being returned. It consists of a `CommandDialog`
 * component with an `open` prop and an `onOpenChange` prop set to the `setOpen` function. Inside the
 * `CommandDialog`, there is a `CommandInput` component with a placeholder text "Find a meeting or
 * agent" and a `CommandList` component containing a `CommandItem`
 */
import {
  CommandResponsiveDialog,
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};

export default DashboardCommand;
