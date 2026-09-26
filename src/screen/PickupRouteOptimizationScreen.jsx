import React, { useEffect } from "react";
import "./PickupRouteOptimizationScreen.css";

function PickupRouteOptimizationScreen({
  language,
  cluster,
  onBack,
  onContinue,
}) {
  const content = {
    en: {
      title: "Pickup Route Optimization",
      back: "Back",
      optimized: "Optimized Pickup Route",
      optimizedText: "Collectors are arranged in a practical pickup order.",
      start: "Recycler Starting Point",
      stop: "Pickup Stop",
      collectors: "Collectors",
      totalWeight: "Total Weight",
      distance: "Total Distance",
      time: "Estimated Travel Time",
      route: "Suggested Route",
      routeText: "Visit nearby collectors in this order to reduce unnecessary travel.",
      continue: "Start Pickup",
    },

    te: {
      title: "పికప్ మార్గం ఆప్టిమైజేషన్",
      back: "వెనుకకు",
      optimized: "ఆప్టిమైజ్ చేసిన పికప్ మార్గం",
      optimizedText: "కలెక్టర్లను సరైన పికప్ క్రమంలో అమర్చాం.",
      start: "రీసైక్లర్ ప్రారంభ స్థానం",
      stop: "పికప్ స్థానం",
      collectors: "కలెక్టర్లు",
      totalWeight: "మొత్తం బరువు",
      distance: "మొత్తం దూరం",
      time: "అంచనా ప్రయాణ సమయం",
      route: "సూచించిన మార్గం",
      routeText: "అనవసరమైన ప్రయాణాన్ని తగ్గించడానికి కలెక్టర్లను ఈ క్రమంలో సందర్శించండి.",
      continue: "పికప్ ప్రారంభించండి",
    },

    hi: {
      title: "पिकअप मार्ग अनुकूलन",
      back: "वापस",
      optimized: "अनुकूलित पिकअप मार्ग",
      optimizedText: "कलेक्टरों को व्यावहारिक पिकअप क्रम में व्यवस्थित किया गया है।",
      start: "रीसाइकलर का प्रारंभिक स्थान",
      stop: "पिकअप स्थान",
      collectors: "कलेक्टर",
      totalWeight: "कुल वजन",
      distance: "कुल दूरी",
      time: "अनुमानित यात्रा समय",
      route: "सुझाया गया मार्ग",
      routeText: "अनावश्यक यात्रा कम करने के लिए कलेक्टरों को इस क्रम में देखें।",
      continue: "पिकअप शुरू करें",
    },

    mr: {
      title: "पिकअप मार्ग ऑप्टिमायझेशन",
      back: "मागे",
      optimized: "ऑप्टिमाइझ केलेला पिकअप मार्ग",
      optimizedText: "कलेक्टरना योग्य पिकअप क्रमात मांडले आहे.",
      start: "रीसायकलरचे सुरुवातीचे ठिकाण",
      stop: "पिकअप ठिकाण",
      collectors: "कलेक्टर",
      totalWeight: "एकूण वजन",
      distance: "एकूण अंतर",
      time: "अंदाजे प्रवास वेळ",
      route: "सुचवलेला मार्ग",
      routeText: "अनावश्यक प्रवास कमी करण्यासाठी कलेक्टरना या क्रमाने भेट द्या.",
      continue: "पिकअप सुरू करा",
    },
  };

  const t = content[language] || content.en;

  const collectorCount = Number(cluster?.collectors) || 0;

  const weight =
    Number.parseFloat(
      String(cluster?.weight || "0").replace(/[^\d.]/g, "")
    ) || 0;

  const area = cluster?.area || "Nearby Area";

  const routeStops =
    collectorCount >= 3
      ? [
          {
            number: 1,
            name: "Collector 1",
            weight: "3 kg",
          },
          {
            number: 2,
            name: "Collector 2",
            weight: "4 kg",
          },
          {
            number: 3,
            name: "Collector 3",
            weight: "2 kg",
          },
        ]
      : [
          {
            number: 1,
            name: "Collector 1",
            weight: "4 kg",
          },
          {
            number: 2,
            name: "Collector 2",
            weight: "3 kg",
          },
        ];

  const totalDistance = collectorCount >= 3 ? "8.5 km" : "6.2 km";

  const travelTime =
    collectorCount >= 3 ? "35 min" : "25 min";

  useEffect(() => {
    const voiceMap = {
      en: "en-IN",
      te: "te-IN",
      hi: "hi-IN",
      mr: "mr-IN",
    };

    const message = new SpeechSynthesisUtterance(
      `${t.title}. ${t.optimized}. ${t.optimizedText}`
    );

    message.lang = voiceMap[language] || "en-IN";
    message.rate = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(message);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [
    language,
    t.title,
    t.optimized,
    t.optimizedText,
  ]);

  return (
    <div className="pickup-route-screen">
      <div className="pickup-route-card">

        {/* BACK */}
        <button
          className="pickup-route-back"
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
        <div className="pickup-route-header">

          <div className="pickup-route-icon">
            🗺️
          </div>

          <div>
            <h1>{t.title}</h1>

            <h2>
              {cluster?.name || "Collector Cluster"}
            </h2>

            <p>{area}</p>
          </div>

        </div>

        {/* OPTIMIZED MESSAGE */}
        <div className="pickup-route-success">

          <div className="pickup-route-success-icon">
            ✓
          </div>

          <div>
            <h3>{t.optimized}</h3>

            <p>{t.optimizedText}</p>
          </div>

        </div>

        {/* ROUTE SUMMARY */}
        <div className="pickup-route-summary">

          <div className="pickup-route-summary-box">

            <span>👥</span>

            <small>{t.collectors}</small>

            <strong>
              {collectorCount}
            </strong>

          </div>

          <div className="pickup-route-summary-box">

            <span>⚖️</span>

            <small>{t.totalWeight}</small>

            <strong>
              {weight} kg
            </strong>

          </div>

          <div className="pickup-route-summary-box">

            <span>📏</span>

            <small>{t.distance}</small>

            <strong>
              {totalDistance}
            </strong>

          </div>

          <div className="pickup-route-summary-box">

            <span>🕐</span>

            <small>{t.time}</small>

            <strong>
              {travelTime}
            </strong>

          </div>

        </div>

        {/* START POINT */}
        <div className="pickup-route-start">

          <div className="route-point-icon">
            🚚
          </div>

          <div>
            <small>{t.start}</small>

            <strong>
              Recycler Collection Center
            </strong>
          </div>

        </div>

        {/* ROUTE LINE */}
        <div className="pickup-route-section">

          <h3>{t.route}</h3>

          <p className="pickup-route-description">
            {t.routeText}
          </p>

          <div className="pickup-route-list">

            {routeStops.map((stop, index) => (
              <div
                className="pickup-route-stop"
                key={stop.number}
              >

                <div className="pickup-route-stop-left">

                  <div className="pickup-route-number">
                    {stop.number}
                  </div>

                  {index < routeStops.length - 1 && (
                    <div className="pickup-route-line"></div>
                  )}

                </div>

                <div className="pickup-route-stop-info">

                  <strong>
                    {stop.name}
                  </strong>

                  <span>
                    {t.stop} • {stop.weight}
                  </span>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* GUIDANCE */}
        <div className="pickup-route-guidance">
          ☝️
        </div>

        {/* CONTINUE */}
        <button
          className="pickup-route-button"
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

export default PickupRouteOptimizationScreen;