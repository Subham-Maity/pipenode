"use client";
import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center flex-col gap-4 px-4">
        <div className="loader" />
        <div className="glitch" data-text="Loading ...">
          Loading ...
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .glitch {
    position: relative;
    font-size: 60px;
    font-weight: bold;
    color: #ffffff;
    letter-spacing: 3px;
    z-index: 1;
  }

  .glitch:before,
  .glitch:after {
    display: block;
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.8;
  }

  .glitch:before {
    animation: glitch-it 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    color: #00ffff;
    z-index: -1;
  }

  .glitch:after {
    animation: glitch-it 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both
      infinite;
    color: #ff00ff;
    z-index: -2;
  }

  @keyframes glitch-it {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    to {
      transform: translate(0);
    }
  }
  .loader {
    width: 160px;
    height: 185px;
    position: relative;
    background: #fff;
    border-radius: 100px 100px 0 0;
  }

  .loader:after {
    content: "";
    position: absolute;
    width: 100px;
    height: 125px;
    left: 50%;
    top: 25px;
    transform: translateX(-50%);
    background-image: radial-gradient(circle, #000 48%, transparent 55%),
      radial-gradient(circle, #000 48%, transparent 55%),
      radial-gradient(circle, #fff 30%, transparent 45%),
      radial-gradient(circle, #000 48%, transparent 51%),
      linear-gradient(#000 20px, transparent 0),
      linear-gradient(#cfecf9 60px, transparent 0),
      radial-gradient(circle, #cfecf9 50%, transparent 51%),
      radial-gradient(circle, #cfecf9 50%, transparent 51%);
    background-repeat: no-repeat;
    background-size:
      16px 16px,
      16px 16px,
      10px 10px,
      42px 42px,
      12px 3px,
      50px 25px,
      70px 70px,
      70px 70px;
    background-position:
      25px 10px,
      55px 10px,
      36px 44px,
      50% 30px,
      50% 85px,
      50% 50px,
      50% 22px,
      50% 45px;
    animation: faceLift 3s linear infinite alternate;
  }

  .loader:before {
    content: "";
    position: absolute;
    width: 140%;
    height: 125px;
    left: -20%;
    top: 0;
    background-image: radial-gradient(circle, #fff 48%, transparent 50%),
      radial-gradient(circle, #fff 48%, transparent 50%);
    background-repeat: no-repeat;
    background-size: 65px 65px;
    background-position:
      0px 12px,
      145px 12px;
    animation: earLift 3s linear infinite alternate;
  }

  @keyframes faceLift {
    0% {
      transform: translateX(-60%);
    }

    100% {
      transform: translateX(-30%);
    }
  }

  @keyframes earLift {
    0% {
      transform: translateX(10px);
    }

    100% {
      transform: translateX(0px);
    }
  }
`;

export default Loader;
