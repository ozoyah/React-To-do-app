import React, { useEffect, useState } from "react";

const CheckBox = ({ task, setTaskCompleted }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkedBoxes = localStorage.getItem("checkedBoxes");

    if (checkedBoxes && JSON.parse(checkedBoxes))
      setTaskCompleted(JSON.parse(checkedBoxes).length);
  }, [localStorage.getItem("checkedBoxes")]);

  const handleCheck = () => {
    const checkedBoxes = localStorage.getItem("checkedBoxes");
    if (!checkedBoxes) localStorage.setItem("checkedBoxes", JSON.stringify([]));

    if (!checked) {
      if (checkedBoxes) {
        localStorage.setItem(
          "checkedBoxes",
          JSON.stringify([...JSON.parse(checkedBoxes), task])
        );
      } else {
        localStorage.setItem("checkedBoxes", JSON.stringify([task]));
      }

      setChecked(true);
    } else {
      // remove item
      if (checkedBoxes)
        localStorage.setItem(
          "checkedBoxes",
          JSON.stringify(JSON.parse(checkedBoxes).filter((tt) => tt !== task))
        );
      setChecked(false);
    }
  };

  useEffect(() => {
    const boxes = localStorage.getItem("checkedBoxes");

    // check if task is in the tasks array
    if (!boxes) localStorage.setItem("checkedBoxes", JSON.stringify([]));
    for (const t of JSON.parse(boxes)) {
      if (t === task) {
        setChecked(true);
      }
    }
  }, []);

  return (
    <div onClick={handleCheck}>
      {!checked ? (
        <div className="checkbox unchecked">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z" />
          </svg>
        </div>
      ) : (
        <div className="checkbox checked">
          <svg xmlns="http://www. w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default CheckBox;
