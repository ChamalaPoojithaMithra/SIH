
import React, { useEffect } from "react";
import "./VerifiedRecyclersScreen.css";

function VerifiedRecyclersScreen({ language, onBack }) {
  const text = {
    en: {
      title: "Verified Recyclers",
      subtitle: "Trusted recyclers verified by the platform",
      back: "Back",
      speak: "Listen",
      verified: "VERIFIED",
      pickup: "Pickup Available",
      km: "km away",
      materials: "Accepts",
      guide: "Tap a recycler to hear the details.",
      safe: "Only verified recyclers are shown here.",
      demo: "Demo data for SIH 2026",
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
      title: "ధృవీకరించిన రీసైక్లర్లు",
      subtitle: "ప్లాట్‌ఫారమ్ ద్వారా ధృవీకరించబడిన రీసైక్లర్లు",
      back: "వెనుకకు",
      speak: "వినండి",
      verified: "ధృవీకరించబడింది",
      pickup: "పికప్ అందుబాటులో ఉంది",
      km: "కి.మీ దూరంలో",
      materials: "తీసుకునేవి",
      guide: "రీసైక్లర్ వివరాలు వినడానికి ట్యాప్ చేయండి.",
      safe: "ధృవీకరించిన రీసైక్లర్లు మాత్రమే ఇక్కడ చూపబడతారు.",
      demo: "SIH 2026 కోసం డెమో డేటా",
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
      title: "सत्यापित रीसाइक्लर",
      subtitle: "प्लेटफ़ॉर्म द्वारा सत्यापित भरोसेमंद रीसाइक्लर",
      back: "वापस",
      speak: "सुनें",
      verified: "सत्यापित",
      pickup: "पिकअप उपलब्ध",
      km: "किमी दूर",
      materials: "स्वीकार करता है",
      guide: "रीसाइक्लर की जानकारी सुनने के लिए टैप करें।",
      safe: "यहाँ केवल सत्यापित रीसाइक्लर दिखाए जाते हैं।",
      demo: "SIH 2026 के लिए डेमो डेटा",
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
      title: "सत्यापित रिसायकलर्स",
      subtitle: "प्लॅटफॉर्मद्वारे सत्यापित केलेले रिसायकलर्स",
      back: "मागे",
      speak: "ऐका",
      verified: "सत्यापित",
      pickup: "पिकअप उपलब्ध",
      km: "किमी दूर",
      materials: "स्वीकारतो",
      guide: "रिसायकलरची माहिती ऐकण्यासाठी टॅप करा.",
      safe: "येथे फक्त सत्यापित रिसायकलर्स दाखवले जातात.",
      demo: "SIH 2026 साठी डेमो डेटा",
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
      distance: 8,
      materials: [t.battery, t.mobile, t.laptop]
    },
    {
      id: "REC002",
      name: t.recyclerB,
      distance: 12,
      materials: [t.mobile, t.computer, t.tv]
    },
    {
      id: "REC003",
      name: t.recyclerC,
      distance: 18,
      materials: [t.battery, t.computer, t.other]
    }
  ];

  useEffect(() => {
    const message = new SpeechSynthesisUtterance(
      `${t.title}. ${t.subtitle}. ${t.guide}`
    );

    message.lang =
      language === "te"
        ? "te-IN"
        : language === "hi"
        ? "hi-IN"
        : language === "mr"
        ? "mr-IN"
        : "en-IN";

    message.rate = 0.8;
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

    message.lang =
      language === "te"
        ? "te-IN"
        : language === "hi"
        ? "hi-IN"
        : language === "mr"
        ? "mr-IN"
        : "en-IN";

    message.rate = 0.8;
    window.speechSynthesis.speak(message);
  }

  return (
    <div className="verified-recyclers-screen">

      <header className="verified-header">
        <button
          className="verified-back-button"
          onClick={() => {
            window.speechSynthesis.cancel();
            onBack();
          }}
        >
          ← {t.back}
        </button>

        <button
          className="verified-speaker-button"
          onClick={() => {
            window.speechSynthesis.cancel();

            const message = new SpeechSynthesisUtterance(
              `${t.title}. ${t.subtitle}. ${t.safe}`
            );

            message.lang =
              language === "te"
                ? "te-IN"
                : language === "hi"
                ? "hi-IN"
                : language === "mr"
                ? "mr-IN"
                : "en-IN";

            message.rate = 0.8;
            window.speechSynthesis.speak(message);
          }}
        >
          🔊 {t.speak}
        </button>
      </header>

      <main className="verified-content">

        <div className="verified-title-area">
          <div className="verified-title-icon">♻️</div>

          <h1>{t.title}</h1>

          <p>{t.subtitle}</p>
        </div>

        <div className="verified-guidance">
          <div className="verified-finger">☝️</div>

          <div>
            <strong>{t.guide}</strong>
            <span>{t.safe}</span>
          </div>
        </div>

        <section className="verified-list">

          {recyclers.map((recycler) => (
            <button
              key={recycler.id}
              className="verified-recycler-card"
              onClick={() => speakRecycler(recycler)}
            >

              <div className="recycler-top">

                <div className="recycler-icon">
                  ♻
                </div>

                <div className="recycler-main-info">

                  <h2>{recycler.name}</h2>

                  <div className="verified-badge">
                    ✓ {t.verified}
                  </div>

                </div>

              </div>

              <div className="recycler-details">

                <div className="recycler-detail">
                  <span>📍</span>
                  <strong>
                    {recycler.distance} {t.km}
                  </strong>
                </div>

                <div className="recycler-detail">
                  <span>🚚</span>
                  <strong>{t.pickup}</strong>
                </div>

              </div>

              <div className="recycler-materials">

                <span className="materials-title">
                  {t.materials}
                </span>

                <div className="material-tags">

                  {recycler.materials.map((material, index) => (
                    <span
                      key={index}
                      className="material-tag"
                    >
                      {material}
                    </span>
                  ))}

                </div>

              </div>

              <div className="recycler-card-finger">
                ☝️
              </div>

            </button>
          ))}

        </section>

        <div className="verified-safe-note">
          🛡️ {t.safe}
        </div>

        <div className="verified-demo-note">
          {t.demo}
        </div>

      </main>
    </div>
  );
}

export default VerifiedRecyclersScreen;