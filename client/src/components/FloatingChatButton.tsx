import { MessageCircle } from "lucide-react";
import { useState } from "react";
import ChatInterface from "./ChatInterface";
import { Dialog, DialogContent } from "./ui/dialog";

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center z-10"
        aria-label="Open chat"
      >
        <MessageCircle className="w-7 h-7 text-black" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 sm:max-w-[500px] max-h-[85vh]">
          <ChatInterface onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
