import { TransactionTable } from "./TransactionTable";
import { Transaction } from "@/types/folio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CreditCard, Wallet } from "lucide-react";

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
    <div className={cn(
      "flex flex-col h-full border border-border bg-card rounded-sm overflow-hidden",
      "transition-shadow duration-200 hover:shadow-md"
    )}>
      {/* Header */}
      <div className={cn(
        "flex-shrink-0 px-3 py-3 border-b border-border bg-table-header",
        "flex items-center justify-between"
      )}>
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            type === "charges" ? "bg-destructive/10" : "bg-success/10"
          )}>
            {type === "charges" ? (
              <CreditCard className="h-4 w-4 text-destructive" />
            ) : (
              <Wallet className="h-4 w-4 text-success" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {title}
            </h3>
            <p className="text-[10px] text-muted-foreground">
              {transactions.length} transaction{transactions.length !== 1 && "s"}
            </p>
          </div>
        </div>
      </div>

      {/* Table content */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="animate-fade-in">
          <TransactionTable 
            transactions={transactions} 
            type={type} 
            showFolioColumn={showFolioColumn}
          />
        </div>
      </ScrollArea>

      {/* Footer with show all link */}
      {onShowAll && (
        <div className="flex-shrink-0 px-3 py-2 border-t border-border bg-muted/30">
          <button
            onClick={onShowAll}
            className="text-xs text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
          >
            {type === "charges" ? "Show All Transactions" : "Show All Posted Payments"}
          </button>
        </div>
      )}
    </div>
  );
}
