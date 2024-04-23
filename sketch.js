import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
  remove,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

// let drawing = []; //PREROB AND I DONT NEED AN ARRAY
// let savedDrawings = []; // Array to hold all the saved drawings
// let drawingTimestamp;

const firebaseDatbaseConnection = initializeApp({
  apiKey: "AIzaSyACTZs6IaFhE6VeldeyYfhzjqC9C_69Sv4",
  authDomain: "test01-d0fdd.firebaseapp.com",
  databaseURL:
    "https://colourcomposition-d0fdd-9348f-ba45f.europe-west1.firebasedatabase.app/",
  projectId: "test01-d0fdd",
  storageBucket: "test01-d0fdd.appspot.com",
  messagingSenderId: "968693583529",
  appId: "1:968693583529:web:1bd15312655ae0daa223b8",
  measurementId: "G-HN8Z87RXQB",
});

const firebaseDatabase = getDatabase(firebaseDatbaseConnection);

window.setup = setup;
window.draw = draw;

let video;
let playing = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createVideo("Export.mp4");
  video.size(windowWidth, windowHeight);
  // video.volume(0),
  video.loop();
  video.hide();

  // video.position(0, 0);
  // getAudioContext().suspend();
}

function draw() {
  background(255);

  if (video == true) {
    video.loadPixels(); // Ensure the video's pixel data is up to date
  }
  video.loadPixels();
  let img = video.get();
  image(img, 0, 0);

  let redBucket = 0;
  let greenBucket = 0;
  let blueBucket = 0;

  let numPixels = video.width * video.height;

  // Loop through each pixel and accumulate color values
  for (let i = 0; i < numPixels; i++) {
    let index = i * 4; // Each pixel occupies 4 values (RGBA)
    let r = video.pixels[index];
    let g = video.pixels[index + 1];
    let b = video.pixels[index + 2];

    redBucket += r;
    greenBucket += g;
    blueBucket += b;
  }

  // Calculate average color values
  let redAverage = redBucket / numPixels;
  let greenAverage = greenBucket / numPixels;
  let blueAverage = blueBucket / numPixels;

  console.log(int(redAverage), int(greenAverage), int(blueAverage));
  let data = ref(firebaseDatabase);

  set(data, {
    red: int(redAverage),
    green: int(greenAverage),
    blue: int(blueAverage),
  });

  // Set fill color to average color
  fill(redAverage, greenAverage, blueAverage);

  // Draw a rectangle with the average color
  rect(0, 0, 300, 300);
}
