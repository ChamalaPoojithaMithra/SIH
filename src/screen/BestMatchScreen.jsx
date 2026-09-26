import React, { useEffect, useState } from "react";
import "./BestMatchScreen.css";

function BestMatchScreen({
  language,
  lotData,
  onBack,
  onAcceptOffer
}) {
  const [speaking, setSpeaking] = useState(false);

  const translations = {
    en: {
      title: "Your Best Match",
      subtitle: "We found a trusted recycler for your e-waste",
      best: "BEST MATCH",
      verified: "Verified Recycler",
      offer: "Offer Price",
      distance: "Distance",
      pickup: "Pickup available",
      estimated: "Estimated amount",
      why: "Why this recycler?",
      reason1: "Accepts your e-waste material",
      reason2: "Nearby pickup location",
      reason3: "Verified recycler",
      reason4: "Pickup is available",
      accept: "ACCEPT OFFER",
      back: "Back",
      listen: "Listen",
      safe: "The offer will be locked after you accept it",
      demo: "Demo offer"
    },

    te: {
      title: "మీ ఉత్తమ ఎంపిక",
      subtitle: "మీ ఈ-వేస్ట్ కోసం నమ్మకమైన రీసైక్లర్‌ను కనుగొన్నాము",
      best: "ఉత్తమ ఎంపిక",
      verified: "ధృవీకరించిన రీసైక్లర్",
      offer: "ఆఫర్ ధర",
      distance: "దూరం",
      pickup: "పికప్ అందుబాటులో ఉంది",
      estimated: "అంచనా మొత్తం",
      why: "ఈ రీసైక్లర్ ఎందుకు?",
      reason1: "మీ ఈ-వేస్ట్ మెటీరియల్‌ను అంగీకరిస్తారు",
      reason2: "పికప్ ప్రదేశం దగ్గరగా ఉంది",
      reason3: "ధృవీకరించిన రీసైక్లర్",
      reason4: "పికప్ అందుబాటులో ఉంది",
      accept: "ఆఫర్‌ను అంగీకరించండి",
      back: "వెనుకకు",
      listen: "వినండి",
      safe: "మీరు అంగీకరించిన తర్వాత ఆఫర్ లాక్ అవుతుంది",
      demo: "డెమో ఆఫర్"
    },

    hi: {
      title: "आपका सबसे अच्छा मैच",
      subtitle: "आपके ई-वेस्ट के लिए भरोसेमंद रिसाइक्लर मिला",
      best: "सबसे अच्छा मैच",
      verified: "सत्यापित रिसाइक्लर",
      offer: "ऑफर कीमत",
      distance: "दूरी",
      pickup: "पिकअप उपलब्ध",
      estimated: "अनुमानित राशि",
      why: "यह रिसाइक्लर क्यों?",
      reason1: "आपका ई-वेस्ट स्वीकार करता है",
      reason2: "पिकअप स्थान पास है",
      reason3: "सत्यापित रिसाइक्लर",
      reason4: "पिकअप उपलब्ध है",
      accept: "ऑफर स्वीकार करें",
      back: "वापस",
      listen: "सुनें",
      safe: "स्वीकार करने के बाद ऑफर लॉक हो जाएगा",
      demo: "डेमो ऑफर"
    },

    mr: {
      title: "तुमची सर्वोत्तम जुळणी",
      subtitle: "तुमच्या ई-वेस्टसाठी विश्वासू रिसायकलर सापडला",
      best: "सर्वोत्तम जुळणी",
      verified: "सत्यापित रिसायकलर",
      offer: "ऑफर किंमत",
      distance: "अंतर",
      pickup: "पिकअप उपलब्ध",
      estimated: "अंदाजे रक्कम",
      why: "हा रिसायकलर का?",
      reason1: "तुमचा ई-वेस्ट स्वीकारतो",
      reason2: "पिकअप ठिकाण जवळ आहे",
      reason3: "सत्यापित रिसायकलर",
      reason4: "पिकअप उपलब्ध आहे",
      accept: "ऑफर स्वीकारा",
      back: "मागे",
      listen: "ऐका",
      safe: "स्वीकारल्यानंतर ऑफर लॉक केली जाईल",
      demo: "डेमो ऑफर"
    }
  };

  const text = translations[language] || translations.en;

  const weight = Number(lotData?.weight) || 0;
  const pricePerKg = 420;
  const estimatedAmount = weight * pricePerKg;

  useEffect(() => {
    speakScreen();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function speakScreen() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      `${text.title}. ${text.subtitle}. ${text.offer}: ${pricePerKg} rupees per kilogram. ${text.distance}: 8 kilometers. ${text.pickup}. ${text.accept}`
    );

    const voices = {
      en: "en-IN",
      te: "te-IN",
      hi: "hi-IN",
      mr: "mr-IN"
    };

    speech.lang = voices[language] || "en-IN";
    speech.rate = 0.8;
    speech.pitch = 1;

    speech.onstart = () => setSpeaking(true);
    speech.onend = () => setSpeaking(false);
    speech.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(speech);
  }

  function handleAcceptOffer() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      text.accept
    );

    const voices = {
      en: "en-IN",
      te: "te-IN",
      hi: "hi-IN",
      mr: "mr-IN"
    };

    speech.lang = voices[language] || "en-IN";
    speech.rate = 0.8;

    speech.onend = () => {
      onAcceptOffer({
        recyclerId: "REC001",
        recyclerName: "Recycler A",
        pricePerKg: pricePerKg,
        distance: 8,
        pickupAvailable: true,
        estimatedAmount: estimatedAmount
      });
    };

    speech.onerror = () => {
      onAcceptOffer({
        recyclerId: "REC001",
        recyclerName: "Recycler A",
        pricePerKg: pricePerKg,
        distance: 8,
        pickupAvailable: true,
        estimatedAmount: estimatedAmount
      });
    };

    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="best-match-screen">

      {/* Back Button */}

      <button
        className="best-match-back-button"
        onClick={() => {
          window.speechSynthesis.cancel();
          onBack();
        }}
      >
        ← {text.back}
      </button>

      {/* Listen Button - Top Right */}

      <div className="best-match-speaker-area">

        <button
          className={`best-match-speaker-button ${
            speaking ? "speaking" : ""
          }`}
          onClick={speakScreen}
        >
          🔊 {text.listen}
        </button>

      </div>

      <div className="best-match-content">

        {/* Top Icon */}

        <div className="best-match-top-icon">
          ★
        </div>

        <h1>{text.title}</h1>

        <p className="best-match-subtitle">
          {text.subtitle}
        </p>

        {/* Recycler Card */}

        <div className="best-recycler-card">

          <div className="best-badge">
            ✓ {text.best}
          </div>

          <div className="best-recycler-header">

            <div className="best-recycler-avatar">
              ♻
            </div>

            <div>
              <h2>Recycler A</h2>

              <p>
                ✓ {text.verified}
              </p>
            </div>

          </div>

          {/* Offer Price */}

          <div className="best-offer-price">

            <small>{text.offer}</small>

            <strong>
              ₹{pricePerKg}/kg
            </strong>

            <span>{text.demo}</span>

          </div>

          {/* Recycler Information */}

          <div className="best-recycler-info">

            <div>
              <span>📍</span>

              <section>
                <small>{text.distance}</small>
                <strong>8 km</strong>
              </section>
            </div>

            <div>
              <span>🚚</span>

              <section>
                <small>{text.pickup}</small>
                <strong>Available</strong>
              </section>
            </div>

          </div>

          {/* Estimated Amount */}

          <div className="estimated-amount">

            <span>{text.estimated}</span>

            <strong>
              ₹{estimatedAmount.toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

        {/* Why Section */}

        <div className="why-section">

          <h2>{text.why}</h2>

          <div className="reason-list">

            <div>
              <span>✓</span>
              <p>{text.reason1}</p>
            </div>

            <div>
              <span>✓</span>
              <p>{text.reason2}</p>
            </div>

            <div>
              <span>✓</span>
              <p>{text.reason3}</p>
            </div>

            <div>
              <span>✓</span>
              <p>{text.reason4}</p>
            </div>

          </div>

        </div>

        {/* Safety Message */}

        <div className="best-match-safe">
          🛡️ {text.safe}
        </div>

        {/* Accept Offer */}

        <div className="accept-offer-area">

          <button
            className="accept-offer-button"
            onClick={handleAcceptOffer}
          >
            {text.accept}
            <span>→</span>
          </button>

        </div>

      </div>

    </div>
  );
}

export default BestMatchScreen;