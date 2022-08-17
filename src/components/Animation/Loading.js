import React from "react";
import Lottie from "lottie-react";
import { useLottie } from "lottie-react";
import Loading_1 from "../Animation/Loading_1.json";

function Loading() {
  const options = {
    animationData: Loading_1,
    loop: true,
    autoplay: true
  };

  const { View } = useLottie(options);

  return (
    <div
   
    className="container justify-content-center">
      <div className="anim-wrapper">
        <div className="Animation-lottie ">{View}</div>
      </div>
    </div>
  );
}

export default Loading;
