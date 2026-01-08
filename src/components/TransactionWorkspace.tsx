import { useMemo } from "react";
import { TransactionCard } from "./TransactionCard";
import { EmptyState } from "./EmptyState";
import { Folio } from "@/types/folio";

interface TransactionWorkspaceProps {
  folios: Folio[];
  selectedIds: string[];
  allFolios: Folio[];
}

export function TransactionWorkspace({
  selectedIds,
  allFolios,
}: TransactionWorkspaceProps) {
  const selectedFolios = useMemo(() => {
    return allFolios.filter((f) => selectedIds.includes(f.id));
  }, [allFolios, selectedIds]);

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
      {/* Transaction cards */}
      <div className="flex flex-1 gap-4 p-4 min-h-0">
        <div className="flex-1 min-w-0 animate-fade-in">
          <TransactionCard
            title="Recent Charges"
            type="charges"
            transactions={combinedCharges}
            onShowAll={handleShowAllCharges}
          />
        </div>
        <div className="flex-1 min-w-0 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <TransactionCard
            title="Recent Payments"
            type="payments"
            transactions={combinedPayments}
            onShowAll={handleShowAllPayments}
          />
        </div>
      </div>
    </div>
  );
}
