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
  transactions: (Transaction & { folioNumber?: string })[];
  type: "charges" | "payments";
  showFolioColumn?: boolean;
}

export function TransactionTable({ transactions, type, showFolioColumn = false }: TransactionTableProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  if (transactions.length === 0) {
    return (
      <div className="py-8 text-center animate-fade-in">
        <p className="text-xs text-muted-foreground">
          {type === "charges" ? "No charges found" : "No payments found"}
        </p>
      </div>
    );
  }

  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow className="hover:bg-transparent border-border">
          {showFolioColumn && (
            <TableHead className="text-xs font-medium py-2 px-3 bg-table-header w-16">
              Folio
            </TableHead>
          )}
          <TableHead className="text-xs font-medium py-2 px-3 bg-table-header w-24">
            Date
          </TableHead>
          <TableHead className="text-xs font-medium py-2 px-3 bg-table-header">
            Description
          </TableHead>
          <TableHead className="text-xs font-medium py-2 px-3 text-right bg-table-header w-28">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow
            key={transaction.id}
            className={cn(
              "border-border transition-all duration-150 cursor-default",
              "hover:bg-primary/5 hover:shadow-sm",
              index % 2 === 1 && "bg-muted/30"
            )}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            {showFolioColumn && (
              <TableCell className="text-xs py-2 px-3 font-medium">
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-semibold">
                  {transaction.folioNumber}
                </span>
              </TableCell>
            )}
            <TableCell className="text-xs py-2 px-3 text-muted-foreground whitespace-nowrap">
              {formatDate(transaction.date)}
            </TableCell>
            <TableCell className="text-xs py-2 px-3">
              {transaction.description}
            </TableCell>
            <TableCell
              className={cn(
                "text-xs py-2 px-3 text-right tabular-nums font-medium",
                type === "payments" && "text-success"
              )}
            >
              {formatAmount(transaction.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
