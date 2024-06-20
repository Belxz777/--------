import { useState, useEffect } from 'react';

/*****************
 * Player Controls
 ****************/
type PlayerControls = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
};
export const usePlayerControls = () => {
  const keys = {
     KeyW: 'forward', KeyS: 'backward',
    KeyA: 'left', KeyD: 'right',
    Space: 'jump',KeyR:"reload",
KeyH:"change"
   };
    const moveFieldByKey = (key: number) => keys[key];

  const [movement, setMovement] = useState(
    { forward: false, backward: false, left: false, 
      right: false, jump: false,reload:false,
      change:false });

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      // if(e.code==="KeyH"){
      //   console.log(
      //   "change"
      //   )
      // setMovement((m) => ({ ...m, change: 1 + m.change}));
      // }
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));}
    const handleKeyUp = (e: any) => {
      if (e.code === "KeyH") {
        setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]:true }));
      }
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