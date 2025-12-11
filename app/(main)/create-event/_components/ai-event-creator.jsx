"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AIEventCreator({ onEventGenerated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateEvent = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe your event.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        toast.error(data.error || "Failed to generate event.");
        console.error("API error:", data.error);
        return;
      }

      onEventGenerated(data);
      toast.success("Event generated! Review below.");
      setIsOpen(false);
      setPrompt("");
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Sparkles className="w-4 h-4" />
          Generate with AI
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            AI Event Creator
          </DialogTitle>
          <DialogDescription>
            Describe your event idea and let AI create the details.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: A tech meetup about React 19 for developers in Karachi."
          rows={6}
          className="resize-none my-4"
        />

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
            Cancel
          </Button>

          <Button
            onClick={generateEvent}
            disabled={loading || !prompt.trim()}
            className="flex-1 gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
