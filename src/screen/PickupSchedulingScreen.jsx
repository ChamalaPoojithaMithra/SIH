import React, { useEffect, useState } from "react";
import "./PickupSchedulingScreen.css";

function PickupSchedulingScreen({
  language,
  lotData,
  onBack,
  onConfirmPickup
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [speaking, setSpeaking] = useState(false);

  const translations = {
    en: {
      title: "Schedule Pickup",
      subtitle:
        "Choose a convenient time for the recycler to collect your e-waste",
      recycler: "Recycler",
      verified: "Verified Recycler",
      lot: "Lot ID",
      chooseDate: "Choose pickup date",
      chooseTime: "Choose pickup time",
      today: "Today",
      tomorrow: "Tomorrow",
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      morningTime: "9:00 AM – 12:00 PM",
      afternoonTime: "12:00 PM – 4:00 PM",
      eveningTime: "4:00 PM – 7:00 PM",
      confirm: "CONFIRM PICKUP",
      back: "Back",
      listen: "Listen",
      safe:
        "You will receive a pickup confirmation after scheduling",
      selectBoth: "Please choose a date and time"
    },

    te: {
      title: "పికప్ షెడ్యూల్ చేయండి",
      subtitle:
        "రీసైక్లర్ మీ ఈ-వేస్ట్ తీసుకెళ్లడానికి అనుకూలమైన సమయాన్ని ఎంచుకోండి",
      recycler: "రీసైక్లర్",
      verified: "ధృవీకరించిన రీసైక్లర్",
      lot: "లాట్ ID",
      chooseDate: "పికప్ తేదీని ఎంచుకోండి",
      chooseTime: "పికప్ సమయాన్ని ఎంచుకోండి",
      today: "ఈ రోజు",
      tomorrow: "రేపు",
      morning: "ఉదయం",
      afternoon: "మధ్యాహ్నం",
      evening: "సాయంత్రం",
      morningTime: "ఉదయం 9:00 – మధ్యాహ్నం 12:00",
      afternoonTime: "మధ్యాహ్నం 12:00 – సాయంత్రం 4:00",
      eveningTime: "సాయంత్రం 4:00 – 7:00",
      confirm: "పికప్ నిర్ధారించండి",
      back: "వెనుకకు",
      listen: "వినండి",
      safe:
        "షెడ్యూల్ చేసిన తర్వాత మీకు పికప్ నిర్ధారణ వస్తుంది",
      selectBoth:
        "దయచేసి తేదీ మరియు సమయాన్ని ఎంచుకోండి"
    },

    hi: {
      title: "पिकअप शेड्यूल करें",
      subtitle:
        "रिसाइक्लर के लिए आपके ई-वेस्ट लेने का सुविधाजनक समय चुनें",
      recycler: "रिसाइक्लर",
      verified: "सत्यापित रिसाइक्लर",
      lot: "लॉट ID",
      chooseDate: "पिकअप की तारीख चुनें",
      chooseTime: "पिकअप का समय चुनें",
      today: "आज",
      tomorrow: "कल",
      morning: "सुबह",
      afternoon: "दोपहर",
      evening: "शाम",
      morningTime: "सुबह 9:00 – दोपहर 12:00",
      afternoonTime: "दोपहर 12:00 – शाम 4:00",
      eveningTime: "शाम 4:00 – 7:00",
      confirm: "पिकअप की पुष्टि करें",
      back: "वापस",
      listen: "सुनें",
      safe:
        "शेड्यूल करने के बाद आपको पिकअप की पुष्टि मिलेगी",
      selectBoth:
        "कृपया तारीख और समय चुनें"
    },

    mr: {
      title: "पिकअप शेड्यूल करा",
      subtitle:
        "रिसायकलरने तुमचा ई-वेस्ट घेण्यासाठी सोयीची वेळ निवडा",
      recycler: "रिसायकलर",
      verified: "सत्यापित रिसायकलर",
      lot: "लॉट ID",
      chooseDate: "पिकअपची तारीख निवडा",
      chooseTime: "पिकअपची वेळ निवडा",
      today: "आज",
      tomorrow: "उद्या",
      morning: "सकाळ",
      afternoon: "दुपार",
      evening: "संध्याकाळ",
      morningTime: "सकाळी 9:00 – दुपारी 12:00",
      afternoonTime: "दुपारी 12:00 – संध्याकाळी 4:00",
      eveningTime: "संध्याकाळी 4:00 – 7:00",
      confirm: "पिकअपची पुष्टी करा",
      back: "मागे",
      listen: "ऐका",
      safe:
        "शेड्यूल केल्यानंतर तुम्हाला पिकअपची पुष्टी मिळेल",
      selectBoth:
        "कृपया तारीख आणि वेळ निवडा"
    }
  };

  const text =
    translations[language] || translations.en;

  const recyclerName =
    lotData?.recyclerName || "Recycler A";

  const lotId =
    lotData?.lotId || "LOT-2026-0001";

  const voiceLocales = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN"
  };

  useEffect(() => {
    speakScreen();

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  function speakScreen() {
    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        `${text.title}. ${text.subtitle}. ${text.chooseDate}. ${text.chooseTime}. ${text.confirm}`
      );

    speech.lang =
      voiceLocales[language] || "en-IN";

    speech.rate = 0.8;
    speech.pitch = 1;

    speech.onstart = () =>
      setSpeaking(true);

    speech.onend = () =>
      setSpeaking(false);

    speech.onerror = () =>
      setSpeaking(false);

    setSpeaking(true);

    window.speechSynthesis.speak(speech);
  }

  function handleConfirm() {
    if (!selectedDate || !selectedTime) {

      const speech =
        new SpeechSynthesisUtterance(
          text.selectBoth
        );

      speech.lang =
        voiceLocales[language] || "en-IN";

      speech.rate = 0.8;

      window.speechSynthesis.cancel();

      window.speechSynthesis.speak(speech);

      return;
    }

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(
        text.confirm
      );

    speech.lang =
      voiceLocales[language] || "en-IN";

    speech.rate = 0.8;

    speech.onend = () => {
      onConfirmPickup({
        pickupDate: selectedDate,
        pickupTime: selectedTime,
        pickupStatus: "scheduled"
      });
    };

    speech.onerror = () => {
      onConfirmPickup({
        pickupDate: selectedDate,
        pickupTime: selectedTime,
        pickupStatus: "scheduled"
      });
    };

    window.speechSynthesis.speak(speech);
  }

  return (
    <div className="pickup-scheduling-screen">

      {/* =========================
          TOP HEADER
      ========================= */}

      <header className="pickup-header">

        {/* BACK BUTTON */}

        <button
          className="pickup-back-button"
          onClick={() => {
            window.speechSynthesis.cancel();
            onBack();
          }}
        >
          ← {text.back}
        </button>


        {/* LISTEN BUTTON */}

        <div className="pickup-speaker-area">

          {/* FINGER POINTING TO LISTEN */}

          <div className="pickup-speaker-finger">

            <span className="pickup-ring pickup-ring-one"></span>

            <span className="pickup-ring pickup-ring-two"></span>

            <span className="pickup-ring pickup-ring-three"></span>

            <span className="pickup-finger">
              ☝️
            </span>

          </div>


          <button
            className={`pickup-speaker-button ${
              speaking ? "speaking" : ""
            }`}
            onClick={speakScreen}
          >
            🔊 {text.listen}
          </button>

        </div>

      </header>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="pickup-content">

        <div className="pickup-top-icon">
          🚚
        </div>


        <h1>
          {text.title}
        </h1>


        <p className="pickup-subtitle">
          {text.subtitle}
        </p>


        {/* =========================
            RECYCLER CARD
        ========================= */}

        <div className="pickup-recycler-card">

          <div className="pickup-recycler-avatar">
            ♻
          </div>


          <div className="pickup-recycler-details">

            <h2>
              {recyclerName}
            </h2>

            <p>
              ✓ {text.verified}
            </p>

            <span>
              {text.lot}: {lotId}
            </span>

          </div>

        </div>


        {/* =========================
            DATE
        ========================= */}

        <div className="pickup-section">

          <h2>
            {text.chooseDate}
          </h2>


          <div className="pickup-date-options">

            <button
              className={`pickup-date-card ${
                selectedDate === "Today"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedDate("Today")
              }
            >

              <span>📅</span>

              <strong>
                {text.today}
              </strong>

            </button>


            <button
              className={`pickup-date-card ${
                selectedDate === "Tomorrow"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedDate("Tomorrow")
              }
            >

              <span>📅</span>

              <strong>
                {text.tomorrow}
              </strong>

            </button>

          </div>

        </div>


        {/* =========================
            TIME
        ========================= */}

        <div className="pickup-section">

          <h2>
            {text.chooseTime}
          </h2>


          <div className="pickup-time-options">

            <button
              className={`pickup-time-card ${
                selectedTime === text.morningTime
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedTime(
                  text.morningTime
                )
              }
            >

              <span>🌅</span>

              <div>

                <strong>
                  {text.morning}
                </strong>

                <small>
                  {text.morningTime}
                </small>

              </div>

            </button>


            <button
              className={`pickup-time-card ${
                selectedTime === text.afternoonTime
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedTime(
                  text.afternoonTime
                )
              }
            >

              <span>☀️</span>

              <div>

                <strong>
                  {text.afternoon}
                </strong>

                <small>
                  {text.afternoonTime}
                </small>

              </div>

            </button>


            <button
              className={`pickup-time-card ${
                selectedTime === text.eveningTime
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                setSelectedTime(
                  text.eveningTime
                )
              }
            >

              <span>🌇</span>

              <div>

                <strong>
                  {text.evening}
                </strong>

                <small>
                  {text.eveningTime}
                </small>

              </div>

            </button>

          </div>

        </div>


        {/* =========================
            SAFE MESSAGE
        ========================= */}

        <div className="pickup-safe-message">
          🛡️ {text.safe}
        </div>


        {/* =========================
            CONFIRM BUTTON
        ========================= */}

        <div className="confirm-pickup-area">

          <div className="confirm-pickup-finger">
            ☝️
          </div>


          <button
            className="confirm-pickup-button"
            onClick={handleConfirm}
          >
            {text.confirm}

            <span>
              →
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}

export default PickupSchedulingScreen;