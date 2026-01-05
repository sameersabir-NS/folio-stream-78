import { TransactionTable } from "./TransactionTable";
import { Transaction } from "@/types/folio";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TransactionCardProps {
  title: string;
  type: "charges" | "payments";
  transactions: (Transaction & { folioNumber?: string })[];
  showFolioColumn?: boolean;
  onShowAll?: () => void;
}

export function TransactionCard({ 
  title, 
  type, 
  transactions, 
  showFolioColumn = false,
  onShowAll 
}: TransactionCardProps) {
  return (
    <div className="flex flex-col h-full border border-border bg-card">
      {/* Header */}
      <div className="flex-shrink-0 px-3 py-2 border-b border-border bg-table-header">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          {title}
        </h3>
      </div>

      {/* Table content */}
      <ScrollArea className="flex-1 min-h-0">
        <TransactionTable 
          transactions={transactions} 
          type={type} 
          showFolioColumn={showFolioColumn}
        />
      </ScrollArea>

      {/* Footer with show all link */}
      {onShowAll && (
        <div className="flex-shrink-0 px-3 py-2 border-t border-border">
          <button
            onClick={onShowAll}
            className="text-xs text-primary hover:underline font-medium"
          >
            {type === "charges" ? "Show All Transactions" : "Show All Posted Payments"}
          </button>
        </div>
      )}
    </div>
  );
}
