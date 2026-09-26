import React from "react";
import "./PhotoChoiceScreen.css";

function PhotoChoiceScreen({
  language,
  onBack,
  onTakePhoto,
  onUploadPhoto
}) {

  const translations = {
    en: {
      title: "Add Photo",
      subtitle: "How would you like to add your e-waste photo?",
      takePhoto: "Take a Photo",
      takeDescription: "Use your camera to take a new photo",
      uploadPhoto: "Upload a Photo",
      uploadDescription: "Choose a photo from your device",
      back: "← Back"
    },

    te: {
      title: "ఫోటోను జోడించండి",
      subtitle: "మీ ఈ-వ్యర్థం ఫోటోను ఎలా జోడించాలనుకుంటున్నారు?",
      takePhoto: "ఫోటో తీయండి",
      takeDescription: "కెమెరాను ఉపయోగించి కొత్త ఫోటో తీయండి",
      uploadPhoto: "ఫోటో అప్‌లోడ్ చేయండి",
      uploadDescription: "మీ పరికరం నుండి ఫోటోను ఎంచుకోండి",
      back: "← వెనుకకు"
    },

    hi: {
      title: "फोटो जोड़ें",
      subtitle: "आप अपने ई-कचरे की फोटो कैसे जोड़ना चाहते हैं?",
      takePhoto: "फोटो लें",
      takeDescription: "कैमरे से नई फोटो लें",
      uploadPhoto: "फोटो अपलोड करें",
      uploadDescription: "अपने डिवाइस से फोटो चुनें",
      back: "← वापस"
    },

    mr: {
      title: "फोटो जोडा",
      subtitle: "तुमच्या ई-कचऱ्याचा फोटो कसा जोडायचा?",
      takePhoto: "फोटो काढा",
      takeDescription: "कॅमेऱ्याचा वापर करून नवीन फोटो काढा",
      uploadPhoto: "फोटो अपलोड करा",
      uploadDescription: "तुमच्या डिव्हाइसमधून फोटो निवडा",
      back: "← मागे"
    }
  };

  const text =
    translations[language] || translations.en;

  return (
    <div className="photo-choice-screen">

      <button
        className="back-button"
        onClick={onBack}
      >
        {text.back}
      </button>

      <div className="photo-choice-container">

        <div className="photo-choice-header">

          <div className="photo-choice-icon">
            📷
          </div>

          <h1>{text.title}</h1>

          <p>{text.subtitle}</p>

        </div>

        <div className="photo-choice-grid">

          {/* TAKE PHOTO */}

          <button
            className="photo-choice-card"
            onClick={onTakePhoto}
          >

            <div className="photo-choice-image-wrapper">

              <img
                src="/images/take-photo.jpg"
                alt="Take a photo"
                className="photo-choice-image"
              />

            </div>

            <div className="photo-choice-content">

              <h2>
                📷 {text.takePhoto}
              </h2>

              <p>
                {text.takeDescription}
              </p>

            </div>

          </button>

          {/* UPLOAD PHOTO */}

          <button
            className="photo-choice-card"
            onClick={onUploadPhoto}
          >

            <div className="photo-choice-image-wrapper">

              <img
                src="/images/upload-photo.jpg"
                alt="Upload a photo"
                className="photo-choice-image"
              />

            </div>

            <div className="photo-choice-content">

              <h2>
                🖼️ {text.uploadPhoto}
              </h2>

              <p>
                {text.uploadDescription}
              </p>

            </div>

          </button>

        </div>

      </div>

    </div>
  );
}

export default PhotoChoiceScreen;