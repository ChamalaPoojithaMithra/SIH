import React, { useState } from "react";
import "./CollectorProfile.css";

function CollectorProfile({
  language,
  phone,
  onBack
}) {
  const [speaking, setSpeaking] = useState(false);

  const translations = {
    en: {
      title: "Collector Profile",
      id: "Collector ID",
      mobile: "Mobile Number",
      verification: "Verification",
      verified: "Verified",
      material: "Total Material Sold",
      earnings: "Total Earnings",
      transactions: "Transactions",
      completed: "Completed",
      back: "← Back"
    },

    te: {
      title: "కలెక్టర్ ప్రొఫైల్",
      id: "కలెక్టర్ ID",
      mobile: "మొబైల్ నంబర్",
      verification: "ధృవీకరణ",
      verified: "ధృవీకరించబడింది",
      material: "మొత్తం విక్రయించిన పదార్థం",
      earnings: "మొత్తం ఆదాయం",
      transactions: "లావాదేవీలు",
      completed: "పూర్తయ్యాయి",
      back: "← వెనుకకు"
    },

    hi: {
      title: "कलेक्टर प्रोफ़ाइल",
      id: "कलेक्टर ID",
      mobile: "मोबाइल नंबर",
      verification: "सत्यापन",
      verified: "सत्यापित",
      material: "कुल बेची गई सामग्री",
      earnings: "कुल कमाई",
      transactions: "लेन-देन",
      completed: "पूरे हुए",
      back: "← वापस"
    },

    mr: {
      title: "संकलक प्रोफाइल",
      id: "संकलक ID",
      mobile: "मोबाईल नंबर",
      verification: "पडताळणी",
      verified: "पडताळलेले",
      material: "एकूण विकलेले साहित्य",
      earnings: "एकूण कमाई",
      transactions: "व्यवहार",
      completed: "पूर्ण झाले",
      back: "← मागे"
    }
  };

  const text = translations[language] || translations.en;

  const voiceLanguages = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN"
  };

  function speakScreen() {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeaking(true);

    const speech = new SpeechSynthesisUtterance(
      `${text.title}. 
      ${text.id} COL001.
      ${text.mobile} ${phone}.
      ${text.verification} ${text.verified}.
      ${text.material} 186 kilograms.
      ${text.earnings} 12450 rupees.
      ${text.transactions} 8 ${text.completed}.`
    );

    speech.lang = voiceLanguages[language] || "en-IN";
    speech.rate = 0.75;
    speech.pitch = 1;

    speech.onend = () => setSpeaking(false);
    speech.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="collector-profile-screen">

      <div className="collector-profile-speaker-wrapper">

        <button
          className={`collector-profile-speaker-button ${
            speaking ? "speaking" : ""
          }`}
          onClick={speakScreen}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/727/727269.png"
            alt="Speaker"
          />
        </button>

      </div>

      <button
        className="back-button"
        onClick={() => {
          window.speechSynthesis.cancel();
          onBack();
        }}
      >
        {text.back}
      </button>

      <div className="collector-profile-container">

        <div className="collector-profile-icon">
          👤
        </div>

        <h1>{text.title}</h1>

        <div className="collector-profile-card">

          <div className="profile-row">
            <span>{text.id}</span>
            <strong>COL001</strong>
          </div>

          <div className="profile-row">
            <span>{text.mobile}</span>
            <strong>+91 {phone}</strong>
          </div>

          <div className="profile-row">
            <span>{text.verification}</span>
            <strong className="verified">
              ✓ {text.verified}
            </strong>
          </div>

        </div>

        <div className="collector-profile-stats">

          <div className="profile-stat-card">
            <span className="profile-stat-icon">📦</span>
            <h2>186 kg</h2>
            <p>{text.material}</p>
          </div>

          <div className="profile-stat-card">
            <span className="profile-stat-icon">💰</span>
            <h2>₹12,450</h2>
            <p>{text.earnings}</p>
          </div>

          <div className="profile-stat-card">
            <span className="profile-stat-icon">🔄</span>
            <h2>8</h2>
            <p>
              {text.transactions} {text.completed}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default CollectorProfile;