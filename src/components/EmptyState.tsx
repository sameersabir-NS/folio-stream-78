import { FileText } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex h-full items-center justify-center bg-card">
      <div className="text-center">
        <FileText className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
        <p className="text-sm font-medium text-muted-foreground">
          Select a Folio to View Transactions
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Choose one or more folios from the list
        </p>
      </div>
    </div>
  );
}
