import React, { useState } from "react";

function CollectorDashboard({
  language,
  onBack,
  onAddWaste,
  onProfile,
  onMyEWaste,
  onMyRequests,
  onTodaysRate,
  onFindRecycler,
  onTransactions,
  onVerifiedRecyclers,
  onHelpSahayak,
  onNearbyRecyclers,
  onTestOfferReceived,
}) {
  const [speaking, setSpeaking] = useState(null);

  const translations = {
    en: {
      title: "Collector Dashboard",
      welcome: "Welcome, Collector!",
      subtitle: "Manage your e-waste easily and safely",

      add: "Add E-Waste",
      price: "Today's Price",
      find: "Find Recycler",
      myWaste: "My E-Waste",
      requests: "My Requests",
      transactions: "Transactions",
      nearby: "Nearby Recyclers",
      verified: "Verified Recyclers",
      help: "Help / Sahayak",

      addDesc: "Add the e-waste you have collected.",
      priceDesc: "Check today's e-waste prices.",
      findDesc: "Find recyclers who can buy your e-waste.",
      myWasteDesc: "View your submitted e-waste.",
      requestsDesc: "View offers and requests from recyclers.",
      transactionsDesc: "View your completed transactions.",
      nearbyDesc: "Find recyclers near you.",
      verifiedDesc: "Find verified and trusted recyclers.",
      helpDesc: "Get help using the digital system.",

      back: "← Back",
    },

    te: {
      title: "కలెక్టర్ డాష్‌బోర్డ్",
      welcome: "స్వాగతం, కలెక్టర్!",
      subtitle:
        "మీ ఈ-వ్యర్థాలను సులభంగా మరియు సురక్షితంగా నిర్వహించండి",

      add: "ఈ-వ్యర్థాలను జోడించండి",
      price: "ఈరోజు ధర",
      find: "రీసైక్లర్‌ను కనుగొనండి",
      myWaste: "నా ఈ-వ్యర్థాలు",
      requests: "నా అభ్యర్థనలు",
      transactions: "లావాదేవీలు",
      nearby: "దగ్గరలోని రీసైక్లర్లు",
      verified: "ధృవీకరించబడిన రీసైక్లర్లు",
      help: "సహాయం / సహాయకుడు",

      addDesc: "మీరు సేకరించిన ఈ-వ్యర్థాలను జోడించండి.",
      priceDesc: "ఈరోజు ఈ-వ్యర్థాల ధరలను చూడండి.",
      findDesc:
        "మీ ఈ-వ్యర్థాలను కొనుగోలు చేసే రీసైక్లర్లను కనుగొనండి.",
      myWasteDesc: "మీరు సమర్పించిన ఈ-వ్యర్థాలను చూడండి.",
      requestsDesc:
        "రీసైక్లర్ల నుండి వచ్చిన ఆఫర్లు మరియు అభ్యర్థనలను చూడండి.",
      transactionsDesc:
        "మీ పూర్తయిన లావాదేవీలను చూడండి.",
      nearbyDesc:
        "మీకు దగ్గరలో ఉన్న రీసైక్లర్లను కనుగొనండి.",
      verifiedDesc:
        "ధృవీకరించబడిన మరియు నమ్మకమైన రీసైక్లర్లను కనుగొనండి.",
      helpDesc:
        "డిజిటల్ వ్యవస్థను ఉపయోగించడంలో సహాయం పొందండి.",

      back: "← వెనుకకు",
    },

    hi: {
      title: "कलेक्टर डैशबोर्ड",
      welcome: "स्वागत है, कलेक्टर!",
      subtitle:
        "अपने ई-कचरे को आसानी और सुरक्षित तरीके से प्रबंधित करें",

      add: "ई-कचरा जोड़ें",
      price: "आज की कीमत",
      find: "रिसाइकलर खोजें",
      myWaste: "मेरा ई-कचरा",
      requests: "मेरे अनुरोध",
      transactions: "लेन-देन",
      nearby: "पास के रिसाइकलर",
      verified: "सत्यापित रिसाइकलर",
      help: "मदद / सहायक",

      addDesc:
        "आपने जो ई-कचरा एकत्र किया है उसे जोड़ें।",
      priceDesc:
        "आज के ई-कचरे की कीमत देखें।",
      findDesc:
        "अपने ई-कचरे को खरीदने वाले रिसाइकलर खोजें।",
      myWasteDesc:
        "अपना जमा किया हुआ ई-कचरा देखें।",
      requestsDesc:
        "रिसाइकलरों के ऑफर और अनुरोध देखें।",
      transactionsDesc:
        "अपने पूरे हुए लेन-देन देखें।",
      nearbyDesc:
        "अपने पास के रिसाइकलर खोजें।",
      verifiedDesc:
        "सत्यापित और भरोसेमंद रिसाइकलर खोजें।",
      helpDesc:
        "डिजिटल सिस्टम का उपयोग करने में मदद पाएं।",

      back: "← वापस",
    },

    mr: {
      title: "संकलक डॅशबोर्ड",
      welcome: "स्वागत आहे, संकलक!",
      subtitle:
        "तुमचा ई-कचरा सहज आणि सुरक्षितपणे व्यवस्थापित करा",

      add: "ई-कचरा जोडा",
      price: "आजची किंमत",
      find: "रिसायकलर शोधा",
      myWaste: "माझा ई-कचरा",
      requests: "माझ्या विनंत्या",
      transactions: "व्यवहार",
      nearby: "जवळचे रिसायकलर",
      verified: "सत्यापित रिसायकलर",
      help: "मदत / सहायक",

      addDesc:
        "तुम्ही गोळा केलेला ई-कचरा जोडा.",
      priceDesc:
        "आजच्या ई-कचऱ्याच्या किंमती पहा.",
      findDesc:
        "तुमचा ई-कचरा खरेदी करणारे रिसायकलर शोधा.",
      myWasteDesc:
        "तुम्ही जमा केलेला ई-कचरा पहा.",
      requestsDesc:
        "रिसायकलरकडून आलेल्या ऑफर आणि विनंत्या पहा.",
      transactionsDesc:
        "तुमचे पूर्ण झालेले व्यवहार पहा.",
      nearbyDesc:
        "तुमच्या जवळील रिसायकलर शोधा.",
      verifiedDesc:
        "सत्यापित आणि विश्वासार्ह रिसायकलर शोधा.",
      helpDesc:
        "डिजिटल प्रणाली वापरण्यासाठी मदत मिळवा.",

      back: "← मागे",
    },
  };

  const text =
    translations[language] || translations.en;

  const cards = [
    {
      id: "add",
      icon: "♻️",
      title: text.add,
      description: text.addDesc,
    },

    {
      id: "price",
      icon: "💰",
      title: text.price,
      description: text.priceDesc,
    },

    {
      id: "find",
      icon: "🔍",
      title: text.find,
      description: text.findDesc,
    },

    {
      id: "myWaste",
      icon: "📦",
      title: text.myWaste,
      description: text.myWasteDesc,
    },

    {
      id: "requests",
      icon: "📋",
      title: text.requests,
      description: text.requestsDesc,
    },

    {
      id: "transactions",
      icon: "💳",
      title: text.transactions,
      description: text.transactionsDesc,
    },

    {
      id: "nearby",
      icon: "📍",
      title: text.nearby,
      description: text.nearbyDesc,
    },

    {
      id: "verified",
      icon: "🛡️",
      title: text.verified,
      description: text.verifiedDesc,
    },

    {
      id: "help",
      icon: "🆘",
      title: text.help,
      description: text.helpDesc,
    },
  ];

  const voiceLanguages = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN",
  };

  function speakCard(card) {
    window.speechSynthesis.cancel();

    setSpeaking(card.id);

    const speech =
      new SpeechSynthesisUtterance(
        `${card.title}. ${card.description}`
      );

    speech.lang =
      voiceLanguages[language] || "en-IN";

    speech.rate = 0.75;
    speech.pitch = 1;

    speech.onend = () => {
      setSpeaking(null);
    };

    speech.onerror = () => {
      setSpeaking(null);
    };

    window.speechSynthesis.speak(speech);
  }

  function speakDashboard() {
    window.speechSynthesis.cancel();

    setSpeaking("dashboard");

    const speech =
      new SpeechSynthesisUtterance(
        `${text.title}. ${text.welcome}. ${text.subtitle}.`
      );

    speech.lang =
      voiceLanguages[language] || "en-IN";

    speech.rate = 0.75;
    speech.pitch = 1;

    speech.onend = () => {
      setSpeaking(null);
    };

    speech.onerror = () => {
      setSpeaking(null);
    };

    window.speechSynthesis.speak(speech);
  }

  function stopSpeaking() {
    window.speechSynthesis.cancel();
    setSpeaking(null);
  }

  return (
    <div className="collector-dashboard">

      {/* BACK BUTTON */}

      <button
        className="collector-back-button"
        onClick={() => {
          stopSpeaking();
          onBack();
        }}
      >
        {text.back}
      </button>

      {/* PROFILE BUTTON */}

      <button
        className="collector-profile-button"
        onClick={() => {
          stopSpeaking();
          onProfile();
        }}
      >
        👤 Collector Profile
      </button>

      {/* SPEAKER + FINGER */}

      <div className="collector-speaker-wrapper">

        <button
          className={`collector-speaker-button ${
            speaking ? "speaking" : ""
          }`}
          onClick={
            speaking
              ? stopSpeaking
              : speakDashboard
          }
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/727/727269.png"
            alt="Speaker"
          />
        </button>

        <div className="collector-speaker-finger-effect">

          <span className="collector-speaker-ring ring-1"></span>

          <span className="collector-speaker-ring ring-2"></span>

          <span className="collector-speaker-ring ring-3"></span>

          <span className="collector-speaker-finger">
            ☝️
          </span>

        </div>

      </div>

      {/* DASHBOARD */}

      <div className="collector-dashboard-container">

        {/* DASHBOARD HEADING */}

        <div
          className={`collector-heading ${
            speaking === "dashboard"
              ? "dashboard-speaking"
              : ""
          }`}
          onClick={speakDashboard}
        >

          <h1>
            {text.title}
          </h1>

          <p>
            {text.welcome}
          </p>

          <span>
            {text.subtitle}
          </span>

        </div>

        {/* CARDS */}

        <div className="collector-card-grid">

          {cards.map((card) => (

            <div
              key={card.id}

              className={`collector-action-card ${
                speaking === card.id
                  ? "card-speaking"
                  : ""
              }`}

              onClick={() => {

                if (card.id === "add") {
                  stopSpeaking();
                  onAddWaste();
                }

                if (card.id === "price") {
                  stopSpeaking();
                  onTodaysRate();
                }

                if (card.id === "find") {
                  stopSpeaking();
                  onFindRecycler();
                }

                if (card.id === "verified") {
                  stopSpeaking();
                  onVerifiedRecyclers();
                }

                if (card.id === "transactions") {
                  stopSpeaking();
                  onTransactions();
                }

                if (card.id === "nearby") {
                  stopSpeaking();
                  onNearbyRecyclers();
                }

                if (card.id === "myWaste") {
                  stopSpeaking();
                  onMyEWaste();
                }

                if (card.id === "requests") {
                  stopSpeaking();
                  onMyRequests();
                }

                if (card.id === "help") {
                  stopSpeaking();
                  onHelpSahayak();
                }

              }}

              onMouseEnter={() =>
                speakCard(card)
              }

              onMouseLeave={() => {
                window.speechSynthesis.cancel();
                setSpeaking(null);
              }}
            >

              <div className="collector-card-icon">
                {card.icon}
              </div>

              <h2>
                {card.title}
              </h2>

              <p>
                {card.description}
              </p>

            </div>

          ))}

        </div>

        {/* TEMPORARY TEST BUTTON */}

        <button
          className="test-offer-button"
          onClick={() => {
            window.speechSynthesis.cancel();

            if (onTestOfferReceived) {
              onTestOfferReceived();
            }
          }}
        >
          🔔 Test Offer Received
        </button>

      </div>

    </div>
  );
}

export default CollectorDashboard;