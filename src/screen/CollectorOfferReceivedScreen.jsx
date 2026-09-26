import React, { useEffect } from "react";
import "./CollectorOfferReceivedScreen.css";

function CollectorOfferReceivedScreen({
  language,
  offerData,
  onBack,
  onAccept,
  onReject,
}) {
  const texts = {
    en: {
      title: "New Offer Received",
      message: "A verified recycler has sent an offer for your e-waste.",
      recycler: "Verified Recycler",
      material: "Material",
      weight: "Weight",
      offer: "Offer Amount",
      pricePerKg: "Price per kg",
      accept: "Accept Offer",
      reject: "Reject",
      back: "Back",
      voice:
        "You have received a new offer from a verified recycler. Check the offer amount and choose Accept Offer or Reject.",
    },

    te: {
      title: "కొత్త ఆఫర్ వచ్చింది",
      message: "మీ ఈ-వేస్ట్ కోసం ధృవీకరించబడిన రీసైక్లర్ ఆఫర్ పంపారు.",
      recycler: "ధృవీకరించబడిన రీసైక్లర్",
      material: "మెటీరియల్",
      weight: "బరువు",
      offer: "ఆఫర్ మొత్తం",
      pricePerKg: "కిలో ధర",
      accept: "ఆఫర్ అంగీకరించండి",
      reject: "తిరస్కరించండి",
      back: "వెనుకకు",
      voice:
        "ధృవీకరించబడిన రీసైక్లర్ నుండి మీకు కొత్త ఆఫర్ వచ్చింది. ఆఫర్ మొత్తాన్ని చూసి అంగీకరించండి లేదా తిరస్కరించండి.",
    },

    hi: {
      title: "नया ऑफर मिला",
      message: "आपके ई-वेस्ट के लिए एक सत्यापित रीसाइक्लर ने ऑफर भेजा है।",
      recycler: "सत्यापित रीसाइक्लर",
      material: "सामग्री",
      weight: "वजन",
      offer: "ऑफर राशि",
      pricePerKg: "प्रति किलो कीमत",
      accept: "ऑफर स्वीकार करें",
      reject: "अस्वीकार करें",
      back: "वापस",
      voice:
        "आपको एक सत्यापित रीसाइक्लर से नया ऑफर मिला है। ऑफर राशि देखें और स्वीकार या अस्वीकार करें।",
    },

    mr: {
      title: "नवीन ऑफर मिळाला",
      message: "तुमच्या ई-वेस्टसाठी सत्यापित रीसायकलरने ऑफर पाठवला आहे.",
      recycler: "सत्यापित रीसायकलर",
      material: "साहित्य",
      weight: "वजन",
      offer: "ऑफर रक्कम",
      pricePerKg: "प्रति किलो किंमत",
      accept: "ऑफर स्वीकारा",
      reject: "नकार द्या",
      back: "मागे",
      voice:
        "तुम्हाला सत्यापित रीसायकलरकडून नवीन ऑफर मिळाला आहे. ऑफरची रक्कम पाहा आणि स्वीकारा किंवा नकार द्या.",
    },
  };

  const t = texts[language] || texts.en;

  useEffect(() => {
    window.speechSynthesis.cancel();

    const locale =
      {
        en: "en-IN",
        te: "te-IN",
        hi: "hi-IN",
        mr: "mr-IN",
      }[language] || "en-IN";

    const speech = new SpeechSynthesisUtterance(t.voice);
    speech.lang = locale;
    speech.rate = 0.9;

    window.speechSynthesis.speak(speech);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language, t.voice]);

  const lot = offerData?.lot || {};
  const offerAmount = Number(offerData?.offerPrice || 0);
  const weight = Number(lot?.weight || offerData?.weight || 0);

  const pricePerKg =
    weight > 0 ? offerAmount / weight : 0;

  return (
    <div className="collector-offer-screen">

      <div className="collector-offer-card">

        <button
          className="collector-offer-back"
          onClick={() => {
            window.speechSynthesis.cancel();

            if (onBack) {
              onBack();
            }
          }}
        >
          ← {t.back}
        </button>

        <div className="offer-notification-icon">
          🔔
        </div>

        <h1>{t.title}</h1>

        <p className="collector-offer-message">
          {t.message}
        </p>

        <div className="verified-recycler-box">

          <div className="recycler-avatar">
            ♻️
          </div>

          <div>
            <h2>{t.recycler}</h2>

            <p>
              ✓ Verified Recycler
            </p>
          </div>

        </div>

        <div className="collector-offer-lot">

          <div>
            <span>{t.material}</span>
            <strong>
              {lot?.material || "E-Waste"}
            </strong>
          </div>

          <div>
            <span>{t.weight}</span>
            <strong>
              {weight} kg
            </strong>
          </div>

        </div>

        <div className="received-offer-box">

          <span>{t.offer}</span>

          <strong>
            ₹{offerAmount.toLocaleString("en-IN")}
          </strong>

          <p>
            {t.pricePerKg}: ₹{pricePerKg.toFixed(2)}
          </p>

        </div>

        <div className="collector-offer-guidance">
          ☝️
        </div>

        <button
          className="accept-offer-button"
          onClick={() => {
            window.speechSynthesis.cancel();

            if (onAccept) {
              onAccept(offerData);
            }
          }}
        >
          {t.accept}
        </button>

        <button
          className="reject-offer-button"
          onClick={() => {
            window.speechSynthesis.cancel();

            if (onReject) {
              onReject(offerData);
            }
          }}
        >
          {t.reject}
        </button>

      </div>

    </div>
  );
}

export default CollectorOfferReceivedScreen;