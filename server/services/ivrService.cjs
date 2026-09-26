const Collector = require("../models/Collector.cjs");
const Transaction = require("../models/Transaction.cjs");
const Payment = require("../models/Payment.cjs");

// ======================================================
// MULTILINGUAL PROMPTS & STRINGS
// ======================================================

const IVR_MESSAGES = {
  en: {
    welcome: "Welcome to E-Waste Connect IVR Service.",
    selectLanguagePrompt: "For Telugu, press 1. For Hindi, press 2. For English, press 3. For Marathi, press 4.",
    languageSelected: "You have selected English.",
    mainMenuPrompt: "Main Menu: Press 1 to Register or Verify Collector. Press 2 to Check Transactions. Press 3 to Check Payments. Press 4 for Help and Support. Press 0 to Repeat this menu.",
    alreadyRegistered: (id, status) => `You are already registered. Your Collector ID is ${id}. Your verification status is ${status}.`,
    registrationSuccess: (id) => `Your registration is successful. Your Collector ID is ${id}. Your verification status is Pending.`,
    notRegisteredPrompt: "Your phone number is not registered yet. Please press 1 to register as a collector.",
    noTransactions: "No transactions found for your account.",
    latestTransaction: (count, id, material, weight, status, amount) =>
      `You have ${count} transaction${count > 1 ? "s" : ""}. Latest transaction ${id}: Material ${material}, Weight ${weight} kilograms, Status ${status}, Amount ${amount} rupees.`,
    noPayments: "No payments found for your account.",
    latestPayment: (amount, id, status, method) =>
      `Your latest payment of ${amount} rupees for transaction ${id} is ${status} via ${method}.`,
    helpMessage: "E-Waste Connect enables collectors to sell e-waste to verified recyclers at guaranteed prices without a smartphone. Bring your collected e-waste to your nearest collection hub or call this line anytime to check your transactions and payments. Press 0 to return to the main menu.",
    invalidOption: "Invalid option entered. Please try again.",
    repeatMenu: "Repeating the menu.",
    error: "An error occurred while processing your request. Please try again later."
  },

  te: {
    welcome: "ఈ-వేస్ట్ కనెక్ట్ ఐ.వి.ఆర్ సేవలకు స్వాగతం.",
    selectLanguagePrompt: "తెలుగు కోసం 1 నొక్కండి. హిందీ కోసం 2 నొక్కండి. ఇంగ్లీష్ కోసం 3 నొక్కండి. మరాఠీ కోసం 4 నొక్కండి.",
    languageSelected: "మీరు తెలుగు భాషను ఎంచుకున్నారు.",
    mainMenuPrompt: "ప్రధాన మెనూ: కలెక్టర్ రిజిస్ట్రేషన్ లేదా ధృవీకరణ కోసం 1 నొక్కండి. లావాదేవీలు తనిఖీ చేయడానికి 2 నొక్కండి. చెల్లింపులు తనిఖీ చేయడానికి 3 నొక్కండి. సహాయం కోసం 4 నొక్కండి. ఈ మెనూను మళ్ళీ వినడానికి 0 నొక్కండి.",
    alreadyRegistered: (id, status) => `మీరు ఇప్పటికే నమోదు చేసుకున్నారు. మీ కలెక్టర్ ఐడి ${id}. మీ ధృవీకరణ స్థితి ${status}.`,
    registrationSuccess: (id) => `మీ రిజిస్ట్రేషన్ విజయవంతమైంది. మీ కలెక్టర్ ఐడి ${id}. మీ ధృవీకరణ స్థితి పెండింగ్‌లో ఉంది.`,
    notRegisteredPrompt: "మీ ఫోన్ నంబర్ ఇంకా నమోదు కాలేదు. కలెక్టర్‌గా నమోదు చేసుకోవడానికి దయచేసి 1 నొక్కండి.",
    noTransactions: "మీ ఖాతాలో ఎలాంటి లావాదేవీలు కనుగొనబడలేదు.",
    latestTransaction: (count, id, material, weight, status, amount) =>
      `మీకు ${count} లావాదేవీలు ఉన్నాయి. తాజా లావాదేవీ ${id}: సామగ్రి ${material}, బరువు ${weight} కిలోలు, స్థితి ${status}, మొత్తం ${amount} రూపాయలు.`,
    noPayments: "మీ ఖాతాలో ఎలాంటి చెల్లింపులు కనుగొనబడలేదు.",
    latestPayment: (amount, id, status, method) =>
      `లావాదేవీ ${id} కోసం ${amount} రూపాయల మీ తాజా చెల్లింపు స్థితి: ${status} (${method} ద్వారా).`,
    helpMessage: "స్మార్ట్‌ఫోన్ లేకుండానే ఈ-వ్యర్థాలను ధృవీకరించబడిన రీసైక్లర్లకు విక్రయించడానికి ఈ-వేస్ట్ కనెక్ట్ మీకు సహాయపడుతుంది. మీ సేకరించిన వ్యర్థాలను సమీప కేంద్రానికి తీసుకెళ్లండి. ప్రధాన మెనూకి తిరిగి వెళ్ళడానికి 0 నొక్కండి.",
    invalidOption: "చెల్లని ఎంపిక. దయచేసి మళ్ళీ ప్రయత్నించండి.",
    repeatMenu: "మెనూ పునరావృతం అవుతోంది.",
    error: "మీ అభ్యర్థనను ప్రాసెస్ చేయడంలో లోపం ఏర్పడింది. దయచేసి కాసేపటి తర్వాత ప్రయత్నించండి."
  },

  hi: {
    welcome: "ई-वेस्ट कनेक्ट आईवीआर सेवा में आपका स्वागत है।",
    selectLanguagePrompt: "तेलुगु के लिए 1 दबाएं। हिन्दी के लिए 2 दबाएं। अंग्रेजी के लिए 3 दबाएं। मराठी के लिए 4 दबाएं।",
    languageSelected: "आपने हिन्दी चुनी है।",
    mainMenuPrompt: "मुख्य मेनू: कलेक्टर पंजीकरण या सत्यापन के लिए 1 दबाएं। लेनदेन जांचने के लिए 2 दबाएं। भुगतान स्थिति के लिए 3 दबाएं। सहायता के लिए 4 दबाएं। मेनू दोहराने के लिए 0 दबाएं।",
    alreadyRegistered: (id, status) => `आप पहले से पंजीकृत हैं। आपकी कलेक्टर आईडी ${id} है। आपका सत्यापन स्थिति ${status} है।`,
    registrationSuccess: (id) => `आपका पंजीकरण सफल रहा। आपकी कलेक्टर आईडी ${id} है। सत्यापन स्थिति लंबित (Pending) है।`,
    notRegisteredPrompt: "आपका फ़ोन नंबर अभी पंजीकृत नहीं है। कलेक्टर पंजीकरण के लिए कृपया 1 दबाएं।",
    noTransactions: "आपके खाते में कोई लेनदेन नहीं मिला।",
    latestTransaction: (count, id, material, weight, status, amount) =>
      `आपके पास ${count} लेनदेन हैं। नवीनतम लेनदेन ${id}: सामग्री ${material}, वजन ${weight} किलोग्राम, स्थिति ${status}, कुल राशि ₹${amount}।`,
    noPayments: "आपके खाते में कोई भुगतान नहीं मिला।",
    latestPayment: (amount, id, status, method) =>
      `लेनदेन ${id} के लिए ₹${amount} का नवीनतम भुगतान स्थिति: ${status} (${method} द्वारा)।`,
    helpMessage: "ई-वेस्ट कनेक्ट बिना स्मार्टफोन के भी ई-कचरे को उचित मूल्य पर बेचने में मदद करता है। अपना ई-कचरा निकटतम संग्रहण केंद्र पर ले जाएं या अपनी स्थिति जांचने के लिए इस नंबर पर कॉल करें। मुख्य मेनू के लिए 0 दबाएं।",
    invalidOption: "अमान्य विकल्प। कृपया पुनः प्रयास करें।",
    repeatMenu: "मेनू दोहराया जा रहा है।",
    error: "अनुरोध संसाधित करने में त्रुटि हुई। कृपया बाद में प्रयास करें।"
  },

  mr: {
    welcome: "ई-वेस्ट कनेक्ट आय.व्ही.आर सेवेमध्ये आपले स्वागत आहे.",
    selectLanguagePrompt: "तेलगूसाठी 1 दाबा. हिंदीसाठी 2 दाबा. इंग्रजीसाठी 3 दाबा. मराठीसाठी 4 दाबा.",
    languageSelected: "आपण मराठी भाषा निवडली आहे.",
    mainMenuPrompt: "मुख्य मेनू: संकलक नोंदणी किंवा पडताळणीसाठी 1 दाबा. व्यवहार तपासण्यासाठी 2 दाबा. पेमेंट तपासण्यासाठी 3 दाबा. मदतीसाठी 4 दाबा. मेनू पुन्हा ऐकण्यासाठी 0 दाबा.",
    alreadyRegistered: (id, status) => `आपण आधीच नोंदणीकृत आहात. आपला संकलक आयडी ${id} आहे. आपली पडताळणी स्थिती ${status} आहे.`,
    registrationSuccess: (id) => `आपली नोंदणी यशस्वी झाली आहे. आपला संकलक आयडी ${id} आहे. पडताळणी स्थिती प्रलंबित (Pending) आहे.`,
    notRegisteredPrompt: "आपला फोन नंबर अद्याप नोंदणीकृत नाही. कृपया संकलक नोंदणीसाठी 1 दाबा.",
    noTransactions: "आपल्या खात्यात कोणताही व्यवहार आढळला नाही.",
    latestTransaction: (count, id, material, weight, status, amount) =>
      `आपल्याकडे ${count} व्यवहार आहेत. नवीनतम व्यवहार ${id}: साहित्य ${material}, वजन ${weight} किलो, स्थिती ${status}, एकूण रक्कम ₹${amount}.`,
    noPayments: "आपल्या खात्यात कोणतेही पेमेंट आढळले नाही.",
    latestPayment: (amount, id, status, method) =>
      `व्यवहार ${id} साठी ₹${amount} चे नवीनतम पेमेंट: ${status} (${method} द्वारे).`,
    helpMessage: "ई-वेस्ट कनेक्ट स्मार्टफोनशिवाय ई-कचरा योग्य भावात विकण्यास मदत करते. संकलित केलेला ई-कचरा जवळच्या केंद्रात जमा करा. मुख्य मेनूसाठी 0 दाबा.",
    invalidOption: "अवैध पर्याय. कृपया पुन्हा प्रयत्न करा.",
    repeatMenu: "मेनू पुन्हा सांगितला जात आहे.",
    error: "प्रक्रिया करताना त्रुटी आली. कृपया नंतर प्रयत्न करा."
  }
};

// Map IVR digit to language code
const DIGIT_TO_LANG = {
  "1": "te",
  "2": "hi",
  "3": "en",
  "4": "mr"
};

// Helper: Normalize phone numbers (last 10 digits matching)
function cleanPhoneNumber(phone) {
  if (!phone) return "";
  const cleaned = String(phone).replace(/\D/g, "");
  return cleaned.length > 10 ? cleaned.slice(-10) : cleaned;
}

// Helper: Find collector by phone
async function findCollectorByPhone(phone) {
  const digits = cleanPhoneNumber(phone);
  if (!digits) return null;
  return await Collector.findOne({
    phone: { $regex: digits + "$" }
  });
}

// ======================================================
// IVR SERVICE METHODS (PROVIDER AGNOSTIC)
// ======================================================

/**
 * 1. Start IVR call: Welcome message & language selection prompt
 */
function handleStart(callerNumber = "") {
  const combinedWelcome =
    "Welcome to E-Waste Connect IVR. " +
    "ఈ-వేస్ట్ కనెక్ట్ ఐ.వి.ఆర్ సేవలకు స్వాగతం. " +
    "ई-वेस्ट कनेक्ट आईवीआर में आपका स्वागत है. ";

  const prompt =
    "Press 1 for Telugu (తెలుగు). " +
    "Press 2 for Hindi (हिन्दी). " +
    "Press 3 for English. " +
    "Press 4 for Marathi (मराठी).";

  return {
    success: true,
    step: "language_selection",
    callerNumber: callerNumber || "",
    audioText: `${combinedWelcome} ${prompt}`,
    validDigits: ["1", "2", "3", "4"],
    options: [
      { digit: "1", language: "te", label: "Telugu" },
      { digit: "2", language: "hi", label: "Hindi" },
      { digit: "3", language: "en", label: "English" },
      { digit: "4", language: "mr", label: "Marathi" }
    ]
  };
}

/**
 * 2. Handle Language Selection: Sets language & gives Main Menu
 */
function handleLanguageSelect(callerNumber = "", digit = "3") {
  const selectedLang = DIGIT_TO_LANG[String(digit)] || "en";
  const messages = IVR_MESSAGES[selectedLang] || IVR_MESSAGES.en;

  const audioText = `${messages.languageSelected} ${messages.mainMenuPrompt}`;

  return {
    success: true,
    step: "main_menu",
    callerNumber: callerNumber || "",
    language: selectedLang,
    audioText: audioText,
    validDigits: ["1", "2", "3", "4", "0"],
    options: [
      { digit: "1", action: "register_verify", label: "Register / Verify Collector" },
      { digit: "2", action: "check_transaction", label: "Check Transaction" },
      { digit: "3", action: "check_payment", label: "Check Payment" },
      { digit: "4", action: "get_help", label: "Get Help" },
      { digit: "0", action: "repeat_menu", label: "Repeat Menu" }
    ]
  };
}

/**
 * 3. Handle Main Menu Selection: Routes digit to corresponding action
 */
async function handleMainMenu(callerNumber = "", language = "en", digit = "0", additionalData = {}) {
  const lang = IVR_MESSAGES[language] ? language : "en";
  const messages = IVR_MESSAGES[lang];
  const choice = String(digit).trim();

  switch (choice) {
    case "1":
      return await handleRegisterOrVerify(callerNumber, lang, additionalData);
    case "2":
      return await handleCheckTransaction(callerNumber, lang);
    case "3":
      return await handleCheckPayment(callerNumber, lang);
    case "4":
      return handleHelp(lang);
    case "0":
      return {
        success: true,
        step: "main_menu",
        language: lang,
        callerNumber,
        audioText: `${messages.repeatMenu} ${messages.mainMenuPrompt}`,
        validDigits: ["1", "2", "3", "4", "0"]
      };
    default:
      return {
        success: false,
        step: "main_menu",
        language: lang,
        callerNumber,
        audioText: `${messages.invalidOption} ${messages.mainMenuPrompt}`,
        validDigits: ["1", "2", "3", "4", "0"]
      };
  }
}

/**
 * 4. Register or Verify Collector
 * Checks if collector exists by caller phone number; if not, registers new collector
 */
async function handleRegisterOrVerify(callerNumber = "", language = "en", additionalData = {}) {
  const lang = IVR_MESSAGES[language] ? language : "en";
  const messages = IVR_MESSAGES[lang];

  if (!callerNumber) {
    return {
      success: false,
      step: "registration_error",
      language: lang,
      audioText: messages.error,
      message: "Phone number required for IVR registration"
    };
  }

  const existingCollector = await findCollectorByPhone(callerNumber);

  if (existingCollector) {
    return {
      success: true,
      step: "collector_verified",
      isNew: false,
      language: lang,
      collector: existingCollector,
      audioText: messages.alreadyRegistered(existingCollector.collectorId, existingCollector.verificationStatus),
      prompt: `Collector ID: ${existingCollector.collectorId}, Status: ${existingCollector.verificationStatus}`
    };
  }

  // Create new collector from IVR phone
  const cleanPhone = cleanPhoneNumber(callerNumber) || callerNumber;
  const uniqueSuffix = cleanPhone.slice(-4) + Math.floor(100 + Math.random() * 900);
  const collectorId = `COL-IVR-${uniqueSuffix}`;

  const newCollector = new Collector({
    collectorId: collectorId,
    name: additionalData.name || `IVR Collector ${cleanPhone.slice(-4)}`,
    phone: callerNumber,
    location: additionalData.location || "IVR Phone Access",
    verificationStatus: "Pending"
  });

  const savedCollector = await newCollector.save();

  return {
    success: true,
    step: "collector_registered",
    isNew: true,
    language: lang,
    collector: savedCollector,
    audioText: messages.registrationSuccess(savedCollector.collectorId),
    prompt: `Registration successful. Collector ID: ${savedCollector.collectorId}`
  };
}

/**
 * 5. Check Transactions
 * Finds transactions for the caller's phone or collector account
 */
async function handleCheckTransaction(callerNumber = "", language = "en") {
  const lang = IVR_MESSAGES[language] ? language : "en";
  const messages = IVR_MESSAGES[lang];

  const collector = await findCollectorByPhone(callerNumber);

  if (!collector) {
    return {
      success: false,
      step: "not_registered",
      language: lang,
      audioText: messages.notRegisteredPrompt,
      message: "Caller not registered"
    };
  }

  const transactions = await Transaction.find({
    collectorId: collector.collectorId
  }).sort({ transactionDate: -1, createdAt: -1 });

  if (!transactions || transactions.length === 0) {
    return {
      success: true,
      step: "transactions_checked",
      language: lang,
      count: 0,
      audioText: messages.noTransactions,
      transactions: []
    };
  }

  const latest = transactions[0];
  const audio = messages.latestTransaction(
    transactions.length,
    latest.transactionId,
    latest.material || "E-Waste",
    latest.weight || 0,
    latest.status || "Pending",
    latest.totalAmount || 0
  );

  return {
    success: true,
    step: "transactions_checked",
    language: lang,
    count: transactions.length,
    latestTransaction: latest,
    transactions: transactions,
    audioText: audio
  };
}

/**
 * 6. Check Payment
 * Finds payment records for the caller's phone or collector account
 */
async function handleCheckPayment(callerNumber = "", language = "en") {
  const lang = IVR_MESSAGES[language] ? language : "en";
  const messages = IVR_MESSAGES[lang];

  const collector = await findCollectorByPhone(callerNumber);

  if (!collector) {
    return {
      success: false,
      step: "not_registered",
      language: lang,
      audioText: messages.notRegisteredPrompt,
      message: "Caller not registered"
    };
  }

  const payments = await Payment.find({
    collectorId: collector.collectorId
  }).sort({ paymentDate: -1, createdAt: -1 });

  if (!payments || payments.length === 0) {
    return {
      success: true,
      step: "payments_checked",
      language: lang,
      count: 0,
      audioText: messages.noPayments,
      payments: []
    };
  }

  const latest = payments[0];
  const audio = messages.latestPayment(
    latest.amount || 0,
    latest.transactionId || "N/A",
    latest.paymentStatus || "Pending",
    latest.paymentMethod || "UPI"
  );

  return {
    success: true,
    step: "payments_checked",
    language: lang,
    count: payments.length,
    latestPayment: latest,
    payments: payments,
    audioText: audio
  };
}

/**
 * 7. Get Help
 * Audio guidance on how E-Waste Connect works for non-smartphone collectors
 */
function handleHelp(language = "en") {
  const lang = IVR_MESSAGES[language] ? language : "en";
  const messages = IVR_MESSAGES[lang];

  return {
    success: true,
    step: "help",
    language: lang,
    audioText: messages.helpMessage,
    validDigits: ["0"],
    options: [
      { digit: "0", action: "repeat_menu", label: "Return to Main Menu" }
    ]
  };
}

module.exports = {
  IVR_MESSAGES,
  DIGIT_TO_LANG,
  handleStart,
  handleLanguageSelect,
  handleMainMenu,
  handleRegisterOrVerify,
  handleCheckTransaction,
  handleCheckPayment,
  handleHelp
};
