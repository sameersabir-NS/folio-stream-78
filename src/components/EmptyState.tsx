import { FolderOpen, MousePointer } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="text-center max-w-md animate-fade-in">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
          <FolderOpen className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Select a Folio to View Transactions
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          Choose a folio from the sidebar to view its recent charges and payments. 
          Enable "Compare Multiple" to analyze transactions across multiple folios at once.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <MousePointer className="h-4 w-4" />
          <span>Click a folio in the sidebar to get started</span>
        </div>
      </div>
    </div>
  );
}
