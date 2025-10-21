const footer_element = document.querySelector("footer");
const footer =
  '<a href="https://www.github.com/sarahevbouan" target="_blank">&copy; 2025 | Sarah Evbouan</a>';
const generate_footer = () => {
  footer_element.innerHTML = footer;
};

generate_footer();
