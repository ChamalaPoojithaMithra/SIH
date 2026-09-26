import React, { useEffect } from "react";
import "./HandoverSuccessScreen.css";

function HandoverSuccessScreen({
  language,
  lotData,
  onBack,
  onCompleteTransaction
}) {
  const translations = {
    en: {
      title: "Handover Successful",
      subtitle: "Your e-waste has been safely handed over",
      verified: "HANDOVER VERIFIED",
      recycler: "Recycler",
      recyclerVerified: "✓ Verified Recycler",
      lotId: "Lot ID",
      material: "Material",
      weight: "Weight",
      agreedPrice: "Agreed Price",
      otpStatus: "OTP Verification",
      otpVerified: "✓ Verified",
      safeMessage: "Your e-waste handover is securely verified.",
      note: "Keep this transaction record for your reference.",
      complete: "COMPLETE TRANSACTION",
      back: "BACK",
      listen: "Listen"
    },

    te: {
      title: "హ్యాండోవర్ విజయవంతం",
      subtitle: "మీ ఈ-వేస్ట్ సురక్షితంగా అప్పగించబడింది",
      verified: "హ్యాండోవర్ ధృవీకరించబడింది",
      recycler: "రీసైక్లర్",
      recyclerVerified: "✓ ధృవీకరించబడిన రీసైక్లర్",
      lotId: "లాట్ ID",
      material: "మెటీరియల్",
      weight: "బరువు",
      agreedPrice: "అంగీకరించిన ధర",
      otpStatus: "OTP ధృవీకరణ",
      otpVerified: "✓ ధృవీకరించబడింది",
      safeMessage: "మీ ఈ-వేస్ట్ హ్యాండోవర్ సురక్షితంగా ధృవీకరించబడింది.",
      note: "ఈ లావాదేవీ వివరాలను భద్రంగా ఉంచుకోండి.",
      complete: "లావాదేవీ పూర్తి చేయండి",
      back: "వెనుకకు",
      listen: "వినండి"
    },

    hi: {
      title: "हैंडओवर सफल",
      subtitle: "आपका ई-वेस्ट सुरक्षित रूप से सौंप दिया गया है",
      verified: "हैंडओवर सत्यापित",
      recycler: "रीसाइकलर",
      recyclerVerified: "✓ सत्यापित रीसाइकलर",
      lotId: "लॉट ID",
      material: "सामग्री",
      weight: "वजन",
      agreedPrice: "सहमत कीमत",
      otpStatus: "OTP सत्यापन",
      otpVerified: "✓ सत्यापित",
      safeMessage: "आपका ई-वेस्ट हैंडओवर सुरक्षित रूप से सत्यापित है।",
      note: "इस लेन-देन का रिकॉर्ड सुरक्षित रखें।",
      complete: "लेन-देन पूरा करें",
      back: "वापस",
      listen: "सुनें"
    },

    mr: {
      title: "हँडओव्हर यशस्वी",
      subtitle: "तुमचा ई-वेस्ट सुरक्षितपणे सुपूर्द करण्यात आला आहे",
      verified: "हँडओव्हर सत्यापित",
      recycler: "रीसायकलर",
      recyclerVerified: "✓ सत्यापित रीसायकलर",
      lotId: "लॉट ID",
      material: "साहित्य",
      weight: "वजन",
      agreedPrice: "मान्य किंमत",
      otpStatus: "OTP पडताळणी",
      otpVerified: "✓ सत्यापित",
      safeMessage: "तुमचा ई-वेस्ट हँडओव्हर सुरक्षितपणे सत्यापित झाला आहे.",
      note: "या व्यवहाराची नोंद सुरक्षित ठेवा.",
      complete: "व्यवहार पूर्ण करा",
      back: "मागे",
      listen: "ऐका"
    }
  };

  const text = translations[language] || translations.en;

  const recyclerName = lotData?.recyclerName || "Recycler A";
  const recyclerId = lotData?.recyclerId || "REC001";
  const lotId = lotData?.lotId || "LOT-2026-0001";
  const material = lotData?.material || "Battery";
  const weight = Number(lotData?.weight) || 0;
  const pricePerKg = Number(lotData?.pricePerKg) || 420;

  const estimatedAmount =
    Number(lotData?.estimatedAmount) ||
    pricePerKg * weight;

  useEffect(() => {
    speakSuccess();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function speakSuccess() {
    window.speechSynthesis.cancel();

    const message = {
      en: `Handover successful. Your e-waste was safely handed over to ${recyclerName}. OTP verification is complete.`,
      te: `హ్యాండోవర్ విజయవంతమైంది. మీ ఈ-వేస్ట్ సురక్షితంగా ${recyclerName} కు అప్పగించబడింది. OTP ధృవీకరణ పూర్తయింది.`,
      hi: `हैंडओवर सफल हुआ। आपका ई-वेस्ट सुरक्षित रूप से ${recyclerName} को सौंप दिया गया है। OTP सत्यापन पूरा हो गया है।`,
      mr: `हँडओव्हर यशस्वी झाला. तुमचा ई-वेस्ट सुरक्षितपणे ${recyclerName} कडे सुपूर्द करण्यात आला आहे. OTP पडताळणी पूर्ण झाली आहे.`
    };

    const speech = new SpeechSynthesisUtterance(
      message[language] || message.en
    );

    speech.lang =
      language === "te"
        ? "te-IN"
        : language === "hi"
        ? "hi-IN"
        : language === "mr"
        ? "mr-IN"
        : "en-IN";

    speech.rate = 0.8;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }

  function handleComplete() {
    window.speechSynthesis.cancel();
    onCompleteTransaction();
  }

  return (
    <div className="handover-success-screen">

      <div className="handover-success-header">
        <button
          className="handover-success-back"
          onClick={onBack}
        >
          ← {text.back}
        </button>

        <div className="handover-success-speaker-area">

          <div className="handover-success-finger-effect">
            <span className="success-speaker-ring ring-1"></span>
            <span className="success-speaker-ring ring-2"></span>
            <span className="success-speaker-ring ring-3"></span>
            <span className="success-speaker-finger">☝️</span>
          </div>

          <button
            className="handover-success-speaker"
            onClick={speakSuccess}
          >
            <span>🔊</span>
            <span>{text.listen}</span>
          </button>

        </div>
      </div>

      <div className="handover-success-content">

        <div className="success-icon">
          ✓
        </div>

        <h1>{text.title}</h1>

        <p className="handover-success-subtitle">
          {text.subtitle}
        </p>

        <div className="handover-verified-badge">
          ✓ {text.verified}
        </div>

        <div className="handover-success-card">

          <div className="success-recycler-section">
            <div className="recycler-avatar">
              ♻
            </div>

            <div>
              <div className="success-label">
                {text.recycler}
              </div>

              <div className="success-recycler-name">
                {recyclerName}
              </div>

              <div className="success-recycler-id">
                {recyclerId}
              </div>

              <div className="success-recycler-verified">
                {text.recyclerVerified}
              </div>
            </div>
          </div>

          <div className="success-divider"></div>

          <div className="success-details-grid">

            <div className="success-detail">
              <span className="success-detail-label">
                {text.lotId}
              </span>
              <strong>{lotId}</strong>
            </div>

            <div className="success-detail">
              <span className="success-detail-label">
                {text.material}
              </span>
              <strong>{material}</strong>
            </div>

            <div className="success-detail">
              <span className="success-detail-label">
                {text.weight}
              </span>
              <strong>{weight} kg</strong>
            </div>

            <div className="success-detail">
              <span className="success-detail-label">
                {text.agreedPrice}
              </span>
              <strong>₹{pricePerKg}/kg</strong>
            </div>

            <div className="success-detail">
              <span className="success-detail-label">
                Total Amount
              </span>
              <strong>₹{estimatedAmount}</strong>
            </div>

            <div className="success-detail">
              <span className="success-detail-label">
                {text.otpStatus}
              </span>
              <strong className="otp-success">
                {text.otpVerified}
              </strong>
            </div>

          </div>

        </div>

        <div className="handover-safe-message">
          <span className="safe-message-icon">🛡️</span>

          <div>
            <strong>{text.safeMessage}</strong>
            <p>{text.note}</p>
          </div>
        </div>

        <div className="handover-complete-action">

          <div className="complete-finger">
            ☝️
          </div>

          <button
            className="complete-transaction-button"
            onClick={handleComplete}
          >
            {text.complete}
            <span>→</span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default HandoverSuccessScreen;