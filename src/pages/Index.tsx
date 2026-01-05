import { useState } from "react";
import { FolioSidebar } from "@/components/FolioSidebar";
import { TransactionWorkspace } from "@/components/TransactionWorkspace";
import { mockFolios } from "@/data/mockFolios";

const Index = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [multiSelect, setMultiSelect] = useState(false);

  const handleMultiSelectChange = (value: boolean) => {
    setMultiSelect(value);
    if (!value && selectedIds.length > 1) {
      // Keep only the first selected when disabling multi-select
      setSelectedIds([selectedIds[0]]);
    }
  };

  const handleRemoveSelection = (id: string) => {
    setSelectedIds(selectedIds.filter((sid) => sid !== id));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <FolioSidebar
        folios={mockFolios}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        multiSelect={multiSelect}
        onMultiSelectChange={handleMultiSelectChange}
      />

      {/* Main workspace */}
      <main className="flex-1 overflow-hidden">
        <TransactionWorkspace
          folios={mockFolios}
          selectedIds={selectedIds}
          allFolios={mockFolios}
          onRemoveSelection={handleRemoveSelection}
          onClearSelection={handleClearSelection}
        />
      </main>
    </div>
  );
};

export default Index;
