import { useState, useEffect } from 'react';

/*****************
 * Player Controls
 ****************/
type PlayerControls = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean,
  reload:boolean,
  change:boolean,
  takeCar:boolean
};
export const usePlayerControls = () => {
  const keys = {
     KeyW: 'forward', KeyS: 'backward',
    KeyA: 'left', KeyD: 'right',
    Space: 'jump',KeyR:"reload",
KeyH:"change",KeyL:"car"
   };
    const moveFieldByKey = (key: number) => keys[key];

  const [movement, setMovement] = useState(
    { forward: false, backward: false, left: false, 
      right: false, jump: false,reload:false,
      change:false,car:false });

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));}
    const handleKeyUp = (e: any) => {
      // if (e.code === "KeyH") {
      //   setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]:true }));
      // }w
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));

    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};