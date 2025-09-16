/**
 * The NewAgentDialog component renders a dialog for creating a new agent with an AgentForm inside.
 * @param {NewAgentDialogProps}  - The code snippet you provided is a React component called
 * `NewAgentDialog` that renders a dialog box for creating a new agent. Here's an explanation of the
 * parameters used in the component:
 * @returns The `NewAgentDialog` component is being returned. It is a functional component that renders
 * a `ResponsiveDialog` component with the title "New Agent" and description "Create a new Agent".
 * Inside the `ResponsiveDialog`, an `AgentForm` component is rendered with `onSuccess` and `onCancel`
 * callbacks passed as props to handle the success and cancellation actions respectively.
 */
import ResponsiveDialog from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface updateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues
}: updateAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the Agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
