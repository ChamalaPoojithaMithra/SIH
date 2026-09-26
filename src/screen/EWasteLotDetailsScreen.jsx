import React, { useEffect } from "react";
import "./EWasteLotDetailsScreen.css";

function EWasteLotDetailsScreen({
  language,
  lot,
  onBack,
  onMakeOffer,
}) {
  const content = {
    en: {
      title: "E-Waste Lot Details",
      verified: "Verified Collector",
      material: "Material",
      weight: "Weight",
      location: "Location",
      value: "Expected Value",
      posted: "Posted Recently",
      makeOffer: "Make an Offer",
      back: "Back",
      safe: "Verified transaction through Kabadiwala Connect",
    },

    te: {
      title: "ఈ-వేస్ట్ లాట్ వివరాలు",
      verified: "ధృవీకరించబడిన కలెక్టర్",
      material: "మెటీరియల్",
      weight: "బరువు",
      location: "ప్రదేశం",
      value: "అంచనా విలువ",
      posted: "ఇటీవల పోస్ట్ చేయబడింది",
      makeOffer: "ఆఫర్ ఇవ్వండి",
      back: "వెనుకకు",
      safe: "కబాడీవాలా కనెక్ట్ ద్వారా ధృవీకరించబడిన లావాదేవీ",
    },

    hi: {
      title: "ई-वेस्ट लॉट विवरण",
      verified: "सत्यापित कलेक्टर",
      material: "सामग्री",
      weight: "वजन",
      location: "स्थान",
      value: "अपेक्षित मूल्य",
      posted: "हाल ही में पोस्ट किया गया",
      makeOffer: "ऑफर दें",
      back: "वापस",
      safe: "कबाड़ीवाला कनेक्ट के माध्यम से सत्यापित लेनदेन",
    },

    mr: {
      title: "ई-वेस्ट लॉट तपशील",
      verified: "सत्यापित कलेक्टर",
      material: "साहित्य",
      weight: "वजन",
      location: "ठिकाण",
      value: "अपेक्षित मूल्य",
      posted: "अलीकडे पोस्ट केले",
      makeOffer: "ऑफर द्या",
      back: "मागे",
      safe: "कबाडिवाला कनेक्टद्वारे सत्यापित व्यवहार",
    },
  };

  const t = content[language] || content.en;

  useEffect(() => {
    if (!lot) return;

    const message = new SpeechSynthesisUtterance(
      `${t.title}. ${lot.material}. ${lot.weight} kilograms. ${lot.location}. ${lot.price}.`
    );

    const voiceMap = {
      en: "en-IN",
      te: "te-IN",
      hi: "hi-IN",
      mr: "mr-IN",
    };

    message.lang = voiceMap[language] || "en-IN";
    message.rate = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(message);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language, lot]);

  if (!lot) {
    return (
      <div className="ewaste-lot-details-screen">
        <div className="ewaste-lot-details-card">
          <h1>Lot not found</h1>

          <button
            className="lot-details-back"
            onClick={onBack}
          >
            ← {t.back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ewaste-lot-details-screen">

      <div className="ewaste-lot-details-card">

        <button
          className="lot-details-back"
          onClick={() => {
            window.speechSynthesis.cancel();
            onBack();
          }}
        >
          ← {t.back}
        </button>

        <div className="lot-details-header">

          <div className="lot-details-main-icon">
            {lot.icon}
          </div>

          <div>
            <h1>{t.title}</h1>

            <h2>{lot.material}</h2>

            <div className="verified-collector">
              ✓ {t.verified}
            </div>
          </div>

        </div>

        <div className="lot-details-information">

          <div className="lot-detail-item">
            <span className="detail-icon">📦</span>

            <div>
              <small>{t.material}</small>
              <strong>{lot.material}</strong>
            </div>
          </div>

          <div className="lot-detail-item">
            <span className="detail-icon">⚖️</span>

            <div>
              <small>{t.weight}</small>
              <strong>{lot.weight} kg</strong>
            </div>
          </div>

          <div className="lot-detail-item">
            <span className="detail-icon">📍</span>

            <div>
              <small>{t.location}</small>
              <strong>{lot.location}</strong>
            </div>
          </div>

          <div className="lot-detail-item">
            <span className="detail-icon">💰</span>

            <div>
              <small>{t.value}</small>
              <strong className="expected-value">
                {lot.price}
              </strong>
            </div>
          </div>

          <div className="lot-detail-item">
            <span className="detail-icon">🕒</span>

            <div>
              <small>{t.posted}</small>
              <strong>Today</strong>
            </div>
          </div>

        </div>

        <div className="lot-details-safe">
          🛡️ {t.safe}
        </div>

        <button
          className="make-offer-button"
          onClick={() => {
            window.speechSynthesis.cancel();

            const message = new SpeechSynthesisUtterance(
              t.makeOffer
            );

            const voiceMap = {
              en: "en-IN",
              te: "te-IN",
              hi: "hi-IN",
              mr: "mr-IN",
            };

            message.lang = voiceMap[language] || "en-IN";
            message.rate = 0.9;

            window.speechSynthesis.speak(message);

            if (onMakeOffer) {
              onMakeOffer(lot);
            }
          }}
        >
          💰 {t.makeOffer}

          <span className="offer-finger">
            ☝️
          </span>
        </button>

      </div>

    </div>
  );
}

export default EWasteLotDetailsScreen;