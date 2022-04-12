import React, { useState, useEffect } from "react";
import CollbackModal from "../CollbackModal/CollbackModal";
import "./style.scss";

export default function HelperBtn() {
  const [helper, setHelper] = useState(true);

  function upper() {
    window.scrollTo(0, 0);
  }

  return (
    <div className="container helper">
      <div className="help__map">
        <div className="help__icon">
          <div onClick={() => upper()} className="up__img">
            <img src="/images/up.svg" />
          </div>
          <div
            onClick={() => setHelper(!helper)}
            className={helper ? "default__helper" : "dn"}
          >
            <img src="/images/chat.svg" />
          </div>
        </div>
        <div className={helper ? "dn" : "default__helper"}>
          <div className="helper__icons">
            <a
              href="https://t.me/softForLegion"
              target="_blank"
              className="helper__icon"
            >
              {" "}
              <img src="/images/telegramhelper.svg" />
            </a>
            <a
              href="https://t.me/softForLegion"
              target="_blank"
              className="helper__icon"
            >
              {" "}
              <img src="/images/whatsapphelper.svg" />
            </a>
            <div href="" className="helper__icon">
              
              <CollbackModal />
            </div>
          </div>
          <img
            onClick={() => setHelper(!helper)}
            className="closechat"
            src="/images/closechat.svg"
          />
        </div>
      </div>
    </div>
  );
}
