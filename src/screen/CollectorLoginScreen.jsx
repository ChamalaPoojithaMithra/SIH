import React, { useState } from "react";
import "./CollectorLoginScreen.css";

function CollectorLoginScreen({ language, onBack, onContinue }) {
  const [phone, setPhone] = useState("");
  const [speaking, setSpeaking] = useState(false);

  const translations = {
    en: {
      title: "Collector Login",
      subtitle: "Enter your mobile number to continue",
      phone: "Mobile Number",
      placeholder: "Enter mobile number",
      continue: "CONTINUE",
      back: "← Back",
      note: "We will send an OTP to verify your number."
    },

    te: {
      title: "కలెక్టర్ లాగిన్",
      subtitle: "కొనసాగించడానికి మీ మొబైల్ నంబర్ నమోదు చేయండి",
      phone: "మొబైల్ నంబర్",
      placeholder: "మొబైల్ నంబర్ నమోదు చేయండి",
      continue: "కొనసాగించండి",
      back: "← వెనుకకు",
      note: "మీ నంబర్‌ను ధృవీకరించడానికి OTP పంపబడుతుంది."
    },

    hi: {
      title: "कलेक्टर लॉगिन",
      subtitle: "जारी रखने के लिए अपना मोबाइल नंबर दर्ज करें",
      phone: "मोबाइल नंबर",
      placeholder: "मोबाइल नंबर दर्ज करें",
      continue: "जारी रखें",
      back: "← वापस",
      note: "आपके नंबर को सत्यापित करने के लिए OTP भेजा जाएगा."
    },

    mr: {
      title: "संकलक लॉगिन",
      subtitle: "पुढे जाण्यासाठी तुमचा मोबाईल नंबर प्रविष्ट करा",
      phone: "मोबाईल नंबर",
      placeholder: "मोबाईल नंबर प्रविष्ट करा",
      continue: "पुढे जा",
      back: "← मागे",
      note: "तुमचा नंबर सत्यापित करण्यासाठी OTP पाठवला जाईल."
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
      `${text.title}. ${text.subtitle}. ${text.phone}. ${text.note}`
    );

    speech.lang = voiceLanguages[language] || "en-IN";
    speech.rate = 0.75;
    speech.pitch = 1;

    speech.onend = () => {
      setSpeaking(false);
    };

    speech.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  }

  function handleContinue() {
    if (phone.length !== 10) {
      return;
    }

    window.speechSynthesis.cancel();
    setSpeaking(false);

    onContinue(phone);
  }

  return (
    <div className="collector-login-screen">

      {/* Speaker */}

      <div className="collector-login-speaker-wrapper">

        <button
          className={`collector-login-speaker-button ${
            speaking ? "speaking" : ""
          }`}
          onClick={speakScreen}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/727/727269.png"
            alt="Speaker"
          />
        </button>

        <div className="collector-login-finger-effect">

          <span className="collector-login-ring ring-1"></span>
          <span className="collector-login-ring ring-2"></span>
          <span className="collector-login-ring ring-3"></span>

          <span className="collector-login-finger">
            ☝️
          </span>

        </div>

      </div>


      {/* Back */}

      <button
        className="back-button"
        onClick={() => {
          window.speechSynthesis.cancel();
          onBack();
        }}
      >
        {text.back}
      </button>


      {/* Main */}

      <div className="collector-login-container">

        <div className="collector-login-icon">
          ♻️
        </div>

        <h1>{text.title}</h1>

        <p className="collector-login-subtitle">
          {text.subtitle}
        </p>


        <div className="collector-login-form">

          <label>
            {text.phone}
          </label>

          <input
            type="tel"
            inputMode="numeric"
            maxLength="10"
            placeholder={text.placeholder}
            value={phone}
            onChange={(event) => {
              const value = event.target.value.replace(
                /\D/g,
                ""
              );

              setPhone(value);
            }}
          />

          <p className="collector-login-note">
            {text.note}
          </p>


          <button
            className="collector-login-continue"
            onClick={handleContinue}
            disabled={phone.length !== 10}
          >
            {text.continue}
            <span>→</span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default CollectorLoginScreen;