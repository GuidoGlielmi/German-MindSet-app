import { useState } from 'react';
import Modal from './Modal';
import Button from '../../Button';
import ModalOther from './ModalOther';

const Options = (props) => {
  const [modal, changeModal] = useState(false);
  const [modalDel, changeModalDel] = useState(false);
  const psy = props.data;
  const id = psy._id;
  const modalOpenDel = () => {
    changeModalDel(!modalDel);
  };

  const modalOpen = () => {
    changeModal(!modal);
  };

  const deletePsychologists = (id) => {
    console.log(id);
    fetch(`${process.env.REACT_APP_API}/psychologists/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 204) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        modalOpenDel();
        return response.json(`Id: ${id}`);
      })
      .catch((error) => error);
  };

  return (
    <>
      <li>
        <Button action={modalOpen} name={'edit'} data={psy} />
      </li>
      <li>
        <Button action={modalOpenDel} name={'delete'} />
      </li>
      <Modal visible={modal} id={psy._id} close={modalOpen} />
      <ModalOther
        visible={modalDel}
        psy={psy}
        action={() => deletePsychologists(id)}
        close={modalOpenDel}
        type={'delete'}
      />
    </>
  );
};

export default Options;

//
