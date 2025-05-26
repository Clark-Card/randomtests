const localVideo = document.createElement('video');
localVideo.autoplay = true;
localVideo.muted = true;
localVideo.style.width = "100%";
localVideo.style.height = "100%";
document.getElementById('video-container').appendChild(localVideo);

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localVideo.srcObject = stream;
  })
  .catch(err => {
    console.error('Error accessing media devices.', err);
  });
