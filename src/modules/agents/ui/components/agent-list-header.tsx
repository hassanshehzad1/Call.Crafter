/**
 * The AgentListHeader component in TypeScript React renders a header for a list of agents with a
 * button to open a dialog for creating a new agent.
 * @returns The `AgentListHeader` component is being returned. It consists of a header section for a
 * list of agents, including a title "My Agents" and a button labeled "New Agent" with a PlusIcon. When
 * the button is clicked, it opens a dialog for creating a new agent.
 */
"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NewAgentDialog } from "./new-agent-dialog";

const AgentListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <PlusIcon/>New Agent
          </Button>
        </div>
      </div>
    </>
  );
};

export default AgentListHeader;
