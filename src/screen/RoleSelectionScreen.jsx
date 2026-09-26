import React, { useState } from "react";

// Placeholder IVR phone number (easy to replace with real telephony provider)
export const IVR_PHONE_NUMBER = "+91-XXXXXXXXXX";

function RoleSelectionScreen({
  language,
  onSelectRole,
  onOpenDemoIVR,
  onBack
}) {
  const [speaking, setSpeaking] = useState(null);

  const translations = {
    en: {
      title: "Who Are You?",
      subtitle: "Choose your role to continue",

      collector: "Collector",
      collectorDescription:
        "Collect e-waste and sell it to verified recyclers.",

      recycler: "Recycler",
      recyclerDescription:
        "Find e-waste and manage your recycling business.",

      admin: "Admin",
      adminDescription:
        "Manage recyclers, collectors, transactions and platform activity.",

      sahayak: "Digital Sahayak",
      sahayakDescription:
        "Get help using the platform.",

      ivrNoSmartphone: "Don't have a smartphone?",
      ivrCallPrompt: "Call E-Waste Connect",
      ivrCallButton: "CALL E-WASTE CONNECT",
      ivrModalTitle: "Call E-Waste Connect IVR",
      ivrModalDesc:
        "Dial this number from any mobile or basic keypad phone to register, check transactions or payments without a smartphone.",
      ivrDialNow: "Dial Now",
      ivrCopyNumber: "Copy Number",
      ivrNumberCopied: "Copied!",
      ivrClose: "Close",

      back: "← Back",
      selected: "Selected language",
      selectedLanguage: "English"
    },

    te: {
      title: "మీరు ఎవరు?",
      subtitle: "కొనసాగించడానికి మీ పాత్రను ఎంచుకోండి",

      collector: "సేకరించేవారు",
      collectorDescription:
        "ఈ-వ్యర్థాలను సేకరించి, ధృవీకరించబడిన రీసైక్లర్లకు విక్రయించండి.",

      recycler: "రీసైక్లర్",
      recyclerDescription:
        "ఈ-వ్యర్థాలను కనుగొని, మీ రీసైక్లింగ్ వ్యాపారాన్ని నిర్వహించండి.",

      admin: "అడ్మిన్",
      adminDescription:
        "రీసైక్లర్లు, కలెక్టర్లు, లావాదేవీలు మరియు ప్లాట్‌ఫారమ్ కార్యకలాపాలను నిర్వహించండి.",

      sahayak: "డిజిటల్ సహాయక్",
      sahayakDescription:
        "ప్లాట్‌ఫారమ్‌ను ఉపయోగించడంలో సహాయం పొందండి.",

      ivrNoSmartphone: "స్మార్ట్‌ఫోన్ లేదా?",
      ivrCallPrompt: "ఈ-వేస్ట్ కనెక్ట్‌కు కాల్ చేయండి",
      ivrCallButton: "ఈ-వేస్ట్ కనెక్ట్‌కు కాల్ చేయండి",
      ivrModalTitle: "ఈ-వేస్ట్ కనెక్ట్ ఐ.వి.ఆర్ కి కాల్ చేయండి",
      ivrModalDesc:
        "స్మార్ట్‌ఫోన్ లేకుండా రిజిస్ట్రేషన్, లావాదేవీలు లేదా చెల్లింపులను తనిఖీ చేయడానికి ఏదైనా మొబైల్ లేదా సాధారణ కీప్యాడ్ ఫోన్ నుండి ఈ నంబర్‌కు కాల్ చేయండి.",
      ivrDialNow: "ఇప్పుడే కాల్ చేయండి",
      ivrCopyNumber: "నంబర్‌ను కాపీ చేయండి",
      ivrNumberCopied: "కాపీ చేయబడింది!",
      ivrClose: "మూసివేయి",

      back: "← వెనుకకు",
      selected: "ఎంచుకున్న భాష",
      selectedLanguage: "తెలుగు"
    },

    hi: {
      title: "आप कौन हैं?",
      subtitle: "जारी रखने के लिए अपनी भूमिका चुनें",

      collector: "कलेक्टर",
      collectorDescription:
        "ई-कचरा एकत्र करें और इसे सत्यापित रिसाइकलरों को बेचें।",

      recycler: "रिसाइकलर",
      recyclerDescription:
        "ई-कचरा खोजें और अपने रीसाइक्लिंग व्यवसाय को प्रबंधित करें।",

      admin: "एडमिन",
      adminDescription:
        "रिसाइकलरों, कलेक्टरों, लेनदेन और प्लेटफ़ॉर्म गतिविधियों को प्रबंधित करें।",

      sahayak: "डिजिटल सहायक",
      sahayakDescription:
        "प्लेटफ़ॉर्म का उपयोग करने में सहायता प्राप्त करें।",

      ivrNoSmartphone: "क्या आपके पास स्मार्टफोन नहीं है?",
      ivrCallPrompt: "ई-वेस्ट कनेक्ट को कॉल करें",
      ivrCallButton: "ई-वेस्ट कनेक्ट को कॉल करें",
      ivrModalTitle: "ई-वेस्ट कनेक्ट आईवीआर को कॉल करें",
      ivrModalDesc:
        "स्मार्टफोन के बिना पंजीकरण, लेनदेन और भुगतान जांचने के लिए किसी भी मोबाइल या साधारण कीपैड फोन से इस नंबर पर कॉल करें।",
      ivrDialNow: "अभी कॉल करें",
      ivrCopyNumber: "नंबर कॉपी करें",
      ivrNumberCopied: "कॉपी हो गया!",
      ivrClose: "बंद करें",

      back: "← वापस",
      selected: "चयनित भाषा",
      selectedLanguage: "हिन्दी"
    },

    mr: {
      title: "तुम्ही कोण आहात?",
      subtitle: "पुढे जाण्यासाठी तुमची भूमिका निवडा",

      collector: "संकलक",
      collectorDescription:
        "ई-कचरा गोळा करा आणि तो सत्यापित रिसायकलर्सना विक्री करा.",

      recycler: "रिसायकलर",
      recyclerDescription:
        "ई-कचरा शोधा आणि तुमचा रिसायकलिंग व्यवसाय व्यवस्थापित करा.",

      admin: "अॅडमिन",
      adminDescription:
        "रिसायकलर्स, संकलक, व्यवहार आणि प्लॅटफॉर्मच्या कामकाजाचे व्यवस्थापन करा.",

      sahayak: "डिजिटल सहाय्यक",
      sahayakDescription:
        "प्लॅटफॉर्म वापरण्यासाठी मदत मिळवा.",

      ivrNoSmartphone: "स्मार्टफोन नाही का?",
      ivrCallPrompt: "ई-वेस्ट कनेक्टला कॉल करा",
      ivrCallButton: "ई-वेस्ट कनेक्टला कॉल करा",
      ivrModalTitle: "ई-वेस्ट कनेक्ट आय.व्ही.आर ला कॉल करा",
      ivrModalDesc:
        "स्मार्टफोनशिवाय नोंदणी, व्यवहार आणि पेमेंट तपासण्यासाठी कोणत्याही मोबाइल किंवा सामान्य कीपॅड फोनवरून या नंबरवर कॉल करा.",
      ivrDialNow: "आता कॉल करा",
      ivrCopyNumber: "नंबर कॉपी करा",
      ivrNumberCopied: "कॉपी केले!",
      ivrClose: "बंद करा",

      back: "← मागे",
      selected: "निवडलेली भाषा",
      selectedLanguage: "मराठी"
    }
  };

  const selectedLanguage = language || "en";

  const text =
    translations[selectedLanguage] || translations.en;

  const roles = [
    {
      id: "collector",
      icon: "♻️",
      title: text.collector,
      description: text.collectorDescription
    },

    {
      id: "recycler",
      icon: "🏭",
      title: text.recycler,
      description: text.recyclerDescription
    },

    {
      id: "admin",
      icon: "🛡️",
      title: text.admin,
      description: text.adminDescription
    },

    {
      id: "sahayak",
      icon: "🤝",
      title: text.sahayak,
      description: text.sahayakDescription
    }
  ];

  const voiceLanguages = {
    en: "en-IN",
    te: "te-IN",
    hi: "hi-IN",
    mr: "mr-IN"
  };

  function speakText(textToSpeak, roleId) {
    if (!window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();

    setSpeaking(roleId);

    const speech =
      new SpeechSynthesisUtterance(
        textToSpeak
      );

    speech.lang =
      voiceLanguages[selectedLanguage] || "en-IN";

    speech.rate = 0.75;
    speech.pitch = 1;

    speech.onend = () => {
      setSpeaking(null);
    };

    speech.onerror = () => {
      setSpeaking(null);
    };

    window.speechSynthesis.speak(speech);
  }

  function speakScreen() {
    if (!window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();

    setSpeaking("title");

    const items = [
      {
        id: "title",
        text: `${text.title}. ${text.subtitle}`
      },

      {
        id: "collector",
        text:
          `${text.collector}. ` +
          `${text.collectorDescription}`
      },

      {
        id: "recycler",
        text:
          `${text.recycler}. ` +
          `${text.recyclerDescription}`
      },

      {
        id: "admin",
        text:
          `${text.admin}. ` +
          `${text.adminDescription}`
      },

      {
        id: "sahayak",
        text:
          `${text.sahayak}. ` +
          `${text.sahayakDescription}`
      },

      {
        id: "ivr",
        text:
          `${text.ivrNoSmartphone}. ` +
          `${text.ivrCallPrompt}. ` +
          `${IVR_PHONE_NUMBER}`
      },

      {
        id: "selected",
        text:
          `${text.selected}: ` +
          `${text.selectedLanguage}`
      }
    ];

    let index = 0;

    function speakNext() {
      if (index >= items.length) {
        setSpeaking(null);
        return;
      }

      const item = items[index];

      setSpeaking(item.id);

      const speech =
        new SpeechSynthesisUtterance(
          item.text
        );

      speech.lang =
        voiceLanguages[selectedLanguage] || "en-IN";

      speech.rate = 0.75;
      speech.pitch = 1;

      speech.onend = () => {
        index++;

        setTimeout(() => {
          speakNext();
        }, 300);
      };

      speech.onerror = () => {
        index++;

        setTimeout(() => {
          speakNext();
        }, 300);
      };

      window.speechSynthesis.speak(speech);
    }

    speakNext();
  }

  function stopSpeaking() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setSpeaking(null);
  }

  function handleRoleClick(roleId) {
    stopSpeaking();

    if (onSelectRole) {
      onSelectRole(roleId);
    }
  }

  function handleCallClick(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    stopSpeaking();

    if (onOpenDemoIVR) {
      onOpenDemoIVR();
    }
  }

  return (
    <div className="role-screen">

      {/* =========================
          BACK BUTTON
      ========================= */}

      <button
        className="back-button"
        onClick={() => {
          stopSpeaking();

          if (onBack) {
            onBack();
          }
        }}
      >
        {text.back}
      </button>


      {/* =========================
          SPEAKER
      ========================= */}

      <div className="role-speaker-wrapper">

        <button
          className={`role-speaker-button ${
            speaking ? "speaking" : ""
          }`}
          onClick={
            speaking
              ? stopSpeaking
              : speakScreen
          }
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/727/727269.png"
            alt="Speaker"
          />
        </button>


        {/* Finger + concentric circles */}

        <div className="role-speaker-finger-guide">

          <span
            className="
              role-speaker-ring
              role-ring-1
            "
          ></span>

          <span
            className="
              role-speaker-ring
              role-ring-2
            "
          ></span>

          <span
            className="
              role-speaker-ring
              role-ring-3
            "
          ></span>

          <span className="role-speaker-finger">
            👆
          </span>

        </div>

      </div>


      {/* =========================
          ROLE CONTAINER
      ========================= */}

      <div className="role-container">

        <div
          className={`role-title-area ${
            speaking === "title"
              ? "speaking-section"
              : ""
          }`}
        >
          <h1>
            {text.title}
          </h1>
        </div>


        <p
          className={`role-description ${
            speaking === "title"
              ? "speaking-text"
              : ""
          }`}
        >
          {text.subtitle}
        </p>


        {/* =========================
            ROLE CARDS
        ========================= */}

        <div className="role-grid">

          {roles.map((role) => (

            <div
              key={role.id}

              className={`role-card ${
                speaking === role.id
                  ? "speaking-section"
                  : ""
              }`}

              onClick={() =>
                handleRoleClick(role.id)
              }
            >

              <div className="role-icon">
                {role.icon}
              </div>


              <h2>
                {role.title}
              </h2>


              <p>
                {role.description}
              </p>

            </div>

          ))}

        </div>


        {/* ===================================================
            IVR OPTION (ALTERNATIVE ACCESS FOR NON-SMARTPHONES)
        =================================================== */}

        <div
          className={`role-ivr-container ${
            speaking === "ivr" ? "speaking-section" : ""
          }`}
        >
          <div className="role-ivr-header">
            <span className="role-ivr-badge">
              ☎️ {text.ivrNoSmartphone}
            </span>
          </div>

          <div className="role-ivr-card">
            <div className="role-ivr-details">
              <h3 className="role-ivr-title">
                {text.ivrCallPrompt}
              </h3>

              <p className="role-ivr-number">
                <span className="role-ivr-phone-icon">📞</span>
                <span>{IVR_PHONE_NUMBER}</span>
              </p>
            </div>

            <button
              type="button"
              className="role-ivr-call-btn"
              onClick={handleCallClick}
            >
              📞 {text.ivrCallButton}
            </button>
          </div>
        </div>


        {/* =========================
            SELECTED LANGUAGE
        ========================= */}

        <p
          className={`selected-language ${
            speaking === "selected"
              ? "speaking-text"
              : ""
          }`}
        >
          {text.selected}:{" "}

          <strong>
            {text.selectedLanguage}
          </strong>
        </p>

      </div>

    </div>
  );
}

export default RoleSelectionScreen;