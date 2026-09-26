import React, { useEffect } from "react";
import "./NearbyRecyclersScreen.css";

function NearbyRecyclersScreen({ language, onBack }) {
  const text = {
    en: {
      title: "Nearby Recyclers",
      subtitle: "Find verified recyclers near you",
      back: "Back",
      speak: "Listen",
      verified: "VERIFIED",
      pickup: "Pickup Available",
      km: "km away",
      materials: "Accepts",
      guide: "Tap a recycler to hear the details.",
      safe: "Nearby recyclers shown here are verified.",
      demo: "Demo location and recycler data for SIH 2026",
      recyclerA: "Recycler A",
      recyclerB: "Recycler B",
      recyclerC: "Recycler C",
      battery: "Battery",
      mobile: "Mobile Phone",
      laptop: "Laptop",
      computer: "Computer Parts",
      tv: "TV / Monitor",
      other: "Other E-Waste"
    },

    te: {
      title: "సమీపంలోని రీసైక్లర్లు",
      subtitle: "మీకు సమీపంలోని ధృవీకరించిన రీసైక్లర్లను కనుగొనండి",
      back: "వెనుకకు",
      speak: "వినండి",
      verified: "ధృవీకరించబడింది",
      pickup: "పికప్ అందుబాటులో ఉంది",
      km: "కి.మీ దూరంలో",
      materials: "తీసుకునేవి",
      guide: "రీసైక్లర్ వివరాలు వినడానికి ట్యాప్ చేయండి.",
      safe: "ఇక్కడ చూపిన సమీప రీసైక్లర్లు ధృవీకరించబడినవారు.",
      demo: "SIH 2026 కోసం డెమో లొకేషన్ మరియు రీసైక్లర్ డేటా",
      recyclerA: "రీసైక్లర్ A",
      recyclerB: "రీసైక్లర్ B",
      recyclerC: "రీసైక్లర్ C",
      battery: "బ్యాటరీ",
      mobile: "మొబైల్ ఫోన్",
      laptop: "ల్యాప్‌టాప్",
      computer: "కంప్యూటర్ భాగాలు",
      tv: "టీవీ / మానిటర్",
      other: "ఇతర ఈ-వేస్ట్"
    },

    hi: {
      title: "नज़दीकी रीसाइक्लर",
      subtitle: "अपने पास सत्यापित रीसाइक्लर खोजें",
      back: "वापस",
      speak: "सुनें",
      verified: "सत्यापित",
      pickup: "पिकअप उपलब्ध",
      km: "किमी दूर",
      materials: "स्वीकार करता है",
      guide: "रीसाइक्लर की जानकारी सुनने के लिए टैप करें।",
      safe: "यहाँ दिखाए गए नज़दीकी रीसाइक्लर सत्यापित हैं।",
      demo: "SIH 2026 के लिए डेमो स्थान और रीसाइक्लर डेटा",
      recyclerA: "रीसाइक्लर A",
      recyclerB: "रीसाइक्लर B",
      recyclerC: "रीसाइक्लर C",
      battery: "बैटरी",
      mobile: "मोबाइल फोन",
      laptop: "लैपटॉप",
      computer: "कंप्यूटर पार्ट्स",
      tv: "टीवी / मॉनिटर",
      other: "अन्य ई-वेस्ट"
    },

    mr: {
      title: "जवळचे रिसायकलर्स",
      subtitle: "तुमच्या जवळील सत्यापित रिसायकलर्स शोधा",
      back: "मागे",
      speak: "ऐका",
      verified: "सत्यापित",
      pickup: "पिकअप उपलब्ध",
      km: "किमी दूर",
      materials: "स्वीकारतो",
      guide: "रिसायकलरची माहिती ऐकण्यासाठी टॅप करा.",
      safe: "येथे दाखवलेले जवळचे रिसायकलर्स सत्यापित आहेत.",
      demo: "SIH 2026 साठी डेमो स्थान आणि रिसायकलर डेटा",
      recyclerA: "रिसायकलर A",
      recyclerB: "रिसायकलर B",
      recyclerC: "रिसायकलर C",
      battery: "बॅटरी",
      mobile: "मोबाईल फोन",
      laptop: "लॅपटॉप",
      computer: "कॉम्प्युटर पार्ट्स",
      tv: "टीव्ही / मॉनिटर",
      other: "इतर ई-वेस्ट"
    }
  };

  const t = text[language] || text.en;

  const recyclers = [
    {
      id: "REC001",
      name: t.recyclerA,
      distance: 2,
      materials: [t.battery, t.mobile, t.laptop]
    },
    {
      id: "REC002",
      name: t.recyclerB,
      distance: 4,
      materials: [t.mobile, t.computer, t.tv]
    },
    {
      id: "REC003",
      name: t.recyclerC,
      distance: 6,
      materials: [t.battery, t.computer, t.other]
    }
  ];

  const getVoiceLanguage = () => {
    if (language === "te") return "te-IN";
    if (language === "hi") return "hi-IN";
    if (language === "mr") return "mr-IN";
    return "en-IN";
  };

  useEffect(() => {
    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(
      `${t.title}. ${t.subtitle}. ${t.guide}`
    );

    message.lang = getVoiceLanguage();
    message.rate = 0.8;
    message.pitch = 1;

    window.speechSynthesis.speak(message);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language]);

  function speakRecycler(recycler) {
    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(
      `${recycler.name}. ${t.verified}. ${recycler.distance} ${t.km}. ${t.pickup}. ${t.materials}: ${recycler.materials.join(", ")}.`
    );

    message.lang = getVoiceLanguage();
    message.rate = 0.8;
    message.pitch = 1;

    window.speechSynthesis.speak(message);
  }

  function speakPage() {
    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(
      `${t.title}. ${t.subtitle}. ${t.safe}`
    );

    message.lang = getVoiceLanguage();
    message.rate = 0.8;
    message.pitch = 1;

    window.speechSynthesis.speak(message);
  }

  return (
    <div className="nearby-recyclers-screen">

      <header className="nearby-header">

        <button
          className="nearby-back-button"
          onClick={() => {
            window.speechSynthesis.cancel();
            onBack();
          }}
        >
          ← {t.back}
        </button>

        <button
          className="nearby-speaker-button"
          onClick={speakPage}
        >
          🔊 {t.speak}
        </button>

      </header>

      <main className="nearby-content">

        <div className="nearby-title-area">

          <div className="nearby-title-icon">
            📍
          </div>

          <h1>{t.title}</h1>

          <p>{t.subtitle}</p>

        </div>

        <div className="nearby-guidance">

          <div className="nearby-finger">
            ☝️
          </div>

          <div>
            <strong>{t.guide}</strong>
            <span>{t.safe}</span>
          </div>

        </div>

        <section className="nearby-list">

          {recyclers.map((recycler) => (

            <button
              key={recycler.id}
              className="nearby-recycler-card"
              onClick={() => speakRecycler(recycler)}
            >

              <div className="nearby-card-top">

                <div className="nearby-recycler-icon">
                  ♻
                </div>

                <div className="nearby-main-info">

                  <h2>{recycler.name}</h2>

                  <div className="nearby-verified-badge">
                    ✓ {t.verified}
                  </div>

                </div>

              </div>

              <div className="nearby-details">

                <div className="nearby-detail">

                  <span>📍</span>

                  <strong>
                    {recycler.distance} {t.km}
                  </strong>

                </div>

                <div className="nearby-detail">

                  <span>🚚</span>

                  <strong>{t.pickup}</strong>

                </div>

              </div>

              <div className="nearby-materials">

                <span className="nearby-materials-title">
                  {t.materials}
                </span>

                <div className="nearby-material-tags">

                  {recycler.materials.map((material, index) => (

                    <span
                      key={index}
                      className="nearby-material-tag"
                    >
                      {material}
                    </span>

                  ))}

                </div>

              </div>

              <div className="nearby-card-finger">
                ☝️
              </div>

            </button>

          ))}

        </section>

        <div className="nearby-safe-note">
          🛡️ {t.safe}
        </div>

        <div className="nearby-demo-note">
          {t.demo}
        </div>

      </main>
    </div>
  );
}

export default NearbyRecyclersScreen;