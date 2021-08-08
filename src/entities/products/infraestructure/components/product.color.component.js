import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import useClickOutside from "./useClickOutside";

const PopoverPicker = (props) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
      <>
        <style>{` 
                 .swatch {
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    border: 3px solid #fff;
                    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                }

                .popover {
                    position: relative;
                    zIndex: 2;
                } `}
        </style>
            <div className="swatch" 
                style={{ backgroundColor: (props.props.hex!==undefined)?props.props.hex:"#000" }}
                onClick={() => toggle(true)}>
                
            </div>
            { isOpen
                ? <div className="popover" ref={popover}>
                    <HexColorPicker color={(props.props.hex!==undefined)?props.props.hex:"#000"} onChange={ (event)=>{props.props.setColor(event, props.props.index)} } />
                 </div> 
                : null }    
      </>    
  );
};

export default PopoverPicker