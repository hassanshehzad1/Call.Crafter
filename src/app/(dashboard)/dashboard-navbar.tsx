"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import DashboardCommand from "@/modules/Dashboard/UI/Components/dashboard-command";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [open, setOpen] = useState(false);

  // Use Effect to open a search bar with command pallete
  useEffect(() => {
    const down = (e: keyboardEvent) => {
      if (e.key === "o" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <DashboardCommand open={open} setOpen={setOpen} />
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4 " />
          )}
        </Button>
        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant="ghost"
          size="sm"
          onClick={() => {
            setOpen((open) => !open);
          }}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1  rounded border bg-muted px-1.5 font-momo text-[10px] font-medium text-muted-foreground">
            <span>&#8984;</span>O
          </kbd>
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
