import React, { useEffect, useState } from "react";
import "./OfferAcceptedScreen.css";

function OfferAcceptedScreen({
  language,
  lotData,
  onBack,
  onSchedulePickup
}) {
  const [speaking, setSpeaking] = useState(false);

  const translations = {
    en: {
      title: "Offer Accepted",
      subtitle: "Your e-waste has been matched with a verified recycler",
      locked: "OFFER LOCKED",
      recycler: "Recycler",
      verified: "Verified Recycler",
      price: "Agreed Price",
      distance: "Distance",
      amount: "Estimated Amount",
      lot: "Lot ID",
      safe: "Your agreed offer is now locked",
      next: "The next step is to schedule pickup",
      schedule: "SCHEDULE PICKUP",
      back: "Back",
      listen: "Listen",
      demo: "Demo offer"
    },

    te: {
      title: "ఆఫర్ అంగీకరించబడింది",
      subtitle: "మీ ఈ-వేస్ట్ ధృవీకరించిన రీసైక్లర్‌తో సరిపోలింది",
      locked: "ఆఫర్ లాక్ చేయబడింది",
      recycler: "రీసైక్లర్",
      verified: "ధృవీకరించిన రీసైక్లర్",
      price: "అంగీకరించిన ధర",
      distance: "దూరం",
      amount: "అంచనా మొత్తం",
      lot: "లాట్ ID",
      safe: "మీ అంగీకరించిన ఆఫర్ ఇప్పుడు లాక్ చేయబడింది",
      next: "తదుపరి దశ పికప్‌ను షెడ్యూల్ చేయడం",
      schedule: "పికప్ షెడ్యూల్ చేయండి",
      back: "వెనుకకు",
      listen: "వినండి",
      demo: "డెమో ఆఫర్"
    },

    hi: {
      title: "ऑफर स्वीकार किया गया",
      subtitle: "आपका ई-वेस्ट सत्यापित रिसाइक्लर से मिल गया है",
      locked: "ऑफर लॉक है",
      recycler: "रिसाइक्लर",
      verified: "सत्यापित रिसाइक्लर",
      price: "सहमति कीमत",
      distance: "दूरी",
      amount: "अनुमानित राशि",
      lot: "लॉट ID",
      safe: "आपका स्वीकार किया गया ऑफर अब लॉक है",
      next: "अगला कदम पिकअप शेड्यूल करना है",
      schedule: "पिकअप शेड्यूल करें",
      back: "वापस",
      listen: "सुनें",
      demo: "डेमो ऑफर"
    },

    mr: {
      title: "ऑफर स्वीकारला",
      subtitle: "तुमचा ई-वेस्ट सत्यापित रिसायकलरशी जुळला आहे",
      locked: "ऑफर लॉक आहे",
      recycler: "रिसायकलर",
      verified: "सत्यापित रिसायकलर",
      price: "मान्य किंमत",
      distance: "अंतर",
      amount: "अंदाजे रक्कम",
      lot: "लॉट ID",
      safe: "तुमचा स्वीकारलेला ऑफर आता लॉक आहे",
      next: "पुढील पायरी पिकअप शेड्यूल करणे आहे",
      schedule: "पिकअप शेड्यूल करा",
      back: "मागे",
      listen: "ऐका",
      demo: "डेमो ऑफर"
    }
  };

  const text = translations[language] || translations.en;

  const pricePerKg = Number(lotData?.pricePerKg) || 420;
  const weight = Number(lotData?.weight) || 0;
  const distance = Number(lotData?.distance) || 8;

  const estimatedAmount =
    Number(lotData?.estimatedAmount) || pricePerKg * weight;

  const recyclerName =
    lotData?.recyclerName || "Recycler A";

  const lotId =
    lotData?.lotId || "LOT-2026-0001";

  useEffect(() => {
    speakScreen();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function speakScreen() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      `${text.title}. ${recyclerName}. ${text.verified}. ${text.price}: ${pricePerKg} rupees per kilogram. ${text.amount}: ${estimatedAmount} rupees. ${text.next}.`
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

  function handleSchedulePickup() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      text.schedule
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
      onSchedulePickup();
    };

    speech.onerror = () => {
      onSchedulePickup();
    };

    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="offer-accepted-screen">

      {/* =========================
          TOP HEADER
      ========================= */}

      <header className="offer-accepted-header">

        {/* BACK BUTTON */}

        <button
          className="offer-accepted-back-button"
          onClick={() => {
            window.speechSynthesis.cancel();
            onBack();
          }}
        >
          ← {text.back}
        </button>


        {/* LISTEN BUTTON */}

        <div className="offer-accepted-speaker-area">

          {/* FINGER */}

          <div className="offer-speaker-finger">

            <span className="offer-ring offer-ring-one"></span>

            <span className="offer-ring offer-ring-two"></span>

            <span className="offer-ring offer-ring-three"></span>

            <span className="offer-finger">
              ☝️
            </span>

          </div>


          <button
            className={`offer-speaker-button ${
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

      <div className="offer-accepted-content">

        <div className="offer-success-icon">
          ✓
        </div>


        <h1>
          {text.title}
        </h1>


        <p className="offer-accepted-subtitle">
          {text.subtitle}
        </p>


        {/* =========================
            ACCEPTED OFFER CARD
        ========================= */}

        <div className="accepted-card">

          <div className="locked-badge">
            🔒 {text.locked}
          </div>


          <div className="accepted-recycler-header">

            <div className="accepted-recycler-avatar">
              ♻
            </div>


            <div>

              <h2>
                {recyclerName}
              </h2>

              <p>
                ✓ {text.verified}
              </p>

            </div>

          </div>


          <div className="accepted-details">

            <div className="accepted-detail-box">

              <small>
                {text.price}
              </small>

              <strong>
                ₹{pricePerKg}/kg
              </strong>

              <span>
                {text.demo}
              </span>

            </div>


            <div className="accepted-detail-box">

              <small>
                {text.distance}
              </small>

              <strong>
                {distance} km
              </strong>

            </div>


            <div className="accepted-detail-box">

              <small>
                {text.amount}
              </small>

              <strong>
                ₹{estimatedAmount.toLocaleString("en-IN")}
              </strong>

            </div>


            <div className="accepted-detail-box">

              <small>
                {text.lot}
              </small>

              <strong>
                {lotId}
              </strong>

            </div>

          </div>

        </div>


        {/* =========================
            SAFE MESSAGE
        ========================= */}

        <div className="offer-safe-message">

          <div className="safe-icon">
            🛡️
          </div>


          <div>

            <strong>
              {text.safe}
            </strong>

            <p>
              {text.next}
            </p>

          </div>

        </div>


        {/* =========================
            SCHEDULE PICKUP
        ========================= */}

        <div className="schedule-action-area">

          <div className="schedule-finger">
            ☝️
          </div>


          <button
            className="schedule-pickup-button"
            onClick={handleSchedulePickup}
          >
            {text.schedule}

            <span>
              →
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}

export default OfferAcceptedScreen;