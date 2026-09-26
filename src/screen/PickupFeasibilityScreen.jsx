import React, { useEffect } from "react";
import "./PickupFeasibilityScreen.css";

function PickupFeasibilityScreen({
  language,
  cluster,
  onBack,
  onContinue,
}) {
  const content = {
    en: {
      title: "Pickup Feasibility",
      back: "Back",
      feasible: "Pickup is feasible",
      feasibleText: "This cluster can be collected in one pickup trip.",
      collectors: "Collectors",
      totalWeight: "Total Weight",
      distance: "Estimated Distance",
      vehicle: "Vehicle Capacity",
      pickupTime: "Estimated Pickup Time",
      route: "Route is practical",
      routeText: "All collectors can be covered in one trip.",
      continue: "Optimize Pickup Route",
      verified: "Based on verified collector locations",
    },

    te: {
      title: "పికప్ సాధ్యత",
      back: "వెనుకకు",
      feasible: "పికప్ సాధ్యమే",
      feasibleText: "ఈ క్లస్టర్‌ను ఒకే పికప్ ట్రిప్‌లో సేకరించవచ్చు.",
      collectors: "కలెక్టర్లు",
      totalWeight: "మొత్తం బరువు",
      distance: "అంచనా దూరం",
      vehicle: "వాహనం సామర్థ్యం",
      pickupTime: "అంచనా పికప్ సమయం",
      route: "మార్గం అనుకూలంగా ఉంది",
      routeText: "అన్ని కలెక్టర్లను ఒకే ట్రిప్‌లో కవర్ చేయవచ్చు.",
      continue: "పికప్ మార్గాన్ని మెరుగుపరచండి",
      verified: "ధృవీకరించబడిన కలెక్టర్ ప్రాంతాల ఆధారంగా",
    },

    hi: {
      title: "पिकअप व्यवहार्यता",
      back: "वापस",
      feasible: "पिकअप संभव है",
      feasibleText: "इस क्लस्टर को एक ही पिकअप यात्रा में एकत्र किया जा सकता है।",
      collectors: "कलेक्टर",
      totalWeight: "कुल वजन",
      distance: "अनुमानित दूरी",
      vehicle: "वाहन क्षमता",
      pickupTime: "अनुमानित पिकअप समय",
      route: "मार्ग व्यावहारिक है",
      routeText: "सभी कलेक्टरों को एक ही यात्रा में कवर किया जा सकता है।",
      continue: "पिकअप मार्ग अनुकूलित करें",
      verified: "सत्यापित कलेक्टर स्थानों के आधार पर",
    },

    mr: {
      title: "पिकअप व्यवहार्यता",
      back: "मागे",
      feasible: "पिकअप शक्य आहे",
      feasibleText: "हा क्लस्टर एका पिकअप ट्रिपमध्ये गोळा करता येईल.",
      collectors: "कलेक्टर",
      totalWeight: "एकूण वजन",
      distance: "अंदाजे अंतर",
      vehicle: "वाहन क्षमता",
      pickupTime: "अंदाजे पिकअप वेळ",
      route: "मार्ग योग्य आहे",
      routeText: "सर्व कलेक्टर एका ट्रिपमध्ये कव्हर करता येतील.",
      continue: "पिकअप मार्ग ऑप्टिमाइझ करा",
      verified: "सत्यापित कलेक्टर स्थानांवर आधारित",
    },
  };

  const t = content[language] || content.en;

  /*
    Demo calculations for prototype.
    Later these values can come from real map/GPS data.
  */

  const collectors = Number(cluster?.collectors) || 0;

  const weightValue =
    Number.parseFloat(String(cluster?.weight || "0").replace(/[^\d.]/g, "")) ||
    0;

  const distance = collectors === 3 ? "8.5 km" : "6.2 km";

  const vehicleCapacity = "50 kg";

  const pickupTime =
    collectors === 3 ? "35 min" : collectors === 2 ? "25 min" : "20 min";

  useEffect(() => {
    const voiceMap = {
      en: "en-IN",
      te: "te-IN",
      hi: "hi-IN",
      mr: "mr-IN",
    };

    const message = new SpeechSynthesisUtterance(
      `${t.title}. ${t.feasible}. ${t.feasibleText}`
    );

    message.lang = voiceMap[language] || "en-IN";
    message.rate = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(message);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language, cluster, t.title, t.feasible, t.feasibleText]);

  return (
    <div className="pickup-feasibility-screen">
      <div className="pickup-feasibility-card">

        {/* BACK */}
        <button
          className="pickup-feasibility-back"
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
        <div className="pickup-feasibility-header">

          <div className="pickup-feasibility-icon">
            🚚
          </div>

          <div>
            <h1>{t.title}</h1>

            <h2>
              {cluster?.name || "Collector Cluster"}
            </h2>

            <p>{t.verified}</p>
          </div>

        </div>

        {/* SUCCESS BOX */}
        <div className="pickup-feasible-box">

          <div className="pickup-feasible-check">
            ✓
          </div>

          <div>
            <h3>{t.feasible}</h3>

            <p>{t.feasibleText}</p>
          </div>

        </div>

        {/* SUMMARY */}
        <div className="pickup-feasibility-summary">

          <div className="pickup-feasibility-item">

            <span className="pickup-summary-icon">
              👥
            </span>

            <small>{t.collectors}</small>

            <strong>
              {collectors}
            </strong>

          </div>

          <div className="pickup-feasibility-item">

            <span className="pickup-summary-icon">
              ⚖️
            </span>

            <small>{t.totalWeight}</small>

            <strong>
              {weightValue} kg
            </strong>

          </div>

          <div className="pickup-feasibility-item">

            <span className="pickup-summary-icon">
              📍
            </span>

            <small>{t.distance}</small>

            <strong>
              {distance}
            </strong>

          </div>

          <div className="pickup-feasibility-item">

            <span className="pickup-summary-icon">
              🚛
            </span>

            <small>{t.vehicle}</small>

            <strong>
              {vehicleCapacity}
            </strong>

          </div>

          <div className="pickup-feasibility-item">

            <span className="pickup-summary-icon">
              🕐
            </span>

            <small>{t.pickupTime}</small>

            <strong>
              {pickupTime}
            </strong>

          </div>

        </div>

        {/* ROUTE CHECK */}
        <div className="pickup-route-check">

          <div className="pickup-route-check-icon">
            ✓
          </div>

          <div>
            <h3>{t.route}</h3>

            <p>{t.routeText}</p>
          </div>

        </div>

        {/* GUIDANCE */}
        <div className="pickup-feasibility-guidance">
          ☝️
        </div>

        {/* CONTINUE */}
        <button
          className="pickup-feasibility-button"
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

export default PickupFeasibilityScreen;