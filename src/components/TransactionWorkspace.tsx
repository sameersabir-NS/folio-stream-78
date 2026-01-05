import { useMemo } from "react";
import { TransactionCard } from "./TransactionCard";
import { EmptyState } from "./EmptyState";
import { Folio } from "@/types/folio";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TransactionWorkspaceProps {
  folios: Folio[];
  selectedIds: string[];
  allFolios: Folio[];
  onRemoveSelection: (id: string) => void;
  onClearSelection: () => void;
}

export function TransactionWorkspace({
  selectedIds,
  allFolios,
  onRemoveSelection,
  onClearSelection,
}: TransactionWorkspaceProps) {
  const selectedFolios = useMemo(() => {
    return allFolios.filter((f) => selectedIds.includes(f.id));
  }, [allFolios, selectedIds]);

  const isMultiSelect = selectedFolios.length > 1;

  const combinedCharges = useMemo(() => {
    return selectedFolios.flatMap((folio) =>
      folio.charges.map((charge) => ({
        ...charge,
        folioNumber: folio.number,
      }))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedFolios]);

  const combinedPayments = useMemo(() => {
    return selectedFolios.flatMap((folio) =>
      folio.payments.map((payment) => ({
        ...payment,
        folioNumber: folio.number,
      }))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedFolios]);

  if (selectedIds.length === 0) {
    return <EmptyState />;
  }

  const handleShowAllCharges = () => {
    console.log("Show all transactions");
  };

  const handleShowAllPayments = () => {
    console.log("Show all posted payments");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Selected folios header - only show when multiple selected */}
      {isMultiSelect && (
        <div className="flex-shrink-0 px-4 py-2 border-b border-border bg-muted/30 flex items-center gap-2 animate-fade-in">
          <span className="text-xs text-muted-foreground">Comparing:</span>
          <div className="flex flex-wrap gap-1.5">
            {selectedFolios.map((folio) => (
              <Badge
                key={folio.id}
                variant="secondary"
                className="pl-2 pr-1 py-0.5 gap-1 text-[10px] bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors animate-scale-in"
              >
                <span className="font-semibold">{folio.number}</span>
                <button
                  onClick={() => onRemoveSelection(folio.id)}
                  className="ml-0.5 rounded-sm p-0.5 hover:bg-primary/20 transition-colors"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </Badge>
            ))}
          </div>
          <button
            onClick={onClearSelection}
            className="ml-auto text-[10px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Transaction cards */}
      <div className="flex flex-1 gap-4 p-4 min-h-0">
        <div className="flex-1 min-w-0 animate-fade-in">
          <TransactionCard
            title="Recent Charges"
            type="charges"
            transactions={combinedCharges}
            showFolioColumn={isMultiSelect}
            onShowAll={handleShowAllCharges}
          />
        </div>
        <div className="flex-1 min-w-0 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <TransactionCard
            title="Recent Payments"
            type="payments"
            transactions={combinedPayments}
            showFolioColumn={isMultiSelect}
            onShowAll={handleShowAllPayments}
          />
        </div>
      </div>
    </div>
  );
}
