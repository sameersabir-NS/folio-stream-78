import { format } from "date-fns";
import { Transaction } from "@/types/folio";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TransactionTableProps {
  transactions: Transaction[];
  type: "charges" | "payments";
}

export function TransactionTable({ transactions, type }: TransactionTableProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div
          className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center mb-3",
            type === "charges" ? "bg-destructive/10" : "bg-success/10"
          )}
        >
          <span
            className={cn(
              "text-lg",
              type === "charges" ? "text-destructive" : "text-success"
            )}
          >
            {type === "charges" ? "−" : "+"}
          </span>
        </div>
        <p className="text-sm font-medium text-foreground">No recent {type}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {type === "charges"
            ? "No charges have been posted"
            : "No payments have been received"}
        </p>
      </div>
    );
  }

  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="w-[120px] text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Date
            </TableHead>
            <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Description
            </TableHead>
            <TableHead className="w-[140px] text-right text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow
              key={transaction.id}
              className="border-border hover:bg-table-row-hover transition-colors"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <TableCell className="text-sm text-muted-foreground py-3">
                {formatDate(transaction.date)}
              </TableCell>
              <TableCell className="text-sm text-foreground py-3">
                {transaction.description}
              </TableCell>
              <TableCell
                className={cn(
                  "text-sm font-medium text-right py-3 tabular-nums",
                  type === "payments" && "text-success"
                )}
              >
                {type === "payments" && "+"}
                {formatAmount(transaction.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Total ({transactions.length} {transactions.length === 1 ? "item" : "items"})
        </span>
        <span
          className={cn(
            "text-lg font-semibold tabular-nums",
            type === "payments" ? "text-success" : "text-foreground"
          )}
        >
          {type === "payments" && "+"}
          {formatAmount(total)}
        </span>
      </div>
    </div>
  );
}
