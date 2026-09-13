import React, { useState } from 'react';
import { PortalGate } from './components/PortalGate';
import { InvitationCard } from './components/InvitationCard';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#05070c] text-[#f4eedc] overflow-x-hidden selection:bg-[#d4af37] selection:text-[#0b0f19]">
      {/* Screen 1: The Royal Interactive Palace Gate */}
      {!hasEntered && (
        <PortalGate
          onUnlock={() => {
            setHasEntered(true);
          }}
        />
      )}

      {/* Screen 2: The Glassmorphism Wedding Invitation */}
      {hasEntered && (
        <InvitationCard
          onResetGate={() => {
            setHasEntered(false);
          }}
        />
      )}
    </div>
  );
}

