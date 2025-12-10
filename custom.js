// assets/js/custom.js
// LD11 – JavaScript formos logika, validacija ir pop-up
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const rating1 = document.getElementById("rating1");
  const rating2 = document.getElementById("rating2");
  const rating3 = document.getElementById("rating3");

  const submitBtn = document.getElementById("contact-submit");
  const resultsBox = document.getElementById("form-results");
  const averageBox = document.getElementById("form-average");

  const popup = document.getElementById("success-popup");
  const popupClose = document.getElementById("success-popup-close");

  const validity = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    rating1: false,
    rating2: false,
    rating3: false,
  };

  function updateSubmitState() {
    const allValid = Object.values(validity).every(Boolean);
    if (submitBtn) {
      submitBtn.disabled = !allValid;
    }
  }

  function setFieldError(input, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (message) {
      input.classList.add("is-invalid");
      if (errorEl) errorEl.textContent = message;
    } else {
      input.classList.remove("is-invalid");
      if (errorEl) errorEl.textContent = "";
    }
  }

  function isLettersOnly(value) {
    return /^[A-Za-zÀ-žĀ-ž\s'-]+$/.test(value);
  }

  function validateFirstName() {
    const value = firstName.value.trim();
    if (!value) {
      setFieldError(firstName, "firstNameError", "Įveskite vardą");
      validity.firstName = false;
    } else if (!isLettersOnly(value)) {
      setFieldError(
        firstName,
        "firstNameError",
        "Vardas turi būti sudarytas tik iš raidžių"
      );
      validity.firstName = false;
    } else {
      setFieldError(firstName, "firstNameError", "");
      validity.firstName = true;
    }
    updateSubmitState();
  }

  function validateLastName() {
    const value = lastName.value.trim();
    if (!value) {
      setFieldError(lastName, "lastNameError", "Įveskite pavardę");
      validity.lastName = false;
    } else if (!isLettersOnly(value)) {
      setFieldError(
        lastName,
        "lastNameError",
        "Pavardė turi būti sudaryta tik iš raidžių"
      );
      validity.lastName = false;
    } else {
      setFieldError(lastName, "lastNameError", "");
      validity.lastName = true;
    }
    updateSubmitState();
  }

  function validateEmail() {
    const value = email.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setFieldError(email, "emailError", "Įveskite el. pašto adresą");
      validity.email = false;
    } else if (!pattern.test(value)) {
      setFieldError(email, "emailError", "Neteisingas el. pašto formatas");
      validity.email = false;
    } else {
      setFieldError(email, "emailError", "");
      validity.email = true;
    }
    updateSubmitState();
  }

  function validateAddress() {
    const value = address.value.trim();
    if (!value) {
      setFieldError(address, "addressError", "Įveskite adresą");
      validity.address = false;
    } else {
      setFieldError(address, "addressError", "");
      validity.address = true;
    }
    updateSubmitState();
  }

  function validateRating(input, errorId, key) {
    const value = input.value.trim();
    const number = Number(value);

    if (!value) {
      setFieldError(input, errorId, "Įveskite įvertinimą (1–10)");
      validity[key] = false;
    } else if (!Number.isFinite(number) || number < 1 || number > 10) {
      setFieldError(input, errorId, "Reikšmė turi būti tarp 1 ir 10");
      validity[key] = false;
    } else {
      setFieldError(input, errorId, "");
      validity[key] = true;
    }
    updateSubmitState();
  }

  function formatPhone(value) {
    const digits = value.replace(/\D/g, "");

    let base = digits;
    if (base.startsWith("370")) {
      base = base.slice(3);
    }

    const num = base.slice(0, 8);
    if (!num) return "";

    if (num.length <= 3) {
      return "+370 " + num;
    }

    const firstGroup = num.slice(0, 3);
    const secondGroup = num.slice(3);
    return "+370 " + firstGroup + " " + secondGroup;
  }

  function validatePhone() {
    const digits = phone.value.replace(/\D/g, "");

    let base = digits;
    if (base.startsWith("370")) {
      base = base.slice(3);
    }

    const num = base;

    if (num.length !== 8) {
      setFieldError(
        phone,
        "phoneError",
        "Įveskite pilną numerį formatu +370 6xx xxxxx"
      );
      validity.phone = false;
    } else if (num[0] !== "6") {
      setFieldError(phone, "phoneError", "Numeris turi prasidėti skaičiumi 6");
      validity.phone = false;
    } else {
      setFieldError(phone, "phoneError", "");
      validity.phone = true;
    }

    updateSubmitState();
  }

  // Real-time validacija (papildoma užduotis LD11)
  firstName.addEventListener("input", validateFirstName);
  lastName.addEventListener("input", validateLastName);
  email.addEventListener("input", validateEmail);
  address.addEventListener("input", validateAddress);
  rating1.addEventListener("input", function () {
    validateRating(rating1, "rating1Error", "rating1");
  });
  rating2.addEventListener("input", function () {
    validateRating(rating2, "rating2Error", "rating2");
  });
  rating3.addEventListener("input", function () {
    validateRating(rating3, "rating3Error", "rating3");
  });

  // Telefono formatavimas realiu laiku
  phone.addEventListener("input", function () {
    const formatted = formatPhone(phone.value);
    phone.value = formatted;
    validatePhone();
  });

  // Pop-up uždarymas
  if (popupClose && popup) {
    popupClose.addEventListener("click", function () {
      popup.classList.remove("visible");
    });
  }

  if (popup) {
    popup.addEventListener("click", function (event) {
      if (event.target === popup) {
        popup.classList.remove("visible");
      }
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    validateFirstName();
    validateLastName();
    validateEmail();
    validatePhone();
    validateAddress();
    validateRating(rating1, "rating1Error", "rating1");
    validateRating(rating2, "rating2Error", "rating2");
    validateRating(rating3, "rating3Error", "rating3");

    const allValid = Object.values(validity).every(Boolean);
    if (!allValid) {
      return;
    }

    const data = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      address: address.value.trim(),
      rating1: Number(rating1.value),
      rating2: Number(rating2.value),
      rating3: Number(rating3.value),
    };

    console.log("Kontaktų formos duomenys:", data);

    if (resultsBox) {
      resultsBox.innerHTML = `
        <h5>Suvesti duomenys</h5>
        <p><strong>Vardas:</strong> ${data.firstName}</p>
        <p><strong>Pavardė:</strong> ${data.lastName}</p>
        <p><strong>El. paštas:</strong> ${data.email}</p>
        <p><strong>Tel. numeris:</strong> ${data.phone}</p>
        <p><strong>Adresas:</strong> ${data.address}</p>
        <p><strong>Klausimas 1:</strong> ${data.rating1}</p>
        <p><strong>Klausimas 2:</strong> ${data.rating2}</p>
        <p><strong>Klausimas 3:</strong> ${data.rating3}</p>
      `;
    }

    const avg = (data.rating1 + data.rating2 + data.rating3) / 3;

    if (averageBox) {
      averageBox.textContent = `${data.firstName} ${data.lastName}: ${avg.toFixed(
        1
      )}`;
    }

    if (popup) {
      popup.classList.add("visible");
    }
  });

  updateSubmitState();

  // =====================================
  // LD12 – atminties kortelių žaidimas
  // =====================================

  const gameBoard = document.getElementById("game-board");
  const difficultySelect = document.getElementById("game-difficulty");
  const startBtn = document.getElementById("game-start");
  const resetBtn = document.getElementById("game-reset");
  const movesEl = document.getElementById("game-moves");
  const matchesEl = document.getElementById("game-matches");
  const winMessageEl = document.getElementById("game-win-message");
  const timeEl = document.getElementById("game-time");
  const bestEasyEl = document.getElementById("best-easy");
  const bestHardEl = document.getElementById("best-hard");

  if (
    gameBoard &&
    difficultySelect &&
    startBtn &&
    resetBtn &&
    movesEl &&
    matchesEl &&
    winMessageEl &&
    timeEl &&
    bestEasyEl &&
    bestHardEl
  ) {
    const CARD_ICONS = [
      "⚡",
      "🔥",
      "💡",
      "🎧",
      "💻",
      "📷",
      "🎬",
      "🎮",
      "🧠",
      "🚀",
      "📚",
      "🛠️"
    ];

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let moves = 0;
    let matches = 0;
    let totalPairs = 0;

    let timerId = null;
    let elapsedSeconds = 0;
    let gameStarted = false;

    function loadBestScores() {
      const easyBest = localStorage.getItem("memoryBest_easy");
      const hardBest = localStorage.getItem("memoryBest_hard");

      bestEasyEl.textContent = easyBest ? easyBest : "-";
      bestHardEl.textContent = hardBest ? hardBest : "-";
    }

    function updateTimeUI() {
      const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
      const seconds = String(elapsedSeconds % 60).padStart(2, "0");
      timeEl.textContent = `${minutes}:${seconds}`;
    }

    function startTimer() {
      clearInterval(timerId);
      elapsedSeconds = 0;
      updateTimeUI();

      timerId = setInterval(function () {
        elapsedSeconds++;
        updateTimeUI();
      }, 1000);
    }

    function stopTimer() {
      clearInterval(timerId);
      timerId = null;
    }

    function resetStats() {
      moves = 0;
      matches = 0;
      movesEl.textContent = "0";
      matchesEl.textContent = "0";
      winMessageEl.textContent = "";
      gameStarted = false;
      stopTimer();
      elapsedSeconds = 0;
      updateTimeUI();
    }

    function createDeck(difficulty) {
      const neededPairs = difficulty === "easy" ? 6 : 12;
      const values = CARD_ICONS.slice(0, neededPairs);

      const cards = values.flatMap(function (value) {
        return [
          { id: value + "-1", value: value },
          { id: value + "-2", value: value }
        ];
      });

      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
      }

      return cards;
    }

    function renderBoard(difficulty) {
      gameBoard.innerHTML = "";
      gameBoard.classList.remove("game-board-easy", "game-board-hard");
      gameBoard.classList.add(
        difficulty === "easy" ? "game-board-easy" : "game-board-hard"
      );

      const deck = createDeck(difficulty);
      totalPairs = deck.length / 2;

      deck.forEach(function (cardData) {
        const card = document.createElement("button");
        card.type = "button";
        card.classList.add("memory-card");
        card.dataset.value = cardData.value;

        card.innerHTML = `
          <div class="memory-card-inner">
            <div class="memory-card-front memory-card-face"></div>
            <div class="memory-card-back memory-card-face">${cardData.value}</div>
          </div>
        `;

        gameBoard.appendChild(card);
      });
    }

    function setMoves(value) {
      moves = value;
      movesEl.textContent = String(value);
    }

    function setMatches(value) {
      matches = value;
      matchesEl.textContent = String(value);
    }

    function resetSelection() {
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }

    function checkWin() {
      if (matches === totalPairs && totalPairs > 0) {
        stopTimer();
        winMessageEl.textContent = "Laimėjote! Visos poros surastos.";

        const difficulty = difficultySelect.value;
        const key =
          difficulty === "easy" ? "memoryBest_easy" : "memoryBest_hard";
        const bestEl = difficulty === "easy" ? bestEasyEl : bestHardEl;
        const stored = localStorage.getItem(key);

        if (!stored || moves < Number(stored)) {
          localStorage.setItem(key, String(moves));
          bestEl.textContent = String(moves);
        }
      }
    }

    function handleCardClick(event) {
      const card = event.target.closest(".memory-card");
      if (!card || lockBoard) return;
      if (card.classList.contains("flipped") || card.classList.contains("matched")) {
        return;
      }

      if (!gameStarted) {
        gameStarted = true;
        startTimer();
      }

      card.classList.add("flipped");

      if (!firstCard) {
        firstCard = card;
        return;
      }

      secondCard = card;
      lockBoard = true;
      setMoves(moves + 1);

      const isMatch =
        firstCard.dataset.value === secondCard.dataset.value;

      if (isMatch) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        setMatches(matches + 1);
        resetSelection();
        checkWin();
      } else {
        setTimeout(function () {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          resetSelection();
        }, 1000);
      }
    }

    function startGame() {
      const difficulty = difficultySelect.value;
      resetStats();
      renderBoard(difficulty);

      gameBoard.removeEventListener("click", handleCardClick);
      gameBoard.addEventListener("click", handleCardClick);
    }

    function resetGame() {
      startGame();
    }

    startBtn.addEventListener("click", startGame);
    resetBtn.addEventListener("click", resetGame);
    difficultySelect.addEventListener("change", startGame);

    loadBestScores();
    startGame();
  }
});