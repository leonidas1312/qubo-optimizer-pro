import { Tables } from "@/integrations/supabase/types";
import { HardwareSelector } from "@/components/hardware/HardwareSelector";
import { useState } from "react";

type HardwareProvider = Tables<"hardware_providers">;

const Hardware = () => {
  const [selectedHardware, setSelectedHardware] = useState<HardwareProvider>();

  return (
    <div className="w-full">
      <HardwareSelector 
        selectedProvider={selectedHardware}
        onSelect={setSelectedHardware} 
      />
    </div>
  );
};

export default Hardware;