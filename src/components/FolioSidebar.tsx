import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Folio } from "@/types/folio";
import { cn } from "@/lib/utils";

interface FolioSidebarProps {
  folios: Folio[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function FolioSidebar({
  folios,
  selectedIds,
  onSelectionChange,
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
    onSelectionChange([folioId]);
  };

  return (
    <div className="flex h-full w-56 flex-col border-r border-border bg-card">
      {/* Header with search */}
      <div className="flex-shrink-0 p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search folios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-xs transition-shadow focus:shadow-md"
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
                      "w-full flex items-center gap-1.5 px-2 py-1.5 rounded text-left transition-all duration-150 text-xs",
                      "hover:bg-muted/70 hover:shadow-sm",
                      isSelected && "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20",
                      index % 2 === 1 && !isSelected && "bg-muted/20"
                    )}
                    style={{ animationDelay: `${index * 15}ms` }}
                  >
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
