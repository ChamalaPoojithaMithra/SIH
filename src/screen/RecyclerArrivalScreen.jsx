import React, { useEffect, useState } from "react";
import "./RecyclerArrivalScreen.css";

function RecyclerArrivalScreen({
  language,
  lotData,
  onBack,
  onVerifyRecycler
}) {
  const [speaking, setSpeaking] = useState(false);

  const translations = {
    en: {
      title: "Recycler Has Arrived",
      subtitle:
        "Check the recycler details before handing over your e-waste",
      recycler: "Recycler",
      verified: "Verified Recycler",
      recyclerId: "Recycler ID",
      agreedPrice: "Agreed Price",
      distance: "Distance",
      lot: "Lot ID",
      safetyTitle: "Check Before Handover",
      safetyText:
        "Make sure the recycler name and ID match the details shown here.",
      verify: "VERIFY RECYCLER",
      back: "Back",
      listen: "Listen"
    },

    te: {
      title: "రీసైక్లర్ వచ్చారు",
      subtitle:
        "మీ ఈ-వేస్ట్ ఇవ్వడానికి ముందు రీసైక్లర్ వివరాలను తనిఖీ చేయండి",
      recycler: "రీసైక్లర్",
      verified: "ధృవీకరించిన రీసైక్లర్",
      recyclerId: "రీసైక్లర్ ID",
      agreedPrice: "అంగీకరించిన ధర",
      distance: "దూరం",
      lot: "లాట్ ID",
      safetyTitle: "ఇవ్వడానికి ముందు తనిఖీ చేయండి",
      safetyText:
        "ఇక్కడ చూపించిన రీసైక్లర్ పేరు మరియు ID సరిపోతున్నాయో చూడండి.",
      verify: "రీసైక్లర్‌ను తనిఖీ చేయండి",
      back: "వెనుకకు",
      listen: "వినండి"
    },

    hi: {
      title: "रिसाइक्लर आ गया है",
      subtitle:
        "ई-वेस्ट देने से पहले रिसाइक्लर की जानकारी जांचें",
      recycler: "रिसाइक्लर",
      verified: "सत्यापित रिसाइक्लर",
      recyclerId: "रिसाइक्लर ID",
      agreedPrice: "सहमत कीमत",
      distance: "दूरी",
      lot: "लॉट ID",
      safetyTitle: "हैंडओवर से पहले जांचें",
      safetyText:
        "सुनिश्चित करें कि रिसाइक्लर का नाम और ID यहां दिखाई गई जानकारी से मेल खाते हैं।",
      verify: "रिसाइक्लर सत्यापित करें",
      back: "वापस",
      listen: "सुनें"
    },

    mr: {
      title: "रिसायकलर आला आहे",
      subtitle:
        "ई-वेस्ट देण्यापूर्वी रिसायकलरची माहिती तपासा",
      recycler: "रिसायकलर",
      verified: "सत्यापित रिसायकलर",
      recyclerId: "रिसायकलर ID",
      agreedPrice: "मान्य किंमत",
      distance: "अंतर",
      lot: "लॉट ID",
      safetyTitle: "हँडओव्हरपूर्वी तपासा",
      safetyText:
        "रिसायकलरचे नाव आणि ID येथे दाखवलेल्या माहितीसोबत जुळत असल्याची खात्री करा.",
      verify: "रिसायकलर सत्यापित करा",
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

  const recyclerName = lotData?.recyclerName || "Recycler A";
  const recyclerId = lotData?.recyclerId || "REC001";
  const pricePerKg = lotData?.pricePerKg || 420;
  const distance = lotData?.distance || 8;
  const lotId = lotData?.lotId || "LOT-2026-0001";

  useEffect(() => {
    speakScreen();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function speakScreen() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      `${text.title}. ${text.subtitle}. ${text.recycler} ${recyclerName}. ${text.recyclerId} ${recyclerId}. ${text.agreedPrice} ${pricePerKg} rupees per kilogram. ${text.verify}`
    );

    speech.lang = voiceLocales[language] || "en-IN";
    speech.rate = 0.8;
    speech.pitch = 1;

    speech.onstart = () => setSpeaking(true);
    speech.onend = () => setSpeaking(false);
    speech.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(speech);
  }

  function handleVerify() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text.verify);

    speech.lang = voiceLocales[language] || "en-IN";
    speech.rate = 0.8;

    speech.onend = () => {
      onVerifyRecycler();
    };

    speech.onerror = () => {
      onVerifyRecycler();
    };

    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="recycler-arrival-screen">

      {/* TOP HEADER */}
      <header className="recycler-arrival-header">

        {/* BACK BUTTON */}
        <button
          className="recycler-arrival-back"
          onClick={() => {
            window.speechSynthesis.cancel();
            onBack();
          }}
        >
          ← {text.back}
        </button>

        {/* LISTEN BUTTON */}
        <div className="recycler-arrival-speaker-area">

          <div className="arrival-finger-effect">

            <span className="arrival-ring ring-one"></span>
            <span className="arrival-ring ring-two"></span>
            <span className="arrival-ring ring-three"></span>

            <span className="arrival-finger">
              ☝️
            </span>

          </div>

          <button
            className={`recycler-arrival-speaker ${
              speaking ? "speaking" : ""
            }`}
            onClick={speakScreen}
          >
            🔊 {text.listen}
          </button>

        </div>

      </header>

      {/* MAIN CONTENT */}
      <div className="recycler-arrival-content">

        <div className="recycler-arrival-icon">
          🚚
        </div>

        <h1>{text.title}</h1>

        <p className="recycler-arrival-subtitle">
          {text.subtitle}
        </p>

        {/* RECYCLER CARD */}
        <div className="recycler-arrival-card">

          <div className="arrival-recycler-header">

            <div className="arrival-recycler-avatar">
              ♻
            </div>

            <div>
              <h2>{recyclerName}</h2>
              <p>✓ {text.verified}</p>
            </div>

          </div>

          <div className="arrival-divider"></div>

          <div className="arrival-details">

            <div className="arrival-detail-box">
              <span>{text.recyclerId}</span>
              <strong>{recyclerId}</strong>
            </div>

            <div className="arrival-detail-box">
              <span>{text.agreedPrice}</span>
              <strong>₹{pricePerKg}/kg</strong>
            </div>

            <div className="arrival-detail-box">
              <span>{text.distance}</span>
              <strong>{distance} km</strong>
            </div>

            <div className="arrival-detail-box">
              <span>{text.lot}</span>
              <strong>{lotId}</strong>
            </div>

          </div>

        </div>

        {/* SAFETY BOX */}
        <div className="arrival-safety-box">

          <div className="arrival-safety-icon">
            🛡️
          </div>

          <div>
            <h3>{text.safetyTitle}</h3>
            <p>{text.safetyText}</p>
          </div>

        </div>

        {/* VERIFY BUTTON */}
        <div className="verify-recycler-area">

          <div className="verify-recycler-finger">
            ☝️
          </div>

          <button
            className="verify-recycler-button"
            onClick={handleVerify}
          >
            {text.verify}
            <span>→</span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default RecyclerArrivalScreen;