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
      <div className="py-8 text-center">
        <p className="text-xs text-muted-foreground">
          {type === "charges" ? "No charges found" : "No payments found"}
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-border">
          {showFolioColumn && (
            <TableHead className="text-xs font-medium py-2 px-3 bg-table-header">
              Folio
            </TableHead>
          )}
          <TableHead className="text-xs font-medium py-2 px-3 bg-table-header">
            Date
          </TableHead>
          <TableHead className="text-xs font-medium py-2 px-3 bg-table-header">
            Description
          </TableHead>
          <TableHead className="text-xs font-medium py-2 px-3 text-right bg-table-header">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow
            key={transaction.id}
            className="border-border hover:bg-table-row-hover"
          >
            {showFolioColumn && (
              <TableCell className="text-xs py-2 px-3 text-primary font-medium">
                {transaction.folioNumber}
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
                "text-xs py-2 px-3 text-right tabular-nums",
                type === "payments" && "text-success font-medium"
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
