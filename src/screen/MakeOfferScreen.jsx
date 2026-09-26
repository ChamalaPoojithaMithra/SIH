import React, { useEffect, useState } from "react";
import "./MakeOfferScreen.css";

function MakeOfferScreen({
  language,
  lot,
  onBack,
  onSubmitOffer,
}) {
  const [offerPrice, setOfferPrice] = useState("");

  const texts = {
    en: {
      title: "Make an Offer",
      material: "Material",
      weight: "Weight",
      location: "Location",
      expected: "Expected Value",
      yourOffer: "Your Offer",
      enterAmount: "Enter offer amount",
      perKg: "Price per kg",
      total: "Total Offer",
      submit: "Submit Offer",
      back: "Back",
      voice: "Enter the amount you want to offer.",
      invalid: "Please enter a valid offer amount.",
    },

    te: {
      title: "ఆఫర్ ఇవ్వండి",
      material: "మెటీరియల్",
      weight: "బరువు",
      location: "ప్రదేశం",
      expected: "అంచనా విలువ",
      yourOffer: "మీ ఆఫర్",
      enterAmount: "ఆఫర్ మొత్తాన్ని నమోదు చేయండి",
      perKg: "కిలో ధర",
      total: "మొత్తం ఆఫర్",
      submit: "ఆఫర్ పంపండి",
      back: "వెనుకకు",
      voice: "మీరు ఇవ్వాలనుకుంటున్న ఆఫర్ మొత్తాన్ని నమోదు చేయండి.",
      invalid: "దయచేసి సరైన ఆఫర్ మొత్తాన్ని నమోదు చేయండి.",
    },

    hi: {
      title: "ऑफर दें",
      material: "सामग्री",
      weight: "वजन",
      location: "स्थान",
      expected: "अनुमानित मूल्य",
      yourOffer: "आपका ऑफर",
      enterAmount: "ऑफर राशि दर्ज करें",
      perKg: "प्रति किलो कीमत",
      total: "कुल ऑफर",
      submit: "ऑफर भेजें",
      back: "वापस",
      voice: "आप जो ऑफर देना चाहते हैं वह राशि दर्ज करें।",
      invalid: "कृपया सही ऑफर राशि दर्ज करें।",
    },

    mr: {
      title: "ऑफर द्या",
      material: "साहित्य",
      weight: "वजन",
      location: "ठिकाण",
      expected: "अंदाजे मूल्य",
      yourOffer: "तुमची ऑफर",
      enterAmount: "ऑफरची रक्कम भरा",
      perKg: "प्रति किलो किंमत",
      total: "एकूण ऑफर",
      submit: "ऑफर पाठवा",
      back: "मागे",
      voice: "तुम्हाला द्यायची असलेली ऑफर रक्कम भरा.",
      invalid: "कृपया योग्य ऑफर रक्कम भरा.",
    },
  };

  const t = texts[language] || texts.en;

  useEffect(() => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(t.voice);

    const voices = window.speechSynthesis.getVoices();

    const voiceLocale = {
      en: "en-IN",
      te: "te-IN",
      hi: "hi-IN",
      mr: "mr-IN",
    };

    const selectedVoice = voices.find(
      (voice) => voice.lang === voiceLocale[language]
    );

    if (selectedVoice) {
      speech.voice = selectedVoice;
    }

    speech.lang = voiceLocale[language] || "en-IN";
    speech.rate = 0.9;

    window.speechSynthesis.speak(speech);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language, t.voice]);

  function handleSubmit() {
    const amount = Number(offerPrice);

    if (!amount || amount <= 0) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(t.invalid);

      speech.lang =
        {
          en: "en-IN",
          te: "te-IN",
          hi: "hi-IN",
          mr: "mr-IN",
        }[language] || "en-IN";

      window.speechSynthesis.speak(speech);

      return;
    }

    window.speechSynthesis.cancel();

    const offerData = {
      lot,
      offerPrice: amount,
      weight: Number(lot?.weight) || 0,
      pricePerKg:
        Number(lot?.weight) > 0
          ? amount / Number(lot.weight)
          : 0,
    };

    console.log("Recycler Offer:", offerData);

    if (onSubmitOffer) {
      onSubmitOffer(offerData);
    }
  }

  const weight = Number(lot?.weight) || 0;

  const pricePerKg =
    weight > 0 && Number(offerPrice) > 0
      ? Number(offerPrice) / weight
      : 0;

  return (
    <div className="make-offer-screen">

      <div className="make-offer-card">

        {/* BACK BUTTON */}
        <button
          className="make-offer-back"
          onClick={() => {
            window.speechSynthesis.cancel();

            if (onBack) {
              onBack();
            }
          }}
        >
          ← {t.back}
        </button>


        {/* HEADER */}
        <div className="make-offer-header">

          <div className="make-offer-title-icon">
            💰
          </div>

          <div>
            <h1>{t.title}</h1>

            <p>
              {t.material}:{" "}
              {lot?.material || "E-Waste"}
            </p>
          </div>

        </div>


        {/* LOT INFORMATION */}
        <div className="make-offer-lot">

          <div className="lot-icon">
            ♻️
          </div>

          <div className="lot-information">

            <h2>
              {lot?.material || "E-Waste"}
            </h2>

            <div className="lot-basic-details">

              <span>
                ⚖️ {t.weight}:{" "}
                {lot?.weight || 0} kg
              </span>

              <span>
                📍 {t.location}:{" "}
                {lot?.location || "—"}
              </span>

            </div>

          </div>

        </div>


        {/* EXPECTED VALUE */}
        <div className="make-offer-info">

          <div className="expected-value-box">

            <span>
              {t.expected}
            </span>

            <strong>
              ₹
              {Number(
                lot?.value || lot?.price || 0
              ).toLocaleString("en-IN")}
            </strong>

          </div>

        </div>


        {/* OFFER INPUT */}
        <div className="make-offer-input-section">

          <label>
            {t.yourOffer}
          </label>

          <p className="make-offer-helper">
            {t.enterAmount}
          </p>

          <div className="offer-input-wrapper">

            <span>₹</span>

            <input
              type="number"
              value={offerPrice}
              onChange={(e) =>
                setOfferPrice(e.target.value)
              }
              placeholder="0"
              min="1"
            />

          </div>

        </div>


        {/* CALCULATIONS */}
        <div className="offer-calculation">

          <div className="calculation-item">

            <span>
              {t.perKg}
            </span>

            <strong>
              ₹{pricePerKg.toFixed(2)}
            </strong>

          </div>


          <div className="calculation-item">

            <span>
              {t.total}
            </span>

            <strong>
              ₹
              {Number(
                offerPrice || 0
              ).toLocaleString("en-IN")}
            </strong>

          </div>

        </div>


        {/* SUBMIT BUTTON */}
        <button
          className="submit-offer-button"
          onClick={handleSubmit}
        >
          <span className="submit-offer-text">
            💰 {t.submit}
          </span>

          <span className="submit-offer-arrow">
            →
          </span>
        </button>

      </div>

    </div>
  );
}

export default MakeOfferScreen;