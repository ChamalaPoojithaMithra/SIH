import React, { useEffect } from "react";
import "./OfferSubmittedScreen.css";

function OfferSubmittedScreen({
  language,
  lot,
  offerData,
  onBack,
  onDone,
}) {
  const texts = {
    en: {
      title: "Offer Submitted",
      message: "Your offer has been sent to the collector.",
      material: "Material",
      weight: "Weight",
      offer: "Your Offer",
      pricePerKg: "Price per kg",
      waiting: "Waiting for collector response",
      done: "Done",
      back: "Back",
      voice:
        "Your offer has been submitted successfully. Please wait for the collector's response.",
    },

    te: {
      title: "ఆఫర్ పంపబడింది",
      message: "మీ ఆఫర్ కలెక్టర్‌కు పంపబడింది.",
      material: "మెటీరియల్",
      weight: "బరువు",
      offer: "మీ ఆఫర్",
      pricePerKg: "కిలో ధర",
      waiting: "కలెక్టర్ స్పందన కోసం వేచి ఉండండి",
      done: "పూర్తి",
      back: "వెనుకకు",
      voice:
        "మీ ఆఫర్ విజయవంతంగా పంపబడింది. కలెక్టర్ స్పందన కోసం వేచి ఉండండి.",
    },

    hi: {
      title: "ऑफर भेज दिया गया",
      message: "आपका ऑफर कलेक्टर को भेज दिया गया है।",
      material: "सामग्री",
      weight: "वजन",
      offer: "आपका ऑफर",
      pricePerKg: "प्रति किलो कीमत",
      waiting: "कलेक्टर के जवाब का इंतजार करें",
      done: "पूर्ण",
      back: "वापस",
      voice:
        "आपका ऑफर सफलतापूर्वक भेज दिया गया है। कलेक्टर के जवाब का इंतजार करें।",
    },

    mr: {
      title: "ऑफर पाठवला",
      message: "तुमची ऑफर कलेक्टरला पाठवली आहे.",
      material: "साहित्य",
      weight: "वजन",
      offer: "तुमची ऑफर",
      pricePerKg: "प्रति किलो किंमत",
      waiting: "कलेक्टरच्या प्रतिसादाची प्रतीक्षा करा",
      done: "पूर्ण",
      back: "मागे",
      voice:
        "तुमची ऑफर यशस्वीपणे पाठवली आहे. कलेक्टरच्या प्रतिसादाची प्रतीक्षा करा.",
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

  const offerAmount = Number(
    offerData?.offerPrice || 0
  );

  const weight = Number(
    lot?.weight || offerData?.weight || 0
  );

  const pricePerKg =
    weight > 0
      ? offerAmount / weight
      : 0;

  return (
    <div className="offer-submitted-screen">

      <div className="offer-submitted-card">

        {/* BACK BUTTON */}
        <button
          className="offer-submitted-back"
          onClick={() => {
            window.speechSynthesis.cancel();

            if (onBack) {
              onBack();
            }
          }}
        >
          ← {t.back}
        </button>


        {/* SUCCESS HEADER */}
        <div className="offer-success-header">

          <div className="success-icon">
            ✓
          </div>

          <h1>
            {t.title}
          </h1>

          <p className="offer-submitted-message">
            {t.message}
          </p>

        </div>


        {/* LOT INFORMATION */}
        <div className="submitted-lot">

          <div className="submitted-lot-icon">
            ♻️
          </div>

          <div className="submitted-lot-information">

            <h2>
              {lot?.material || "E-Waste"}
            </h2>

            <div className="submitted-lot-details">

              <span>
                ⚖️ {t.weight}: {weight} kg
              </span>

              <span>
                📍 {lot?.location || "—"}
              </span>

            </div>

          </div>

        </div>


        {/* OFFER DETAILS */}
        <div className="submitted-offer-box">

          <div className="submitted-offer-item">

            <span>
              {t.offer}
            </span>

            <strong>
              ₹
              {offerAmount.toLocaleString("en-IN")}
            </strong>

          </div>


          <div className="submitted-offer-item">

            <span>
              {t.pricePerKg}
            </span>

            <strong>
              ₹{pricePerKg.toFixed(2)}
            </strong>

          </div>

        </div>


        {/* WAITING MESSAGE */}
        <div className="waiting-box">

          <div className="waiting-icon">
            ⏳
          </div>

          <p>
            {t.waiting}
          </p>

        </div>


        {/* DONE BUTTON */}
        <button
          className="offer-done-button"
          onClick={() => {
            window.speechSynthesis.cancel();

            if (onDone) {
              onDone();
            }
          }}
        >
          <span className="offer-done-text">
            {t.done}
          </span>

          <span className="offer-done-arrow">
            →
          </span>
        </button>

      </div>

    </div>
  );
}

export default OfferSubmittedScreen;