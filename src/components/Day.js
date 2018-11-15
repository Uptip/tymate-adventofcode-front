import React, { Suspense, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Redirect, Link } from 'react-router-dom';
import GiftBody from './GiftBody';
import GiftTopImage from './GiftTop';
import { MdClose } from 'react-icons/md';
import { useWindowSize } from 'the-platform';
import sample from 'lodash/sample';
import includes from 'lodash/includes';
import uniq from 'lodash/uniq';
import P5Wrapper from 'react-p5-wrapper';
import { Modal, ModalCloseButton, ModalOverlay } from 'ui';

const GiftTop = styled(GiftTopImage)`
  transform: rotate(-20deg) translateX(20px) translateY(3px);
  transform-origin: 140px 120px;
  transition: transform 150ms ease;

  ${props =>
    props.isOpeningGift &&
    css`
      transform: rotate(0) translateX(15px) translateY(15px);
    `};
`;

const GiftWrapper = styled.button`
  position: relative;
  padding-top: 96px;
  display: flex;
  background: transparent;
  border: 0;
  outline: none;
  appearance: none;
  cursor: pointer;
  padding-left: 0;
  padding-right: 0;

  &:hover ${GiftTop} {
    transform: rotate(0) translateX(15px) translateY(15px);
  }
`;

const DayHeader = styled.div`
  flex: 0 0 100%;
  position: relative;
  z-index: 1;
`;

const DayNumber = styled.h2``;

const DayMonth = styled.h3``;

const Day = ({ day, calendarRoute }) => {
  const currentDayIsInLocalStorage = includes(
    JSON.parse(localStorage.getItem('days')) || [],
    day.number,
  );
  const [isOpeningGift, setIsOpeningGift] = useState(false);
  const [hasSeenDay, setHasSeenDay] = useState(currentDayIsInLocalStorage);
  const { width, height } = useWindowSize();

  const canvasWidth = Math.min(width - 32, 800);

  useEffect(
    () => {
      if (isOpeningGift) {
        const days = JSON.parse(localStorage.getItem('days')) || [];
        localStorage.setItem(
          'days',
          JSON.stringify(uniq([...days, day.number])),
        );
      }
    },
    [isOpeningGift],
  );

  if (!day) {
    return <Redirect to={calendarRoute} />;
  }

  return (
    <Suspense fallback={<div>…</div>}>
      <Modal open>
        <ModalCloseButton to={calendarRoute} style={{ fontSize: '32px' }}>
          <MdClose />
        </ModalCloseButton>

        <DayHeader>
          <DayNumber>{day.number}</DayNumber>
          <DayMonth>décembre 2018</DayMonth>
        </DayHeader>

        {hasSeenDay && <div>VU</div>}

        {!hasSeenDay && (
          <>
            {Boolean(isOpeningGift) && (
              <P5Wrapper
                sketch={p5 => {
                  let system;

                  p5.setup = function() {
                    p5.createCanvas(canvasWidth, 350);
                    system = new ParticleSystem(
                      p5.createVector(p5.width / 2, (p5.height * 2) / 3),
                    );

                    for (let i = 0; i < 20; i++) {
                      system.addParticle();
                    }
                  };

                  p5.draw = function() {
                    p5.background(p5.color('rgba(255,255,255,1)'));
                    system.run();
                  };

                  const getParticleKind = () =>
                    sample([
                      'triangle',
                      'square',
                      'circle',
                      'square',
                      'loop',
                      'wiggle',
                      'wave',
                    ]);

                  const polygon = (x, y, radius, npoints) => {
                    var angle = p5.TWO_PI / npoints;
                    p5.beginShape();
                    for (var a = 0; a < p5.TWO_PI; a += angle) {
                      var sx = x + p5.cos(a) * radius;
                      var sy = y + p5.sin(a) * radius;
                      p5.vertex(sx, sy);
                    }
                    p5.endShape(p5.CLOSE);
                  };

                  class Particle {
                    constructor(position, kind) {
                      this.position = position.copy();
                      this.acceleration = p5.createVector(0, 0.05);
                      this.velocity = p5.createVector(
                        p5.random(-5, 5),
                        p5.random(-5, 0),
                      );
                      this.position = position.copy();
                      this.lifespan = 500;
                      this.kind = kind;
                    }

                    run() {
                      this.update();
                      this.display();
                    }

                    update() {
                      this.velocity.add(this.acceleration);
                      this.position.add(this.velocity);
                      this.lifespan -= 2;
                    }

                    display() {
                      const st = p5.color('#d3d3d3');
                      const bg = p5.color('rgba(255, 255, 255, 0)');
                      p5.stroke(st, this.lifespan);
                      p5.strokeWeight(2);
                      p5.fill(bg, this.lifespan);

                      if (this.kind === 'triangle') {
                        polygon(this.position.x, this.position.y, 8, 3);
                      }

                      if (this.kind === 'line') {
                        polygon(this.position.x, this.position.y, 8, 2);
                      }

                      if (this.kind === 'square') {
                        polygon(this.position.x, this.position.y, 6, 4);
                      }

                      if (this.kind === 'circle') {
                        p5.ellipse(this.position.x, this.position.y, 6, 6);
                      }

                      if (this.kind === 'bezier') {
                        p5.noFill();
                        p5.stroke(255, 102, 0);
                        p5.stroke(0, 0, 0);
                        p5.bezier(85, 20, 10, 10, 90, 90, 15, 80);
                      }

                      if (this.kind === 'loop') {
                        p5.noFill();
                        p5.beginShape();
                        p5.curveVertex(this.position.x, this.position.y);
                        p5.curveVertex(
                          this.position.x + 10,
                          this.position.y + 10,
                        );
                        p5.curveVertex(
                          this.position.x + 18,
                          this.position.y + 19,
                        );
                        p5.curveVertex(
                          this.position.x + 16,
                          this.position.y + 25,
                        );
                        p5.curveVertex(
                          this.position.x + 14,
                          this.position.y + 21,
                        );
                        p5.curveVertex(
                          this.position.x + 22,
                          this.position.y + 19,
                        );
                        p5.curveVertex(
                          this.position.x + 28,
                          this.position.y + 22,
                        );
                        p5.curveVertex(
                          this.position.x + 32,
                          this.position.y + 35,
                        );
                        p5.endShape();
                      }
                    }

                    isDead() {
                      return this.lifespan < 0;
                    }
                  }

                  class ParticleSystem {
                    constructor(position) {
                      this.origin = position.copy();
                      this.particles = [];
                    }

                    addParticle() {
                      const kind =
                        Math.random() > 0.75
                          ? 'triangle'
                          : Math.random() < 0.25
                            ? 'line'
                            : Math.random() > 0.5
                              ? 'circle'
                              : 'square';
                      this.particles.push(
                        new Particle(this.origin, getParticleKind()),
                      );
                    }

                    run() {
                      for (var i = this.particles.length - 1; i >= 0; i--) {
                        var p = this.particles[i];
                        p.run();
                        if (p.isDead()) {
                          this.particles.splice(i, 1);
                        }
                      }
                    }
                  }
                }}
              />
            )}

            <GiftWrapper onClick={() => setIsOpeningGift(true)}>
              <GiftTop
                style={{
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 6,
                }}
                isOpeningGift={isOpeningGift}
              />
              <GiftBody style={{ display: 'block' }} />
            </GiftWrapper>

            {isOpeningGift && (
              <button
                style={{ flex: '0 0 100%', marginTop: 32 }}
                onClick={() => setHasSeenDay(true)}
              >
                Mon cadeau
              </button>
            )}
          </>
        )}
      </Modal>
      <ModalOverlay to={calendarRoute} />
    </Suspense>
  );
};

export default Day;
