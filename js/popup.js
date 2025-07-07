      const btn = document.querySelector(".btn");
      const popup = document.querySelector(".popup");
      const closeBtn = document.querySelector(".close");
      const container = document.querySelector(".promo-container");

      btn.addEventListener("click", () => {
        popup.classList.remove("hidden");
        container.classList.add("blur");
        document.body.style.overflow = "hidden"; // Prevent scrolling
      });

      closeBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
        container.classList.remove("blur");
        document.body.style.overflow = "auto"; // Restore scrolling
      });