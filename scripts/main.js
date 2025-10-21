const footer_element = document.querySelector("footer");
const nav_links = document.querySelectorAll("#navbar > li > a");

// Set active nav link
nav_links.forEach((link) => {
  link.href.includes("#")
    ? link.parentElement.classList.add("active-link")
    : link.parentElement.classList.remove("active-link");
});

const footer =
  '<a href="https://www.github.com/sarahevbouan" target="_blank">&copy; 2025 | Sarah Evbouan</a>';
const generate_footer = () => {
  footer_element.innerHTML = footer;
};

generate_footer();
