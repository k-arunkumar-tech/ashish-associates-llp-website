"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Toaster } from "@/src/components/ui/toaster";
import { Toaster as Sonner } from "@/src/components/ui/sonner";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import LegalDisclaimerModal from "@/src/components/LegalDisclaimerModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Disclaimer logic
  useEffect(() => {
    const hasAccepted = localStorage.getItem("legalDisclaimerAccepted");
    if (!hasAccepted) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("legalDisclaimerAccepted", "true");
    setShowDisclaimer(false);
  };

  const handleDecline = () => {
    window.history.back();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>

        <Toaster />
        <Sonner />

        {showDisclaimer && (
          <LegalDisclaimerModal
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        )}

        {children}

      </TooltipProvider>
    </QueryClientProvider>
  );
}