import React, { useEffect, useState } from "react";
import "./RecyclerMatchesScreen.css";

function RecyclerMatchesScreen({
  language,
  lotData,
  onBack,
  onViewBestMatch
}) {
  const [speaking, setSpeaking] = useState(false);

  const translations = {
    en: {
      title: "Verified Buyers Found",
      subtitle: "We found trusted recyclers for your e-waste",
      best: "BEST MATCH",
      verified: "Verified Recycler",
      price: "Offer",
      distance: "Distance",
      pickup: "Pickup available",
      viewBest: "VIEW BEST MATCH",
      back: "Back",
      listen: "Listen",
      safe: "Your details are shared safely",
      transparent: "Offers are shown clearly before you accept",
      demo: "Demo offers"
    },

    te: {
      title: "ధృవీకరించబడిన కొనుగోలుదారులు దొరికారు",
      subtitle: "మీ ఈ-వేస్ట్ కోసం నమ్మకమైన రీసైక్లర్లను కనుగొన్నాము",
      best: "ఉత్తమ ఎంపిక",
      verified: "ధృవీకరించిన రీసైక్లర్",
      price: "ఆఫర్",
      distance: "దూరం",
      pickup: "పికప్ అందుబాటులో ఉంది",
      viewBest: "ఉత్తమ ఎంపికను చూడండి",
      back: "వెనుకకు",
      listen: "వినండి",
      safe: "మీ వివరాలు సురక్షితంగా భాగస్వామ్యం చేయబడతాయి",
      transparent: "అంగీకరించే ముందు ఆఫర్లు స్పష్టంగా చూపబడతాయి",
      demo: "డెమో ఆఫర్లు"
    },

    hi: {
      title: "सत्यापित खरीदार मिले",
      subtitle: "आपके ई-वेस्ट के लिए भरोसेमंद रिसाइक्लर मिले",
      best: "सबसे अच्छा मैच",
      verified: "सत्यापित रिसाइक्लर",
      price: "ऑफर",
      distance: "दूरी",
      pickup: "पिकअप उपलब्ध",
      viewBest: "सबसे अच्छा मैच देखें",
      back: "वापस",
      listen: "सुनें",
      safe: "आपकी जानकारी सुरक्षित रूप से साझा की जाती है",
      transparent: "स्वीकार करने से पहले ऑफर साफ़ दिखाए जाते हैं",
      demo: "डेमो ऑफर"
    },

    mr: {
      title: "सत्यापित खरेदीदार सापडले",
      subtitle: "तुमच्या ई-वेस्टसाठी विश्वासू रिसायकलर सापडले",
      best: "सर्वोत्तम जुळणी",
      verified: "सत्यापित रिसायकलर",
      price: "ऑफर",
      distance: "अंतर",
      pickup: "पिकअप उपलब्ध",
      viewBest: "सर्वोत्तम जुळणी पहा",
      back: "मागे",
      listen: "ऐका",
      safe: "तुमची माहिती सुरक्षितपणे शेअर केली जाते",
      transparent: "स्वीकारण्यापूर्वी ऑफर स्पष्टपणे दाखवल्या जातात",
      demo: "डेमो ऑफर"
    }
  };

  const text = translations[language] || translations.en;

  const offers = [
    {
      name: "Recycler A",
      price: 420,
      distance: 8,
      pickup: true,
      score: 92,
      best: true
    },
    {
      name: "Recycler B",
      price: 430,
      distance: 35,
      pickup: true,
      score: 84,
      best: false
    },
    {
      name: "Recycler C",
      price: 400,
      distance: 6,
      pickup: true,
      score: 81,
      best: false
    }
  ];

  useEffect(() => {
    speakScreen();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function speakScreen() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      `${text.title}. ${text.subtitle}. ${text.best}. ${text.viewBest}`
    );

    const voices = {
      en: "en-IN",
      te: "te-IN",
      hi: "hi-IN",
      mr: "mr-IN"
    };

    speech.lang = voices[language] || "en-IN";
    speech.rate = 0.8;
    speech.pitch = 1;

    speech.onstart = () => setSpeaking(true);
    speech.onend = () => setSpeaking(false);
    speech.onerror = () => setSpeaking(false);

    setSpeaking(true);

    window.speechSynthesis.speak(speech);
  }

  function handleBestMatch() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      text.viewBest
    );

    const voices = {
      en: "en-IN",
      te: "te-IN",
      hi: "hi-IN",
      mr: "mr-IN"
    };

    speech.lang = voices[language] || "en-IN";
    speech.rate = 0.8;

    speech.onend = () => {
      onViewBestMatch();
    };

    speech.onerror = () => {
      onViewBestMatch();
    };

    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="recycler-matches-screen">

      {/* =========================
          HEADER
      ========================= */}

      <header className="matches-header">

        {/* BACK BUTTON */}

        <button
          className="matches-back-button"
          onClick={() => {
            window.speechSynthesis.cancel();
            onBack();
          }}
        >
          ← {text.back}
        </button>


        {/* LISTEN BUTTON */}

        <div className="matches-speaker-area">

          {/* FINGER TOUCHING LISTEN BUTTON */}

          <div className="matches-finger-effect">

            <span className="matches-ring matches-ring-1"></span>
            <span className="matches-ring matches-ring-2"></span>
            <span className="matches-ring matches-ring-3"></span>

            <span className="matches-finger">
              ☝️
            </span>

          </div>


          <button
            className={`matches-speaker-button ${
              speaking ? "speaking" : ""
            }`}
            onClick={speakScreen}
          >
            🔊 {text.listen}
          </button>

        </div>

      </header>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="matches-content">

        <div className="matches-icon">
          ✓
        </div>


        <h1>
          {text.title}
        </h1>


        <p className="matches-subtitle">
          {text.subtitle}
        </p>


        {/* =========================
            LOT CARD
        ========================= */}

        <div className="matches-lot-card">

          <div>
            <span>♻</span>

            <strong>
              {lotData?.material || "E-Waste"}
            </strong>
          </div>


          <div>
            <span>⚖</span>

            <strong>
              {lotData?.weight || "0"} kg
            </strong>
          </div>


          <div>
            <span>🏷</span>

            <strong>
              {lotData?.lotId || "LOT-2026-0001"}
            </strong>
          </div>

        </div>


        {/* =========================
            OFFERS TITLE
        ========================= */}

        <div className="offers-title">

          <h2>
            {text.best}
          </h2>

          <span>
            {text.demo}
          </span>

        </div>


        {/* =========================
            RECYCLER OFFERS
        ========================= */}

        <div className="recycler-offers">

          {offers.map((offer) => (

            <div
              className={`recycler-offer-card ${
                offer.best ? "best-offer-card" : ""
              }`}
              key={offer.name}
            >

              {offer.best && (
                <div className="best-badge">
                  ✓ {text.best}
                </div>
              )}


              <div className="offer-header">

                <div className="recycler-avatar">
                  ♻
                </div>


                <div className="recycler-name">

                  <h3>
                    {offer.name}
                  </h3>

                  <p>
                    ✓ {text.verified}
                  </p>

                </div>

              </div>


              <div className="offer-details">

                <div className="offer-detail">

                  <span>₹</span>

                  <div>

                    <small>
                      {text.price}
                    </small>

                    <strong>
                      ₹{offer.price}/kg
                    </strong>

                  </div>

                </div>


                <div className="offer-detail">

                  <span>📍</span>

                  <div>

                    <small>
                      {text.distance}
                    </small>

                    <strong>
                      {offer.distance} km
                    </strong>

                  </div>

                </div>

              </div>


              <div className="pickup-status">
                ✓ {text.pickup}
              </div>

            </div>

          ))}

        </div>


        {/* =========================
            TRUST INFORMATION
        ========================= */}

        <div className="matches-trust">

          <div>
            🛡️

            <span>
              {text.safe}
            </span>
          </div>


          <div>
            💰

            <span>
              {text.transparent}
            </span>
          </div>

        </div>


        {/* =========================
            VIEW BEST MATCH
        ========================= */}

        <div className="matches-action-area">

          {/* FINGER TOUCHING BUTTON */}

          <div className="matches-action-finger">
            ☝️
          </div>


          <button
            className="view-best-match-button"
            onClick={handleBestMatch}
          >
            {text.viewBest}

            <span>
              →
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}

export default RecyclerMatchesScreen;