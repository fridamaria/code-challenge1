import React from 'react'
import styled from 'styled-components/macro'
import hjortron from '../assets/malin_hjortron.jpg'

const Container = styled.div`
  font-family: 'Playfair Display', serif;

  a {
    text-decoration: none;
  }
`
const HeroImage = styled.div`
  position: relative;
  height: 100vh;
  background-image: url(${hjortron});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`
const HeroTextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #ffffff4d;
  transform: translate(-50%, -50%);
`
const HeroTitle = styled.h2`
  margin: 10px 0;
  font-size: 30px;
  font-weight: 900;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 51px;
  }
`
const SubTitle = styled.p`
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`

export const LandingPage = () => {

  return (
    <Container>
      <HeroImage>
        <HeroTextContainer>
          <HeroTitle>FORSMARK</HeroTitle>
          <SubTitle>65°28′53″N, 15°53′36″E</SubTitle>
        </HeroTextContainer>
      </HeroImage>
    </Container>
  )
}