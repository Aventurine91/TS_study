import "../css/Card.css";
import { emojiApi } from "../api/homeApi";
import { useEffect, useState } from "react";


export function Card({
  type = "",
  point = 0,
  emoji = [{}],
  name = "",
  userName = "",
  inProgress = 0,
  children,
  className = "",
  onClick,
  emojiHandle,
}) {
  const [max1, max2] = [18, 45];
  const [lender, setLender] = useState(false);
  const [emojiSort, SetEmojiSort] = useState();
  emoji = emoji.sort((a, b) => a.id.localeCompare(b.id));
  function textSlice(text = "", maxLength = 0) {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }
  function dayCalculator(date) {
    const today = new Date();
    const createDay = new Date(date);
    const inProgress = today.getDate() - createDay.getDate();
    return inProgress;
  }

  return (
    <div className={`card ${type} ${className}`}>
      <div className={type.includes("bg") ? "cover inner" : "inner"}>
        <button onClick={onClick} className="navigate">
          <div className="top">
            <h3 className="name">
              <span>{userName}</span>의 {textSlice(name, max1)}
            </h3>
            <div className="point">
              <img src="/img/point.png" alt="포인트" />
              <p>
                <span>{point}</span>P 획득
              </p>
            </div>
          </div>
          <p className="inProgress">{dayCalculator(inProgress)}일째 진행 중</p>
          <p className="content">{textSlice(children, max2)}</p>
        </button>
        <div className={[...emoji].length > 6 ? "emojis scroll" : "emojis"}>
          {[...emoji].map((v, index) => {
            return (
              <div
                className="emoji"
                key={index}
                onClick={() => {
                  emojiHandle(v);
                }}
              >
                <p className="emojiType">{v.emojiIcon}</p>
                <p>{v.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Cards({ children, noList = "", height = "auto" }) {
  return (
    <div className="cards" style={{ height }}>
      {!!children[0] ? children : <p className="noList">{noList}</p>}
    </div>
  );
}
