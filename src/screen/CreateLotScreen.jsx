import React, { useEffect, useState } from "react";
import "./CreateLotScreen.css";

function CreateLotScreen({
  language,
  material,
  weight,
  photo,
  onCreateLot,
  onBack
}) {
  const [speaking, setSpeaking] = useState(false);
  const [lotId, setLotId] = useState("");

  const text = {
    en: {
      title: "Create Your E-Waste Lot",
      subtitle: "Check your details before creating the lot",
      material: "Material",
      weight: "Approximate Weight",
      photo: "Photo",
      photoAdded: "Photo added",
      create: "CREATE LOT",
      back: "Back",
      lotCreated: "Your waste lot is ready",
      lotId: "Lot ID"
    },

    te: {
      title: "మీ ఈ-వేస్ట్ లాట్‌ను సృష్టించండి",
      subtitle: "లాట్ సృష్టించే ముందు వివరాలను చూడండి",
      material: "మెటీరియల్",
      weight: "సుమారు బరువు",
      photo: "ఫోటో",
      photoAdded: "ఫోటో జోడించబడింది",
      create: "లాట్ సృష్టించండి",
      back: "వెనుకకు",
      lotCreated: "మీ వేస్ట్ లాట్ సిద్ధంగా ఉంది",
      lotId: "లాట్ ID"
    },

    hi: {
      title: "अपना ई-वेस्ट लॉट बनाएं",
      subtitle: "लॉट बनाने से पहले अपनी जानकारी देखें",
      material: "सामग्री",
      weight: "लगभग वजन",
      photo: "फोटो",
      photoAdded: "फोटो जोड़ दी गई",
      create: "लॉट बनाएं",
      back: "वापस",
      lotCreated: "आपका वेस्ट लॉट तैयार है",
      lotId: "लॉट ID"
    },

    mr: {
      title: "तुमचा ई-वेस्ट लॉट तयार करा",
      subtitle: "लॉट तयार करण्यापूर्वी माहिती तपासा",
      material: "साहित्य",
      weight: "अंदाजे वजन",
      photo: "फोटो",
      photoAdded: "फोटो जोडला आहे",
      create: "लॉट तयार करा",
      back: "मागे",
      lotCreated: "तुमचा वेस्ट लॉट तयार आहे",
      lotId: "लॉट ID"
    }
  };

  const currentText = text[language] || text.en;

  const voiceLanguages = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN"
  };

  // -----------------------------
  // LISTEN
  // -----------------------------

  function speakScreen() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      `${currentText.title}. ` +
      `${currentText.material}: ${material || "E-Waste"}. ` +
      `${currentText.weight}: ${weight || 0} kilograms. ` +
      `${currentText.photo}: ${currentText.photoAdded}.`
    );

    speech.lang = voiceLanguages[language] || "en-IN";
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

  // -----------------------------
  // BACK
  // -----------------------------

  function handleBack() {
    window.speechSynthesis.cancel();
    setSpeaking(false);

    /*
      DIRECT BACK TO ADD E-WASTE.

      We are NOT using:
      history.back()
      window.history.back()

      So previous screens will NOT appear.
    */

    if (onBack) {
      onBack();
    }
  }

  // -----------------------------
  // LOT ID
  // -----------------------------

  function generateLotId() {
    const number = Math.floor(
      1000 + Math.random() * 9000
    );

    return `LOT-2026-${number}`;
  }

  // -----------------------------
  // CREATE LOT
  // -----------------------------

  function handleCreateLot() {
    window.speechSynthesis.cancel();

    const newLotId = generateLotId();

    setLotId(newLotId);

    const speech = new SpeechSynthesisUtterance(
      `${currentText.lotCreated}. ` +
      `${currentText.lotId}: ${newLotId}`
    );

    speech.lang = voiceLanguages[language] || "en-IN";
    speech.rate = 0.8;
    speech.pitch = 1;

    speech.onend = () => {
      if (onCreateLot) {
        onCreateLot({
          lotId: newLotId,
          material: material,
          weight: weight,
          unit: "kg",
          photo: photo
        });
      }
    };

    speech.onerror = () => {
      if (onCreateLot) {
        onCreateLot({
          lotId: newLotId,
          material: material,
          weight: weight,
          unit: "kg",
          photo: photo
        });
      }
    };

    window.speechSynthesis.speak(speech);
  }

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="create-lot-screen">

      <div className="create-lot-container">

        {/* BACK */}

        <button
          type="button"
          className="create-lot-back"
          onClick={handleBack}
        >
          ← {currentText.back}
        </button>


        {/* LISTEN */}

        <div className="create-lot-speaker-area">

          <button
            type="button"
            className={`create-lot-speaker ${
              speaking ? "speaking" : ""
            }`}
            onClick={speakScreen}
          >
            🔊{" "}

            {language === "te"
              ? "వినండి"
              : language === "hi"
              ? "सुनें"
              : language === "mr"
              ? "ऐका"
              : "Listen"}
          </button>

          <div className="speaker-finger-guide">

            <span className="speaker-ring speaker-ring-1"></span>

            <span className="speaker-ring speaker-ring-2"></span>

            <span className="speaker-ring speaker-ring-3"></span>

            <span className="speaker-finger">
              👆
            </span>

          </div>

        </div>


        {/* HEADER */}

        <div className="create-lot-header">

          <div className="create-lot-icon">
            ♻️
          </div>

          <h1>
            {currentText.title}
          </h1>

          <p>
            {currentText.subtitle}
          </p>

        </div>


        {/* DETAILS */}

        <div className="create-lot-card">

          <div className="lot-detail">

            <div className="lot-detail-icon">
              📱
            </div>

            <div className="lot-detail-content">

              <span className="lot-label">
                {currentText.material}
              </span>

              <strong className="lot-value">
                {material || "E-Waste"}
              </strong>

            </div>

          </div>


          <div className="lot-detail">

            <div className="lot-detail-icon">
              ⚖️
            </div>

            <div className="lot-detail-content">

              <span className="lot-label">
                {currentText.weight}
              </span>

              <strong className="lot-value">
                {weight || "0"} kg
              </strong>

            </div>

          </div>


          <div className="lot-detail">

            <div className="lot-detail-icon">
              📷
            </div>

            <div className="lot-detail-content">

              <span className="lot-label">
                {currentText.photo}
              </span>

              <strong className="lot-value photo-success">
                ✓ {currentText.photoAdded}
              </strong>

            </div>

          </div>

        </div>


        {/* CREATED LOT */}

        {lotId && (

          <div className="created-lot-box">

            <div className="created-lot-check">
              ✓
            </div>

            <div>

              <p>
                {currentText.lotCreated}
              </p>

              <strong>
                {currentText.lotId}: {lotId}
              </strong>

            </div>

          </div>

        )}


        {/* CREATE BUTTON */}

        {!lotId && (

          <div className="create-lot-action">

            <div className="create-button-finger-guide">

              <span className="create-button-ring create-ring-1"></span>

              <span className="create-button-ring create-ring-2"></span>

              <span className="create-button-ring create-ring-3"></span>

              <span className="create-button-finger">
                👆
              </span>

            </div>

            <button
              type="button"
              className="create-lot-button"
              onClick={handleCreateLot}
            >

              <span>
                {currentText.create}
              </span>

              <span className="create-lot-arrow">
                →
              </span>

            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default CreateLotScreen;