import { CreditCard, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionTable } from "./TransactionTable";
import { Transaction } from "@/types/folio";
import { cn } from "@/lib/utils";

interface TransactionCardProps {
  title: string;
  type: "charges" | "payments";
  transactions: Transaction[];
}

export function TransactionCard({ title, type, transactions }: TransactionCardProps) {
  const Icon = type === "charges" ? CreditCard : Wallet;

  return (
    <Card className="flex flex-col h-full border-border shadow-sm">
      <CardHeader className="flex-shrink-0 pb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              type === "charges"
                ? "bg-destructive/10 text-destructive"
                : "bg-success/10 text-success"
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-card-foreground">
              {title}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              {transactions.length} transaction{transactions.length !== 1 && "s"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto pt-0">
        <TransactionTable transactions={transactions} type={type} />
      </CardContent>
    </Card>
  );
}
