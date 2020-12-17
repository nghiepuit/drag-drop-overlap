import React from "react";
import Draggable from "react-draggable";
import styles from "./styles.module.scss";
import cn from "classnames";

const AppComponent = () => {
  const [activeDrags, setActiveDrags] = React.useState(0);
  const [deltaPosition, setDeltaPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const anchorBox = React.useRef(null);
  const anchorCircle = React.useRef(null);
  const [overlap, setOverlap] = React.useState(false);

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });

    const rect1 = anchorBox.current.getBoundingClientRect();
    const rect2 = anchorCircle.current.getBoundingClientRect();
    const overlap = !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
    setOverlap(overlap);
  };

  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };

  const dragHandlers = { onStart, onStop };

  return (
    <div className={styles["root"]}>
      <Draggable onStart={() => false}>
        <div
          className={cn(styles["box"], {
            [styles["box--overlap"]]: overlap,
          })}
          ref={anchorBox}
        />
      </Draggable>
      <Draggable onDrag={handleDrag} {...dragHandlers}>
        <div
          className={cn(styles["circle"], {
            [styles["circle--overlap"]]: overlap,
          })}
          ref={anchorCircle}
        />
      </Draggable>
    </div>
  );
};

export default AppComponent;
