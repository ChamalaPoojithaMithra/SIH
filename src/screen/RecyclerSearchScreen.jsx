import React, { useEffect, useState } from "react";
import "./RecyclerSearchScreen.css";

function RecyclerSearchScreen({
  language,
  lotData,
  onBack,
  onComplete
}) {
  const [speaking, setSpeaking] = useState(false);

  const text = {
    en: {
      title: "Finding Verified Recyclers",
      subtitle:
        "We are finding trusted buyers for your e-waste",
      searching:
        "Checking nearby verified recyclers...",
      material: "Material",
      weight: "Weight",
      lotId: "Lot ID",
      verified: "Verified recyclers only",
      safe: "Your details are safe",
      listen: "Listen",
      back: "Back"
    },

    te: {
      title: "వెరిఫైడ్ రీసైక్లర్లను వెతుకుతున్నాము",
      subtitle:
        "మీ ఈ-వేస్ట్ కోసం నమ్మకమైన కొనుగోలుదారులను వెతుకుతున్నాము",
      searching:
        "దగ్గరలోని వెరిఫైడ్ రీసైక్లర్లను పరిశీలిస్తున్నాము...",
      material: "మెటీరియల్",
      weight: "బరువు",
      lotId: "లాట్ ID",
      verified: "వెరిఫైడ్ రీసైక్లర్లు మాత్రమే",
      safe: "మీ వివరాలు సురక్షితంగా ఉన్నాయి",
      listen: "వినండి",
      back: "వెనుకకు"
    },

    hi: {
      title: "सत्यापित रीसाइक्लर खोज रहे हैं",
      subtitle:
        "आपके ई-वेस्ट के लिए भरोसेमंद खरीदार खोज रहे हैं",
      searching:
        "पास के सत्यापित रीसाइक्लर खोजे जा रहे हैं...",
      material: "सामग्री",
      weight: "वजन",
      lotId: "लॉट ID",
      verified: "केवल सत्यापित रीसाइक्लर",
      safe: "आपकी जानकारी सुरक्षित है",
      listen: "सुनें",
      back: "वापस"
    },

    mr: {
      title: "सत्यापित रिसायकलर्स शोधत आहोत",
      subtitle:
        "तुमच्या ई-वेस्टसाठी विश्वासू खरेदीदार शोधत आहोत",
      searching:
        "जवळचे सत्यापित रिसायकलर्स शोधत आहोत...",
      material: "साहित्य",
      weight: "वजन",
      lotId: "लॉट ID",
      verified: "फक्त सत्यापित रिसायकलर्स",
      safe: "तुमची माहिती सुरक्षित आहे",
      listen: "ऐका",
      back: "मागे"
    }
  };

  const currentText =
    text[language] || text.en;

  const voices = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN"
  };


  /* =====================================================
     SPEAK SCREEN
  ===================================================== */

  function speakScreen() {
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        `${currentText.title}. ` +
        `${currentText.subtitle}. ` +
        `${currentText.material}: ${
          lotData?.material || "E-Waste"
        }. ` +
        `${currentText.weight}: ${
          lotData?.weight || "0"
        } kilograms. ` +
        `${currentText.verified}.`
      );

    speech.lang =
      voices[language] || "en-IN";

    speech.rate = 0.8;
    speech.pitch = 1;

    setSpeaking(true);

    speech.onend = () => {
      setSpeaking(false);
    };

    speech.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  }


  /* =====================================================
     AUTOMATIC SEARCH VOICE
  ===================================================== */

  useEffect(() => {
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        currentText.searching
      );

    speech.lang =
      voices[language] || "en-IN";

    speech.rate = 0.8;

    speech.onend = () => {
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1200);
    };

    speech.onerror = () => {
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1200);
    };

    window.speechSynthesis.speak(speech);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [language]);


  /* =====================================================
     SCREEN
  ===================================================== */

  return (
    <div className="recycler-search-screen">

      <div className="recycler-search-container">


        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          className="recycler-search-back"
          onClick={() => {
            window.speechSynthesis.cancel();

            if (onBack) {
              onBack();
            }
          }}
        >
          ← {currentText.back}
        </button>


        {/* =================================================
            SPEAKER
            Finger and rings REMOVED
        ================================================= */}

        <div className="recycler-search-speaker-area">

          <button
            className={`recycler-search-speaker ${
              speaking ? "speaking" : ""
            }`}
            onClick={speakScreen}
          >
            🔊 {currentText.listen}
          </button>

        </div>


        {/* =================================================
            MAIN
        ================================================= */}

        <div className="recycler-search-main">

          <div className="recycler-search-icon">
            🔍
          </div>

          <h1>
            {currentText.title}
          </h1>

          <p className="recycler-search-subtitle">
            {currentText.subtitle}
          </p>


          {/* =================================================
              SEARCH ANIMATION
          ================================================= */}

          <div className="recycler-search-animation">

            <div className="search-circle">

              <div className="search-circle-inner">
                ♻️
              </div>

            </div>

            <div className="search-wave wave-one"></div>

            <div className="search-wave wave-two"></div>

            <div className="search-wave wave-three"></div>

          </div>


          {/* =================================================
              SEARCH STATUS
          ================================================= */}

          <p className="recycler-search-status">
            {currentText.searching}
          </p>


          {/* =================================================
              LOT DETAILS
          ================================================= */}

          <div className="recycler-search-lot-card">

            <div className="lot-row">

              <span>
                📱 {currentText.material}
              </span>

              <strong>
                {lotData?.material || "E-Waste"}
              </strong>

            </div>


            <div className="lot-row">

              <span>
                ⚖️ {currentText.weight}
              </span>

              <strong>
                {lotData?.weight || "0"} kg
              </strong>

            </div>


            <div className="lot-row">

              <span>
                🆔 {currentText.lotId}
              </span>

              <strong>
                {lotData?.lotId || "LOT-2026-0000"}
              </strong>

            </div>

          </div>


          {/* =================================================
              TRUST INFORMATION
          ================================================= */}

          <div className="recycler-search-trust">

            <div className="trust-item">

              <span>
                ✓
              </span>

              {currentText.verified}

            </div>


            <div className="trust-item">

              <span>
                🔒
              </span>

              {currentText.safe}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RecyclerSearchScreen;