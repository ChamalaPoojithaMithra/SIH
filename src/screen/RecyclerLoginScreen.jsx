import React, { useEffect, useState } from "react";
import "./RecyclerLoginScreen.css";

function RecyclerLoginScreen({ language, onBack, onLogin }) {
  const [phone, setPhone] = useState("");
  const [speaking, setSpeaking] = useState(false);

  const translations = {
    en: {
      title: "Recycler Login",
      subtitle: "Login to manage e-waste offers and pickups",
      phoneLabel: "Mobile Number",
      phonePlaceholder: "Enter your mobile number",
      login: "Continue",
      back: "← Back",
      listen: "Listen",
      guide: "Enter your mobile number to continue.",
      verified: "Verified recyclers only",
      safe: "Your account information is kept secure.",
      demo: "Demo login for SIH 2026",
      invalid: "Please enter a valid 10-digit mobile number.",
    },

    te: {
      title: "రీసైక్లర్ లాగిన్",
      subtitle:
        "ఈ-వ్యర్థాల ఆఫర్లు మరియు పికప్‌లను నిర్వహించడానికి లాగిన్ అవ్వండి",
      phoneLabel: "మొబైల్ నంబర్",
      phonePlaceholder: "మీ మొబైల్ నంబర్ నమోదు చేయండి",
      login: "కొనసాగించండి",
      back: "← వెనుకకు",
      listen: "వినండి",
      guide: "కొనసాగించడానికి మీ మొబైల్ నంబర్ నమోదు చేయండి.",
      verified: "ధృవీకరించబడిన రీసైక్లర్లకు మాత్రమే",
      safe: "మీ ఖాతా సమాచారం సురక్షితంగా ఉంచబడుతుంది.",
      demo: "SIH 2026 కోసం డెమో లాగిన్",
      invalid:
        "దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.",
    },

    hi: {
      title: "रीसाइकलर लॉगिन",
      subtitle:
        "ई-कचरे के ऑफर और पिकअप प्रबंधित करने के लिए लॉगिन करें",
      phoneLabel: "मोबाइल नंबर",
      phonePlaceholder: "अपना मोबाइल नंबर दर्ज करें",
      login: "जारी रखें",
      back: "← वापस",
      listen: "सुनें",
      guide: "जारी रखने के लिए अपना मोबाइल नंबर दर्ज करें।",
      verified: "केवल सत्यापित रीसाइकलर",
      safe: "आपकी खाता जानकारी सुरक्षित रखी जाती है।",
      demo: "SIH 2026 के लिए डेमो लॉगिन",
      invalid:
        "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",
    },

    mr: {
      title: "रिसायकलर लॉगिन",
      subtitle:
        "ई-कचरा ऑफर आणि पिकअप व्यवस्थापित करण्यासाठी लॉगिन करा",
      phoneLabel: "मोबाइल नंबर",
      phonePlaceholder: "तुमचा मोबाइल नंबर टाका",
      login: "पुढे जा",
      back: "← मागे",
      listen: "ऐका",
      guide: "पुढे जाण्यासाठी तुमचा मोबाइल नंबर टाका.",
      verified: "फक्त सत्यापित रिसायकलर",
      safe: "तुमची खाते माहिती सुरक्षित ठेवली जाते.",
      demo: "SIH 2026 साठी डेमो लॉगिन",
      invalid:
        "कृपया योग्य 10 अंकी मोबाइल नंबर टाका.",
    },
  };

  const text = translations[language] || translations.en;

  const voiceLanguages = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN",
  };

  function speak(textToSpeak) {
    window.speechSynthesis.cancel();

    const message = new SpeechSynthesisUtterance(textToSpeak);

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
  }

  useEffect(() => {
    window.speechSynthesis.cancel();

    speak(
      `${text.title}. ${text.subtitle}. ${text.guide}. ${text.verified}`
    );

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language]);

  function handleLogin() {
    if (phone.length !== 10) {
      speak(text.invalid);
      return;
    }

    window.speechSynthesis.cancel();

    if (onLogin) {
      onLogin(phone);
    }
  }

  return (
    <div className="recycler-login-screen">

      {/* Header */}
      <header className="recycler-login-header">

        <button
          className="recycler-login-back-button"
          onClick={() => {
            window.speechSynthesis.cancel();

            if (onBack) {
              onBack();
            }
          }}
        >
          {text.back}
        </button>

        <button
          className={`recycler-login-speaker-button ${
            speaking ? "speaking" : ""
          }`}
          onClick={() => {
            if (speaking) {
              window.speechSynthesis.cancel();
              setSpeaking(false);
            } else {
              speak(
                `${text.title}. ${text.subtitle}. ${text.guide}. ${text.verified}`
              );
            }
          }}
        >
          🔊 {text.listen}
        </button>

      </header>

      {/* Main Content */}
      <main className="recycler-login-content">

        {/* Title */}
        <div className="recycler-login-title-area">

          <div className="recycler-login-icon">
            ♻️
          </div>

          <h1>{text.title}</h1>

          <p>{text.subtitle}</p>

        </div>

        {/* Guidance */}
        <div className="recycler-login-guidance">

          <strong>{text.guide}</strong>

          <span>{text.verified}</span>

        </div>

        {/* Mobile Number */}
        <section className="recycler-login-card">

          <label htmlFor="recycler-phone">
            {text.phoneLabel}
          </label>

          <input
            id="recycler-phone"
            type="tel"
            inputMode="numeric"
            maxLength="10"
            value={phone}
            onChange={(event) => {
              const value = event.target.value.replace(/\D/g, "");
              setPhone(value);
            }}
            placeholder={text.phonePlaceholder}
          />

          {/* Continue Button */}
          <button
            className="recycler-login-continue-button"
            onClick={handleLogin}
          >
            <span>{text.login}</span>
            <span>→</span>
          </button>

        </section>

        {/* Security Note */}
        <div className="recycler-login-safe-note">
          🛡️ {text.safe}
        </div>

        {/* Demo Note */}
        <div className="recycler-login-demo-note">
          {text.demo}
        </div>

      </main>

    </div>
  );
}

export default RecyclerLoginScreen;