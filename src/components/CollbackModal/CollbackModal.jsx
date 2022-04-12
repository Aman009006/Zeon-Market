import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./style.scss";
import axios from "axios";

// CollbackModal
function CollbackModal() {
  const [show, setShow] = useState(false);

  const [showBtn, setShowBtn] = useState(false);
  const [showOk, setShowOk] = useState(false);

  const [postName, setPostName] = useState("");
  const [postNum, setPostNum] = useState("");

  useEffect(() => {
    postNum.length > 0 ? setShowBtn(true) : setShowBtn(false);
  }, [postNum]);

  function sendCollback() {
    const options = {
      url: "https://still-island-00146.herokuapp.com/api/v1/site/callbacks/",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        name: postName,
        number: postNum,
        appeal_type_name: "CallBack",
        appeal_type: 2,
      },
    };

    axios(options).then((response) => {
      response.status === 201 && setShowOk(true);
    });
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="bn" variant="primary" onClick={handleShow}>
        <img src="/images/phonehelper.svg" />
      </button>
      
      { showOk ?
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="modal_class">
            <img src="/images/thanks.svg" /> <h2>Спасибо!</h2>
            <p>Ваша заявка была принята ожидайте, скоро Вам перезвонят</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShow(false)} className="collback__modal_bl">
            Продолжить покупки
          </button>
        </Modal.Footer>
      </Modal>
        :
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Если у Вас остались вопросы</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Оставьте заявку и мы обязательно Вам перезвоним</p>
          <div className="input__modal">
            {" "}
            <img src="/images/nameM.svg" />{" "}
            <input
              onChange={(e) => {
                setPostName(e.target.value);
              }}
              placeholder="Как к Вам обращаться?"
            />
          </div>
          <div className="input__modal">
            {" "}
            <img src="/images/callM.svg" />{" "}
            <input
              onChange={(e) => {
                setPostNum(e.target.value);
              }}
              placeholder="Номер телефона"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => sendCollback()}
            className={showBtn ? "collback__modal_bl " : "collback__modal"}
          >
            Заказать звонок
          </button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}

export default CollbackModal;
