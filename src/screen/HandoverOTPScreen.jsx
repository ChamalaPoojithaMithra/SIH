import React, { useEffect, useRef, useState } from "react";
import "./HandoverOTPScreen.css";

function HandoverOTPScreen({
  language,
  lotData,
  onBack,
  onVerified
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [speaking, setSpeaking] = useState(false);

  const inputRefs = useRef([]);

  const translations = {
    en: {
      title: "Secure Handover",
      subtitle:
        "Enter the OTP shown by the recycler to complete the handover",
      recycler: "Recycler",
      verified: "Verified Recycler",
      lot: "Lot ID",
      otpTitle: "Enter 6-digit OTP",
      otpHint: "Ask the recycler for the handover OTP",
      verify: "VERIFY OTP",
      back: "Back",
      listen: "Listen",
      wrongOtp: "That code is not correct. Please try again.",
      safeTitle: "Your e-waste stays with you",
      safeText:
        "Do not hand over your e-waste until the OTP is verified.",
      demo: "Demo OTP: 123456"
    },

    te: {
      title: "సురక్షిత హ్యాండోవర్",
      subtitle:
        "హ్యాండోవర్ పూర్తి చేయడానికి రీసైక్లర్ చూపించిన OTPని నమోదు చేయండి",
      recycler: "రీసైక్లర్",
      verified: "ధృవీకరించిన రీసైక్లర్",
      lot: "లాట్ ID",
      otpTitle: "6 అంకెల OTP నమోదు చేయండి",
      otpHint: "హ్యాండోవర్ OTP కోసం రీసైక్లర్‌ను అడగండి",
      verify: "OTP తనిఖీ చేయండి",
      back: "వెనుకకు",
      listen: "వినండి",
      wrongOtp:
        "ఆ కోడ్ సరైనది కాదు. దయచేసి మళ్లీ ప్రయత్నించండి.",
      safeTitle: "మీ ఈ-వేస్ట్ మీ వద్దే ఉంటుంది",
      safeText:
        "OTP ధృవీకరించబడే వరకు మీ ఈ-వేస్ట్ ఇవ్వకండి.",
      demo: "డెమో OTP: 123456"
    },

    hi: {
      title: "सुरक्षित हैंडओवर",
      subtitle:
        "हैंडओवर पूरा करने के लिए रिसाइक्लर द्वारा दिया गया OTP दर्ज करें",
      recycler: "रिसाइक्लर",
      verified: "सत्यापित रिसाइक्लर",
      lot: "लॉट ID",
      otpTitle: "6 अंकों का OTP दर्ज करें",
      otpHint: "हैंडओवर OTP के लिए रिसाइक्लर से पूछें",
      verify: "OTP सत्यापित करें",
      back: "वापस",
      listen: "सुनें",
      wrongOtp:
        "यह कोड सही नहीं है। कृपया फिर से प्रयास करें।",
      safeTitle: "आपका ई-वेस्ट आपके पास रहेगा",
      safeText:
        "OTP सत्यापित होने तक अपना ई-वेस्ट न दें।",
      demo: "डेमो OTP: 123456"
    },

    mr: {
      title: "सुरक्षित हँडओव्हर",
      subtitle:
        "हँडओव्हर पूर्ण करण्यासाठी रिसायकलरने दिलेला OTP प्रविष्ट करा",
      recycler: "रिसायकलर",
      verified: "सत्यापित रिसायकलर",
      lot: "लॉट ID",
      otpTitle: "6 अंकी OTP प्रविष्ट करा",
      otpHint: "हँडओव्हर OTP साठी रिसायकलरला विचारा",
      verify: "OTP तपासा",
      back: "मागे",
      listen: "ऐका",
      wrongOtp:
        "हा कोड बरोबर नाही. कृपया पुन्हा प्रयत्न करा.",
      safeTitle: "तुमचा ई-वेस्ट तुमच्याकडेच राहील",
      safeText:
        "OTP सत्यापित होईपर्यंत तुमचा ई-वेस्ट देऊ नका.",
      demo: "डेमो OTP: 123456"
    }
  };

  const text = translations[language] || translations.en;

  const voiceLocales = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN"
  };

  const recyclerName =
    lotData?.recyclerName || "Recycler A";

  const lotId =
    lotData?.lotId || "LOT-2026-0001";

  useEffect(() => {
    speakScreen();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function speakScreen() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      `${text.title}. ${text.subtitle}. ${text.otpTitle}. ${text.otpHint}. ${text.verify}`
    );

    speech.lang = voiceLocales[language] || "en-IN";
    speech.rate = 0.8;
    speech.pitch = 1;

    speech.onstart = () => setSpeaking(true);
    speech.onend = () => setSpeaking(false);
    speech.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(speech);
  }

  function handleOtpChange(value, index) {
    if (!/^\d?$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(event, index) {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleVerify() {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError(text.wrongOtp);
      speakError(text.wrongOtp);
      return;
    }

    if (enteredOtp !== "123456") {
      setError(text.wrongOtp);
      speakError(text.wrongOtp);
      return;
    }

    setError("");

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      "OTP verified"
    );

    speech.lang = voiceLocales[language] || "en-IN";
    speech.rate = 0.8;

    speech.onend = () => {
      onVerified();
    };

    speech.onerror = () => {
      onVerified();
    };

    window.speechSynthesis.speak(speech);
  }

  function speakError(message) {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang = voiceLocales[language] || "en-IN";
    speech.rate = 0.8;

    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="handover-otp-screen">

      {/* ================= HEADER ================= */}

      <header className="handover-otp-header">

        {/* BACK BUTTON */}
        <button
          className="handover-otp-back"
          onClick={() => {
            window.speechSynthesis.cancel();
            onBack();
          }}
        >
          ← {text.back}
        </button>

        {/* LISTEN BUTTON */}
        <div className="handover-otp-speaker-area">

          <div className="handover-speaker-finger">

            <span className="handover-ring ring-one"></span>
            <span className="handover-ring ring-two"></span>
            <span className="handover-ring ring-three"></span>

            <span className="handover-finger">
              ☝️
            </span>

          </div>

          <button
            className={`handover-otp-speaker ${
              speaking ? "speaking" : ""
            }`}
            onClick={speakScreen}
          >
            🔊 {text.listen}
          </button>

        </div>

      </header>

      {/* ================= MAIN CONTENT ================= */}

      <div className="handover-otp-content">

        <div className="handover-lock-icon">
          🔐
        </div>

        <h1>{text.title}</h1>

        <p className="handover-otp-subtitle">
          {text.subtitle}
        </p>

        {/* RECYCLER CARD */}

        <div className="handover-otp-recycler-card">

          <div className="handover-recycler-icon">
            ♻
          </div>

          <div className="handover-recycler-details">

            <span>{text.recycler}</span>

            <strong>{recyclerName}</strong>

            <small>
              ✓ {text.verified}
            </small>

            <em>
              {text.lot}: {lotId}
            </em>

          </div>

        </div>

        {/* OTP BOX */}

        <div className="handover-otp-box">

          <h2>{text.otpTitle}</h2>

          <p>{text.otpHint}</p>

          <div className="otp-inputs">

            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(event) =>
                  handleOtpChange(
                    event.target.value,
                    index
                  )
                }
                onKeyDown={(event) =>
                  handleKeyDown(event, index)
                }
                className={error ? "otp-error" : ""}
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}

          </div>

          {error && (
            <div className="handover-otp-error">
              ⚠️ {error}
            </div>
          )}

          <div className="handover-demo-otp">
            {text.demo}
          </div>

        </div>

        {/* SAFETY BOX */}

        <div className="handover-safe-box">

          <div className="handover-safe-icon">
            🛡️
          </div>

          <div>
            <h3>{text.safeTitle}</h3>
            <p>{text.safeText}</p>
          </div>

        </div>

        {/* VERIFY BUTTON */}

        <div className="verify-otp-area">

          <div className="verify-otp-finger">
            ☝️
          </div>

          <button
            className="verify-otp-button"
            onClick={handleVerify}
          >
            {text.verify}
            <span>→</span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default HandoverOTPScreen;