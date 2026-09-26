import React, { useEffect } from "react";
import "./FindRecyclerScreen.css";

function FindRecyclerScreen({ language, onBack }) {
  const text = {
    en: {
      title: "Find Recycler",
      subtitle: "Find verified recyclers near you",
      back: "BACK",
      nearby: "Nearby Verified Recyclers",
      verified: "Verified Recycler",
      distance: "Distance",
      pickup: "Pickup Available",
      materials: "Materials Accepted",
      view: "VIEW",
      guidance: "Tap a recycler to hear the details",
      demo: "Demo recycler information for SIH prototype"
    },

    te: {
      title: "రీసైక్లర్‌ను కనుగొనండి",
      subtitle: "మీకు దగ్గరలో ఉన్న ధృవీకరించిన రీసైక్లర్లను కనుగొనండి",
      back: "వెనుకకు",
      nearby: "దగ్గరలో ఉన్న ధృవీకరించిన రీసైక్లర్లు",
      verified: "ధృవీకరించిన రీసైక్లర్",
      distance: "దూరం",
      pickup: "పికప్ అందుబాటులో ఉంది",
      materials: "అంగీకరించే పదార్థాలు",
      view: "చూడండి",
      guidance: "వివరాలు వినడానికి రీసైక్లర్‌ను నొక్కండి",
      demo: "SIH ప్రోటోటైప్ కోసం డెమో రీసైక్లర్ సమాచారం"
    },

    hi: {
      title: "रीसायक्लर खोजें",
      subtitle: "अपने पास सत्यापित रीसायक्लर खोजें",
      back: "वापस",
      nearby: "पास के सत्यापित रीसायक्लर",
      verified: "सत्यापित रीसायक्लर",
      distance: "दूरी",
      pickup: "पिकअप उपलब्ध",
      materials: "स्वीकार की जाने वाली सामग्री",
      view: "देखें",
      guidance: "विवरण सुनने के लिए रीसायक्लर पर टैप करें",
      demo: "SIH प्रोटोटाइप के लिए डेमो रीसायक्लर जानकारी"
    },

    mr: {
      title: "रीसायक्लर शोधा",
      subtitle: "तुमच्या जवळील सत्यापित रीसायक्लर शोधा",
      back: "मागे",
      nearby: "जवळील सत्यापित रीसायक्लर",
      verified: "सत्यापित रीसायक्लर",
      distance: "अंतर",
      pickup: "पिकअप उपलब्ध",
      materials: "स्वीकारले जाणारे साहित्य",
      view: "पहा",
      guidance: "माहिती ऐकण्यासाठी रीसायक्लरवर टॅप करा",
      demo: "SIH प्रोटोटाइपसाठी डेमो रीसायक्लर माहिती"
    }
  };

  const currentText = text[language] || text.en;

  const recyclers = [
    {
      id: "REC001",
      name: "Recycler A",
      distance: "8 km",
      materials: "Battery, Mobile Phone, Laptop",
      pickup: true
    },
    {
      id: "REC002",
      name: "Recycler B",
      distance: "12 km",
      materials: "Mobile Phone, Computer Parts, TV",
      pickup: true
    },
    {
      id: "REC003",
      name: "Recycler C",
      distance: "18 km",
      materials: "Battery, Computer Parts, Other E-Waste",
      pickup: true
    }
  ];

  const voiceLanguages = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN"
  };

  useEffect(() => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      `${currentText.title}. ${currentText.subtitle}`
    );

    speech.lang = voiceLanguages[language] || "en-IN";
    speech.rate = 0.8;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language]);

  function speakRecycler(recycler) {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      `${recycler.name}. ${currentText.verified}. ${currentText.distance}: ${recycler.distance}. ${currentText.materials}: ${recycler.materials}. ${currentText.pickup}.`
    );

    speech.lang = voiceLanguages[language] || "en-IN";
    speech.rate = 0.8;

    window.speechSynthesis.speak(speech);
  }

  function handleBack() {
    window.speechSynthesis.cancel();
    onBack();
  }

  return (
    <div className="find-recycler-screen">

      <div className="find-recycler-header">

        <button
          className="find-recycler-back"
          onClick={handleBack}
        >
          ← {currentText.back}
        </button>

        <button
          className="find-recycler-speaker"
          onClick={() => {
            window.speechSynthesis.cancel();

            const speech = new SpeechSynthesisUtterance(
              `${currentText.title}. ${currentText.guidance}`
            );

            speech.lang = voiceLanguages[language] || "en-IN";
            speech.rate = 0.8;

            window.speechSynthesis.speak(speech);
          }}
        >
          🔊
        </button>

      </div>

      <div className="find-recycler-content">

        <div className="find-recycler-title">

          <div className="find-recycler-icon">
            🔎
          </div>

          <h1>{currentText.title}</h1>

          <p>{currentText.subtitle}</p>

        </div>

        <div className="find-recycler-guidance">

          <div className="find-recycler-finger">
            ☝️
          </div>

          <span>{currentText.guidance}</span>

        </div>

        <h2>{currentText.nearby}</h2>

        <div className="recycler-list">

          {recyclers.map((recycler) => (
            <button
              key={recycler.id}
              className="recycler-card"
              onClick={() => speakRecycler(recycler)}
            >

              <div className="recycler-card-top">

                <div className="recycler-avatar">
                  ♻️
                </div>

                <div className="recycler-name-area">

                  <h3>{recycler.name}</h3>

                  <span className="verified-badge">
                    ✓ {currentText.verified}
                  </span>

                </div>

              </div>

              <div className="recycler-info">

                <div className="recycler-info-item">
                  <span>📍</span>
                  <div>
                    <small>{currentText.distance}</small>
                    <strong>{recycler.distance}</strong>
                  </div>
                </div>

                <div className="recycler-info-item">
                  <span>🚚</span>
                  <div>
                    <small>{currentText.pickup}</small>
                    <strong>✓</strong>
                  </div>
                </div>

              </div>

              <div className="recycler-materials">

                <small>{currentText.materials}</small>

                <p>{recycler.materials}</p>

              </div>

              <div className="recycler-view">

                <span>{currentText.view}</span>

                <span>→</span>

              </div>

              <div className="recycler-card-speaker">
                🔊
              </div>

            </button>
          ))}

        </div>

        <div className="find-recycler-demo">
          ⚠️ {currentText.demo}
        </div>

      </div>

    </div>
  );
}

export default FindRecyclerScreen;