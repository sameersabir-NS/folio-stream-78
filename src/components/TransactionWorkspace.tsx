import { useMemo } from "react";
import { TransactionCard } from "./TransactionCard";
import { EmptyState } from "./EmptyState";
import { Folio } from "@/types/folio";

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
    // TODO: Implement show all transactions
    console.log("Show all transactions");
  };

  const handleShowAllPayments = () => {
    // TODO: Implement show all posted payments
    console.log("Show all posted payments");
  };

  return (
    <div className="flex h-full gap-4 p-4">
      <div className="flex-1 min-w-0">
        <TransactionCard
          title="Recent Charges"
          type="charges"
          transactions={combinedCharges}
          showFolioColumn={isMultiSelect}
          onShowAll={handleShowAllCharges}
        />
      </div>
      <div className="flex-1 min-w-0">
        <TransactionCard
          title="Recent Payments"
          type="payments"
          transactions={combinedPayments}
          showFolioColumn={isMultiSelect}
          onShowAll={handleShowAllPayments}
        />
      </div>
    </div>
  );
}
