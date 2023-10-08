import { useSetLikes } from "@/Services/Query/chatQuery";
import { Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form, FormGroup, Label, Input } from 'react-bootstrap';
// useSetLikes

function Liker({ id }) {
  const [unlikecomment, setunlikecomment] = useState(false)
  const { mutateAsync, isLoading: isLoadinglikes, error: errorlikes } = useSetLikes();
  const [likes, setlikes] = useState(null)
  const [unlikes, setunlikes] = useState(false)
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState('');
  const like = (status) => {
    if (status) {
      let data = {
        converse_id: id,
        is_liked: true,
        reason: "I like this Answer"
      }
      // alert(JSON.stringify(data))
      mutateAsync(data)
      setlikes(status)
      toast("You Liked this Answer",{ type: 'success'}, 3000)
    }
    else {
      setShow(true)
      setlikes(status)
    }
    // if(unlikes){
    //   let data = {
    //     converse_id: id,
    //     is_liked: false,
    //     reason: reason
    //   }
    //   alert(reason)
    //   // mutateAsync(data)
    //   setlikes(status)
    // }
    
    // toast(status ? 'Liked' : 'Unliked', { type: status ? 'success' : 'warning' }, 3000)
  }
  return (
    <Typography
      variant="subtitle1"
      sx={{
        pt: 1,
        display: 'flex',
        alignItems: 'center',
        width: "100",
        justifyContent: 'center',
      }}
    >

      <span className="h5 d-flex justify-content-end w-100 ">
        {/* <i className="bi bi-home">ssh banal@54.179.3.50 </i> */}
        {/* {id} */}
        <i onClick={() => like(true)} style={{ backgroundColor: "", margin: "5px" }} className={likes === true ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}></i>
        <i onClick={() => like(false)} style={{ backgroundColor: "", margin: "5px" }} className={likes === false ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"}></i>
      </span>
      <ReasonLike id={id} show={show} setShow={setShow} reason={reason} setReason={setReason} unlikes={unlikes} setunlikes={setunlikes} />
    </Typography>
  );
}

export default Liker;


function ReasonLike({ id,show, setShow, reason, setReason ,unlikes, setunlikes}) {

  const { mutateAsync, isLoading: isLoadinglikes, error: errorlikes } = useSetLikes();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let data = {
      converse_id: id,
      is_liked: false,
      reason: reason
    }
    // alert(JSON.stringify(data))
    mutateAsync(data)
    setReason("")
    handleClose()
    toast("You disliked this",{ type: 'error'}, 3000)
    // Submit the reason to your server here
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>Why don't you like this ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}  className="">
          <div className="mb-3">
  <label htmlForor="exampleFormControlTextarea1" className="form-label"> Help us improve the plateform giving us your feedback. </label>
  <textarea className="form-control" placeholder="Please give a reason"  id="exampleFormControlTextarea1" rows="3" value={reason}   onChange={(e) => setReason(e.target.value)}></textarea>
</div>

<div className="col-12 gap-4 d-flex  justify-content-end">
    <button type="submit" disabled={reason.length < 1 ? true: false} className="btn btn-danger mx-aut">Submit</button>
    <button type="button" onClick={handleClose} className="btn btn-dark mx-aut">close</button>
  </div>
          </form>
          {/* <Form onSubmit={handleSubmit}>
            <FormGroup controlId="deletionReason">
              <Label>Deletion Reason</Label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

