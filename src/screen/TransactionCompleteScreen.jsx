import React, { useEffect } from "react";
import "./TransactionCompleteScreen.css";

function TransactionCompleteScreen({
  language,
  lotData,
  onBack,
  onContinue
}) {
  const translations = {
    en: {
      title: "Transaction Complete",
      subtitle: "Your e-waste transaction has been successfully completed",
      completed: "TRANSACTION COMPLETED",
      recycler: "Recycler",
      verified: "✓ Verified Recycler",
      transactionId: "Transaction ID",
      lotId: "Lot ID",
      material: "Material",
      weight: "Weight",
      agreedPrice: "Agreed Price",
      totalAmount: "Total Amount",
      otp: "OTP Verification",
      verifiedStatus: "✓ Verified",
      safe: "Secure Transaction",
      safeText:
        "Your handover was verified using OTP and the agreed offer was recorded.",
      continue: "VIEW PAYMENT & EARNINGS",
      back: "BACK",
      listen: "Listen"
    },

    te: {
      title: "లావాదేవీ పూర్తయింది",
      subtitle: "మీ ఈ-వేస్ట్ లావాదేవీ విజయవంతంగా పూర్తయింది",
      completed: "లావాదేవీ పూర్తయింది",
      recycler: "రీసైక్లర్",
      verified: "✓ ధృవీకరించబడిన రీసైక్లర్",
      transactionId: "లావాదేవీ ID",
      lotId: "లాట్ ID",
      material: "మెటీరియల్",
      weight: "బరువు",
      agreedPrice: "అంగీకరించిన ధర",
      totalAmount: "మొత్తం",
      otp: "OTP ధృవీకరణ",
      verifiedStatus: "✓ ధృవీకరించబడింది",
      safe: "సురక్షిత లావాదేవీ",
      safeText:
        "మీ హ్యాండోవర్ OTP ద్వారా ధృవీకరించబడింది మరియు అంగీకరించిన ఆఫర్ నమోదు చేయబడింది.",
      continue: "చెల్లింపు & ఆదాయాలు చూడండి",
      back: "వెనుకకు",
      listen: "వినండి"
    },

    hi: {
      title: "लेन-देन पूरा हुआ",
      subtitle: "आपका ई-वेस्ट लेन-देन सफलतापूर्वक पूरा हो गया है",
      completed: "लेन-देन पूरा हुआ",
      recycler: "रीसाइकलर",
      verified: "✓ सत्यापित रीसाइकलर",
      transactionId: "लेन-देन ID",
      lotId: "लॉट ID",
      material: "सामग्री",
      weight: "वजन",
      agreedPrice: "सहमत कीमत",
      totalAmount: "कुल राशि",
      otp: "OTP सत्यापन",
      verifiedStatus: "✓ सत्यापित",
      safe: "सुरक्षित लेन-देन",
      safeText:
        "आपका हैंडओवर OTP द्वारा सत्यापित किया गया और सहमत ऑफर दर्ज किया गया।",
      continue: "भुगतान और कमाई देखें",
      back: "वापस",
      listen: "सुनें"
    },

    mr: {
      title: "व्यवहार पूर्ण",
      subtitle: "तुमचा ई-वेस्ट व्यवहार यशस्वीपणे पूर्ण झाला आहे",
      completed: "व्यवहार पूर्ण",
      recycler: "रीसायकलर",
      verified: "✓ सत्यापित रीसायकलर",
      transactionId: "व्यवहार ID",
      lotId: "लॉट ID",
      material: "साहित्य",
      weight: "वजन",
      agreedPrice: "मान्य किंमत",
      totalAmount: "एकूण रक्कम",
      otp: "OTP पडताळणी",
      verifiedStatus: "✓ सत्यापित",
      safe: "सुरक्षित व्यवहार",
      safeText:
        "तुमचा हँडओव्हर OTP द्वारे सत्यापित झाला आणि मान्य ऑफर नोंदवली गेली.",
      continue: "पेमेंट आणि कमाई पहा",
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

  const pricePerKg =
    Number(lotData?.pricePerKg) || 420;

  const totalAmount =
    Number(lotData?.estimatedAmount) ||
    pricePerKg * weight;

  const transactionId =
    lotData?.transactionId || "TXN-2026-00001";

  useEffect(() => {
    speakCompletion();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function speakCompletion() {
    window.speechSynthesis.cancel();

    const messages = {
      en: `Transaction complete. Your e-waste transaction with ${recyclerName} has been successfully completed.`,
      te: `లావాదేవీ పూర్తయింది. ${recyclerName} తో మీ ఈ-వేస్ట్ లావాదేవీ విజయవంతంగా పూర్తయింది.`,
      hi: `लेन-देन पूरा हुआ। ${recyclerName} के साथ आपका ई-वेस्ट लेन-देन सफलतापूर्वक पूरा हो गया है।`,
      mr: `व्यवहार पूर्ण झाला. ${recyclerName} सोबतचा तुमचा ई-वेस्ट व्यवहार यशस्वीपणे पूर्ण झाला आहे.`
    };

    const speech = new SpeechSynthesisUtterance(
      messages[language] || messages.en
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

  function handleContinue() {
    window.speechSynthesis.cancel();
    onContinue({
      transactionId,
      totalAmount,
      paymentStatus: "pending"
    });
  }

  return (
    <div className="transaction-complete-screen">

      <div className="transaction-complete-header">

        <button
          className="transaction-complete-back"
          onClick={onBack}
        >
          ← {text.back}
        </button>

        <div className="transaction-complete-speaker-area">

          <div className="transaction-speaker-finger-effect">
            <span className="transaction-speaker-ring ring-1"></span>
            <span className="transaction-speaker-ring ring-2"></span>
            <span className="transaction-speaker-ring ring-3"></span>

            <span className="transaction-speaker-finger">
              ☝️
            </span>
          </div>

          <button
            className="transaction-complete-speaker"
            onClick={speakCompletion}
          >
            <span>🔊</span>
            <span>{text.listen}</span>
          </button>

        </div>

      </div>

      <div className="transaction-complete-content">

        <div className="transaction-success-icon">
          ✓
        </div>

        <h1>{text.title}</h1>

        <p className="transaction-complete-subtitle">
          {text.subtitle}
        </p>

        <div className="transaction-completed-badge">
          ✓ {text.completed}
        </div>

        <div className="transaction-card">

          <div className="transaction-recycler-section">

            <div className="transaction-recycler-avatar">
              ♻
            </div>

            <div>
              <div className="transaction-small-label">
                {text.recycler}
              </div>

              <div className="transaction-recycler-name">
                {recyclerName}
              </div>

              <div className="transaction-recycler-id">
                {recyclerId}
              </div>

              <div className="transaction-recycler-verified">
                {text.verified}
              </div>
            </div>

          </div>

          <div className="transaction-divider"></div>

          <div className="transaction-details-grid">

            <div className="transaction-detail">
              <span>{text.transactionId}</span>
              <strong>{transactionId}</strong>
            </div>

            <div className="transaction-detail">
              <span>{text.lotId}</span>
              <strong>{lotId}</strong>
            </div>

            <div className="transaction-detail">
              <span>{text.material}</span>
              <strong>{material}</strong>
            </div>

            <div className="transaction-detail">
              <span>{text.weight}</span>
              <strong>{weight} kg</strong>
            </div>

            <div className="transaction-detail">
              <span>{text.agreedPrice}</span>
              <strong>₹{pricePerKg}/kg</strong>
            </div>

            <div className="transaction-detail">
              <span>{text.totalAmount}</span>
              <strong className="transaction-total">
                ₹{totalAmount}
              </strong>
            </div>

            <div className="transaction-detail">
              <span>{text.otp}</span>
              <strong className="transaction-otp">
                {text.verifiedStatus}
              </strong>
            </div>

          </div>

        </div>

        <div className="transaction-safe-message">

          <div className="transaction-safe-icon">
            🛡️
          </div>

          <div>
            <strong>{text.safe}</strong>
            <p>{text.safeText}</p>
          </div>

        </div>

        <div className="transaction-next-action">

          <div className="transaction-next-finger">
            ☝️
          </div>

          <button
            className="transaction-next-button"
            onClick={handleContinue}
          >
            {text.continue}
            <span>→</span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default TransactionCompleteScreen;