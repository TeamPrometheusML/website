import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";
import Carousel from "./Carousel";

export default function Homepage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isVideoPaused, setIsVideoPaused] = useState(true);

  const cursorStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    backgroundColor: "var(--promlogogold)",
    height: "1.5rem",
    width: "1.5rem",
    borderRadius: "50%",
    zIndex: 50,
    pointerEvents: "none",
    mixBlendMode: "exclusion",
    scale: 4,
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("play", () => setIsVideoPaused(false));
      video.addEventListener("pause", () => setIsVideoPaused(true));
    }

    return () => {
      if (video) {
        video.removeEventListener("play", () => setIsVideoPaused(false));
        video.removeEventListener("pause", () => setIsVideoPaused(true));
      }
    };
  }, []);

  return (
    <div className="bg-black">
      <div className="flex sm:flex-row flex-col md:p-20 p-8">
        <div className="flex place-items-center justify-center">
          <video
            ref={videoRef}
            className="md:max-w-2xl rounded-2xl"
            src="/assets/almost-scores.webm"
            onMouseEnter={() => {
              gsap.to("#cursor", { scale: 4 });
              if (isVideoPaused) {
                window.setActiveCursorIcon("play-button");
              } else {
                window.setActiveCursorIcon("pause-button");
              }
            }}
            onMouseLeave={() => {
              gsap.to("#cursor", { scale: 1 });
              window.setActiveCursorIcon(null); // Hide all icons
            }}
            onClick={() => {
              if (isVideoPaused) {
                window.setActiveCursorIcon(null);
                videoRef.current.play();
                window.setActiveCursorIcon("pause-button");
              } else {
                window.setActiveCursorIcon(null);
                videoRef.current.pause();
                window.setActiveCursorIcon("play-button");
              }
            }}
          />
        </div>
        <div
          className="flex flex-col md:pl-10 md:pb-10 md:pt-10 pl-2 pt-8 pb-4 text-slate-50 font-prom-header-font rounded-lg place-items-center justify-center"
          onMouseEnter={() => {
            gsap.to("#cursor", { scale: 4 });
            //gsap.to("#goto-link", { opacity: 100 });
            window.setActiveCursorIcon("goto-link");
          }}
          onMouseLeave={() => {
            gsap.to("#cursor", { scale: 1 });
            //gsap.to("#goto-link", { opacity: 0 });
            window.setActiveCursorIcon(null);
          }}
          onClick={() => {
            navigate("/project");
            gsap.to("#cursor", { scale: 1 });
            //gsap.to("#goto-link", { opacity: 0 });
            window.setActiveCursorIcon(null);
          }}
        >
          <h1 className="font-bold md:text-7xl text-5xl pb-8">About us</h1>
          <div className="pb-8 md:pl-20 md:pr-20 pl-4 pr-4">
            Welcome to Prometheus, where innovation meets excellence in the
            world of robotics. As a dedicated and passionate RoboCup team, we
            are committed to pushing the boundaries of what's possible in
            autonomous systems and artificial intelligence. Our mission is to
            design, build, and program cutting-edge robots that can tackle
            complex challenges and compete at the highest levels of
            international robotics competitions.
          </div>
        </div>
      </div>
      <Carousel />
      <hr className="p-1 border-promlogogold" />
    </div>
  );
}
