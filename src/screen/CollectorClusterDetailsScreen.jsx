import React, { useEffect } from "react";
import "./CollectorClusterDetailsScreen.css";

function CollectorClusterDetailsScreen({
  language,
  cluster,
  onBack,
  onContinue,
}) {
  const content = {
    en: {
      title: "Collector Cluster Details",
      back: "Back",
      location: "Cluster Location",
      collectors: "Collectors",
      totalWeight: "Total Weight",
      status: "Pickup Status",
      ready: "Ready for pickup",
      route: "Pickup Route",
      routeText: "Nearby collectors can be collected in one trip.",
      continue: "Check Pickup Feasibility",
      verified: "Verified Collectors",
    },

    te: {
      title: "కలెక్టర్ క్లస్టర్ వివరాలు",
      back: "వెనుకకు",
      location: "క్లస్టర్ ప్రాంతం",
      collectors: "కలెక్టర్లు",
      totalWeight: "మొత్తం బరువు",
      status: "పికప్ స్థితి",
      ready: "పికప్‌కు సిద్ధంగా ఉంది",
      route: "పికప్ మార్గం",
      routeText: "దగ్గరలో ఉన్న కలెక్టర్లను ఒకే ట్రిప్‌లో సేకరించవచ్చు.",
      continue: "పికప్ సాధ్యతను చూడండి",
      verified: "ధృవీకరించబడిన కలెక్టర్లు",
    },

    hi: {
      title: "कलेक्टर क्लस्टर विवरण",
      back: "वापस",
      location: "क्लस्टर स्थान",
      collectors: "कलेक्टर",
      totalWeight: "कुल वजन",
      status: "पिकअप स्थिति",
      ready: "पिकअप के लिए तैयार",
      route: "पिकअप मार्ग",
      routeText: "पास के कलेक्टरों से एक ही यात्रा में सामान लिया जा सकता है।",
      continue: "पिकअप व्यवहार्यता देखें",
      verified: "सत्यापित कलेक्टर",
    },

    mr: {
      title: "कलेक्टर क्लस्टर तपशील",
      back: "मागे",
      location: "क्लस्टर स्थान",
      collectors: "कलेक्टर",
      totalWeight: "एकूण वजन",
      status: "पिकअप स्थिती",
      ready: "पिकअपसाठी तयार",
      route: "पिकअप मार्ग",
      routeText: "जवळील कलेक्टरकडून एका प्रवासात ई-वेस्ट गोळा करता येईल.",
      continue: "पिकअप व्यवहार्यता पहा",
      verified: "सत्यापित कलेक्टर",
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
      `${t.title}. ${cluster?.name || ""}. ${t.routeText}`
    );

    message.lang = voiceMap[language] || "en-IN";
    message.rate = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(message);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language, cluster, t.title, t.routeText]);

  if (!cluster) {
    return (
      <div className="cluster-details-screen">
        <div className="cluster-details-card">
          <button
            className="cluster-details-back"
            onClick={() => {
              window.speechSynthesis.cancel();

              if (onBack) {
                onBack();
              }
            }}
          >
            ← {t.back}
          </button>

          <h1>{t.title}</h1>

          <p>No cluster selected.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cluster-details-screen">

      <div className="cluster-details-card">

        {/* BACK */}

        <button
          className="cluster-details-back"
          onClick={() => {
            window.speechSynthesis.cancel();

            if (onBack) {
              onBack();
            }
          }}
        >
          ← {t.back}
        </button>

        {/* HEADER */}

        <div className="cluster-details-header">

          <div className="cluster-details-icon">
            📍
          </div>

          <div>
            <h1>{t.title}</h1>

            <h2>
              {cluster.name}
            </h2>

            <p>
              {t.verified}
            </p>
          </div>

        </div>

        {/* MAIN INFORMATION */}

        <div className="cluster-summary">

          <div className="cluster-summary-box">

            <span className="summary-icon">
              📍
            </span>

            <small>
              {t.location}
            </small>

            <strong>
              {cluster.area}
            </strong>

          </div>

          <div className="cluster-summary-box">

            <span className="summary-icon">
              👥
            </span>

            <small>
              {t.collectors}
            </small>

            <strong>
              {cluster.collectors}
            </strong>

          </div>

          <div className="cluster-summary-box">

            <span className="summary-icon">
              ⚖️
            </span>

            <small>
              {t.totalWeight}
            </small>

            <strong>
              {cluster.weight}
            </strong>

          </div>

        </div>

        {/* PICKUP STATUS */}

        <div className="cluster-ready-box">

          <div className="cluster-ready-icon">
            ✓
          </div>

          <div>
            <small>
              {t.status}
            </small>

            <strong>
              {t.ready}
            </strong>
          </div>

        </div>

        {/* ROUTE INFORMATION */}

        <div className="cluster-route-box">

          <div className="cluster-route-icon">
            🚚
          </div>

          <div>
            <h3>
              {t.route}
            </h3>

            <p>
              {t.routeText}
            </p>
          </div>

        </div>

        {/* COLLECTOR LIST */}

        <div className="cluster-collector-list">

          <h3>
            {t.collectors}
          </h3>

          <div className="cluster-collector-row">
            <span>👤</span>
            <span>Collector 1</span>
            <strong>3 kg</strong>
          </div>

          <div className="cluster-collector-row">
            <span>👤</span>
            <span>Collector 2</span>
            <strong>4 kg</strong>
          </div>

          <div className="cluster-collector-row">
            <span>👤</span>
            <span>Collector 3</span>
            <strong>2 kg</strong>
          </div>

        </div>

        {/* CONTINUE BUTTON */}

        <div className="cluster-details-guidance">
          ☝️
        </div>

        <button
          className="cluster-feasibility-button"
          onClick={() => {
            window.speechSynthesis.cancel();

            if (onContinue) {
              onContinue(cluster);
            }
          }}
        >
          {t.continue}
          <span>→</span>
        </button>

      </div>

    </div>
  );
}

export default CollectorClusterDetailsScreen;