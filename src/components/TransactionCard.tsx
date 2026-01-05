import { TransactionTable } from "./TransactionTable";
import { Transaction } from "@/types/folio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
        "flex-shrink-0 px-3 py-2 border-b border-border bg-table-header",
        "flex items-center justify-between"
      )}>
        <div className="flex items-center gap-2">
          <span 
            className={cn(
              "h-2 w-2 rounded-full",
              type === "charges" ? "bg-destructive" : "bg-success"
            )} 
          />
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
            {title}
          </h3>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium bg-muted px-1.5 py-0.5 rounded">
          {transactions.length} item{transactions.length !== 1 && "s"}
        </span>
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
