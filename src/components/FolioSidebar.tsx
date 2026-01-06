import { useState, useMemo } from "react";
import { Search, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
            className="pl-8 h-8 text-xs transition-shadow focus:shadow-md"
          />
        </div>
        
        {/* Multi-select toggle with count badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground">Select Multiple</Label>
            {multiSelect && selectedCount > 0 && (
              <Badge 
                variant="secondary" 
                className="h-5 px-1.5 text-[10px] font-semibold bg-primary text-primary-foreground animate-scale-in"
              >
                {selectedCount}
              </Badge>
            )}
          </div>
          <Switch
            checked={multiSelect}
            onCheckedChange={onMultiSelectChange}
            className="scale-75"
          />
        </div>
      </div>

      {/* Folio List */}
      <ScrollArea className="flex-1">
        <div className="p-1.5 pr-4">
          {filteredFolios.length === 0 ? (
            <div className="px-3 py-6 text-center animate-fade-in">
              <p className="text-xs text-muted-foreground">No folios found</p>
            </div>
          ) : (
            <div className="space-y-0.5">
              {filteredFolios.map((folio, index) => {
                const isSelected = selectedIds.includes(folio.id);
                return (
                  <button
                    key={folio.id}
                    onClick={() => handleFolioClick(folio.id)}
                    className={cn(
                      "w-full flex items-center gap-1.5 px-2 py-1.5 rounded text-left transition-all duration-150 text-xs group",
                      "hover:bg-muted/70 hover:shadow-sm",
                      isSelected && "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20",
                      index % 2 === 1 && !isSelected && "bg-muted/20"
                    )}
                    style={{ animationDelay: `${index * 15}ms` }}
                  >
                    {/* Activity indicators - always on left */}
                    <div className="flex gap-0.5 flex-shrink-0 w-4 justify-center">
                      {folio.hasRecentCharges && (
                        <span 
                          className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" 
                          title="Has charges" 
                        />
                      )}
                      {folio.hasRecentPayments && (
                        <span 
                          className="h-1.5 w-1.5 rounded-full bg-success" 
                          title="Has payments" 
                        />
                      )}
                    </div>

                    {/* Checkbox space - always reserved, only filled when multiSelect */}
                    <span 
                      className={cn(
                        "flex-shrink-0 h-3.5 w-3.5 rounded border flex items-center justify-center transition-all duration-150",
                        multiSelect 
                          ? isSelected 
                            ? "bg-primary border-primary" 
                            : "border-muted-foreground/30 group-hover:border-primary/50"
                          : "border-transparent"
                      )}
                    >
                      {multiSelect && isSelected && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                    </span>
                    
                    <span className={cn("font-medium", isSelected && "text-primary")}>{folio.number}</span>
                    <span className="text-muted-foreground">-</span>
                    <span className="truncate flex-1">{folio.name}</span>
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
