let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Use navigator.mediaDevices.enumerateDevices() to get available devices
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      let videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      console.log("Available cameras:", videoDevices);

      // If there are video devices available, create a capture
      if (videoDevices.length > 0) {
        let constraints = {
          audio: false,
          video: {
            deviceId: "FaceTime HD Camera",
            width: 640,
            height: 480,
          },
        };
        capture = createCapture(VIDEO);
        capture.hide();
      } else {
        console.log("There are no video devices available.");
        return;
      }
    })
    .catch((error) => {
      console.error("Error enumerating devices:", error);
    });
}

function draw() {
  if (capture == true) {
    capture.loadPixels(); // Ensure the capture's pixel data is up to date
  }
  image(capture, 0, 0, windowWidth, windowHeight);
  capture.loadPixels();
  let redBucket = 0;
  let greenBucket = 0;
  let blueBucket = 0;

  let numPixels = capture.width * capture.height;

  // Loop through each pixel and accumulate color values
  for (let i = 0; i < numPixels; i++) {
    let index = i * 4; // Each pixel occupies 4 values (RGBA)
    let r = capture.pixels[index];
    let g = capture.pixels[index + 1];
    let b = capture.pixels[index + 2];

    redBucket += r;
    greenBucket += g;
    blueBucket += b;
  }

  // Calculate average color values
  let redAverage = redBucket / numPixels;
  let greenAverage = greenBucket / numPixels;
  let blueAverage = blueBucket / numPixels;
  console.log(int(redAverage), int(greenAverage), int(blueAverage));

  // Set fill color to average color
  fill(redAverage, greenAverage, blueAverage);

  // Draw a rectangle with the average color
  rect(0, 0, 100, 100);
}
