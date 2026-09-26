import React, { useState } from "react";
import "./MyRequestsScreen.css";
function MyRequestsScreen({ language, onBack }) {
  const [speaking, setSpeaking] = useState(null);

  const translations = {
    en: {
      title: "My Requests",
      subtitle: "See offers and requests from recyclers",
      back: "← Back",
      newOffer: "New Offer",
      accepted: "Offer Accepted",
      view: "View Request",
      battery: "Battery",
      mobile: "Mobile Phone",
      kg: "kg",
      recycler: "Recycler",
      price: "Price",
      status: "Status",
      guidance: "Tap a request to see its details.",
      safe: "Only verified recycler offers are shown."
    },

    te: {
      title: "నా అభ్యర్థనలు",
      subtitle: "రీసైక్లర్ల నుండి ఆఫర్లు మరియు అభ్యర్థనలు చూడండి",
      back: "← వెనుకకు",
      newOffer: "కొత్త ఆఫర్",
      accepted: "ఆఫర్ అంగీకరించబడింది",
      view: "అభ్యర్థన చూడండి",
      battery: "బ్యాటరీ",
      mobile: "మొబైల్ ఫోన్",
      kg: "కిలోలు",
      recycler: "రీసైక్లర్",
      price: "ధర",
      status: "స్థితి",
      guidance: "వివరాలు చూడటానికి ఒక అభ్యర్థనను నొక్కండి.",
      safe: "ధృవీకరించబడిన రీసైక్లర్ ఆఫర్లు మాత్రమే చూపబడతాయి."
    },

    hi: {
      title: "मेरी रिक्वेस्ट",
      subtitle: "रीसायक्लर के ऑफर और रिक्वेस्ट देखें",
      back: "← वापस",
      newOffer: "नया ऑफर",
      accepted: "ऑफर स्वीकार किया गया",
      view: "रिक्वेस्ट देखें",
      battery: "बैटरी",
      mobile: "मोबाइल फोन",
      kg: "किलो",
      recycler: "रीसायक्लर",
      price: "कीमत",
      status: "स्थिति",
      guidance: "विवरण देखने के लिए किसी रिक्वेस्ट पर टैप करें।",
      safe: "केवल सत्यापित रीसायक्लर के ऑफर दिखाए जाते हैं।"
    },

    mr: {
      title: "माझ्या विनंत्या",
      subtitle: "रीसायकलरकडून आलेल्या ऑफर आणि विनंत्या पहा",
      back: "← मागे",
      newOffer: "नवीन ऑफर",
      accepted: "ऑफर स्वीकारली",
      view: "विनंती पहा",
      battery: "बॅटरी",
      mobile: "मोबाइल फोन",
      kg: "किलो",
      recycler: "रीसायकलर",
      price: "किंमत",
      status: "स्थिती",
      guidance: "तपशील पाहण्यासाठी विनंतीवर टॅप करा.",
      safe: "फक्त सत्यापित रीसायकलरच्या ऑफर दाखवल्या जातात."
    }
  };

  const text = translations[language] || translations.en;

  const voiceLanguages = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN"
  };

  const requests = [
    {
      id: "LOT-2026-0001",
      material: text.battery,
      weight: 3,
      recycler: "Recycler A",
      price: 420,
      status: text.accepted,
      statusType: "accepted"
    },
    {
      id: "LOT-2026-0002",
      material: text.mobile,
      weight: 5,
      recycler: "Recycler B",
      price: 430,
      status: text.newOffer,
      statusType: "new"
    }
  ];

  function speak(textToSpeak, id) {
    window.speechSynthesis.cancel();
    setSpeaking(id);

    const speech = new SpeechSynthesisUtterance(textToSpeak);
    speech.lang = voiceLanguages[language] || "en-IN";
    speech.rate = 0.75;
    speech.pitch = 1;

    speech.onend = () => setSpeaking(null);
    speech.onerror = () => setSpeaking(null);

    window.speechSynthesis.speak(speech);
  }

  function stopSpeaking() {
    window.speechSynthesis.cancel();
    setSpeaking(null);
  }

  function speakScreen() {
    speak(
      `${text.title}. ${text.subtitle}. ${text.guidance}`,
      "screen"
    );
  }

  return (
    <div className="my-requests-screen">

      <button
        className="my-requests-back-button"
        onClick={() => {
          stopSpeaking();
          onBack();
        }}
      >
        {text.back}
      </button>

      <div className="my-requests-speaker-wrapper">

        <button
          className={`my-requests-speaker-button ${
            speaking ? "speaking" : ""
          }`}
          onClick={
            speaking
              ? stopSpeaking
              : speakScreen
          }
        >
          🔊
        </button>

        <div className="my-requests-finger-effect">
          <span className="my-requests-ring ring-1"></span>
          <span className="my-requests-ring ring-2"></span>
          <span className="my-requests-ring ring-3"></span>
          <span className="my-requests-finger">☝️</span>
        </div>

      </div>

      <div className="my-requests-container">

        <div
          className={`my-requests-heading ${
            speaking === "screen"
              ? "my-requests-speaking"
              : ""
          }`}
          onClick={speakScreen}
        >
          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>
        </div>

        <div className="my-requests-guidance">
          <span className="guidance-finger">☝️</span>
          <span>{text.guidance}</span>
        </div>

        <div className="my-requests-list">

          {requests.map((request) => {

            const requestText =
              `${request.id}. ${request.material}. ` +
              `${request.weight} ${text.kg}. ` +
              `${text.recycler}: ${request.recycler}. ` +
              `${text.price}: ₹${request.price} per kg. ` +
              `${text.status}: ${request.status}.`;

            return (
              <div
                key={request.id}
                className={`my-request-card ${
                  request.statusType === "accepted"
                    ? "accepted-request"
                    : "new-request"
                }`}
                onClick={() =>
                  speak(requestText, request.id)
                }
              >

                <div className="my-request-top">

                  <div className="my-request-lot">
                    📦 {request.id}
                  </div>

                  <div
                    className={`my-request-status ${
                      request.statusType
                    }`}
                  >
                    {request.statusType === "new"
                      ? "💰"
                      : "✅"}{" "}
                    {request.status}
                  </div>

                </div>

                <div className="my-request-material">
                  ♻️ {request.material}
                </div>

                <div className="my-request-weight">
                  ⚖️ {request.weight} {text.kg}
                </div>

                <div className="my-request-divider"></div>

                <div className="my-request-details">

                  <div>
                    <span>{text.recycler}</span>
                    <strong>{request.recycler}</strong>
                  </div>

                  <div>
                    <span>{text.price}</span>
                    <strong>
                      ₹{request.price} / {text.kg}
                    </strong>
                  </div>

                </div>

                <button
                  className="my-request-view-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    speak(requestText, request.id);
                  }}
                >
                  {text.view}
                  <span>→</span>
                </button>

                <div className="my-request-finger">
                  ☝️
                </div>

              </div>
            );
          })}

        </div>

        <div className="my-requests-safe-message">
          🛡️ {text.safe}
        </div>

      </div>
    </div>
  );
}

export default MyRequestsScreen;