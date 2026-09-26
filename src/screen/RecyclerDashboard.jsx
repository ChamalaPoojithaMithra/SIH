import React, { useEffect, useState } from "react";
import "./RecyclerDashboard.css";

function RecyclerDashboard({
  language,
  onBack,
  onLogout,
  onAvailableLots,
  onFindCollectors,
  onMyOffers,
  onPickupRequests,
  onTransactions,
  onPayments,
  onHistory,
  onProfile,
  onHelp,
  onCollectorClusters
}) {
  const [speaking, setSpeaking] = useState(false);

  const translations = {
    en: {
      title: "Recycler Dashboard",
      subtitle: "Manage e-waste collection and recycling",
      verified: "Verified Recycler",
      verifiedText: "Your recycler account is verified",
      back: "Back",
      listen: "Listen",

      available: "Available E-Waste",
      collectors: "Find Collectors",
      clusters: "Collector Clusters",
      offers: "My Offers",
      pickup: "Pickup Requests",
      transactions: "Transactions",
      payments: "Payments",
      history: "History",
      profile: "Profile",
      help: "Help",

      logout: "Logout"
    },

    te: {
      title: "రీసైక్లర్ డాష్‌బోర్డ్",
      subtitle: "ఈ-వ్యర్థాల సేకరణ మరియు రీసైక్లింగ్ నిర్వహించండి",
      verified: "ధృవీకరించబడిన రీసైక్లర్",
      verifiedText: "మీ రీసైక్లర్ ఖాతా ధృవీకరించబడింది",
      back: "వెనుకకు",
      listen: "వినండి",

      available: "అందుబాటులో ఉన్న ఈ-వ్యర్థాలు",
      collectors: "కలెక్టర్లను కనుగొనండి",
      clusters: "కలెక్టర్ క్లస్టర్లు",
      offers: "నా ఆఫర్లు",
      pickup: "పికప్ అభ్యర్థనలు",
      transactions: "లావాదేవీలు",
      payments: "చెల్లింపులు",
      history: "చరిత్ర",
      profile: "ప్రొఫైల్",
      help: "సహాయం",

      logout: "లాగ్ అవుట్"
    },

    hi: {
      title: "रीसाइकलर डैशबोर्ड",
      subtitle: "ई-कचरा संग्रह और रीसाइक्लिंग प्रबंधित करें",
      verified: "सत्यापित रीसाइकलर",
      verifiedText: "आपका रीसाइकलर खाता सत्यापित है",
      back: "वापस",
      listen: "सुनें",

      available: "उपलब्ध ई-कचरा",
      collectors: "कलेक्टर खोजें",
      clusters: "कलेक्टर क्लस्टर",
      offers: "मेरे ऑफर",
      pickup: "पिकअप अनुरोध",
      transactions: "लेनदेन",
      payments: "भुगतान",
      history: "इतिहास",
      profile: "प्रोफ़ाइल",
      help: "सहायता",

      logout: "लॉग आउट"
    },

    mr: {
      title: "रिसायकलर डॅशबोर्ड",
      subtitle: "ई-कचरा संकलन आणि रिसायकलिंग व्यवस्थापित करा",
      verified: "सत्यापित रिसायकलर",
      verifiedText: "तुमचे रिसायकलर खाते सत्यापित आहे",
      back: "मागे",
      listen: "ऐका",

      available: "उपलब्ध ई-कचरा",
      collectors: "कलेक्टर शोधा",
      clusters: "कलेक्टर क्लस्टर",
      offers: "माझे ऑफर",
      pickup: "पिकअप विनंत्या",
      transactions: "व्यवहार",
      payments: "पेमेंट",
      history: "इतिहास",
      profile: "प्रोफाइल",
      help: "मदत",

      logout: "लॉग आउट"
    }
  };

  const text = translations[language] || translations.en;

  const voiceLanguages = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN"
  };

  /* =========================================
     STOP SPEAKING
  ========================================= */

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  /* =========================================
     SPEAK DASHBOARD
  ========================================= */

  const speakDashboard = () => {
    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(
      `${text.title}. ` +
      `${text.subtitle}. ` +
      `${text.verified}. ` +
      `${text.available}. ` +
      `${text.collectors}. ` +
      `${text.clusters}. ` +
      `${text.offers}. ` +
      `${text.pickup}. ` +
      `${text.transactions}. ` +
      `${text.payments}. ` +
      `${text.history}. ` +
      `${text.profile}. ` +
      `${text.help}.`
    );

    message.lang = voiceLanguages[language] || "en-IN";
    message.rate = 0.75;
    message.pitch = 1;

    setSpeaking(true);

    message.onend = () => {
      setSpeaking(false);
    };

    message.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(message);
  };

  /* =========================================
     AUTO VOICE
  ========================================= */

  useEffect(() => {
    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(
      `${text.title}. ${text.subtitle}. ${text.verified}.`
    );

    message.lang = voiceLanguages[language] || "en-IN";
    message.rate = 0.75;
    message.pitch = 1;

    setSpeaking(true);

    message.onend = () => {
      setSpeaking(false);
    };

    message.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(message);

    return () => {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    };
  }, [language]);

  /* =========================================
     BACK BUTTON
  ========================================= */

  const handleBack = () => {
    stopSpeaking();

    /*
      First use the parent's navigation function.
      This is the correct method when your app
      changes screens using React state.
    */

    if (typeof onBack === "function") {
      onBack();
      return;
    }

    /*
      Fallback for applications using browser
      history / React Router navigation.
    */

    if (window.history.length > 1) {
      window.history.back();
    }
  };

  /* =========================================
     DASHBOARD ITEMS
  ========================================= */

  const dashboardItems = [
    {
      icon: "📦",
      title: text.available,
      action: onAvailableLots
    },
    {
      icon: "🔍",
      title: text.collectors,
      action: onFindCollectors
    },
    {
      icon: "🗺️",
      title: text.clusters,
      action: onCollectorClusters
    },
    {
      icon: "💰",
      title: text.offers,
      action: onMyOffers
    },
    {
      icon: "🚚",
      title: text.pickup,
      action: onPickupRequests
    },
    {
      icon: "🤝",
      title: text.transactions,
      action: onTransactions
    },
    {
      icon: "💳",
      title: text.payments,
      action: onPayments
    },
    {
      icon: "📜",
      title: text.history,
      action: onHistory
    },
    {
      icon: "👤",
      title: text.profile,
      action: onProfile
    },
    {
      icon: "🆘",
      title: text.help,
      action: onHelp
    }
  ];

  /* =========================================
     JSX
  ========================================= */

  return (
    <div className="recycler-dashboard">

      {/* TOP NAVIGATION */}

      <div className="recycler-top-navigation">

        {/* BACK BUTTON */}

        <button
          type="button"
          className="recycler-back-button"
          onClick={handleBack}
        >
          ← {text.back}
        </button>

        {/* LISTEN BUTTON */}

        <button
          type="button"
          className={`recycler-listen-button ${
            speaking ? "speaking" : ""
          }`}
          onClick={() => {
            if (speaking) {
              stopSpeaking();
            } else {
              speakDashboard();
            }
          }}
        >
          🔊 {text.listen}
        </button>

      </div>

      {/* MAIN DASHBOARD */}

      <main className="recycler-dashboard-card">

        {/* HEADER */}

        <div className="recycler-header">

          <div className="recycler-logo">
            ♻️
          </div>

          <div>
            <h1>{text.title}</h1>

            <p>
              {text.subtitle}
            </p>
          </div>

        </div>

        {/* VERIFIED */}

        <div className="recycler-verified">

          <span>
            ✓
          </span>

          <div>

            <strong>
              {text.verified}
            </strong>

            <small>
              {text.verifiedText}
            </small>

          </div>

        </div>

        {/* DASHBOARD GRID */}

        <div className="recycler-grid">

          {dashboardItems.map((item, index) => (
            <button
              type="button"
              key={index}
              className="recycler-dashboard-button"
              onClick={() => {

                stopSpeaking();

                if (typeof item.action === "function") {
                  item.action();
                }

              }}
            >

              <span className="recycler-icon">
                {item.icon}
              </span>

              <span className="recycler-title">
                {item.title}
              </span>

            </button>
          ))}

        </div>

        {/* LOGOUT */}

        <button
          type="button"
          className="recycler-logout"
          onClick={() => {

            stopSpeaking();

            if (typeof onLogout === "function") {
              onLogout();
            }

          }}
        >
          🚪 {text.logout}
        </button>

      </main>

    </div>
  );
}

export default RecyclerDashboard;