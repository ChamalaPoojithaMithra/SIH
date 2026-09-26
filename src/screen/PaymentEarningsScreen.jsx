import React, { useEffect, useState } from "react";
import "./PaymentEarningsScreen.css";

function PaymentEarningsScreen({
  language,
  lotData,
  onBack,
  onContinue
}) {
  const [paymentStatus, setPaymentStatus] = useState("processing");

  const translations = {
    en: {
      title: "Payment & Earnings",
      subtitle: "Your transaction amount is being processed",
      processing: "PAYMENT PROCESSING",
      success: "PAYMENT READY",
      recycler: "Recycler",
      verified: "✓ Verified Recycler",
      transactionId: "Transaction ID",
      material: "Material",
      weight: "Weight",
      price: "Agreed Price",
      amount: "Your Earnings",
      status: "Payment Status",
      processingText: "Checking your payment details...",
      successText: "Your transaction amount is ready.",
      note: "Payment status shown here is part of the demo transaction flow.",
      continue: "VIEW DIGITAL RECEIPT",
      back: "BACK",
      listen: "Listen"
    },

    te: {
      title: "చెల్లింపు & ఆదాయాలు",
      subtitle: "మీ లావాదేవీ మొత్తం ప్రాసెస్ చేయబడుతోంది",
      processing: "చెల్లింపు ప్రాసెసింగ్",
      success: "చెల్లింపు సిద్ధంగా ఉంది",
      recycler: "రీసైక్లర్",
      verified: "✓ ధృవీకరించబడిన రీసైక్లర్",
      transactionId: "లావాదేవీ ID",
      material: "మెటీరియల్",
      weight: "బరువు",
      price: "అంగీకరించిన ధర",
      amount: "మీ ఆదాయం",
      status: "చెల్లింపు స్థితి",
      processingText: "మీ చెల్లింపు వివరాలను తనిఖీ చేస్తున్నాము...",
      successText: "మీ లావాదేవీ మొత్తం సిద్ధంగా ఉంది.",
      note: "ఇక్కడ చూపిన చెల్లింపు స్థితి డెమో లావాదేవీ ప్రక్రియలో భాగం.",
      continue: "డిజిటల్ రసీదు చూడండి",
      back: "వెనుకకు",
      listen: "వినండి"
    },

    hi: {
      title: "भुगतान और कमाई",
      subtitle: "आपकी लेन-देन राशि प्रोसेस की जा रही है",
      processing: "भुगतान प्रोसेस हो रहा है",
      success: "भुगतान तैयार है",
      recycler: "रीसाइकलर",
      verified: "✓ सत्यापित रीसाइकलर",
      transactionId: "लेन-देन ID",
      material: "सामग्री",
      weight: "वजन",
      price: "सहमत कीमत",
      amount: "आपकी कमाई",
      status: "भुगतान स्थिति",
      processingText: "आपके भुगतान की जानकारी जांची जा रही है...",
      successText: "आपकी लेन-देन राशि तैयार है।",
      note: "यह भुगतान स्थिति डेमो लेन-देन प्रक्रिया का हिस्सा है।",
      continue: "डिजिटल रसीद देखें",
      back: "वापस",
      listen: "सुनें"
    },

    mr: {
      title: "पेमेंट आणि कमाई",
      subtitle: "तुमची व्यवहाराची रक्कम प्रक्रिया केली जात आहे",
      processing: "पेमेंट प्रक्रिया सुरू",
      success: "पेमेंट तयार आहे",
      recycler: "रीसायकलर",
      verified: "✓ सत्यापित रीसायकलर",
      transactionId: "व्यवहार ID",
      material: "साहित्य",
      weight: "वजन",
      price: "मान्य किंमत",
      amount: "तुमची कमाई",
      status: "पेमेंट स्थिती",
      processingText: "तुमच्या पेमेंटची माहिती तपासली जात आहे...",
      successText: "तुमची व्यवहाराची रक्कम तयार आहे.",
      note: "येथे दाखवलेली पेमेंट स्थिती डेमो व्यवहार प्रक्रियेचा भाग आहे.",
      continue: "डिजिटल पावती पहा",
      back: "मागे",
      listen: "ऐका"
    }
  };

  const text = translations[language] || translations.en;

  const recyclerName = lotData?.recyclerName || "Recycler A";
  const recyclerId = lotData?.recyclerId || "REC001";
  const transactionId =
    lotData?.transactionId || "TXN-2026-00001";

  const material = lotData?.material || "Battery";
  const weight = Number(lotData?.weight) || 0;
  const pricePerKg = Number(lotData?.pricePerKg) || 420;

  const totalAmount =
    Number(lotData?.totalAmount) ||
    Number(lotData?.estimatedAmount) ||
    pricePerKg * weight;

  useEffect(() => {
    speakProcessing();

    const timer = setTimeout(() => {
      setPaymentStatus("ready");
      speakPaymentReady();
    }, 1800);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, []);

  function getVoiceLanguage() {
    if (language === "te") return "te-IN";
    if (language === "hi") return "hi-IN";
    if (language === "mr") return "mr-IN";
    return "en-IN";
  }

  function speakProcessing() {
    window.speechSynthesis.cancel();

    const messages = {
      en: "Payment processing. Checking your transaction details.",
      te: "చెల్లింపు ప్రాసెస్ అవుతోంది. మీ లావాదేవీ వివరాలను తనిఖీ చేస్తున్నాము.",
      hi: "भुगतान प्रोसेस हो रहा है। आपकी लेन-देन की जानकारी जांची जा रही है।",
      mr: "पेमेंट प्रक्रिया सुरू आहे. तुमच्या व्यवहाराची माहिती तपासली जात आहे."
    };

    const speech = new SpeechSynthesisUtterance(
      messages[language] || messages.en
    );

    speech.lang = getVoiceLanguage();
    speech.rate = 0.8;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }

  function speakPaymentReady() {
    window.speechSynthesis.cancel();

    const messages = {
      en: `Payment ready. Your earnings are rupees ${totalAmount}.`,
      te: `చెల్లింపు సిద్ధంగా ఉంది. మీ ఆదాయం ${totalAmount} రూపాయలు.`,
      hi: `भुगतान तैयार है। आपकी कमाई ${totalAmount} रुपये है।`,
      mr: `पेमेंट तयार आहे. तुमची कमाई ${totalAmount} रुपये आहे.`
    };

    const speech = new SpeechSynthesisUtterance(
      messages[language] || messages.en
    );

    speech.lang = getVoiceLanguage();
    speech.rate = 0.8;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }

  function speakCurrentScreen() {
    if (paymentStatus === "processing") {
      speakProcessing();
    } else {
      speakPaymentReady();
    }
  }

  function handleContinue() {
    window.speechSynthesis.cancel();

    onContinue({
      paymentStatus: "ready",
      totalAmount
    });
  }

  return (
    <div className="payment-earnings-screen">

      <div className="payment-earnings-header">

        <button
          className="payment-earnings-back"
          onClick={onBack}
        >
          ← {text.back}
        </button>

        <div className="payment-speaker-area">

          <div className="payment-finger-effect">
            <span className="payment-speaker-ring ring-1"></span>
            <span className="payment-speaker-ring ring-2"></span>
            <span className="payment-speaker-ring ring-3"></span>

            <span className="payment-speaker-finger">
              ☝️
            </span>
          </div>

          <button
            className="payment-speaker"
            onClick={speakCurrentScreen}
          >
            <span>🔊</span>
            <span>{text.listen}</span>
          </button>

        </div>

      </div>

      <div className="payment-earnings-content">

        <div className="payment-main-icon">
          {paymentStatus === "processing" ? "₹" : "✓"}
        </div>

        <h1>{text.title}</h1>

        <p className="payment-subtitle">
          {text.subtitle}
        </p>

        <div
          className={
            paymentStatus === "processing"
              ? "payment-status-badge processing"
              : "payment-status-badge ready"
          }
        >
          {paymentStatus === "processing"
            ? "⏳ " + text.processing
            : "✓ " + text.success}
        </div>

        <div className="payment-card">

          <div className="payment-recycler-section">

            <div className="payment-recycler-avatar">
              ♻
            </div>

            <div>
              <div className="payment-small-label">
                {text.recycler}
              </div>

              <div className="payment-recycler-name">
                {recyclerName}
              </div>

              <div className="payment-recycler-id">
                {recyclerId}
              </div>

              <div className="payment-recycler-verified">
                {text.verified}
              </div>
            </div>

          </div>

          <div className="payment-divider"></div>

          <div className="payment-details-grid">

            <div className="payment-detail">
              <span>{text.transactionId}</span>
              <strong>{transactionId}</strong>
            </div>

            <div className="payment-detail">
              <span>{text.material}</span>
              <strong>{material}</strong>
            </div>

            <div className="payment-detail">
              <span>{text.weight}</span>
              <strong>{weight} kg</strong>
            </div>

            <div className="payment-detail">
              <span>{text.price}</span>
              <strong>₹{pricePerKg}/kg</strong>
            </div>

          </div>

          <div className="payment-amount-box">

            <span>{text.amount}</span>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>

          <div className="payment-status-row">

            <span>{text.status}</span>

            <strong
              className={
                paymentStatus === "processing"
                  ? "payment-processing-text"
                  : "payment-ready-text"
              }
            >
              {paymentStatus === "processing"
                ? "⏳ " + text.processing
                : "✓ " + text.success}
            </strong>

          </div>

        </div>

        <div className="payment-info-message">

          <span className="payment-info-icon">
            ℹ️
          </span>

          <div>
            <strong>
              {paymentStatus === "processing"
                ? text.processingText
                : text.successText}
            </strong>

            <p>{text.note}</p>
          </div>

        </div>

        <div className="payment-next-action">

          <div className="payment-next-finger">
            ☝️
          </div>

          <button
            className="payment-next-button"
            onClick={handleContinue}
            disabled={paymentStatus !== "ready"}
          >
            {text.continue}
            <span>→</span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default PaymentEarningsScreen;