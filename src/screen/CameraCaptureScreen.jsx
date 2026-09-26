import React, { useEffect, useRef, useState } from "react";
import "./CameraCaptureScreen.css";

function CameraCaptureScreen({
  language,
  onBack,
  onPhotoCaptured
}) {

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState("");

  const translations = {
    en: {
      title: "Take a Photo",
      subtitle: "Place your e-waste in front of the camera",
      capture: "Capture Photo",
      back: "← Back",
      permission:
        "Please allow camera permission to take a photo.",
      cameraError:
        "Unable to access the camera."
    },

    te: {
      title: "ఫోటో తీయండి",
      subtitle: "మీ ఈ-వ్యర్థాన్ని కెమెరా ముందు ఉంచండి",
      capture: "ఫోటో తీయండి",
      back: "← వెనుకకు",
      permission:
        "ఫోటో తీయడానికి కెమెరా అనుమతిని ఇవ్వండి.",
      cameraError:
        "కెమెరాను యాక్సెస్ చేయడం సాధ్యం కాలేదు."
    },

    hi: {
      title: "फोटो लें",
      subtitle: "अपने ई-कचरे को कैमरे के सामने रखें",
      capture: "फोटो लें",
      back: "← वापस",
      permission:
        "फोटो लेने के लिए कैमरा अनुमति दें।",
      cameraError:
        "कैमरे तक पहुंच नहीं हो सकी।"
    },

    mr: {
      title: "फोटो काढा",
      subtitle: "तुमचा ई-कचरा कॅमेऱ्यासमोर ठेवा",
      capture: "फोटो काढा",
      back: "← मागे",
      permission:
        "फोटो काढण्यासाठी कॅमेरा परवानगी द्या.",
      cameraError:
        "कॅमेऱ्याला प्रवेश करता आला नाही."
    }
  };

  const text =
    translations[language] || translations.en;


  /* =====================================================
     START CAMERA
  ===================================================== */

  useEffect(() => {

    let mounted = true;

    async function startCamera() {

      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {

        if (mounted) {
          setError(text.cameraError);
        }

        return;
      }

      try {

        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "environment"
            },
            audio: false
          });

        if (!mounted) {

          stream
            .getTracks()
            .forEach((track) => track.stop());

          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {

          videoRef.current.srcObject = stream;

          await videoRef.current.play();

          setCameraReady(true);
        }

      } catch (error) {

        console.error(
          "Camera error:",
          error
        );

        if (mounted) {

          setError(text.permission);

        }

      }

    }

    startCamera();


    return () => {

      mounted = false;

      if (streamRef.current) {

        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());

        streamRef.current = null;

      }

    };

  }, [language]);


  /* =====================================================
     CAPTURE PHOTO
  ===================================================== */

  function capturePhoto() {

    const video =
      videoRef.current;

    if (!video || !cameraReady) {
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

    const image =
      canvas.toDataURL(
        "image/jpeg",
        0.9
      );

    stopCamera();

    onPhotoCaptured(image);

  }


  /* =====================================================
     STOP CAMERA
  ===================================================== */

  function stopCamera() {

    if (streamRef.current) {

      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;

    }

  }


  /* =====================================================
     BACK
  ===================================================== */

  function handleBack() {

    stopCamera();

    onBack();

  }


  return (

    <div className="camera-capture-screen">

      <button
        className="back-button"
        onClick={handleBack}
      >
        {text.back}
      </button>


      <div className="camera-capture-container">

        <div className="camera-capture-header">

          <div className="camera-capture-icon">
            📷
          </div>

          <h1>
            {text.title}
          </h1>

          <p>
            {text.subtitle}
          </p>

        </div>


        {/* CAMERA AREA */}

        <div className="camera-area">

          {error ? (

            <div className="camera-error">

              <div className="camera-error-icon">
                ⚠️
              </div>

              <p>
                {error}
              </p>

            </div>

          ) : (

            <video
              ref={videoRef}
              className="camera-live-video"
              autoPlay
              playsInline
              muted
            />

          )}

        </div>


        {/* CAPTURE BUTTON */}

        {!error && (

          <button
            className="capture-button"
            onClick={capturePhoto}
            disabled={!cameraReady}
          >

            <span className="capture-button-icon">
              📸
            </span>

            {text.capture}

          </button>

        )}

      </div>

    </div>

  );

}

export default CameraCaptureScreen;