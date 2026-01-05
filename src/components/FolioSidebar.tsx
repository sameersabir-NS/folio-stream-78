import { useState, useMemo } from "react";
import { Search, Layers, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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

  const selectedCount = selectedIds.length;
  const totalCharges = folios.filter((f) => f.hasRecentCharges).length;
  const totalPayments = folios.filter((f) => f.hasRecentPayments).length;

  return (
    <div className="flex h-full w-72 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Layers className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-sidebar-accent-foreground">Folios</h2>
            <p className="text-xs text-sidebar-muted">{folios.length} total</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sidebar-muted" />
          <Input
            placeholder="Search folios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-muted focus-visible:ring-sidebar-ring"
          />
        </div>
      </div>

      {/* Multi-select toggle */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-sidebar-foreground">Compare Multiple</span>
          <Switch
            checked={multiSelect}
            onCheckedChange={onMultiSelectChange}
            className="data-[state=checked]:bg-sidebar-primary"
          />
        </div>
        {multiSelect && selectedCount > 0 && (
          <p className="mt-1 text-xs text-sidebar-muted">
            {selectedCount} selected
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-sidebar-border">
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-badge-charge" />
            <span className="text-xs text-sidebar-muted">{totalCharges} charges</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-badge-payment" />
            <span className="text-xs text-sidebar-muted">{totalPayments} payments</span>
          </div>
        </div>
      </div>

      {/* Folio List */}
      <ScrollArea className="flex-1 sidebar-scrollbar">
        <div className="p-2">
          {filteredFolios.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <p className="text-sm text-sidebar-muted">No folios found</p>
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
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150",
                      "hover:bg-sidebar-accent group",
                      isSelected && "bg-sidebar-accent ring-1 ring-sidebar-primary"
                    )}
                  >
                    {/* Number badge */}
                    <span
                      className={cn(
                        "flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium transition-colors",
                        isSelected
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "bg-sidebar-border text-sidebar-foreground"
                      )}
                    >
                      {folio.number}
                    </span>

                    {/* Name and indicators */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-medium truncate transition-colors",
                          isSelected ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
                        )}
                      >
                        {folio.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {folio.hasRecentCharges && (
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-badge-charge" />
                            <span className="text-[10px] text-sidebar-muted">Charges</span>
                          </span>
                        )}
                        {folio.hasRecentPayments && (
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-badge-payment" />
                            <span className="text-[10px] text-sidebar-muted">Payments</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Selection indicator */}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 flex-shrink-0 transition-all",
                        isSelected
                          ? "text-sidebar-primary opacity-100"
                          : "text-sidebar-muted opacity-0 group-hover:opacity-100"
                      )}
                    />
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
