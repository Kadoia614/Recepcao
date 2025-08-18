import { useRef, useCallback } from "react";
import Webcam from "react-webcam";

function MyWebcamComponent() {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Do something with the imageSrc (e.g., display it, send to server)
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false} // Set to true if you need audio
        ref={webcamRef}
        screenshotFormat="image/jpeg" // Or "image/png"
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
}

export default MyWebcamComponent;
