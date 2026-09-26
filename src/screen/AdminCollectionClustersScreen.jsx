import React, { useState } from "react";
import "./AdminCollectionClustersScreen.css";

function AdminCollectionClustersScreen({ onBack }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const clusters = [
    {
      id: "CL-001",
      name: "Vijayawada Cluster",
      area: "Vijayawada",
      collectors: 8,
      weight: "34 kg",
      materials: "Mobile Phones, Laptops",
      distance: "4.2 km",
      status: "Ready",
    },
    {
      id: "CL-002",
      name: "Guntur Cluster",
      area: "Guntur",
      collectors: 6,
      weight: "27 kg",
      materials: "Computer Parts, Cables",
      distance: "7.8 km",
      status: "Ready",
    },
    {
      id: "CL-003",
      name: "Nuzvid Cluster",
      area: "Nuzvid",
      collectors: 5,
      weight: "21 kg",
      materials: "Mobile Phones, Batteries",
      distance: "11.5 km",
      status: "Accumulating",
    },
    {
      id: "CL-004",
      name: "Machilipatnam Cluster",
      area: "Machilipatnam",
      collectors: 7,
      weight: "31 kg",
      materials: "TV / Monitors, Laptops",
      distance: "18.4 km",
      status: "Ready",
    },
    {
      id: "CL-005",
      name: "Eluru Cluster",
      area: "Eluru",
      collectors: 4,
      weight: "16 kg",
      materials: "Computer Parts",
      distance: "20.1 km",
      status: "Accumulating",
    },
  ];

  const filteredClusters = clusters.filter((cluster) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      cluster.id.toLowerCase().includes(searchText) ||
      cluster.name.toLowerCase().includes(searchText) ||
      cluster.area.toLowerCase().includes(searchText) ||
      cluster.materials.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      cluster.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function handleView(cluster) {
    alert(
      `Collection Cluster Details\n\n` +
        `Cluster ID: ${cluster.id}\n` +
        `Cluster: ${cluster.name}\n` +
        `Area: ${cluster.area}\n` +
        `Collectors: ${cluster.collectors}\n` +
        `Combined Weight: ${cluster.weight}\n` +
        `Materials: ${cluster.materials}\n` +
        `Distance: ${cluster.distance}\n` +
        `Status: ${cluster.status}`
    );
  }

  return (
    <div className="admin-clusters-screen">

      {/* TOP NAVIGATION */}

      <div className="admin-clusters-top">

        <button
          type="button"
          className="admin-clusters-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="admin-clusters-top-title">
          Collection Clusters
        </div>

      </div>

      <main className="admin-clusters-container">

        {/* HEADER */}

        <div className="admin-clusters-header">

          <div className="admin-clusters-heading">

            <div className="admin-clusters-logo">
              🗺️
            </div>

            <div>
              <h1>Collection Clusters</h1>

              <p>
                Monitor grouped collector opportunities for efficient pickup
              </p>
            </div>

          </div>

          <div className="admin-clusters-total-box">

            <span>🗺️</span>

            <div>
              <strong>18</strong>
              <small>Active Clusters</small>
            </div>

          </div>

        </div>

        {/* INFORMATION NOTE */}

        <div className="admin-clusters-note">

          <span>ℹ️</span>

          <div>
            <strong>Cluster-based collection</strong>

            <p>
              Collectors remain separate owners of their e-waste.
              Clustering only groups nearby pickup opportunities.
            </p>
          </div>

        </div>

        {/* SUMMARY */}

        <div className="admin-clusters-summary-grid">

          <div className="admin-clusters-summary-card">

            <div className="admin-clusters-summary-icon">
              🗺️
            </div>

            <div>
              <span>Active Clusters</span>
              <strong>18</strong>
            </div>

          </div>

          <div className="admin-clusters-summary-card">

            <div className="admin-clusters-summary-icon">
              👥
            </div>

            <div>
              <span>Collectors Grouped</span>
              <strong>126</strong>
            </div>

          </div>

          <div className="admin-clusters-summary-card">

            <div className="admin-clusters-summary-icon">
              ⚖️
            </div>

            <div>
              <span>Combined E-Waste</span>
              <strong>486 kg</strong>
            </div>

          </div>

          <div className="admin-clusters-summary-card">

            <div className="admin-clusters-summary-icon">
              🚚
            </div>

            <div>
              <span>Pickup Ready</span>
              <strong>11</strong>
            </div>

          </div>

        </div>

        {/* FILTERS */}

        <div className="admin-clusters-filters">

          <div className="admin-clusters-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search cluster, area or material"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="ready">Ready</option>
            <option value="accumulating">Accumulating</option>
          </select>

        </div>

        {/* CLUSTER LIST */}

        <div className="admin-clusters-list-card">

          <div className="admin-clusters-list-heading">

            <div>
              <h2>Cluster Opportunities</h2>

              <p>
                {filteredClusters.length} clusters displayed
              </p>
            </div>

          </div>

          <div className="admin-clusters-table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Cluster ID</th>
                  <th>Cluster</th>
                  <th>Area</th>
                  <th>Collectors</th>
                  <th>Weight</th>
                  <th>Materials</th>
                  <th>Distance</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {filteredClusters.length > 0 ? (

                  filteredClusters.map((cluster) => (

                    <tr key={cluster.id}>

                      <td>
                        <strong className="admin-cluster-id">
                          {cluster.id}
                        </strong>
                      </td>

                      <td>

                        <div className="admin-cluster-name">

                          <span>📍</span>

                          <strong>
                            {cluster.name}
                          </strong>

                        </div>

                      </td>

                      <td>
                        {cluster.area}
                      </td>

                      <td>

                        <div className="admin-cluster-collectors">

                          <span>👥</span>

                          <strong>
                            {cluster.collectors}
                          </strong>

                        </div>

                      </td>

                      <td>

                        <strong className="admin-cluster-weight">
                          {cluster.weight}
                        </strong>

                      </td>

                      <td>
                        {cluster.materials}
                      </td>

                      <td>
                        {cluster.distance}
                      </td>

                      <td>

                        <span
                          className={`admin-cluster-status ${cluster.status.toLowerCase()}`}
                        >
                          {cluster.status}
                        </span>

                      </td>

                      <td>

                        <button
                          type="button"
                          className="admin-cluster-view-button"
                          onClick={() => handleView(cluster)}
                        >
                          View
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="9"
                      className="admin-clusters-empty"
                    >

                      <div>

                        <span>🔍</span>

                        <strong>
                          No clusters found
                        </strong>

                        <p>
                          Try changing your search or filter.
                        </p>

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminCollectionClustersScreen;