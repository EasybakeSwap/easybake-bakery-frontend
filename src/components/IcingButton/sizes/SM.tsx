import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { themeColors } from '../styledTypes';
import { ButtonType } from '../types';

// Animation for icing onto button
const spinDownOn = keyframes`{
  0% {
    transform: translateX(-5%) translateY(-58%) rotate(0deg);
  }
  100% {
    transform: translateX(0%) translateY(30%) rotate(390deg);
  }
}`;

// Animation for icing off of button
const spinDownOff = keyframes`{
  0% {
    transform: translateX(0%) translateY(30%) rotate(390deg);
  }
  100% {
    transform: translateX(0%) translateY(110%) rotate(780deg);
  }
}`;

// Default button styling
const Base = styled.button<ButtonType>`
  position: relative;
  background: ${({ theme }) =>
    theme.isDark ? themeColors.light.background : themeColors.dark.background};
  border: 0rem solid hsl(305, 2%, 19%);
  border-radius: 0.75rem; /* Gives border a curve */
  height: 3rem;
  width: 6.5rem;
  outline: 0;
  overflow: hidden;
  opacity: ${(props) => (props.isDisabled ? '60%' : '100%')};
  transition: opacity 0.2s ease;
  cursor: ${(props) =>
    props.isDisabled || props.isLoading ? 'not-allowed' : 'pointer'};

  &:hover {
    opacity: ${(props) => (props.isDisabled ? '60%' : '60%')};
    transition: opacity 0.2s ease;
  }

  &::before {
    /* Content under the drip */
    content: '${(props) => props.btnName}';
    font-size: 1.2rem;
    color: ${({ theme }) =>
      theme.isDark ? themeColors.light.color : themeColors.dark.color};
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    flex-wrap: nowrap;
  }
`;

// Icing falling & filling button
const IcingOn = styled(Base)`
  &::after {
    content: "";
    position: absolute;
    bottom: -50%;
    left: -10%;
    height: 300%;
    width: 125%;
    background: ${({ theme }) =>
      theme.isDark
        ? themeColors.light.icingOnColor
        : themeColors.dark.icingOnColor};
    border-radius: 40%;
      animation: ${spinDownOn} 6s ease-out forwards;
    }
  }`;

// Icing falling off the button
const IcingOff = styled(Base)`
  &::after {
    content: "";
    position: absolute;
    bottom: -50%;
    left: -10%;
    height: 300%;
    width: 125%;
    background: ${({ theme }) =>
      theme.isDark
        ? themeColors.light.icingOffColor
        : themeColors.dark.icingOffColor};
    border-radius: 40%;
      animation: ${spinDownOff} 6s ease-out forwards;
    }
  }`;

  // Icing animation starts off button and falls on.
const IcingOnButton: React.FC<ButtonType> = ({
  btnName,
  isLoading,
  isDisabled,
  onClick,
}) => {
  return (
    <>
      <IcingOn
        btnName={btnName}
        isLoading={isLoading}
        isDisabled={isDisabled}
        onClick={isDisabled || isLoading ? undefined : onClick}
      >
        {btnName}
      </IcingOn>
    </>
  );
};

// Icing animation starts on button & falls off.
const IcingOffButton: React.FC<ButtonType> = ({
  btnName,
  isLoading,
  isDisabled,
  onClick,
}) => {
  return (
    <>
      <IcingOff
        btnName={btnName}
        isLoading={isLoading}
        isDisabled={isDisabled}
        onClick={isDisabled || isLoading ? undefined : onClick}
      >
        {btnName}
      </IcingOff>
    </>
  );
};

// Determines which icing animation to render based off loading condition.
const RenderIcingButton: React.FC<ButtonType> = ({
  btnName,
  isLoading,
  isDisabled,
  onClick,
}) => {
  return (
    <>
      {!isLoading ? (
        <IcingOffButton
          btnName={btnName}
          isLoading={isLoading}
          isDisabled={isDisabled}
          onClick={isDisabled || isLoading ? undefined : onClick}
        />
      ) : (
        <IcingOnButton
          btnName={btnName}
          isLoading={isLoading}
          isDisabled={isDisabled}
          onClick={isDisabled || isLoading ? undefined : onClick}
        />
      )}
    </>
  );
};

// Handles initial button & what animated button to render.
const IcingButtonSM: React.FC<ButtonType> = ({
  btnName,
  isLoading,
  isDisabled,
  onClick,
}) => {
  const [initialInteraction, setInitialInteraction] = useState(false);

  // Calls onClick manually & sets :after animations.
  const setInitialInteractionHandler = () => {
    onClick();
    setInitialInteraction(true);
  };

  // If first interaction, call handler to set animations & call onClick together.
  return (
    <>
      {!initialInteraction ? (
        <Base
          btnName={btnName}
          isDisabled={isDisabled}
          onClick={isDisabled ? undefined : setInitialInteractionHandler}
        />
      ) : (
        <RenderIcingButton
          btnName={btnName}
          isLoading={isLoading}
          isDisabled={isDisabled}
          onClick={onClick}
        />
      )}
    </>
  );
};

const BaseButtonSM: React.FC<ButtonType> = ({
  btnName,
  isLoading,
  isDisabled,
  onClick,
}) => {
  return (
    <>
      <Base
        btnName={btnName}
        isLoading={isLoading}
        isDisabled={isDisabled}
        onClick={onClick}
      />
    </>
  );
};


export { IcingButtonSM, BaseButtonSM };