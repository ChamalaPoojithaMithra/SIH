import React, { useState } from "react";

import CreateLotScreen from "./CreateLotScreen";

import "./App.css";

function App() {
  // ==========================================
  // CURRENT SCREEN
  // ==========================================

  const [currentScreen, setCurrentScreen] = useState("add-ewaste");

  // ==========================================
  // LANGUAGE
  // ==========================================

  const [language, setLanguage] = useState("en");

  // ==========================================
  // E-WASTE DATA
  // ==========================================

  const [material, setMaterial] = useState("Battery");
  const [weight, setWeight] = useState("2");
  const [photo, setPhoto] = useState(null);

  // ==========================================
  // GO TO ADD E-WASTE
  // ==========================================

  function goToAddEWaste() {
    setCurrentScreen("add-ewaste");
  }

  // ==========================================
  // GO TO CREATE LOT
  // ==========================================

  function goToCreateLot(data) {
    setMaterial(data.material || "Battery");
    setWeight(data.weight || "2");
    setPhoto(data.photo || null);

    setCurrentScreen("create-lot");
  }

  // ==========================================
  // CREATE LOT BACK BUTTON
  // ==========================================

  function handleCreateLotBack() {
    /*
      DIRECT NAVIGATION

      Create Lot
          ↓
        BACK
          ↓
      Add E-Waste

      It does NOT go through:
      Identifying E-Waste
      Photo Added
      Take a Photo
      Photo Selection
    */

    setCurrentScreen("add-ewaste");
  }

  // ==========================================
  // CREATE LOT COMPLETE
  // ==========================================

  function handleCreateLot(data) {
    console.log("Created Lot:", data);

    /*
      Put your next screen here.

      Example:

      setCurrentScreen("matches");

    */

    alert(
      `Lot Created Successfully!\n\nLot ID: ${data.lotId}`
    );
  }

  // ==========================================
  // ADD E-WASTE SCREEN
  // ==========================================

  if (currentScreen === "add-ewaste") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#071a2b",
          color: "white",
          padding: "40px 20px",
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif"
        }}
      >

        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >

          <h1>
            Add E-Waste
          </h1>

          <p>
            Add your e-waste to create a new waste lot.
          </p>

          <div
            style={{
              background: "#102b40",
              padding: "25px",
              borderRadius: "18px",
              marginTop: "30px"
            }}
          >

            <h2>
              E-Waste Details
            </h2>

            <p>
              Material: {material}
            </p>

            <p>
              Weight: {weight} kg
            </p>

            <button
              onClick={() =>
                goToCreateLot({
                  material: material,
                  weight: weight,
                  photo: photo
                })
              }
              style={{
                marginTop: "20px",
                width: "100%",
                padding: "16px",
                border: "none",
                borderRadius: "14px",
                background: "#25b95f",
                color: "white",
                fontSize: "17px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              CONTINUE TO CREATE LOT →
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ==========================================
  // CREATE LOT SCREEN
  // ==========================================

  if (currentScreen === "create-lot") {
    return (
      <CreateLotScreen
        language={language}
        material={material}
        weight={weight}
        photo={photo}

        /*
          THIS IS THE IMPORTANT PART.

          Clicking Back directly opens
          the Add E-Waste screen.
        */

        onBack={handleCreateLotBack}

        onCreateLot={handleCreateLot}
      />
    );
  }

  // ==========================================
  // FALLBACK
  // ==========================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071a2b",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif"
      }}
    >

      <button
        onClick={goToAddEWaste}
        style={{
          padding: "16px 25px",
          border: "none",
          borderRadius: "12px",
          background: "#25b95f",
          color: "white",
          fontSize: "16px",
          fontWeight: "700",
          cursor: "pointer"
        }}
      >
        GO TO ADD E-WASTE
      </button>

    </div>
  );
}

export default App;