import { useState } from "react";
import { FolioSidebar } from "@/components/FolioSidebar";
import { TransactionWorkspace } from "@/components/TransactionWorkspace";
import { mockFolios } from "@/data/mockFolios";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      {/* Mock header area to show this is part of a larger screen */}
      <div className="flex-shrink-0 border-b border-border bg-card p-4">
        <p className="text-xs text-muted-foreground">
          This is a section within your existing property management screen
        </p>
      </div>

      {/* Tab navigation - matching existing app style */}
      <div className="flex-shrink-0 border-b border-border bg-card">
        <Tabs defaultValue="recent-transactions" className="w-full">
          <TabsList className="h-auto p-0 bg-transparent border-0 rounded-none gap-0">
            <TabsTrigger
              value="recent-transactions"
              className="rounded-none border-0 px-4 py-2 text-xs data-[state=active]:bg-card data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary font-medium"
            >
              Recent Transactions
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="rounded-none border-0 px-4 py-2 text-xs data-[state=inactive]:text-muted-foreground font-medium"
            >
              Services
            </TabsTrigger>
            <TabsTrigger
              value="addresses"
              className="rounded-none border-0 px-4 py-2 text-xs data-[state=inactive]:text-muted-foreground font-medium"
            >
              Addresses
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="rounded-none border-0 px-4 py-2 text-xs data-[state=inactive]:text-muted-foreground font-medium"
            >
              Preferences
            </TabsTrigger>
            <TabsTrigger
              value="ticklers"
              className="rounded-none border-0 px-4 py-2 text-xs data-[state=inactive]:text-muted-foreground font-medium"
            >
              Ticklers
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main content area with sidebar and workspace */}
      <div className="flex flex-1 min-h-0">
        <FolioSidebar
          folios={mockFolios}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
        <main className="flex-1 min-w-0 overflow-hidden">
          <TransactionWorkspace
            folios={mockFolios}
            selectedIds={selectedIds}
            allFolios={mockFolios}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
