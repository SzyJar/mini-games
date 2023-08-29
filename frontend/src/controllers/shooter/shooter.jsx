import React, { useEffect } from 'react';


const Shooter = ({ achiev }) => {
  useEffect(() => {
    const container = document.getElementById("game-area");

    let clickCount = 0;
    let stealCount = 0;

    function updateCountDisplay() {
      const countDisplay = document.getElementById("count-display");
      try {
        countDisplay.innerHTML = `
        <div>Candy retrieved: ${clickCount}</div>
        <div>Candy stolen: ${stealCount}</div>
      `;
      if(clickCount === 20 && stealCount < 3) {
        achiev(7);
      } else if (clickCount < 10 && stealCount === 20) {
        achiev(8);
      }      
      } catch (error) {
        // Don't show error on trying to assing to
        // 'countDisplay' null element
      }
    }

    function createThief() {
      let hasCandy = true;
      const thief = document.createElement("div");
      thief.classList.add("thief");
      thief.style.left = '370px';
      thief.style.top = '170px';
      thief.style.width = '50px';
      thief.style.height = thief.style.width;

      const directionX = Math.random() > 0.5 ? 1 : -1;
      const directionY = Math.random() > 0.5 ? 0.48 : -0.48;
      const speed = Math.random() + 0.4;

      container.appendChild(thief);

      let rotation = 0;
      let direction = false;

      thief.addEventListener("click", () => {
        thief.remove();
        clickCount++;
        hasCandy = false;
        updateCountDisplay();
        return;
      });

      function moveThief() {
        if(rotation > 15 && direction === true) {
          direction = false;
        } else if (rotation < -15 && direction === false) {
          direction = true;
        }

        if (direction === true) {
          rotation += 1;
        } else {
          rotation -= 1;
        }

        thief.style.transform = `rotate(${rotation}deg)`;
        const currentX = parseFloat(thief.style.left);
        const currentY = parseFloat(thief.style.top);

        const newX = currentX + directionX * speed;
        const newY = currentY + directionY * speed;

        if (newX < 0 || newX > 770 || newY < 0 || newY > 370) {
          thief.remove();
          if(hasCandy){
            stealCount++;
          }
          updateCountDisplay();
          return;
        }

        thief.style.left = `${newX}px`;
        thief.style.top = `${newY}px`;

        requestAnimationFrame(moveThief);
      }

      moveThief();
    }

    const intervalId = setInterval(createThief, 800);
    
    return () => {
      clearInterval(intervalId);
    }
  }, [achiev]);

  return (
    <div id="game-area">
      <div className='candy'></div>
    </div>
  );
};


export default Shooter;