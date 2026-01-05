import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Folio } from "@/types/folio";
import { cn } from "@/lib/utils";

interface FolioSidebarProps {
  folios: Folio[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  multiSelect: boolean;
  onMultiSelectChange: (value: boolean) => void;
}

export function FolioSidebar({
  folios,
  selectedIds,
  onSelectionChange,
  multiSelect,
  onMultiSelectChange,
}: FolioSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFolios = useMemo(() => {
    if (!searchQuery.trim()) return folios;
    const query = searchQuery.toLowerCase();
    return folios.filter(
      (folio) =>
        folio.name.toLowerCase().includes(query) ||
        folio.number.includes(query)
    );
  }, [folios, searchQuery]);

  const handleFolioClick = (folioId: string) => {
    if (multiSelect) {
      if (selectedIds.includes(folioId)) {
        onSelectionChange(selectedIds.filter((id) => id !== folioId));
      } else {
        onSelectionChange([...selectedIds, folioId]);
      }
    } else {
      onSelectionChange([folioId]);
    }
  };

  return (
    <div className="flex h-full w-56 flex-col border-r border-border bg-card">
      {/* Header with search */}
      <div className="flex-shrink-0 p-3 border-b border-border space-y-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search folios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>
        
        {/* Multi-select toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Compare Multiple</Label>
          <Switch
            checked={multiSelect}
            onCheckedChange={onMultiSelectChange}
            className="scale-75"
          />
        </div>
      </div>

      {/* Folio List */}
      <ScrollArea className="flex-1">
        <div className="p-1.5">
          {filteredFolios.length === 0 ? (
            <div className="px-3 py-6 text-center">
              <p className="text-xs text-muted-foreground">No folios found</p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {filteredFolios.map((folio) => {
                const isSelected = selectedIds.includes(folio.id);
                return (
                  <button
                    key={folio.id}
                    onClick={() => handleFolioClick(folio.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors text-xs",
                      "hover:bg-muted/50",
                      isSelected && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <span className="font-medium">{folio.number}</span>
                    <span className="text-muted-foreground">-</span>
                    <span className="truncate flex-1">{folio.name}</span>
                    
                    {/* Activity indicators */}
                    <div className="flex gap-1 flex-shrink-0">
                      {folio.hasRecentCharges && (
                        <span className="h-1.5 w-1.5 rounded-full bg-destructive" title="Has charges" />
                      )}
                      {folio.hasRecentPayments && (
                        <span className="h-1.5 w-1.5 rounded-full bg-success" title="Has payments" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
