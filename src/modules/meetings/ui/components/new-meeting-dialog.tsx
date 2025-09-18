/**
 * The NewMeetingDialog component renders a dialog for creating a new agent with an AgentForm inside.
 * @param {NewMeetingDialogProps}  - The code snippet you provided is a React component called
 * `NewAgentDialog` that renders a dialog box for creating a new agent. Here's an explanation of the
 * parameters used in the component:
 * @returns The `NewAgentDialog` component is being returned. It is a functional component that renders
 * a `ResponsiveDialog` component with the title "New Agent" and description "Create a new Agent".
 * Inside the `ResponsiveDialog`, an `AgentForm` component is rendered with `onSuccess` and `onCancel`
 * callbacks passed as props to handle the success and cancellation actions respectively.
 */
import ResponsiveDialog from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";

interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({
  open,
  onOpenChange,
}: NewMeetingDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a new Meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
      onSuccess={(id)=>{
        onOpenChange(false);
        router.push(`/meetings/${id}`)
      }

    }
   onCancel={()=>onOpenChange}
   />
    </ResponsiveDialog>
  );
};
