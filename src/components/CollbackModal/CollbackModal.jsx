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
    <div className="collback">
      <button className="bn" variant="primary" onClick={handleShow}>
        <img src="/images/phonehelper.svg" />
      </button>
      
      { showOk ?
     <div className="thanks">
     <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="modal_class">
            <img src="/images/thanks.svg" /> <h2>Спасибо!</h2>
            <p className="thanks_title">Ваша заявка была принята ожидайте, скоро  Вам перезвонят</p>
          </div><button onClick={() => setShow(false)} className="collback__modal_bl">
            Продолжить покупки
          </button>
        </Modal.Body>
        
      </Modal>
     </div>
        :
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
        <div className="mod_title">
        Если у Вас остались вопросы
        </div>
          <p>Оставьте заявку и мы обязательно <br/> Вам перезвоним</p>
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
           <button
            onClick={() => sendCollback()}
            className={showBtn ? "collback__modal_bl " : "collback__modal"}
          >
            Заказать звонок
          </button>
        </Modal.Body>
       
      </Modal>}
    </div>
  );
}

export default CollbackModal;
