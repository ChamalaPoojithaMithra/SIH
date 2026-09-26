import React, { useEffect } from "react";
import "./CollectorClusterScreen.css";

function CollectorClusterScreen({
  language,
  onBack,
  onViewCluster,
}) {
  const content = {
    en: {
      title: "Small Collector Clusters",
      subtitle: "Nearby small e-waste lots grouped for easier pickup",
      back: "Back",
      viewCluster: "View Cluster",

      cluster1: "Vijayawada Cluster",
      cluster2: "Guntur Cluster",
      cluster3: "Nuzvid Cluster",

      collectors: "Collectors",
      totalWeight: "Total Weight",
      distance: "Area",

      collectorCount1: "3 collectors",
      collectorCount2: "2 collectors",
      collectorCount3: "3 collectors",

      weight1: "9 kg",
      weight2: "7 kg",
      weight3: "8 kg",

      area1: "Vijayawada",
      area2: "Guntur",
      area3: "Nuzvid",

      ready: "Ready for pickup",
    },

    te: {
      title: "చిన్న కలెక్టర్ క్లస్టర్లు",
      subtitle: "సులభమైన పికప్ కోసం దగ్గరలోని చిన్న ఈ-వేస్ట్ లాట్లు",
      back: "వెనుకకు",
      viewCluster: "క్లస్టర్ చూడండి",

      cluster1: "విజయవాడ క్లస్టర్",
      cluster2: "గుంటూరు క్లస్టర్",
      cluster3: "నూజివీడు క్లస్టర్",

      collectors: "కలెక్టర్లు",
      totalWeight: "మొత్తం బరువు",
      distance: "ప్రాంతం",

      collectorCount1: "3 కలెక్టర్లు",
      collectorCount2: "2 కలెక్టర్లు",
      collectorCount3: "3 కలెక్టర్లు",

      weight1: "9 కిలోలు",
      weight2: "7 కిలోలు",
      weight3: "8 కిలోలు",

      area1: "విజయవాడ",
      area2: "గుంటూరు",
      area3: "నూజివీడు",

      ready: "పికప్‌కు సిద్ధంగా ఉంది",
    },

    hi: {
      title: "छोटे कलेक्टर क्लस्टर",
      subtitle: "आसान पिकअप के लिए पास के छोटे ई-वेस्ट लॉट को समूहित किया गया है",
      back: "वापस",
      viewCluster: "क्लस्टर देखें",

      cluster1: "विजयवाड़ा क्लस्टर",
      cluster2: "गुंटूर क्लस्टर",
      cluster3: "नुज़विद क्लस्टर",

      collectors: "कलेक्टर",
      totalWeight: "कुल वजन",
      distance: "क्षेत्र",

      collectorCount1: "3 कलेक्टर",
      collectorCount2: "2 कलेक्टर",
      collectorCount3: "3 कलेक्टर",

      weight1: "9 किलो",
      weight2: "7 किलो",
      weight3: "8 किलो",

      area1: "विजयवाड़ा",
      area2: "गुंटूर",
      area3: "नुज़विद",

      ready: "पिकअप के लिए तैयार",
    },

    mr: {
      title: "लहान कलेक्टर क्लस्टर",
      subtitle: "सोप्या पिकअपसाठी जवळील लहान ई-वेस्ट लॉट एकत्र केले आहेत",
      back: "मागे",
      viewCluster: "क्लस्टर पहा",

      cluster1: "विजयवाडा क्लस्टर",
      cluster2: "गुंटूर क्लस्टर",
      cluster3: "नुझविद क्लस्टर",

      collectors: "कलेक्टर",
      totalWeight: "एकूण वजन",
      distance: "क्षेत्र",

      collectorCount1: "3 कलेक्टर",
      collectorCount2: "2 कलेक्टर",
      collectorCount3: "3 कलेक्टर",

      weight1: "9 किलो",
      weight2: "7 किलो",
      weight3: "8 किलो",

      area1: "विजयवाडा",
      area2: "गुंटूर",
      area3: "नुझविद",

      ready: "पिकअपसाठी तयार",
    },
  };

  const t = content[language] || content.en;

  useEffect(() => {
    const voiceMap = {
      en: "en-IN",
      te: "te-IN",
      hi: "hi-IN",
      mr: "mr-IN",
    };

    const message = new SpeechSynthesisUtterance(
      `${t.title}. ${t.subtitle}`
    );

    message.lang = voiceMap[language] || "en-IN";
    message.rate = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(message);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language, t.title, t.subtitle]);

  const clusters = [
    {
      id: 1,
      icon: "📍",
      name: t.cluster1,
      collectors: t.collectorCount1,
      weight: t.weight1,
      area: t.area1,
    },
    {
      id: 2,
      icon: "📍",
      name: t.cluster2,
      collectors: t.collectorCount2,
      weight: t.weight2,
      area: t.area2,
    },
    {
      id: 3,
      icon: "📍",
      name: t.cluster3,
      collectors: t.collectorCount3,
      weight: t.weight3,
      area: t.area3,
    },
  ];

  function handleViewCluster(cluster) {
    window.speechSynthesis.cancel();

    if (onViewCluster) {
      onViewCluster(cluster);
    }
  }

  return (
    <div className="collector-cluster-screen">

      <div className="collector-cluster-card">

        <button
          className="collector-cluster-back"
          onClick={() => {
            window.speechSynthesis.cancel();

            if (onBack) {
              onBack();
            }
          }}
        >
          ← {t.back}
        </button>

        <div className="collector-cluster-header">

          <div className="collector-cluster-icon">
            🗺️
          </div>

          <div>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>

        </div>

        <div className="collector-cluster-info">
          <span>📦</span>
          <p>
            Small nearby lots are grouped together so one recycler trip
            can collect multiple lots.
          </p>
        </div>

        <div className="collector-cluster-list">

          {clusters.map((cluster) => (

            <div
              className="collector-cluster-item"
              key={cluster.id}
            >

              <div className="cluster-location-icon">
                {cluster.icon}
              </div>

              <div className="cluster-information">

                <h2>
                  {cluster.name}
                </h2>

                <div className="cluster-details">

                  <span>
                    👥 {cluster.collectors}
                  </span>

                  <span>
                    ⚖️ {cluster.weight}
                  </span>

                  <span>
                    📍 {cluster.area}
                  </span>

                </div>

                <div className="cluster-status">
                  ✓ {t.ready}
                </div>

              </div>

              <button
                className="view-cluster-button"
                onClick={() => {
                  handleViewCluster(cluster);
                }}
              >
                {t.viewCluster}
                <span>☝️</span>
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default CollectorClusterScreen;