import React, { useEffect, useState } from "react";
import "./PickupConfirmedScreen.css";

function PickupConfirmedScreen({
  language,
  lotData,
  onBack,
  onNext
}) {
  const [speaking, setSpeaking] = useState(false);

  const translations = {
    en: {
      title: "Pickup Confirmed",
      subtitle: "Your e-waste pickup has been successfully scheduled",
      confirmed: "PICKUP SCHEDULED",
      recycler: "Recycler",
      verified: "Verified Recycler",
      lot: "Lot ID",
      date: "Pickup Date",
      time: "Pickup Time",
      safe: "Keep your e-waste ready. The recycler will arrive during the selected time.",
      next: "NEXT: RECYCLER ARRIVAL",
      back: "Back",
      listen: "Listen"
    },

    te: {
      title: "పికప్ నిర్ధారించబడింది",
      subtitle: "మీ ఈ-వేస్ట్ పికప్ విజయవంతంగా షెడ్యూల్ చేయబడింది",
      confirmed: "పికప్ షెడ్యూల్ చేయబడింది",
      recycler: "రీసైక్లర్",
      verified: "ధృవీకరించిన రీసైక్లర్",
      lot: "లాట్ ID",
      date: "పికప్ తేదీ",
      time: "పికప్ సమయం",
      safe: "మీ ఈ-వేస్ట్ సిద్ధంగా ఉంచండి. ఎంచుకున్న సమయంలో రీసైక్లర్ వస్తారు.",
      next: "తర్వాత: రీసైక్లర్ రాక",
      back: "వెనుకకు",
      listen: "వినండి"
    },

    hi: {
      title: "पिकअप की पुष्टि हो गई",
      subtitle: "आपका ई-वेस्ट पिकअप सफलतापूर्वक शेड्यूल हो गया है",
      confirmed: "पिकअप शेड्यूल हो गया",
      recycler: "रिसाइक्लर",
      verified: "सत्यापित रिसाइक्लर",
      lot: "लॉट ID",
      date: "पिकअप की तारीख",
      time: "पिकअप का समय",
      safe: "अपना ई-वेस्ट तैयार रखें। चुने गए समय पर रिसाइक्लर आएगा।",
      next: "अगला: रिसाइक्लर का आगमन",
      back: "वापस",
      listen: "सुनें"
    },

    mr: {
      title: "पिकअपची पुष्टी झाली",
      subtitle: "तुमचा ई-वेस्ट पिकअप यशस्वीरित्या शेड्यूल झाला आहे",
      confirmed: "पिकअप शेड्यूल झाला",
      recycler: "रिसायकलर",
      verified: "सत्यापित रिसायकलर",
      lot: "लॉट ID",
      date: "पिकअपची तारीख",
      time: "पिकअपची वेळ",
      safe: "तुमचा ई-वेस्ट तयार ठेवा. निवडलेल्या वेळेत रिसायकलर येईल.",
      next: "पुढे: रिसायकलरचे आगमन",
      back: "मागे",
      listen: "ऐका"
    }
  };

  const text = translations[language] || translations.en;

  const voiceLocales = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN"
  };

  const recyclerName =
    lotData?.recyclerName || "Recycler A";

  const lotId =
    lotData?.lotId || "LOT-2026-0001";

  const pickupDate =
    lotData?.pickupDate || "Tomorrow";

  const pickupTime =
    lotData?.pickupTime || "9:00 AM – 12:00 PM";

  useEffect(() => {
    speakScreen();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function speakScreen() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      `${text.title}. ${text.subtitle}. ${text.recycler} ${recyclerName}. ${text.date} ${pickupDate}. ${text.time} ${pickupTime}. ${text.next}`
    );

    speech.lang = voiceLocales[language] || "en-IN";
    speech.rate = 0.8;
    speech.pitch = 1;

    speech.onstart = () => {
      setSpeaking(true);
    };

    speech.onend = () => {
      setSpeaking(false);
    };

    speech.onerror = () => {
      setSpeaking(false);
    };

    setSpeaking(true);
    window.speechSynthesis.speak(speech);
  }

  function handleNext() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      text.next
    );

    speech.lang = voiceLocales[language] || "en-IN";
    speech.rate = 0.8;

    speech.onend = () => {
      onNext();
    };

    speech.onerror = () => {
      onNext();
    };

    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="pickup-confirmed-screen">

      {/* ================= HEADER ================= */}

      <header className="pickup-confirmed-header">

        {/* BACK BUTTON */}
        <button
          className="pickup-confirmed-back"
          onClick={() => {
            window.speechSynthesis.cancel();
            onBack();
          }}
        >
          ← {text.back}
        </button>

        {/* LISTEN BUTTON */}
        <div className="pickup-confirmed-speaker-area">

          <div className="pickup-confirmed-finger-effect">

            <span className="pickup-confirmed-ring ring-one"></span>
            <span className="pickup-confirmed-ring ring-two"></span>
            <span className="pickup-confirmed-ring ring-three"></span>

            <span className="pickup-confirmed-finger">
              ☝️
            </span>

          </div>

          <button
            className={`pickup-confirmed-speaker ${
              speaking ? "speaking" : ""
            }`}
            onClick={speakScreen}
          >
            🔊 {text.listen}
          </button>

        </div>

      </header>

      {/* ================= MAIN CONTENT ================= */}

      <div className="pickup-confirmed-content">

        <div className="pickup-success-icon">
          ✓
        </div>

        <h1>{text.title}</h1>

        <p className="pickup-confirmed-subtitle">
          {text.subtitle}
        </p>

        {/* CONFIRMED BADGE */}

        <div className="pickup-confirmed-badge">
          ✓ {text.confirmed}
        </div>

        {/* CONFIRMATION CARD */}

        <div className="pickup-confirmed-card">

          <div className="pickup-confirmed-row">

            <div className="pickup-confirmed-icon">
              ♻
            </div>

            <div>
              <span>{text.recycler}</span>

              <strong>{recyclerName}</strong>

              <small>
                ✓ {text.verified}
              </small>
            </div>

          </div>

          <div className="pickup-confirmed-divider"></div>

          <div className="pickup-confirmed-info-grid">

            <div className="pickup-confirmed-info">

              <span>📦</span>

              <div>
                <small>{text.lot}</small>
                <strong>{lotId}</strong>
              </div>

            </div>

            <div className="pickup-confirmed-info">

              <span>📅</span>

              <div>
                <small>{text.date}</small>
                <strong>{pickupDate}</strong>
              </div>

            </div>

            <div className="pickup-confirmed-info">

              <span>🕐</span>

              <div>
                <small>{text.time}</small>
                <strong>{pickupTime}</strong>
              </div>

            </div>

          </div>

        </div>

        {/* SAFETY MESSAGE */}

        <div className="pickup-confirmed-safe">
          🛡️ {text.safe}
        </div>

        {/* NEXT BUTTON */}

        <div className="pickup-confirmed-next-area">

          <div className="pickup-confirmed-next-finger">
            ☝️
          </div>

          <button
            className="pickup-confirmed-next-button"
            onClick={handleNext}
          >
            {text.next}
            <span>→</span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default PickupConfirmedScreen;