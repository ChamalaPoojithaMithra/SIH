import React, { useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard({
  onLogout,
  onCollectors,
  onRecyclers,
  onEWasteLots,
  onTransactions,
  onPayments,
  onAnomalies,
  onClusters,
  onRoutes,
  onPriceDemand,
  onTraceability,
  onRecyclingStatus,
  onReports,
}) {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      icon: "📊",
      title: "Dashboard",
    },
    {
      id: "collectors",
      icon: "👥",
      title: "Collectors",
      action: onCollectors,
    },
    {
      id: "recyclers",
      icon: "♻️",
      title: "Recycler Verification",
      action: onRecyclers,
    },
    {
      id: "ewaste",
      icon: "📦",
      title: "E-Waste Lots",
      action: onEWasteLots,
    },
    {
      id: "transactions",
      icon: "🔄",
      title: "Transactions",
      action: onTransactions,
    },
    {
      id: "payments",
      icon: "💳",
      title: "Payments",
      action: onPayments,
    },
    {
      id: "anomalies",
      icon: "⚠️",
      title: "Anomaly Review",
      action: onAnomalies,
    },
    {
      id: "clusters",
      icon: "🗺️",
      title: "Collection Clusters",
      action: onClusters,
    },
    {
      id: "routes",
      icon: "🚚",
      title: "Pickup Routes",
      action: onRoutes,
    },
    {
      id: "price-demand",
      icon: "📈",
      title: "Price & Demand",
      action: onPriceDemand,
    },
    {
  id: "traceability",
  icon: "🔗",
  title: "Traceability",
  action: () => {
    console.log("TRACEABILITY BUTTON CLICKED");

    if (onTraceability) {
      console.log("onTraceability exists");
      onTraceability();
    } else {
      console.log("onTraceability is missing");
    }
  },
},
    {
      id: "recycling-status",
      icon: "♻️",
      title: "Recycling Status",
      action: () => {
        if (onRecyclingStatus) {
          onRecyclingStatus();
        } else if (onReports) {
          onReports();
        }
      },
    },
    {
      id: "reports",
      icon: "📄",
      title: "Reports",
      action: onReports,
    },
  ];

  const stats = [
    {
      icon: "👥",
      value: "1,284",
      label: "Total Collectors",
      change: "+8.4%",
      positive: true,
    },
    {
      icon: "♻️",
      value: "86",
      label: "Verified Recyclers",
      change: "+5.2%",
      positive: true,
    },
    {
      icon: "📦",
      value: "342",
      label: "Active E-Waste Lots",
      change: "+12.6%",
      positive: true,
    },
    {
      icon: "🔄",
      value: "4,920",
      label: "Completed Transactions",
      change: "+9.1%",
      positive: true,
    },
    {
      icon: "💳",
      value: "18",
      label: "Pending Payments",
      change: "Needs review",
      positive: false,
    },
    {
      icon: "⚖️",
      value: "18.4 T",
      label: "E-Waste Collected",
      change: "+14.8%",
      positive: true,
    },
  ];

  const recentActivity = [
    {
      id: "ACT-1024",
      activity: "New e-waste lot created",
      reference: "LOT-EW1024",
      type: "E-Waste",
      status: "Active",
      time: "5 min ago",
    },
    {
      id: "ACT-1023",
      activity: "Recycler verification submitted",
      reference: "REC-0086",
      type: "Verification",
      status: "Pending",
      time: "18 min ago",
    },
    {
      id: "ACT-1022",
      activity: "Transaction completed",
      reference: "TX-4920",
      type: "Transaction",
      status: "Completed",
      time: "32 min ago",
    },
    {
      id: "ACT-1021",
      activity: "Pickup route created",
      reference: "ROUTE-031",
      type: "Pickup",
      status: "Scheduled",
      time: "1 hr ago",
    },
    {
      id: "ACT-1020",
      activity: "Payment marked for review",
      reference: "PAY-0872",
      type: "Payment",
      status: "Review",
      time: "2 hrs ago",
    },
  ];

  const eWasteFlow = [
    {
      material: "Mobile Phones",
      quantity: "4.2 T",
      percentage: 72,
    },
    {
      material: "Laptops",
      quantity: "3.8 T",
      percentage: 64,
    },
    {
      material: "Computer Parts",
      quantity: "3.1 T",
      percentage: 52,
    },
    {
      material: "TV / Monitors",
      quantity: "2.7 T",
      percentage: 45,
    },
    {
      material: "Batteries",
      quantity: "2.1 T",
      percentage: 35,
    },
  ];

  function handleMenuClick(item) {
  setActiveMenu(item.id);

  if (item.id === "traceability") {
    if (onTraceability) {
      onTraceability();
    }
    return;
  }

  if (item.action) {
    item.action();
  }
}

  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}

      <aside className="admin-sidebar">

        <div className="admin-brand">

          <div className="admin-brand-icon">
            ♻️
          </div>

          <div>
            <h2>Kabadiwala</h2>
            <span>Connect</span>
          </div>

        </div>

        <div className="admin-sidebar-section">
          <span>MAIN MENU</span>
        </div>

        <nav className="admin-nav">

          {menuItems.map((item) => (

            <button
              key={item.id}
              className={
                `admin-nav-item ${
                  activeMenu === item.id
                    ? "active"
                    : ""
                }`
              }
              onClick={() =>
                handleMenuClick(item)
              }
            >

              <span className="admin-nav-icon">
                {item.icon}
              </span>

              <span>
                {item.title}
              </span>

            </button>

          ))}

        </nav>

        <div className="admin-sidebar-bottom">

          <button
            className="admin-logout"
            onClick={() => {

              if (onLogout) {
                onLogout();
              }

            }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-header">

          <div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Monitor and manage recycling platform activity
            </p>

          </div>

          <div className="admin-header-right">

            <button className="admin-notification">
              🔔
              <span></span>
            </button>

            <div className="admin-user">

              <div className="admin-user-avatar">
                A
              </div>

              <div>
                <strong>Administrator</strong>
                <small>Platform Admin</small>
              </div>

            </div>

          </div>

        </header>


        {/* STAT CARDS */}

        <section className="admin-stats-grid">

          {stats.map((stat) => (

            <div
              className="admin-stat-card"
              key={stat.label}
            >

              <div className="admin-stat-top">

                <div className="admin-stat-icon">
                  {stat.icon}
                </div>

                <span
                  className={
                    stat.positive
                      ? "stat-change positive"
                      : "stat-change warning"
                  }
                >
                  {stat.change}
                </span>

              </div>

              <strong className="admin-stat-value">
                {stat.value}
              </strong>

              <span className="admin-stat-label">
                {stat.label}
              </span>

            </div>

          ))}

        </section>


        {/* MAIN GRID */}

        <section className="admin-content-grid">

          {/* RECENT ACTIVITY */}

          <div className="admin-panel activity-panel">

            <div className="admin-panel-header">

              <div>
                <h2>Recent Activity</h2>
                <p>
                  Latest platform events
                </p>
              </div>

              <button>
                View All
              </button>

            </div>

            <div className="activity-table-wrapper">

              <table className="activity-table">

                <thead>

                  <tr>
                    <th>Activity</th>
                    <th>Reference</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>

                </thead>

                <tbody>

                  {recentActivity.map(
                    (item) => (

                      <tr key={item.id}>

                        <td>
                          <strong>
                            {item.activity}
                          </strong>
                        </td>

                        <td>
                          {item.reference}
                        </td>

                        <td>
                          {item.type}
                        </td>

                        <td>

                          <span
                            className={
                              `status-badge ${
                                item.status
                                  .toLowerCase()
                                  .replace(
                                    /\s+/g,
                                    "-"
                                  )
                              }`
                            }
                          >
                            {item.status}
                          </span>

                        </td>

                        <td>
                          {item.time}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* VERIFICATION PANEL */}

          <div className="admin-panel verification-panel">

            <div className="admin-panel-header">

              <div>
                <h2>Recycler Verification</h2>
                <p>
                  Pending verification requests
                </p>
              </div>

              <span className="verification-count">
                7
              </span>

            </div>

            <div className="verification-summary">

              <div className="verification-number">
                7
              </div>

              <div>
                <strong>
                  Requests pending
                </strong>

                <p>
                  Recycler profiles awaiting review
                </p>
              </div>

            </div>

            <div className="verification-progress">

              <div
                className="verification-progress-fill"
              ></div>

            </div>

            <button
              className="verification-button"
              onClick={onRecyclers}
            >
              Review Verification Requests
              <span>→</span>
            </button>

          </div>

        </section>


        {/* LOWER GRID */}

        <section className="admin-lower-grid">

          {/* E-WASTE FLOW */}

          <div className="admin-panel">

            <div className="admin-panel-header">

              <div>
                <h2>E-Waste Flow</h2>
                <p>
                  Current material collection
                </p>
              </div>

              <button
                onClick={onEWasteLots}
              >
                Details
              </button>

            </div>

            <div className="ewaste-flow-list">

              {eWasteFlow.map(
                (item) => (

                  <div
                    className="ewaste-flow-item"
                    key={item.material}
                  >

                    <div className="ewaste-flow-info">

                      <span>
                        {item.material}
                      </span>

                      <strong>
                        {item.quantity}
                      </strong>

                    </div>

                    <div className="ewaste-progress">

                      <div
                        className="ewaste-progress-fill"
                        style={{
                          width:
                            `${item.percentage}%`,
                        }}
                      ></div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>


          {/* SYSTEM OVERVIEW */}

          <div className="admin-panel">

            <div className="admin-panel-header">

              <div>
                <h2>System Overview</h2>
                <p>
                  Platform monitoring
                </p>
              </div>

            </div>

            <div className="system-list">

              <div className="system-row">

                <span>
                  <i className="system-dot online"></i>
                  Platform
                </span>

                <strong>
                  Operational
                </strong>

              </div>

              <div className="system-row">

                <span>
                  <i className="system-dot online"></i>
                  Collector Services
                </span>

                <strong>
                  Operational
                </strong>

              </div>

              <div className="system-row">

                <span>
                  <i className="system-dot online"></i>
                  Recycler Services
                </span>

                <strong>
                  Operational
                </strong>

              </div>

              <div className="system-row">

                <span>
                  <i className="system-dot warning"></i>
                  Payment Review
                </span>

                <strong>
                  18 Pending
                </strong>

              </div>

              <div className="system-row">

                <span>
                  <i className="system-dot warning"></i>
                  Anomaly Review
                </span>

                <strong>
                  4 Alerts
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* QUICK MANAGEMENT */}

        <section className="admin-panel quick-panel">

          <div className="admin-panel-header">

            <div>
              <h2>Quick Management</h2>

              <p>
                Frequently used administration areas
              </p>
            </div>

          </div>

          <div className="quick-management-grid">

            <button
              onClick={onCollectors}
            >
              <span>👥</span>
              <div>
                <strong>Manage Collectors</strong>
                <small>
                  View and manage collector accounts
                </small>
              </div>
              <b>→</b>
            </button>

            <button
              onClick={onRecyclers}
            >
              <span>♻️</span>
              <div>
                <strong>Verify Recyclers</strong>
                <small>
                  Review recycler verification
                </small>
              </div>
              <b>→</b>
            </button>

            <button
              onClick={onAnomalies}
            >
              <span>⚠️</span>
              <div>
                <strong>Anomaly Review</strong>
                <small>
                  Review flagged platform activity
                </small>
              </div>
              <b>→</b>
            </button>

            <button
              onClick={onReports}
            >
              <span>📄</span>
              <div>
                <strong>Reports</strong>
                <small>
                  View platform reports
                </small>
              </div>
              <b>→</b>
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;