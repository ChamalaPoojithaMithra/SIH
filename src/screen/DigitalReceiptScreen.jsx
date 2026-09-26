import React, { useEffect } from "react";
import "./DigitalReceiptScreen.css";

function DigitalReceiptScreen({
  language,
  lotData,
  onBack,
  onDone
}) {
  const translations = {
    en: {
      title: "Digital Receipt",
      subtitle: "Your e-waste transaction record",
      receipt: "DIGITAL RECEIPT",
      completed: "TRANSACTION COMPLETED",
      collector: "Collector",
      recycler: "Recycler",
      verified: "✓ Verified Recycler",
      transactionId: "Transaction ID",
      lotId: "Lot ID",
      material: "Material",
      weight: "Weight",
      price: "Agreed Price",
      total: "Total Amount",
      otp: "OTP Verification",
      verifiedStatus: "✓ Verified",
      payment: "Payment Status",
      paymentReady: "Ready",
      secure: "Secure transaction record",
      secureText:
        "This receipt contains the important details of your completed e-waste transaction.",
      done: "DONE",
      back: "BACK",
      listen: "Listen"
    },

    te: {
      title: "డిజిటల్ రసీదు",
      subtitle: "మీ ఈ-వేస్ట్ లావాదేవీ రికార్డు",
      receipt: "డిజిటల్ రసీదు",
      completed: "లావాదేవీ పూర్తయింది",
      collector: "కలెక్టర్",
      recycler: "రీసైక్లర్",
      verified: "✓ ధృవీకరించబడిన రీసైక్లర్",
      transactionId: "లావాదేవీ ID",
      lotId: "లాట్ ID",
      material: "మెటీరియల్",
      weight: "బరువు",
      price: "అంగీకరించిన ధర",
      total: "మొత్తం",
      otp: "OTP ధృవీకరణ",
      verifiedStatus: "✓ ధృవీకరించబడింది",
      payment: "చెల్లింపు స్థితి",
      paymentReady: "సిద్ధంగా ఉంది",
      secure: "సురక్షిత లావాదేవీ రికార్డు",
      secureText:
        "ఈ రసీదులో మీ పూర్తయిన ఈ-వేస్ట్ లావాదేవీకి సంబంధించిన ముఖ్యమైన వివరాలు ఉన్నాయి.",
      done: "పూర్తి",
      back: "వెనుకకు",
      listen: "వినండి"
    },

    hi: {
      title: "डिजिटल रसीद",
      subtitle: "आपके ई-वेस्ट लेन-देन का रिकॉर्ड",
      receipt: "डिजिटल रसीद",
      completed: "लेन-देन पूरा हुआ",
      collector: "कलेक्टर",
      recycler: "रीसाइकलर",
      verified: "✓ सत्यापित रीसाइकलर",
      transactionId: "लेन-देन ID",
      lotId: "लॉट ID",
      material: "सामग्री",
      weight: "वजन",
      price: "सहमत कीमत",
      total: "कुल राशि",
      otp: "OTP सत्यापन",
      verifiedStatus: "✓ सत्यापित",
      payment: "भुगतान स्थिति",
      paymentReady: "तैयार",
      secure: "सुरक्षित लेन-देन रिकॉर्ड",
      secureText:
        "इस रसीद में आपके पूरे हुए ई-वेस्ट लेन-देन की महत्वपूर्ण जानकारी है।",
      done: "पूरा करें",
      back: "वापस",
      listen: "सुनें"
    },

    mr: {
      title: "डिजिटल पावती",
      subtitle: "तुमच्या ई-वेस्ट व्यवहाराची नोंद",
      receipt: "डिजिटल पावती",
      completed: "व्यवहार पूर्ण",
      collector: "कलेक्टर",
      recycler: "रीसायकलर",
      verified: "✓ सत्यापित रीसायकलर",
      transactionId: "व्यवहार ID",
      lotId: "लॉट ID",
      material: "साहित्य",
      weight: "वजन",
      price: "मान्य किंमत",
      total: "एकूण रक्कम",
      otp: "OTP पडताळणी",
      verifiedStatus: "✓ सत्यापित",
      payment: "पेमेंट स्थिती",
      paymentReady: "तयार",
      secure: "सुरक्षित व्यवहार नोंद",
      secureText:
        "या पावतीमध्ये तुमच्या पूर्ण झालेल्या ई-वेस्ट व्यवहाराची महत्त्वाची माहिती आहे.",
      done: "पूर्ण",
      back: "मागे",
      listen: "ऐका"
    }
  };

  const text = translations[language] || translations.en;

  const collectorId = lotData?.collectorId || "COL001";
  const collectorName = lotData?.collectorName || "Collector";

  const recyclerName = lotData?.recyclerName || "Recycler A";
  const recyclerId = lotData?.recyclerId || "REC001";

  const transactionId =
    lotData?.transactionId || "TXN-2026-00001";

  const lotId =
    lotData?.lotId || "LOT-2026-0001";

  const material =
    lotData?.material || "Battery";

  const weight =
    Number(lotData?.weight) || 0;

  const pricePerKg =
    Number(lotData?.pricePerKg) || 420;

  const totalAmount =
    Number(lotData?.totalAmount) ||
    Number(lotData?.estimatedAmount) ||
    pricePerKg * weight;

  useEffect(() => {
    speakReceipt();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function getVoiceLanguage() {
    if (language === "te") return "te-IN";
    if (language === "hi") return "hi-IN";
    if (language === "mr") return "mr-IN";
    return "en-IN";
  }

  function speakReceipt() {
    window.speechSynthesis.cancel();

    const messages = {
      en: `Digital receipt. Transaction ${transactionId} is completed. Total amount is rupees ${totalAmount}.`,
      te: `డిజిటల్ రసీదు. లావాదేవీ ${transactionId} పూర్తయింది. మొత్తం ${totalAmount} రూపాయలు.`,
      hi: `डिजिटल रसीद। लेन-देन ${transactionId} पूरा हो गया है। कुल राशि ${totalAmount} रुपये है।`,
      mr: `डिजिटल पावती. व्यवहार ${transactionId} पूर्ण झाला आहे. एकूण रक्कम ${totalAmount} रुपये आहे.`
    };

    const speech = new SpeechSynthesisUtterance(
      messages[language] || messages.en
    );

    speech.lang = getVoiceLanguage();
    speech.rate = 0.8;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }

  function handleDone() {
    window.speechSynthesis.cancel();
    onDone();
  }

  return (
    <div className="digital-receipt-screen">

      <div className="digital-receipt-header">

        <button
          className="digital-receipt-back"
          onClick={onBack}
        >
          ← {text.back}
        </button>

        <div className="receipt-speaker-area">

          <div className="receipt-finger-effect">
            <span className="receipt-speaker-ring ring-1"></span>
            <span className="receipt-speaker-ring ring-2"></span>
            <span className="receipt-speaker-ring ring-3"></span>

            <span className="receipt-speaker-finger">
              ☝️
            </span>
          </div>

          <button
            className="receipt-speaker"
            onClick={speakReceipt}
          >
            <span>🔊</span>
            <span>{text.listen}</span>
          </button>

        </div>

      </div>

      <div className="digital-receipt-content">

        <div className="receipt-success-icon">
          ✓
        </div>

        <h1>{text.title}</h1>

        <p className="receipt-subtitle">
          {text.subtitle}
        </p>

        <div className="receipt-completed-badge">
          ✓ {text.completed}
        </div>

        <div className="digital-receipt-card">

          <div className="receipt-card-heading">
            <div className="receipt-symbol">
              ♻
            </div>

            <div>
              <h2>{text.receipt}</h2>
              <span>{transactionId}</span>
            </div>
          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-people">

            <div className="receipt-person">

              <span className="receipt-label">
                {text.collector}
              </span>

              <strong>
                {collectorName}
              </strong>

              <small>
                {collectorId}
              </small>

            </div>

            <div className="receipt-person">

              <span className="receipt-label">
                {text.recycler}
              </span>

              <strong>
                {recyclerName}
              </strong>

              <small>
                {recyclerId}
              </small>

              <em>
                {text.verified}
              </em>

            </div>

          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-details">

            <div className="receipt-row">
              <span>{text.transactionId}</span>
              <strong>{transactionId}</strong>
            </div>

            <div className="receipt-row">
              <span>{text.lotId}</span>
              <strong>{lotId}</strong>
            </div>

            <div className="receipt-row">
              <span>{text.material}</span>
              <strong>{material}</strong>
            </div>

            <div className="receipt-row">
              <span>{text.weight}</span>
              <strong>{weight} kg</strong>
            </div>

            <div className="receipt-row">
              <span>{text.price}</span>
              <strong>₹{pricePerKg}/kg</strong>
            </div>

            <div className="receipt-row receipt-total-row">
              <span>{text.total}</span>
              <strong>₹{totalAmount}</strong>
            </div>

            <div className="receipt-row">
              <span>{text.otp}</span>
              <strong className="receipt-verified">
                {text.verifiedStatus}
              </strong>
            </div>

            <div className="receipt-row">
              <span>{text.payment}</span>
              <strong className="receipt-payment-ready">
                ✓ {text.paymentReady}
              </strong>
            </div>

          </div>

          <div className="receipt-footer">
            <span>✓</span>
            <span>{text.secure}</span>
          </div>

        </div>

        <div className="receipt-safe-message">

          <div className="receipt-info-icon">
            🛡️
          </div>

          <div>
            <strong>{text.secure}</strong>
            <p>{text.secureText}</p>
          </div>

        </div>

        <div className="receipt-done-action">

          <div className="receipt-done-finger">
            ☝️
          </div>

          <button
            className="receipt-done-button"
            onClick={handleDone}
          >
            {text.done}
            <span>✓</span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default DigitalReceiptScreen;