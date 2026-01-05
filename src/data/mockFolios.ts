import { Folio } from "@/types/folio";

export const mockFolios: Folio[] = [
  {
    id: "1",
    number: "01",
    name: "Galena, Territory",
    hasRecentCharges: true,
    hasRecentPayments: false,
    charges: [
      { id: "c1", date: "2025-01-03", description: "Property #: 1313 - Owner Services", amount: 662511.00 },
      { id: "c2", date: "2025-01-02", description: "Monthly Management Fee", amount: 1250.00 },
      { id: "c3", date: "2024-12-28", description: "Maintenance - HVAC Repair", amount: 485.00 },
    ],
    payments: [],
  },
  {
    id: "2",
    number: "02",
    name: "Spring Creek Townhouse",
    hasRecentCharges: true,
    hasRecentPayments: true,
    charges: [
      { id: "c4", date: "2025-01-04", description: "Water & Sewer - Q1 2025", amount: 342.50 },
      { id: "c5", date: "2025-01-01", description: "HOA Assessment", amount: 525.00 },
    ],
    payments: [
      { id: "p1", date: "2025-01-05", description: "Rent Payment - January", amount: 2850.00 },
      { id: "p2", date: "2024-12-05", description: "Rent Payment - December", amount: 2850.00 },
    ],
  },
  {
    id: "3",
    number: "09",
    name: "Eagle Ridge Townhouse",
    hasRecentCharges: false,
    hasRecentPayments: true,
    charges: [],
    payments: [
      { id: "p3", date: "2025-01-04", description: "Security Deposit", amount: 3200.00 },
      { id: "p4", date: "2025-01-04", description: "First Month Rent", amount: 3200.00 },
    ],
  },
  {
    id: "4",
    number: "11",
    name: "Galena Trading Corporation",
    hasRecentCharges: true,
    hasRecentPayments: true,
    charges: [
      { id: "c6", date: "2025-01-03", description: "Commercial Lease - Q1", amount: 15750.00 },
      { id: "c7", date: "2025-01-02", description: "CAM Charges", amount: 2340.00 },
      { id: "c8", date: "2024-12-30", description: "Property Insurance Premium", amount: 1890.00 },
    ],
    payments: [
      { id: "p5", date: "2025-01-05", description: "Wire Transfer - Lease Payment", amount: 18090.00 },
    ],
  },
  {
    id: "5",
    number: "15",
    name: "Riverside Commercial Plaza",
    hasRecentCharges: true,
    hasRecentPayments: false,
    charges: [
      { id: "c9", date: "2025-01-04", description: "Utility Pass-through", amount: 4520.00 },
      { id: "c10", date: "2025-01-03", description: "Parking Lot Maintenance", amount: 875.00 },
    ],
    payments: [],
  },
  {
    id: "6",
    number: "18",
    name: "Mountain View Apartments",
    hasRecentCharges: false,
    hasRecentPayments: true,
    charges: [],
    payments: [
      { id: "p6", date: "2025-01-05", description: "Bulk Rent Collection - 24 Units", amount: 48000.00 },
    ],
  },
  {
    id: "7",
    number: "21",
    name: "Oakwood Estates HOA",
    hasRecentCharges: true,
    hasRecentPayments: true,
    charges: [
      { id: "c11", date: "2025-01-04", description: "Landscaping Contract", amount: 3200.00 },
      { id: "c12", date: "2025-01-02", description: "Pool Service - Monthly", amount: 450.00 },
      { id: "c13", date: "2025-01-01", description: "Security Patrol", amount: 1800.00 },
    ],
    payments: [
      { id: "p7", date: "2025-01-05", description: "HOA Dues - Collected", amount: 12500.00 },
      { id: "p8", date: "2025-01-03", description: "Late Fee Collections", amount: 375.00 },
    ],
  },
  {
    id: "8",
    number: "24",
    name: "Harbor Point Marina",
    hasRecentCharges: true,
    hasRecentPayments: false,
    charges: [
      { id: "c14", date: "2025-01-04", description: "Dock Repair - Slip 14", amount: 2890.00 },
      { id: "c15", date: "2025-01-03", description: "Fuel Station Maintenance", amount: 1250.00 },
    ],
    payments: [],
  },
  {
    id: "9",
    number: "27",
    name: "Tech Park Office Complex",
    hasRecentCharges: false,
    hasRecentPayments: false,
    charges: [],
    payments: [],
  },
  {
    id: "10",
    number: "30",
    name: "Sunset Strip Retail",
    hasRecentCharges: true,
    hasRecentPayments: true,
    charges: [
      { id: "c16", date: "2025-01-05", description: "Signage Replacement", amount: 4500.00 },
      { id: "c17", date: "2025-01-04", description: "HVAC Quarterly Service", amount: 890.00 },
      { id: "c18", date: "2025-01-02", description: "Window Cleaning", amount: 320.00 },
    ],
    payments: [
      { id: "p9", date: "2025-01-05", description: "Tenant: Blue Wave Coffee", amount: 3200.00 },
      { id: "p10", date: "2025-01-05", description: "Tenant: Fresh Market", amount: 5800.00 },
      { id: "p11", date: "2025-01-04", description: "Tenant: Urban Fitness", amount: 4100.00 },
    ],
  },
  // Additional folios to demonstrate scale
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `${11 + i}`,
    number: String(33 + i).padStart(2, "0"),
    name: [
      "Willow Creek Condos",
      "Pinewood Business Center",
      "Heritage Square Mall",
      "Lakeshore Villas",
      "Downtown Lofts",
      "Industrial Park West",
      "Meadowbrook Estates",
      "City Center Tower",
      "Parkside Commons",
      "Riverfront Warehouse",
    ][i % 10] + (i >= 10 ? ` ${Math.floor(i / 10) + 1}` : ""),
    hasRecentCharges: Math.random() > 0.4,
    hasRecentPayments: Math.random() > 0.5,
    charges: Math.random() > 0.4 ? [
      {
        id: `c-auto-${i}-1`,
        date: "2025-01-04",
        description: "Standard Monthly Fee",
        amount: Math.round(Math.random() * 5000 + 500),
      },
    ] : [],
    payments: Math.random() > 0.5 ? [
      {
        id: `p-auto-${i}-1`,
        date: "2025-01-05",
        description: "Rent Collection",
        amount: Math.round(Math.random() * 10000 + 1000),
      },
    ] : [],
  })),
];
