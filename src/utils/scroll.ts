export const scrollToCountry = (countryName: string) => {
  // Find the country section element
  const countrySection = document.getElementById("countryFlags");

  if (countrySection) {
    // Scroll to the country section first
    countrySection.scrollIntoView({ behavior: "smooth" });

    // Then find the specific country element and trigger its selection
    setTimeout(() => {
      // Find elements with data-country attribute
      const countryElements = document.querySelectorAll("[data-country]");

      // Find the matching country element
      countryElements.forEach((element) => {
        if (element.getAttribute("data-country") === countryName) {
          // Simulate a click on the country element
          (element as HTMLElement).click();
        }
      });
    }, 500); // Small delay to ensure the section is scrolled to first
  }
};
