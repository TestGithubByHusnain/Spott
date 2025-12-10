"use client";

import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PricingTable } from "@clerk/nextjs";
import PropTypes from "prop-types";

// Helper for cleaner text logic
const getMessage = (trigger) => {
  const messages = {
    header: "Create Unlimited Events with Pro!",
    limit: "You've reached your free event limit.",
    color: "Custom theme colors are a Pro feature.",
  };

  return messages[trigger] || "";
};

export default function UpgradeModal({ isOpen, onClose, trigger = "limit" }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <DialogTitle className="text-2xl font-semibold">
              Upgrade to Pro
            </DialogTitle>
          </div>

          <DialogDescription className="text-base leading-relaxed">
            {getMessage(trigger)} Unlock unlimited events and premium features!
          </DialogDescription>
        </DialogHeader>

        {/* Pricing */}
        <div className="py-4">
          <PricingTable
            checkoutProps={{
              appearance: {
                elements: {
                  drawerRoot: { zIndex: 2000 },
                },
              },
            }}
          />
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// PropTypes for clear API and error prevention
UpgradeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  trigger: PropTypes.oneOf(["header", "limit", "color"]),
};
