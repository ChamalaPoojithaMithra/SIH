import React from "react";
import "./PhotoPreviewScreen.css";

function PhotoPreviewScreen({
  language,
  photo,
  onBack,
  onContinue
}) {

  const translations = {
    en: {
      title: "Photo Added",
      subtitle: "Your e-waste photo has been added successfully.",
      continue: "Continue",
      back: "← Back",
      noPhoto: "No photo available"
    },

    te: {
      title: "ఫోటో జోడించబడింది",
      subtitle: "మీ ఈ-వ్యర్థం ఫోటో విజయవంతంగా జోడించబడింది.",
      continue: "కొనసాగించండి",
      back: "← వెనుకకు",
      noPhoto: "ఫోటో అందుబాటులో లేదు"
    },

    hi: {
      title: "फोटो जोड़ी गई",
      subtitle: "आपके ई-कचरे की फोटो सफलतापूर्वक जोड़ दी गई है।",
      continue: "जारी रखें",
      back: "← वापस",
      noPhoto: "फोटो उपलब्ध नहीं है"
    },

    mr: {
      title: "फोटो जोडला",
      subtitle: "तुमच्या ई-कचऱ्याचा फोटो यशस्वीरित्या जोडला गेला आहे.",
      continue: "पुढे जा",
      back: "← मागे",
      noPhoto: "फोटो उपलब्ध नाही"
    }
  };

  const text =
    translations[language] || translations.en;

  return (
    <div className="photo-preview-screen">

      <button
        className="back-button"
        onClick={onBack}
      >
        {text.back}
      </button>

      <div className="photo-preview-container">

        <div className="photo-preview-header">

          <div className="photo-preview-icon">
            ✓
          </div>

          <h1>
            {text.title}
          </h1>

          <p>
            {text.subtitle}
          </p>

        </div>

        <div className="photo-preview-card">

          {photo ? (

            <img
              src={photo}
              alt="Captured e-waste"
              className="photo-preview-image"
            />

          ) : (

            <div className="photo-preview-empty">
              📷
              <p>{text.noPhoto}</p>
            </div>

          )}

        </div>

        <div className="photo-preview-continue-wrapper">

  <div className="photo-preview-finger-effect">
    <span className="photo-preview-ring ring-1"></span>
    <span className="photo-preview-ring ring-2"></span>
    <span className="photo-preview-ring ring-3"></span>

    <span className="photo-preview-finger">
      ☝️
    </span>
  </div>

  <button
    className="photo-preview-continue"
    onClick={onContinue}
  >
    {text.continue}
    <span>→</span>
  </button>

</div>

      </div>

    </div>
  );
}

export default PhotoPreviewScreen;