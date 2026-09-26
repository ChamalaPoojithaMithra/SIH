import React, { useEffect } from "react";
import "./HelpSahayakScreen.css";

function HelpSahayakScreen({ language, onBack }) {
  const text = {
    en: {
      title: "Help / Sahayak",
      subtitle: "Simple help for every step",
      back: "Back",
      speak: "Listen",
      guide: "Tap any option to hear help.",
      voice: "Voice Help",
      voiceDesc: "Listen to instructions in your language",
      process: "How It Works",
      processDesc: "Learn how to sell your e-waste safely",
      safety: "Safety Help",
      safetyDesc: "Learn how to avoid fraud and fake recyclers",
      language: "Language Help",
      languageDesc: "Change your preferred language",
      support: "Contact Support",
      supportDesc: "Get help from the support team",
      safe: "Never share your OTP with anyone.",
      demo: "Demo support options for SIH 2026"
    },

    te: {
      title: "సహాయం / సహాయక్",
      subtitle: "ప్రతి దశలో సులభమైన సహాయం",
      back: "వెనుకకు",
      speak: "వినండి",
      guide: "సహాయం వినడానికి ఏదైనా ఎంపికను ట్యాప్ చేయండి.",
      voice: "వాయిస్ సహాయం",
      voiceDesc: "మీ భాషలో సూచనలు వినండి",
      process: "ఇది ఎలా పనిచేస్తుంది",
      processDesc: "మీ ఈ-వేస్ట్‌ను సురక్షితంగా ఎలా అమ్మాలో తెలుసుకోండి",
      safety: "భద్రత సహాయం",
      safetyDesc: "మోసం మరియు నకిలీ రీసైక్లర్లను ఎలా నివారించాలో తెలుసుకోండి",
      language: "భాష సహాయం",
      languageDesc: "మీకు ఇష్టమైన భాషను మార్చండి",
      support: "సపోర్ట్‌ను సంప్రదించండి",
      supportDesc: "సపోర్ట్ టీమ్ నుండి సహాయం పొందండి",
      safe: "మీ OTPను ఎవరితోనూ పంచుకోవద్దు.",
      demo: "SIH 2026 కోసం డెమో సహాయ ఎంపికలు"
    },

    hi: {
      title: "मदद / सहायक",
      subtitle: "हर चरण में आसान मदद",
      back: "वापस",
      speak: "सुनें",
      guide: "मदद सुनने के लिए कोई विकल्प टैप करें।",
      voice: "वॉइस मदद",
      voiceDesc: "अपनी भाषा में निर्देश सुनें",
      process: "यह कैसे काम करता है",
      processDesc: "अपना ई-वेस्ट सुरक्षित रूप से बेचने का तरीका जानें",
      safety: "सुरक्षा मदद",
      safetyDesc: "धोखाधड़ी और नकली रीसाइक्लर से बचने का तरीका जानें",
      language: "भाषा मदद",
      languageDesc: "अपनी पसंदीदा भाषा बदलें",
      support: "सपोर्ट से संपर्क करें",
      supportDesc: "सपोर्ट टीम से मदद लें",
      safe: "अपना OTP किसी के साथ साझा न करें।",
      demo: "SIH 2026 के लिए डेमो सहायता विकल्प"
    },

    mr: {
      title: "मदत / सहाय्यक",
      subtitle: "प्रत्येक टप्प्यावर सोपी मदत",
      back: "मागे",
      speak: "ऐका",
      guide: "मदत ऐकण्यासाठी कोणताही पर्याय टॅप करा.",
      voice: "व्हॉइस मदत",
      voiceDesc: "तुमच्या भाषेत सूचना ऐका",
      process: "हे कसे काम करते",
      processDesc: "तुमचा ई-वेस्ट सुरक्षितपणे कसा विकायचा ते जाणून घ्या",
      safety: "सुरक्षा मदत",
      safetyDesc: "फसवणूक आणि बनावट रिसायकलर्सपासून कसे वाचायचे ते जाणून घ्या",
      language: "भाषा मदत",
      languageDesc: "तुमची आवडती भाषा बदला",
      support: "सपोर्टशी संपर्क करा",
      supportDesc: "सपोर्ट टीमकडून मदत मिळवा",
      safe: "तुमचा OTP कोणासोबतही शेअर करू नका.",
      demo: "SIH 2026 साठी डेमो मदत पर्याय"
    }
  };

  const selectedLanguage = language || "en";
  const t = text[selectedLanguage] || text.en;

  const getVoiceLanguage = () => {
    if (language === "te") return "te-IN";
    if (language === "hi") return "hi-IN";
    if (language === "mr") return "mr-IN";

    return "en-IN";
  };

  const helpOptions = [
    {
      id: "voice",
      icon: "🔊",
      title: t.voice,
      description: t.voiceDesc
    },
    {
      id: "process",
      icon: "♻️",
      title: t.process,
      description: t.processDesc
    },
    {
      id: "safety",
      icon: "🛡️",
      title: t.safety,
      description: t.safetyDesc
    },
    {
      id: "language",
      icon: "🌐",
      title: t.language,
      description: t.languageDesc
    },
    {
      id: "support",
      icon: "🤝",
      title: t.support,
      description: t.supportDesc
    }
  ];

  useEffect(() => {
    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(
      `${t.title}. ${t.subtitle}. ${t.guide}. ${t.safe}`
    );

    message.lang = getVoiceLanguage();
    message.rate = 0.8;
    message.pitch = 1;

    window.speechSynthesis.speak(message);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language]);

  function speakHelp(option) {
    window.speechSynthesis.cancel();

    let extraText = "";

    if (option.id === "voice") {
      extraText = t.voiceDesc;
    }

    if (option.id === "process") {
      extraText = t.processDesc;
    }

    if (option.id === "safety") {
      extraText = `${t.safetyDesc}. ${t.safe}`;
    }

    if (option.id === "language") {
      extraText = t.languageDesc;
    }

    if (option.id === "support") {
      extraText = t.supportDesc;
    }

    const message = new SpeechSynthesisUtterance(
      `${option.title}. ${extraText}`
    );

    message.lang = getVoiceLanguage();
    message.rate = 0.8;
    message.pitch = 1;

    window.speechSynthesis.speak(message);
  }

  function speakPage() {
    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(
      `${t.title}. ${t.subtitle}. ${t.guide}. ${t.safe}`
    );

    message.lang = getVoiceLanguage();
    message.rate = 0.8;
    message.pitch = 1;

    window.speechSynthesis.speak(message);
  }

  return (
    <div className="help-sahayak-screen">

      <div className="help-sahayak-container">

        {/* HEADER */}
        <header className="help-header">

          {/* BACK BUTTON */}
          <button
            className="help-back-button"
            onClick={() => {
              window.speechSynthesis.cancel();
              onBack();
            }}
          >
            ← {t.back}
          </button>

          {/* LISTEN BUTTON + FINGER INDICATOR */}
          <div className="listen-button-wrapper">

            <button
              className="help-speaker-button"
              onClick={speakPage}
            >
              🔊 {t.speak}
            </button>

            {/* FINGER + CONCENTRIC CIRCLES */}
            <div className="listen-indicator">

              <div className="listen-ripple ripple-one"></div>

              <div className="listen-ripple ripple-two"></div>

              <div className="listen-ripple ripple-three"></div>

              <span className="listen-finger">
                ☝️
              </span>

            </div>

          </div>

        </header>

        {/* MAIN CONTENT */}
        <main className="help-content">

          {/* TITLE - ONLY ONCE */}
          <div className="help-title-area">

            <div className="help-title-icon">
              🤝
            </div>

            <h1>
              {t.title}
            </h1>

            <p>
              {t.subtitle}
            </p>

          </div>

          {/* GUIDANCE */}
          <div className="help-guidance">

            <strong>
              {t.guide}
            </strong>

            <span>
              {t.safe}
            </span>

          </div>

          {/* HELP OPTIONS */}
          <section className="help-options">

            {helpOptions.map((option) => (

              <button
                key={option.id}
                className="help-option-card"
                onClick={() => speakHelp(option)}
              >

                <div className="help-option-icon">
                  {option.icon}
                </div>

                <div className="help-option-text">

                  <h2>
                    {option.title}
                  </h2>

                  <p>
                    {option.description}
                  </p>

                </div>

                <div className="help-option-arrow">
                  →
                </div>

              </button>

            ))}

          </section>

          {/* SAFE NOTE */}
          <div className="help-safe-note">
            🛡️ {t.safe}
          </div>

          {/* DEMO NOTE */}
          <div className="help-demo-note">
            {t.demo}
          </div>

        </main>

      </div>

    </div>
  );
}

export default HelpSahayakScreen;