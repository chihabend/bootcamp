const form = document.getElementById("libform");
const shuffleBtn = document.getElementById("shuffle-button");
const storySpan = document.getElementById("story");

let values = {};
let currentStories = [];

const storyTemplates = [
  ({ noun, adjective, person, verb, place }) =>
    `${person} went to the ${place} with a ${adjective} ${noun} and decided to ${verb} all day.`,
  ({ noun, adjective, person, verb, place }) =>
    `In ${place}, ${person} found a ${adjective} ${noun} that could ${verb} magically!`,
  ({ noun, adjective, person, verb, place }) =>
    `Once upon a time, ${person} tried to ${verb} a ${adjective} ${noun} near ${place}. It didn't end well.`,
  ({ noun, adjective, person, verb, place }) =>
    `${person} and the ${adjective} ${noun} were last seen trying to ${verb} their way out of ${place}.`,
];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const noun = document.getElementById("noun").value.trim();
  const adjective = document.getElementById("adjective").value.trim();
  const person = document.getElementById("person").value.trim();
  const verb = document.getElementById("verb").value.trim();
  const place = document.getElementById("place").value.trim();

  if (!noun || !adjective || !person || !verb || !place) {
    alert("Please fill in all fields.");
    return;
  }

  values = { noun, adjective, person, verb, place };

  generateStory();
});

function generateStory() {
  const availableStories = storyTemplates.filter(story => !currentStories.includes(story));

  if (availableStories.length === 0) {
    currentStories = [];
  }

  const newTemplates = storyTemplates.filter(story => !currentStories.includes(story));
  const randomTemplate = newTemplates[Math.floor(Math.random() * newTemplates.length)];

  currentStories.push(randomTemplate);
  const story = randomTemplate(values);
  storySpan.textContent = story;
}

shuffleBtn.addEventListener("click", function () {
  if (Object.keys(values).length === 0) {
    alert("Please fill out the form first!");
    return;
  }
  generateStory();
});
