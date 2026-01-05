import { useMemo } from "react";
import { TransactionCard } from "./TransactionCard";
import { EmptyState } from "./EmptyState";
import { Folio, Transaction } from "@/types/folio";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TransactionWorkspaceProps {
  folios: Folio[];
  selectedIds: string[];
  allFolios: Folio[];
  onRemoveSelection: (id: string) => void;
  onClearSelection: () => void;
}

export function TransactionWorkspace({
  folios,
  selectedIds,
  allFolios,
  onRemoveSelection,
  onClearSelection,
}: TransactionWorkspaceProps) {
  const selectedFolios = useMemo(() => {
    return allFolios.filter((f) => selectedIds.includes(f.id));
  }, [allFolios, selectedIds]);

  const combinedCharges = useMemo(() => {
    return selectedFolios.flatMap((folio) =>
      folio.charges.map((charge) => ({
        ...charge,
        description: selectedFolios.length > 1
          ? `[${folio.number}] ${charge.description}`
          : charge.description,
      }))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedFolios]);

  const combinedPayments = useMemo(() => {
    return selectedFolios.flatMap((folio) =>
      folio.payments.map((payment) => ({
        ...payment,
        description: selectedFolios.length > 1
          ? `[${folio.number}] ${payment.description}`
          : payment.description,
      }))
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedFolios]);

  if (selectedIds.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex h-full flex-col p-6">
      {/* Header with selected folios */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-semibold text-foreground">
            {selectedFolios.length === 1
              ? `${selectedFolios[0].number} - ${selectedFolios[0].name}`
              : `Comparing ${selectedFolios.length} Folios`}
          </h1>
          {selectedFolios.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>

        {selectedFolios.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {selectedFolios.map((folio) => (
              <Badge
                key={folio.id}
                variant="secondary"
                className="pl-2 pr-1 py-1 gap-1.5 bg-secondary text-secondary-foreground"
              >
                <span className="font-medium">{folio.number}</span>
                <span className="text-muted-foreground">-</span>
                <span className="truncate max-w-[150px]">{folio.name}</span>
                <button
                  onClick={() => onRemoveSelection(folio.id)}
                  className="ml-1 rounded-sm p-0.5 hover:bg-muted transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Transaction cards grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        <div className="min-h-0 overflow-hidden">
          <TransactionCard
            title="Recent Charges"
            type="charges"
            transactions={combinedCharges}
          />
        </div>
        <div className="min-h-0 overflow-hidden">
          <TransactionCard
            title="Recent Payments"
            type="payments"
            transactions={combinedPayments}
          />
        </div>
      </div>
    </div>
  );
}
