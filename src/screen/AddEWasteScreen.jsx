import React, { useRef, useState } from "react";
import "./AddEWasteScreen.css";

function AddEWasteScreen({
  language,
  onBack,
  onPhotoUploaded,
  onManualContinue
}) {
  const [speaking, setSpeaking] = useState(false);
  const [wasteType, setWasteType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [photo, setPhoto] = useState(null);
  const [listening, setListening] = useState(false);

  const [identificationMethod, setIdentificationMethod] =
    useState("");

  const [showPhotoOptions, setShowPhotoOptions] =
    useState(false);

  const [showCamera, setShowCamera] =
    useState(false);

  const [cameraStream, setCameraStream] =
    useState(null);

  const uploadInputRef = useRef(null);
  const videoRef = useRef(null);

  const translations = {
    en: {
      title: "Add E-Waste",
      subtitle:
        "Tell us about the e-waste you collected",

      chooseMethod:
        "How do you want to identify the material?",

      useAI: "Use AI",
      aiDescription:
        "Take a photo and let AI identify it.",

      manual: "Select Manually",
      manualDescription:
        "Choose the material yourself.",

      wasteType: "What type of e-waste?",
      selectType: "Select waste type",

      quantity: "How much e-waste?",
      enterQuantity: "Enter quantity",

      back: "← Back",
      continue: "CONTINUE",

      camera: "Camera",
      cameraInstruction:
        "Please take a photo of your material to recognize which material it is.",

      speak: "Speak",
      speakInstruction:
        "Speak the name of your material.",

      photoTaken: "Photo captured",
      removePhoto: "Remove Photo",

      takePhoto: "Take Photo",
      uploadPhoto: "Upload Photo",
      cancel: "Cancel",
      capturePhoto: "Capture Photo",
      cameraCancel: "Cancel Camera",

      selected: "Selected"
    },

    te: {
      title: "ఈ-వ్యర్థాలను జోడించండి",
      subtitle:
        "మీరు సేకరించిన ఈ-వ్యర్థాల గురించి చెప్పండి",

      chooseMethod:
        "పదార్థాన్ని ఎలా గుర్తించాలనుకుంటున్నారు?",

      useAI: "AI ఉపయోగించండి",
      aiDescription:
        "ఫోటో తీసి AI ద్వారా గుర్తించండి.",

      manual: "మాన్యువల్‌గా ఎంచుకోండి",
      manualDescription:
        "పదార్థాన్ని మీరే ఎంచుకోండి.",

      wasteType: "ఏ రకమైన ఈ-వ్యర్థం?",
      selectType:
        "ఈ-వ్యర్థ రకాన్ని ఎంచుకోండి",

      quantity: "ఎంత ఈ-వ్యర్థం?",
      enterQuantity:
        "పరిమాణాన్ని నమోదు చేయండి",

      back: "← వెనుకకు",
      continue: "కొనసాగించండి",

      camera: "కెమెరా",
      cameraInstruction:
        "మీ పదార్థాన్ని గుర్తించడానికి దయచేసి దాని ఫోటో తీయండి.",

      speak: "చెప్పండి",
      speakInstruction:
        "మీ పదార్థం పేరును చెప్పండి.",

      photoTaken: "ఫోటో తీసుకున్నారు",
      removePhoto: "ఫోటో తొలగించండి",

      takePhoto: "ఫోటో తీయండి",
      uploadPhoto: "ఫోటో అప్‌లోడ్ చేయండి",
      cancel: "రద్దు చేయండి",
      capturePhoto:
        "ఫోటో క్యాప్చర్ చేయండి",
      cameraCancel:
        "కెమెరాను మూసివేయండి",

      selected: "ఎంచుకున్నది"
    },

    hi: {
      title: "ई-कचरा जोड़ें",
      subtitle:
        "आपने जो ई-कचरा एकत्र किया है उसके बारे में बताएं",

      chooseMethod:
        "आप सामग्री की पहचान कैसे करना चाहते हैं?",

      useAI: "AI का उपयोग करें",
      aiDescription:
        "फोटो लें और AI से पहचान करवाएं।",

      manual: "मैन्युअल रूप से चुनें",
      manualDescription:
        "सामग्री को खुद चुनें।",

      wasteType:
        "किस प्रकार का ई-कचरा?",
      selectType:
        "ई-कचरे का प्रकार चुनें",

      quantity: "कितना ई-कचरा?",
      enterQuantity:
        "मात्रा दर्ज करें",

      back: "← वापस",
      continue: "जारी रखें",

      camera: "कैमरा",
      cameraInstruction:
        "सामग्री की पहचान करने के लिए कृपया उसकी फोटो लें।",

      speak: "बोलें",
      speakInstruction:
        "अपनी सामग्री का नाम बोलें।",

      photoTaken: "फोटो ली गई",
      removePhoto: "फोटो हटाएं",

      takePhoto: "फोटो लें",
      uploadPhoto: "फोटो अपलोड करें",
      cancel: "रद्द करें",
      capturePhoto:
        "फोटो कैप्चर करें",
      cameraCancel:
        "कैमरा बंद करें",

      selected: "चयनित"
    },

    mr: {
      title: "ई-कचरा जोडा",
      subtitle:
        "तुम्ही गोळा केलेल्या ई-कचऱ्याबद्दल सांगा",

      chooseMethod:
        "साहित्य कसे ओळखायचे आहे?",

      useAI: "AI वापरा",
      aiDescription:
        "फोटो काढा आणि AI द्वारे ओळखा.",

      manual: "स्वतः निवडा",
      manualDescription:
        "साहित्य स्वतः निवडा.",

      wasteType:
        "कोणत्या प्रकारचा ई-कचरा?",
      selectType:
        "ई-कचऱ्याचा प्रकार निवडा",

      quantity: "किती ई-कचरा?",
      enterQuantity:
        "प्रमाण प्रविष्ट करा",

      back: "← मागे",
      continue: "पुढे जा",

      camera: "कॅमेरा",
      cameraInstruction:
        "तुमचे साहित्य ओळखण्यासाठी कृपया त्याचा फोटो काढा.",

      speak: "बोला",
      speakInstruction:
        "तुमच्या साहित्याचे नाव बोला.",

      photoTaken: "फोटो घेतला",
      removePhoto: "फोटो काढून टाका",

      takePhoto: "फोटो काढा",
      uploadPhoto: "फोटो अपलोड करा",
      cancel: "रद्द करा",
      capturePhoto:
        "फोटो कॅप्चर करा",
      cameraCancel:
        "कॅमेरा बंद करा",

      selected: "निवडलेले"
    }
  };

  const text =
    translations[language] || translations.en;

  const voiceLanguages = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN"
  };

  function speakMessage(message) {
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(message);

    speech.lang =
      voiceLanguages[language] || "en-IN";

    speech.rate = 0.75;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }

  function speakScreen() {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeaking(true);

    const speechText =
      `${text.title}. ${text.subtitle}. ${text.chooseMethod}.`;

    const speech =
      new SpeechSynthesisUtterance(
        speechText
      );

    speech.lang =
      voiceLanguages[language] || "en-IN";

    speech.rate = 0.75;
    speech.pitch = 1;

    speech.onend = () => {
      setSpeaking(false);
    };

    speech.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  }

  function speakHover(message) {
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(message);

    speech.lang =
      voiceLanguages[language] || "en-IN";

    speech.rate = 0.75;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  }

  function selectMethod(method) {
    window.speechSynthesis.cancel();

    setIdentificationMethod(method);

    if (method === "ai") {
      speakMessage(text.useAI);
    }

    if (method === "manual") {
      speakMessage(text.manual);
    }
  }

  function openCameraOptions() {
    window.speechSynthesis.cancel();
    setShowPhotoOptions(true);
  }

  async function startCamera() {
    window.speechSynthesis.cancel();
    setShowPhotoOptions(false);

    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      alert(
        "Camera is not supported in this browser."
      );
      return;
    }

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });

      setCameraStream(stream);
      setShowCamera(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject =
            stream;
        }
      }, 100);

    } catch (error) {
      console.error(
        "Camera error:",
        error
      );

      alert(
        "Unable to access camera. Please allow camera permission."
      );
    }
  }

  function capturePhoto() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (
      video.videoWidth === 0 ||
      video.videoHeight === 0
    ) {
      alert(
        "Camera is not ready yet. Please try again."
      );
      return;
    }

    const canvas =
      document.createElement("canvas");

    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;

    const context =
      canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const imageUrl =
      canvas.toDataURL(
        "image/jpeg",
        0.85
      );

    setPhoto(imageUrl);

    stopCamera();

    if (onPhotoUploaded) {
      onPhotoUploaded(imageUrl);
    }
  }

  function stopCamera() {
    if (cameraStream) {
      cameraStream
        .getTracks()
        .forEach((track) => {
          track.stop();
        });
    }

    setCameraStream(null);
    setShowCamera(false);
  }

  function closeCamera() {
    stopCamera();
  }

  function handlePhoto(event) {
    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      const imageUrl =
        reader.result;

      setPhoto(imageUrl);

      if (onPhotoUploaded) {
        onPhotoUploaded(imageUrl);
      }
    };

    reader.onerror = () => {
      alert(
        "Unable to read the selected photo."
      );
    };

    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setPhoto(null);

    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }
  }

  function startListening() {
    window.speechSynthesis.cancel();

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported in this browser."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      voiceLanguages[language] || "en-IN";

    recognition.continuous = false;
    recognition.interimResults = false;

    setListening(true);

    recognition.onresult = (event) => {
      const spokenText =
        event.results[0][0].transcript
          .toLowerCase()
          .trim();

      console.log(
        "Spoken material:",
        spokenText
      );

      const spokenMaterial =
        identifySpokenMaterial(
          spokenText
        );

      if (spokenMaterial) {
        setWasteType(
          spokenMaterial
        );

        speakMessage(
          getWasteTypeName(
            spokenMaterial
          )
        );
      }

      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  }

  function identifySpokenMaterial(
    spokenText
  ) {
    if (
      spokenText.includes("mobile") ||
      spokenText.includes("phone") ||
      spokenText.includes("మొబైల్") ||
      spokenText.includes("मोबाइल") ||
      spokenText.includes("मोबाईल")
    ) {
      return "mobile";
    }

    if (
      spokenText.includes("laptop") ||
      spokenText.includes("ల్యాప్‌టాప్") ||
      spokenText.includes("लैपटॉप") ||
      spokenText.includes("लॅपटॉप")
    ) {
      return "laptop";
    }

    if (
      spokenText.includes("computer") ||
      spokenText.includes("కంప్యూటర్") ||
      spokenText.includes("कंप्यूटर") ||
      spokenText.includes("संगणक")
    ) {
      return "computer";
    }

    if (
      spokenText.includes("tv") ||
      spokenText.includes("television") ||
      spokenText.includes("టీవీ") ||
      spokenText.includes("टीवी") ||
      spokenText.includes("टीव्ही")
    ) {
      return "tv";
    }

    if (
      spokenText.includes("battery") ||
      spokenText.includes("బ్యాటరీ") ||
      spokenText.includes("बैटरी") ||
      spokenText.includes("बॅटरी")
    ) {
      return "battery";
    }

    if (
      spokenText.includes("other") ||
      spokenText.includes("ఇతర") ||
      spokenText.includes("अन्य") ||
      spokenText.includes("इतर")
    ) {
      return "other";
    }

    return null;
  }

  const wasteTypes = [
    {
      id: "mobile",
      icon: "📱",
      name:
        language === "te"
          ? "మొబైల్ ఫోన్లు"
          : language === "hi"
          ? "मोबाइल फोन"
          : language === "mr"
          ? "मोबाईल फोन"
          : "Mobile Phones"
    },
    {
      id: "laptop",
      icon: "💻",
      name:
        language === "te"
          ? "ల్యాప్‌టాప్‌లు"
          : language === "hi"
          ? "लैपटॉप"
          : language === "mr"
          ? "लॅपटॉप"
          : "Laptops"
    },
    {
      id: "computer",
      icon: "🖥️",
      name:
        language === "te"
          ? "కంప్యూటర్ భాగాలు"
          : language === "hi"
          ? "कंप्यूटर के पुर्जे"
          : language === "mr"
          ? "संगणकाचे भाग"
          : "Computer Parts"
    },
    {
      id: "tv",
      icon: "📺",
      name:
        language === "te"
          ? "టీవీ / మానిటర్లు"
          : language === "hi"
          ? "टीवी / मॉनिटर"
          : language === "mr"
          ? "टीव्ही / मॉनिटर"
          : "TV / Monitors"
    },
    {
      id: "battery",
      icon: "🔋",
      name:
        language === "te"
          ? "బ్యాటరీలు"
          : language === "hi"
          ? "बैटरियां"
          : language === "mr"
          ? "बॅटरी"
          : "Batteries"
    },
    {
      id: "other",
      icon: "♻️",
      name:
        language === "te"
          ? "ఇతర ఈ-వ్యర్థాలు"
          : language === "hi"
          ? "अन्य ई-कचरा"
          : language === "mr"
          ? "इतर ई-कचरा"
          : "Other E-Waste"
    }
  ];

  function getWasteTypeName(typeId) {
    const selected =
      wasteTypes.find(
        (type) => type.id === typeId
      );

    return selected
      ? selected.name
      : "";
  }

  function handleContinue() {
  if (!identificationMethod || !quantity) {
    return;
  }

  window.speechSynthesis.cancel();

  const data = {
    wasteType,
    quantity,
    unit,
    photo,
    identificationMethod
  };

  console.log("E-Waste Details:", data);

  // Manual selection
  if (identificationMethod === "manual") {
    if (!wasteType) {
      return;
    }

    if (onManualContinue) {
      onManualContinue(data);
    }

    return;
  }

  // AI selection
  if (identificationMethod === "ai") {
    if (onPhotoUploaded && photo) {
      onPhotoUploaded(photo);
    }
  }
}

  return (
    <div className="add-ewaste-screen">

      {/* SPEAKER */}

      <div className="add-ewaste-speaker-wrapper">

        <button
          className={`add-ewaste-speaker-button ${
            speaking ? "speaking" : ""
          }`}
          onClick={speakScreen}
        >
          <span className="speaker-icon">
            🔊
          </span>
        </button>

        <div className="add-ewaste-speaker-finger-effect">

          <span className="add-ewaste-speaker-ring ring-1"></span>
          <span className="add-ewaste-speaker-ring ring-2"></span>
          <span className="add-ewaste-speaker-ring ring-3"></span>

          <span className="add-ewaste-speaker-finger">
            ☝️
          </span>

        </div>

      </div>


      {/* BACK */}

      <button
        className="back-button"
        onClick={() => {
          window.speechSynthesis.cancel();
          closeCamera();
          onBack();
        }}
      >
        {text.back}
      </button>


      {/* MAIN CONTAINER */}

      <div className="add-ewaste-container">

        {/* HEADER */}

        <div className="add-ewaste-header">

          <div className="add-ewaste-icon">
            ♻️
          </div>

          <h1>
            {text.title}
          </h1>

          <p>
            {text.subtitle}
          </p>

        </div>


        {/* IDENTIFICATION METHOD */}

        <div className="identification-method-section">

          <h2>
            {text.chooseMethod}
          </h2>

          <div className="identification-method-grid">

            {/* AI */}

            <button
              className={`identification-method-card ${
                identificationMethod === "ai"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                selectMethod("ai")
              }
              onMouseEnter={() =>
                speakHover(
                  text.aiDescription
                )
              }
              onMouseLeave={() =>
                window.speechSynthesis.cancel()
              }
            >

              <div className="method-icon">
                🤖
              </div>

              <div className="method-title">
                {text.useAI}
              </div>

              <div className="method-description">
                {text.aiDescription}
              </div>

              {identificationMethod ===
                "ai" && (
                <div className="method-check">
                  ✓
                </div>
              )}

            </button>


            {/* MANUAL */}

            <button
              className={`identification-method-card ${
                identificationMethod ===
                "manual"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                selectMethod("manual")
              }
              onMouseEnter={() =>
                speakHover(
                  text.manualDescription
                )
              }
              onMouseLeave={() =>
                window.speechSynthesis.cancel()
              }
            >

              <div className="method-icon">
                👆
              </div>

              <div className="method-title">
                {text.manual}
              </div>

              <div className="method-description">
                {text.manualDescription}
              </div>

              {identificationMethod ===
                "manual" && (
                <div className="method-check">
                  ✓
                </div>
              )}

            </button>

          </div>

        </div>


        {/* AI SECTION */}

        {identificationMethod === "ai" && (

          <div className="identification-section">

            <h2>
              {text.selectType}
            </h2>

            <div className="identification-buttons">

              {/* CAMERA */}

              <button
                className="identification-button"
                onClick={openCameraOptions}
                onMouseEnter={() =>
                  speakHover(
                    text.cameraInstruction
                  )
                }
                onMouseLeave={() =>
                  window.speechSynthesis.cancel()
                }
              >

                <span className="identification-icon">
                  📷
                </span>

                <span>
                  {text.camera}
                </span>

              </button>


              {/* SPEAK */}

              <button
                className={`identification-button ${
                  listening
                    ? "listening"
                    : ""
                }`}
                onClick={startListening}
                onMouseEnter={() =>
                  speakHover(
                    text.speakInstruction
                  )
                }
                onMouseLeave={() =>
                  window.speechSynthesis.cancel()
                }
              >

                <span className="identification-icon">
                  🎤
                </span>

                <span>
                  {listening
                    ? "Listening..."
                    : text.speak}
                </span>

              </button>

            </div>


            {/* PHOTO OPTIONS */}

            {showPhotoOptions && (

              <div className="photo-options">

                <button
                  className="photo-option-button"
                  onClick={startCamera}
                  onMouseEnter={() =>
                    speakHover(
                      text.takePhoto
                    )
                  }
                  onMouseLeave={() =>
                    window.speechSynthesis.cancel()
                  }
                >
                  📷
                  <span>
                    {text.takePhoto}
                  </span>
                </button>


                <button
                  className="photo-option-button"
                  onClick={() => {

                    setShowPhotoOptions(
                      false
                    );

                    if (
                      uploadInputRef.current
                    ) {
                      uploadInputRef.current.click();
                    }

                  }}
                  onMouseEnter={() =>
                    speakHover(
                      text.uploadPhoto
                    )
                  }
                  onMouseLeave={() =>
                    window.speechSynthesis.cancel()
                  }
                >
                  🖼️
                  <span>
                    {text.uploadPhoto}
                  </span>
                </button>


                <button
                  className="photo-option-cancel"
                  onClick={() =>
                    setShowPhotoOptions(
                      false
                    )
                  }
                >
                  {text.cancel}
                </button>

              </div>

            )}


            {/* CAMERA */}

            {showCamera && (

              <div className="camera-preview-container">

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="camera-video"
                />

                <div className="camera-preview-buttons">

                  <button
                    className="capture-photo-button"
                    onClick={capturePhoto}
                  >
                    📸 {text.capturePhoto}
                  </button>

                  <button
                    className="cancel-camera-button"
                    onClick={closeCamera}
                  >
                    {text.cameraCancel}
                  </button>

                </div>

              </div>

            )}


            {/* HIDDEN UPLOAD */}

            <input
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              className="camera-input"
              onChange={handlePhoto}
            />


            {/* PHOTO PREVIEW */}

            {photo && (

              <div className="photo-preview">

                <img
                  src={photo}
                  alt={text.photoTaken}
                />

                <button
                  className="remove-photo-button"
                  onClick={removePhoto}
                >
                  {text.removePhoto}
                </button>

              </div>

            )}

          </div>

        )}


        {/* MANUAL SECTION */}

        {identificationMethod ===
          "manual" && (

          <div className="add-ewaste-section">

            <h2>
              {text.wasteType}
            </h2>

            <div className="waste-type-grid">

              {wasteTypes.map(
                (type) => (

                  <button
                    key={type.id}
                    className={`waste-type-card ${
                      wasteType ===
                      type.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => {

                      setWasteType(
                        type.id
                      );

                      speakHover(
                        type.name
                      );

                    }}
                    onMouseEnter={() =>
                      speakHover(
                        type.name
                      )
                    }
                    onMouseLeave={() =>
                      window.speechSynthesis.cancel()
                    }
                  >

                    <span className="waste-type-icon">
                      {type.icon}
                    </span>

                    <span className="waste-type-name">
                      {type.name}
                    </span>

                    {wasteType ===
                      type.id && (
                      <span className="manual-check">
                        ✓
                      </span>
                    )}

                  </button>

                )
              )}

            </div>

          </div>

        )}


        {/* QUANTITY */}

        <div className="add-ewaste-section">

          <h2>
            {text.quantity}
          </h2>

          <div className="quantity-row">

            <input
              type="number"
              min="0"
              placeholder={
                text.enterQuantity
              }
              value={quantity}
              onChange={(event) =>
                setQuantity(
                  event.target.value
                )
              }
            />

            <select
              value={unit}
              onChange={(event) =>
                setUnit(
                  event.target.value
                )
              }
            >

              <option value="kg">
                kg
              </option>

              <option value="pieces">
                Pieces
              </option>

            </select>

          </div>

        </div>


        {/* CONTINUE */}

        <button
          className="add-ewaste-continue"
          onClick={handleContinue}
          disabled={
            !identificationMethod ||
            !wasteType ||
            !quantity
          }
        >
          {text.continue}

          <span>
            →
          </span>

        </button>

      </div>

    </div>
  );
}

export default AddEWasteScreen;