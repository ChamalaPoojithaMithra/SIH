import React, { useState } from "react";
import "./OTPVerificationScreen.css";

function OTPVerificationScreen({
  language,
  phone,
  onBack,
  onVerify
}) {
  const [otp, setOtp] = useState("");
  const [speaking, setSpeaking] = useState(false);

  const translations = {
    en: {
      title: "Verify Your Number",
      subtitle: "Enter the OTP sent to your mobile number",
      otp: "Enter OTP",
      placeholder: "Enter 6-digit OTP",
      verify: "VERIFY",
      back: "← Back",
      resend: "Resend OTP",
      demo: "Demo OTP: 123456"
    },

    te: {
      title: "మీ నంబర్‌ను ధృవీకరించండి",
      subtitle: "మీ మొబైల్ నంబర్‌కు పంపిన OTPని నమోదు చేయండి",
      otp: "OTP నమోదు చేయండి",
      placeholder: "6 అంకెల OTP నమోదు చేయండి",
      verify: "ధృవీకరించండి",
      back: "← వెనుకకు",
      resend: "OTP మళ్లీ పంపండి",
      demo: "డెమో OTP: 123456"
    },

    hi: {
      title: "अपना नंबर सत्यापित करें",
      subtitle: "अपने मोबाइल नंबर पर भेजा गया OTP दर्ज करें",
      otp: "OTP दर्ज करें",
      placeholder: "6 अंकों का OTP दर्ज करें",
      verify: "सत्यापित करें",
      back: "← वापस",
      resend: "OTP फिर से भेजें",
      demo: "डेमो OTP: 123456"
    },

    mr: {
      title: "तुमचा नंबर सत्यापित करा",
      subtitle: "तुमच्या मोबाईल नंबरवर पाठवलेला OTP प्रविष्ट करा",
      otp: "OTP प्रविष्ट करा",
      placeholder: "6 अंकी OTP प्रविष्ट करा",
      verify: "सत्यापित करा",
      back: "← मागे",
      resend: "OTP पुन्हा पाठवा",
      demo: "डेमो OTP: 123456"
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
      `${text.title}. ${text.subtitle}. ${text.otp}.`
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

  function handleVerify() {
    if (otp.length !== 6) {
      return;
    }

    window.speechSynthesis.cancel();
    setSpeaking(false);

    onVerify();
  }

  return (
    <div className="otp-verification-screen">

      {/* Speaker */}

      <div className="otp-speaker-wrapper">

        <button
          className={`otp-speaker-button ${
            speaking ? "speaking" : ""
          }`}
          onClick={speakScreen}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/727/727269.png"
            alt="Speaker"
          />
        </button>

        <div className="otp-finger-effect">

          <span className="otp-ring ring-1"></span>
          <span className="otp-ring ring-2"></span>
          <span className="otp-ring ring-3"></span>

          <span className="otp-finger">
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

      <div className="otp-container">

        <div className="otp-icon">
          🔐
        </div>

        <h1>{text.title}</h1>

        <p className="otp-subtitle">
          {text.subtitle}
        </p>


        <div className="otp-form">

          <label>
            {text.otp}
          </label>

          <input
            type="tel"
            inputMode="numeric"
            maxLength="6"
            placeholder={text.placeholder}
            value={otp}
            onChange={(event) => {
              const value =
                event.target.value.replace(/\D/g, "");

              setOtp(value);
            }}
          />


          <p className="otp-phone">
            +91 {phone}
          </p>


          <button
            className="otp-verify-button"
            onClick={handleVerify}
            disabled={otp.length !== 6}
          >
            {text.verify}
            <span>→</span>
          </button>


          <button
            className="otp-resend-button"
            onClick={() => {
              console.log("OTP resent");
            }}
          >
            {text.resend}
          </button>


          <p className="otp-demo">
            {text.demo}
          </p>

        </div>

      </div>

    </div>
  );
}

export default OTPVerificationScreen;