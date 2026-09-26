const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

const Collector = require("./models/Collector.cjs");
const Recycler = require("./models/Recycler.cjs");
const EWasteLot = require("./models/EWasteLot.cjs");
const Transaction = require("./models/Transaction.cjs");
const Payment = require("./models/Payment.cjs");
const Traceability = require("./models/Traceability.cjs");
const PickupRoute = require("./models/PickupRoute.cjs");
const PriceDemand = require("./models/PriceDemand.cjs");
const RecyclingStatus = require("./models/RecyclingStatus.cjs");
const Anomaly = require("./models/Anomaly.cjs");

const sampleCollectors = [
  {
    collectorId: "COL-1001",
    name: "Ramesh Kumar",
    phone: "9876543210",
    location: "Vijayawada",
    verificationStatus: "Verified"
  },
  {
    collectorId: "COL-1002",
    name: "Suresh Babu",
    phone: "9876501122",
    location: "Guntur",
    verificationStatus: "Verified"
  },
  {
    collectorId: "COL-1003",
    name: "Venkat Rao",
    phone: "9123456780",
    location: "Nuzvid",
    verificationStatus: "Pending"
  },
  {
    collectorId: "COL-1004",
    name: "Lakshmi Narayana",
    phone: "9988776655",
    location: "Tenali",
    verificationStatus: "Verified"
  },
  {
    collectorId: "COL-1005",
    name: "Krishna Mohan",
    phone: "9012345678",
    location: "Vijayawada",
    verificationStatus: "Verified"
  }
];

const sampleRecyclers = [
  {
    recyclerId: "REC-001",
    name: "Green Earth Recycling",
    companyName: "Green Earth Eco Solutions Ltd.",
    phone: "9876501234",
    location: "Vijayawada",
    verificationStatus: "Verified"
  },
  {
    recyclerId: "REC-002",
    name: "Eco Metal Recyclers",
    companyName: "Eco Metal Processing Pvt Ltd",
    phone: "9123405678",
    location: "Guntur",
    verificationStatus: "Pending"
  },
  {
    recyclerId: "REC-003",
    name: "Clean Cycle Solutions",
    companyName: "Clean Cycle E-Waste Recycling",
    phone: "9988701234",
    location: "Hyderabad",
    verificationStatus: "Verified"
  },
  {
    recyclerId: "REC-004",
    name: "Safe E-Waste Center",
    companyName: "Safe E-Waste Authorized Center",
    phone: "9012304567",
    location: "Nuzvid",
    verificationStatus: "Pending"
  },
  {
    recyclerId: "REC-005",
    name: "Future Recycling Hub",
    companyName: "Future Tech Recyclers",
    phone: "9345607891",
    location: "Vijayawada",
    verificationStatus: "Rejected"
  }
];

const sampleLots = [
  {
    lotId: "LOT-1001",
    collectorId: "COL-1002",
    material: "Mobile Phones",
    category: "Communication Equipment",
    description: "Mixed smartphones and feature phones with batteries intact",
    weight: 12,
    estimatedValue: 5160,
    imageUrl: "",
    identificationMethod: "Gemini AI",
    location: "Vijayawada",
    status: "Available"
  },
  {
    lotId: "LOT-1002",
    collectorId: "COL-1003",
    material: "Laptops",
    category: "Computing Devices",
    description: "Decommissioned office laptops without hard drives",
    weight: 8,
    estimatedValue: 3600,
    imageUrl: "",
    identificationMethod: "Gemini AI",
    location: "Nuzvid",
    status: "Offer Received"
  },
  {
    lotId: "LOT-1003",
    collectorId: "COL-1002",
    material: "Computer Parts",
    category: "Components",
    description: "Motherboards, RAM modules, power supplies",
    weight: 18,
    estimatedValue: 6840,
    imageUrl: "",
    identificationMethod: "Manual",
    location: "Guntur",
    status: "Sold"
  },
  {
    lotId: "LOT-1004",
    collectorId: "COL-1005",
    material: "TV / Monitors",
    category: "Displays",
    description: "LCD and LED computer screens and TV units",
    weight: 25,
    estimatedValue: 8750,
    imageUrl: "",
    identificationMethod: "Manual",
    location: "Vijayawada",
    status: "Available"
  },
  {
    lotId: "LOT-1005",
    collectorId: "COL-1004",
    material: "Batteries",
    category: "Hazardous / Energy Storage",
    description: "Li-ion mobile and laptop battery packs",
    weight: 6,
    estimatedValue: 2520,
    imageUrl: "",
    identificationMethod: "Gemini AI",
    location: "Tenali",
    status: "Accepted"
  },
  {
    lotId: "LOT-1006",
    collectorId: "COL-1001",
    material: "Cables",
    category: "Wiring & Copper",
    description: "Assorted copper cables and charger wires",
    weight: 10,
    estimatedValue: 3000,
    imageUrl: "",
    identificationMethod: "Manual",
    location: "Vijayawada",
    status: "Sold"
  }
];

const sampleTransactions = [
  {
    transactionId: "TXN-001",
    collectorId: "COL-1002",
    recyclerId: "REC-001",
    lotId: "LOT-1001",
    material: "Mobile Phones",
    weight: 12,
    pricePerKg: 430,
    totalAmount: 5160,
    status: "Completed",
    paymentStatus: "Paid",
    transactionDate: new Date("2026-09-15T10:30:00Z")
  },
  {
    transactionId: "TXN-002",
    collectorId: "COL-1003",
    recyclerId: "REC-003",
    lotId: "LOT-1002",
    material: "Laptops",
    weight: 8,
    pricePerKg: 450,
    totalAmount: 3600,
    status: "Completed",
    paymentStatus: "Paid",
    transactionDate: new Date("2026-09-15T11:45:00Z")
  },
  {
    transactionId: "TXN-003",
    collectorId: "COL-1002",
    recyclerId: "REC-002",
    lotId: "LOT-1003",
    material: "Computer Parts",
    weight: 18,
    pricePerKg: 380,
    totalAmount: 6840,
    status: "Completed",
    paymentStatus: "Pending",
    transactionDate: new Date("2026-09-14T14:20:00Z")
  },
  {
    transactionId: "TXN-004",
    collectorId: "COL-1005",
    recyclerId: "REC-001",
    lotId: "LOT-1004",
    material: "TV / Monitors",
    weight: 25,
    pricePerKg: 350,
    totalAmount: 8750,
    status: "Processing",
    paymentStatus: "Pending",
    transactionDate: new Date("2026-09-14T16:00:00Z")
  },
  {
    transactionId: "TXN-005",
    collectorId: "COL-1004",
    recyclerId: "REC-004",
    lotId: "LOT-1005",
    material: "Batteries",
    weight: 6,
    pricePerKg: 420,
    totalAmount: 2520,
    status: "Completed",
    paymentStatus: "Paid",
    transactionDate: new Date("2026-09-13T09:15:00Z")
  },
  {
    transactionId: "TXN-006",
    collectorId: "COL-1001",
    recyclerId: "REC-005",
    lotId: "LOT-1006",
    material: "Cables",
    weight: 10,
    pricePerKg: 300,
    totalAmount: 3000,
    status: "Cancelled",
    paymentStatus: "Failed",
    transactionDate: new Date("2026-09-13T13:10:00Z")
  }
];

const samplePayments = [
  {
    paymentId: "PAY-001",
    transactionId: "TXN-001",
    collectorId: "COL-1002",
    recyclerId: "REC-001",
    amount: 5160,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    paymentDate: new Date("2026-09-15T10:45:00Z"),
    referenceNumber: "UPI-IND-89410291"
  },
  {
    paymentId: "PAY-002",
    transactionId: "TXN-002",
    collectorId: "COL-1003",
    recyclerId: "REC-003",
    amount: 3600,
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    paymentDate: new Date("2026-09-15T12:00:00Z"),
    referenceNumber: "UPI-IND-90218412"
  },
  {
    paymentId: "PAY-003",
    transactionId: "TXN-003",
    collectorId: "COL-1002",
    recyclerId: "REC-002",
    amount: 6840,
    paymentMethod: "Bank Transfer",
    paymentStatus: "Pending",
    paymentDate: new Date("2026-09-14T14:30:00Z"),
    referenceNumber: "NEFT-AP-774128"
  },
  {
    paymentId: "PAY-004",
    transactionId: "TXN-004",
    collectorId: "COL-1005",
    recyclerId: "REC-001",
    amount: 8750,
    paymentMethod: "UPI",
    paymentStatus: "Pending",
    paymentDate: new Date("2026-09-14T16:15:00Z"),
    referenceNumber: "UPI-IND-61928374"
  },
  {
    paymentId: "PAY-005",
    transactionId: "TXN-005",
    collectorId: "COL-1004",
    recyclerId: "REC-004",
    amount: 2520,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    paymentDate: new Date("2026-09-13T09:30:00Z"),
    referenceNumber: "CSH-REC-004-981"
  },
  {
    paymentId: "PAY-006",
    transactionId: "TXN-006",
    collectorId: "COL-1001",
    recyclerId: "REC-005",
    amount: 3000,
    paymentMethod: "UPI",
    paymentStatus: "Failed",
    paymentDate: new Date("2026-09-13T13:25:00Z"),
    referenceNumber: "UPI-IND-FAILED-02"
  }
];

const sampleTraceability = [
  {
    traceabilityId: "TRACE-001",
    lotId: "LOT-1001",
    collectorId: "COL-1002",
    recyclerId: "REC-001",
    transactionId: "TXN-001",
    currentStage: "Recycled",
    previousStage: "Processing",
    location: "Green Earth Plant, Vijayawada",
    timestamp: new Date("2026-09-15T16:00:00Z"),
    remarks: "Precious metals and cobalt recovered successfully"
  },
  {
    traceabilityId: "TRACE-002",
    lotId: "LOT-1002",
    collectorId: "COL-1003",
    recyclerId: "REC-003",
    transactionId: "TXN-002",
    currentStage: "Processing",
    previousStage: "Received by Recycler",
    location: "Clean Cycle Facility, Hyderabad",
    timestamp: new Date("2026-09-15T14:00:00Z"),
    remarks: "Dismantling and battery safe discharge"
  },
  {
    traceabilityId: "TRACE-003",
    lotId: "LOT-1003",
    collectorId: "COL-1002",
    recyclerId: "REC-002",
    transactionId: "TXN-003",
    currentStage: "Processing",
    previousStage: "Transported",
    location: "Eco Metal Depot, Guntur",
    timestamp: new Date("2026-09-14T17:30:00Z"),
    remarks: "Motherboard copper separation in progress"
  },
  {
    traceabilityId: "TRACE-004",
    lotId: "LOT-1004",
    collectorId: "COL-1005",
    recyclerId: "REC-001",
    transactionId: "TXN-004",
    currentStage: "Transported",
    previousStage: "Collected",
    location: "Transit Route Vijayawada",
    timestamp: new Date("2026-09-14T15:00:00Z"),
    remarks: "Scheduled for arrival at facility"
  },
  {
    traceabilityId: "TRACE-005",
    lotId: "LOT-1005",
    collectorId: "COL-1004",
    recyclerId: "REC-004",
    transactionId: "TXN-005",
    currentStage: "Recycled",
    previousStage: "Processing",
    location: "Safe E-Waste Facility, Nuzvid",
    timestamp: new Date("2026-09-13T18:00:00Z"),
    remarks: "Lithium-ion neutralized and recycled"
  }
];

const samplePickupRoutes = [
  {
    routeId: "ROUTE-001",
    collectorId: "COL-1002",
    recyclerId: "REC-001",
    lotId: "LOT-1001",
    pickupLocation: "Benz Circle, Vijayawada",
    destination: "Green Earth Recycling Plant, Autonagar",
    pickupDate: new Date("2026-09-15T09:00:00Z"),
    distanceKm: 18.5,
    estimatedTimeMinutes: 42,
    routeStatus: "Completed"
  },
  {
    routeId: "ROUTE-002",
    collectorId: "COL-1002",
    recyclerId: "REC-002",
    lotId: "LOT-1003",
    pickupLocation: "Brodipet, Guntur",
    destination: "Eco Metal Processing Center, Guntur",
    pickupDate: new Date("2026-09-14T10:00:00Z"),
    distanceKm: 22.8,
    estimatedTimeMinutes: 51,
    routeStatus: "Completed"
  },
  {
    routeId: "ROUTE-003",
    collectorId: "COL-1003",
    recyclerId: "REC-004",
    lotId: "LOT-1002",
    pickupLocation: "Main Road, Nuzvid",
    destination: "Safe E-Waste Center, Nuzvid",
    pickupDate: new Date("2026-09-15T11:00:00Z"),
    distanceKm: 15.2,
    estimatedTimeMinutes: 36,
    routeStatus: "Assigned"
  },
  {
    routeId: "ROUTE-004",
    collectorId: "COL-1005",
    recyclerId: "REC-001",
    lotId: "LOT-1004",
    pickupLocation: "Machilipatnam Highway, Vijayawada",
    destination: "Green Earth Hub",
    pickupDate: new Date("2026-09-14T13:30:00Z"),
    distanceKm: 29.4,
    estimatedTimeMinutes: 58,
    routeStatus: "In Transit"
  },
  {
    routeId: "ROUTE-005",
    collectorId: "COL-1004",
    recyclerId: "REC-004",
    lotId: "LOT-1005",
    pickupLocation: "Market Yard, Tenali",
    destination: "Safe E-Waste Center",
    pickupDate: new Date("2026-09-13T08:30:00Z"),
    distanceKm: 17.6,
    estimatedTimeMinutes: 39,
    routeStatus: "Completed"
  }
];

const samplePriceDemand = [
  {
    priceDemandId: "PD-001",
    material: "Mobile Phones",
    category: "Communication Equipment",
    pricePerKg: 430,
    demandLevel: "High",
    availableDemandKg: 450,
    lastUpdated: new Date("2026-09-15T08:00:00Z"),
    source: "Prototype Reference Market Data (Demo)"
  },
  {
    priceDemandId: "PD-002",
    material: "Laptops",
    category: "Computing Devices",
    pricePerKg: 450,
    demandLevel: "High",
    availableDemandKg: 300,
    lastUpdated: new Date("2026-09-15T08:00:00Z"),
    source: "Prototype Reference Market Data (Demo)"
  },
  {
    priceDemandId: "PD-003",
    material: "Computer Parts",
    category: "Components",
    pricePerKg: 380,
    demandLevel: "Medium",
    availableDemandKg: 620,
    lastUpdated: new Date("2026-09-15T08:00:00Z"),
    source: "Prototype Reference Market Data (Demo)"
  },
  {
    priceDemandId: "PD-004",
    material: "Batteries",
    category: "Energy Storage",
    pricePerKg: 420,
    demandLevel: "High",
    availableDemandKg: 500,
    lastUpdated: new Date("2026-09-15T08:00:00Z"),
    source: "Prototype Reference Market Data (Demo)"
  },
  {
    priceDemandId: "PD-005",
    material: "TV / Monitors",
    category: "Displays",
    pricePerKg: 350,
    demandLevel: "Medium",
    availableDemandKg: 380,
    lastUpdated: new Date("2026-09-15T08:00:00Z"),
    source: "Prototype Reference Market Data (Demo)"
  },
  {
    priceDemandId: "PD-006",
    material: "Cables",
    category: "Wiring",
    pricePerKg: 300,
    demandLevel: "Low",
    availableDemandKg: 200,
    lastUpdated: new Date("2026-09-15T08:00:00Z"),
    source: "Prototype Reference Market Data (Demo)"
  },
  {
    priceDemandId: "PD-007",
    material: "Circuit Boards",
    category: "High-Grade Electronics",
    pricePerKg: 520,
    demandLevel: "High",
    availableDemandKg: 850,
    lastUpdated: new Date("2026-09-15T08:00:00Z"),
    source: "Prototype Reference Market Data (Demo)"
  }
];

const sampleRecyclingStatus = [
  {
    statusId: "STATUS-001",
    lotId: "LOT-1001",
    transactionId: "TXN-001",
    recyclerId: "REC-001",
    material: "Mobile Phones",
    currentStatus: "Recycled",
    percentageCompleted: 100,
    processingLocation: "Green Earth Plant, Vijayawada",
    remarks: "Complete precious metal recovery"
  },
  {
    statusId: "STATUS-002",
    lotId: "LOT-1002",
    transactionId: "TXN-002",
    recyclerId: "REC-003",
    material: "Laptops",
    currentStatus: "Processing",
    percentageCompleted: 60,
    processingLocation: "Clean Cycle Facility, Hyderabad",
    remarks: "Motherboards extracted, casing segregated"
  },
  {
    statusId: "STATUS-003",
    lotId: "LOT-1003",
    transactionId: "TXN-003",
    recyclerId: "REC-002",
    material: "Computer Parts",
    currentStatus: "Sorting",
    percentageCompleted: 35,
    processingLocation: "Eco Metal Depot, Guntur",
    remarks: "Components separated by grade"
  },
  {
    statusId: "STATUS-004",
    lotId: "LOT-1004",
    transactionId: "TXN-004",
    recyclerId: "REC-001",
    material: "TV / Monitors",
    currentStatus: "Received",
    percentageCompleted: 10,
    processingLocation: "Green Earth Hub",
    remarks: "Received safely at intake dock"
  },
  {
    statusId: "STATUS-005",
    lotId: "LOT-1005",
    transactionId: "TXN-005",
    recyclerId: "REC-004",
    material: "Batteries",
    currentStatus: "Completed",
    percentageCompleted: 100,
    processingLocation: "Safe E-Waste Facility, Nuzvid",
    remarks: "Hazardous chemicals safely neutralized"
  }
];

const sampleAnomalies = [
  {
    anomalyId: "ANOM-001",
    transactionId: "TXN-003",
    collectorId: "COL-1002",
    recyclerId: "REC-002",
    anomalyType: "Price Mismatch",
    description: "Detected price ₹650/kg significantly higher than market average of ₹380/kg",
    severity: "Medium",
    detectedBy: "System",
    status: "Under Review",
    remarks: "Collector confirmed special grade motherboards"
  },
  {
    anomalyId: "ANOM-002",
    transactionId: "TXN-001",
    collectorId: "COL-1002",
    recyclerId: "REC-001",
    anomalyType: "Unusual Weight",
    description: "Lot weight reported 32 kg, measured at recycler 20 kg",
    severity: "High",
    detectedBy: "Gemini AI",
    status: "Under Review",
    remarks: "Physical re-weighing requested"
  },
  {
    anomalyId: "ANOM-003",
    transactionId: "TXN-002",
    collectorId: "COL-1003",
    recyclerId: "REC-003",
    anomalyType: "Repeated Transaction",
    description: "5 rapid successive transactions between same collector and recycler in 2 hours",
    severity: "Medium",
    detectedBy: "System",
    status: "Open",
    remarks: "Awaiting admin confirmation"
  },
  {
    anomalyId: "ANOM-004",
    transactionId: "TXN-004",
    collectorId: "COL-1005",
    recyclerId: "REC-001",
    anomalyType: "Suspicious Activity",
    description: "Pickup GPS location mismatch (18 km deviation from registered address)",
    severity: "Low",
    detectedBy: "System",
    status: "Resolved",
    resolvedAt: new Date("2026-09-15T15:30:00Z"),
    remarks: "Collector changed pickup warehouse location with verification"
  },
  {
    anomalyId: "ANOM-005",
    transactionId: "TXN-006",
    collectorId: "COL-1001",
    recyclerId: "REC-005",
    anomalyType: "Invalid Data",
    description: "Payment transaction marked failed after 3 invalid UPI attempts",
    severity: "Medium",
    detectedBy: "System",
    status: "Under Review",
    remarks: "Checking bank gateway logs"
  }
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB for seeding...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB database: ewaste_connect");

    // 1. Collectors
    for (const c of sampleCollectors) {
      await Collector.findOneAndUpdate({ collectorId: c.collectorId }, c, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      });
    }
    console.log(`✓ Seeded ${sampleCollectors.length} Collectors`);

    // 2. Recyclers
    for (const r of sampleRecyclers) {
      await Recycler.findOneAndUpdate({ recyclerId: r.recyclerId }, r, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      });
    }
    console.log(`✓ Seeded ${sampleRecyclers.length} Recyclers`);

    // 3. E-Waste Lots
    for (const l of sampleLots) {
      await EWasteLot.findOneAndUpdate({ lotId: l.lotId }, l, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      });
    }
    console.log(`✓ Seeded ${sampleLots.length} E-Waste Lots`);

    // 4. Transactions
    for (const t of sampleTransactions) {
      await Transaction.findOneAndUpdate({ transactionId: t.transactionId }, t, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      });
    }
    console.log(`✓ Seeded ${sampleTransactions.length} Transactions`);

    // 5. Payments
    for (const p of samplePayments) {
      await Payment.findOneAndUpdate({ paymentId: p.paymentId }, p, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      });
    }
    console.log(`✓ Seeded ${samplePayments.length} Payments`);

    // 6. Traceability
    for (const tr of sampleTraceability) {
      await Traceability.findOneAndUpdate({ traceabilityId: tr.traceabilityId }, tr, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      });
    }
    console.log(`✓ Seeded ${sampleTraceability.length} Traceability Records`);

    // 7. Pickup Routes
    for (const pr of samplePickupRoutes) {
      await PickupRoute.findOneAndUpdate({ routeId: pr.routeId }, pr, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      });
    }
    console.log(`✓ Seeded ${samplePickupRoutes.length} Pickup Routes`);

    // 8. Price and Demand
    for (const pd of samplePriceDemand) {
      await PriceDemand.findOneAndUpdate({ priceDemandId: pd.priceDemandId }, pd, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      });
    }
    console.log(`✓ Seeded ${samplePriceDemand.length} Price & Demand items`);

    // 9. Recycling Status
    for (const rs of sampleRecyclingStatus) {
      await RecyclingStatus.findOneAndUpdate({ statusId: rs.statusId }, rs, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      });
    }
    console.log(`✓ Seeded ${sampleRecyclingStatus.length} Recycling Status records`);

    // 10. Anomalies
    for (const a of sampleAnomalies) {
      await Anomaly.findOneAndUpdate({ anomalyId: a.anomalyId }, a, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      });
    }
    console.log(`✓ Seeded ${sampleAnomalies.length} Anomalies`);

    console.log("=========================================");
    console.log("All 10 collections successfully seeded in MongoDB!");
    console.log("=========================================");
    process.exit(0);
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
