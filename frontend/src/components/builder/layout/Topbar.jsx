import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "../../../builder/global-state/state-store";
import { save } from "../../../builder/save-load/save-portfolio";
import { useUI } from "../../../DrawerContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

import test from "@/../test.json";

export function preparePortfolioSave() {
  return query.serialize();
}

export function Topbar({ sendTemplate }) {
  const { query } = useEditor((s) => ({ query: s.query }));
  const { ui, state } = useUI();
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [showSubModal, setShowSubModal] = useState(false);
  const onSubscribedTemplate = () => sendTemplate(test);
  const onUnsubscribedTemplate = () => setShowSubModal(true);

  return (
    <>
      <header className="flex items-center justify-between h-12 px-4 bg-orange-500 text-white shadow-md border-b border-orange-600 dark:bg-orange-600">
        <div className="flex items-center space-x-3">
          <Button
            size="xs"
            variant="ghost"
            className="lg:hidden p-1 text-white hover:bg-orange-400"
            onClick={() => ui.toggleSheet("LEFT")}
          >
            ☰
          </Button>

          <Button
            size="xs"
            className="bg-[#fff7ed] hover:bg-[#ffedd5] text-orange-600 font-semibold px-3 py-1 text-sm"
            onClick={async () => {
              await save(query.serialize());
            }}
          >
            Save Portfolio
          </Button>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="xs"
                variant="ghost"
                className="p-1 text-white hover:bg-orange-400"
              >
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-orange-300 shadow-md text-black">
              <DropdownMenuLabel className="text-orange-600">
                Panels
              </DropdownMenuLabel>
              <DropdownMenuItem onSelect={() => ui.togglePanel("LEFT")}>
                {state.showLeftSidebar ? "Hide Left Panel" : "Show Left Panel"}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => ui.togglePanel("RIGHT")}>
                {state.showRightSidebar
                  ? "Hide Right Panel"
                  : "Show Right Panel"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => ui.toggleTheme()}>
                {state.darkMode ? "Light Mode" : "Dark Mode"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="xs"
                variant="ghost"
                className="p-1 text-white hover:bg-orange-400"
              >
                Templates
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-orange-300 shadow-md">
              <DropdownMenuLabel className="text-orange-600">
                Select Template
              </DropdownMenuLabel>
              {user?.role === "subscribed" ? (
                <DropdownMenuItem onSelect={onSubscribedTemplate}>
                  Template 1
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onSelect={onUnsubscribedTemplate}>
                  Template 1
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="xs"
            className="bg-[#fff7ed] hover:bg-[#ffedd5] text-orange-600 font-medium px-3 py-1 text-sm"
            onClick={() => {
              handleLogout();
              navigate("/login");
            }}
          >
            Logout
          </Button>

          <Button
            size="xs"
            className="bg-[#fff7ed] hover:bg-[#ffedd5] text-orange-600 font-medium px-3 py-1 text-sm lg:hidden"
            onClick={() => ui.toggleSheet("RIGHT")}
          >
            Customize
          </Button>
        </div>
      </header>

      {showSubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowSubModal(false)}
          />

          <div className="relative w-[90vw] max-w-md rounded-lg bg-white dark:bg-[#2c2c2c] p-6 shadow-lg border border-orange-400">
            <h2 className="text-lg font-semibold text-orange-700 dark:text-orange-400">
              Subscription Required
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              You need to be subscribed to access templates.
            </p>

            <div className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                className="border border-orange-400 text-orange-600 hover:bg-orange-100"
                onClick={() => setShowSubModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => {
                  setShowSubModal(false);
                  navigate("/subscription");
                }}
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
