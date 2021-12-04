import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './createform.module.css';
import Input from '../Inputs';
import SelectPostulant from '../SelectPostulant';
import SelectClient from '../SelectClient';
import SelectApplication from '../SelectApplication';
import Modal from '../Modal';

const CreateForm = () => {
  const [clients, setClients] = useState([]);
  const [clientValue, setClientValue] = useState('');
  const [postulants, setPostulants] = useState([]);
  const [postulantValue, setPostulantValue] = useState('');
  const [applications, setApplications] = useState([]);
  const [applicationValue, setApplicationValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [notesValue, setNotesValue] = useState('');
  const [showSuccessCreate, setShowSuccessCreate] = useState(false);
  const [showErrorCreate, setShowErrorCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => response.json())
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => error);
    fetch(`${process.env.REACT_APP_API}/postulants`)
      .then((response) => response.json())
      .then((response) => {
        setPostulants(response.data);
      })
      .catch((error) => error);
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => response.json())
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => error);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postulant: postulantValue,
        client: clientValue,
        application: applicationValue,
        status: statusValue,
        date: dateValue,
        notes: notesValue
      })
    };

    const url = `${process.env.REACT_APP_API}/interviews/`;

    fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        setShowSuccessCreate(true);
      })
      .catch((error) => {
        setShowErrorCreate(true);
        setErrorCreate(error.toString());
      });
  };

  const closeModalSuccess = () => {
    setShowSuccessCreate(false);
    window.location.href = '/interviews';
  };

  const closeModalError = () => {
    setShowErrorCreate(false);
  };

  const onChangeClientValue = (event) => {
    setClientValue(event.target.value);
  };

  const onChangePostulantValue = (event) => {
    setPostulantValue(event.target.value);
  };

  const onChangeApplicationValue = (event) => {
    setApplicationValue(event.target.value);
  };

  const onChangeStatusValue = (event) => {
    setStatusValue(event.target.value);
  };

  const [errorDate, setErrorDate] = useState(null);

  function handleChangeDate(event) {
    const value = event.target.value;
    if (!value.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/))
      setErrorDate('Date must be yyyy-mm-dd');
    else setErrorDate(null);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Modal
        show={showSuccessCreate}
        title="Successful"
        message={'Interview Created successfully'}
        onCancel={closeModalSuccess}
      />
      <Modal
        show={showErrorCreate}
        title="Error"
        message={errorCreate}
        onCancel={closeModalError}
      />
      <h2>Create Interview</h2>
      <div className={styles.formDiv1}>
        <div className={styles.formDiv2}>
          <h3>Postulant</h3>
          <SelectPostulant object={postulants} onChange={onChangePostulantValue} required />
        </div>
        <div className={styles.formDiv2}>
          <h3>Client</h3>
          <SelectClient object={clients} onChange={onChangeClientValue} required />
        </div>
        <div className={styles.formDiv2}>
          <h3>Application</h3>
          <SelectApplication object={applications} onChange={onChangeApplicationValue} required />
        </div>
      </div>
      <div className={styles.formDiv1}>
        <h3>Status</h3>
        <select className={styles.select} onChange={onChangeStatusValue} required>
          <option defaultValue=""></option>
          <option value="failed">Failed</option>
          <option value="assigned">Assigned</option>
          <option value="successful">Successful</option>
          <option value="cancelled">Cancelled</option>
          <option value="confirmed">Confirmed</option>
        </select>
        <h3>Date</h3>
        <Input
          name="date"
          value={dateValue}
          placeholder="yyyy-mm-dd"
          onChange={(e) => {
            setDateValue(e.target.value);
            handleChangeDate(e);
          }}
          required
        />
      </div>
      <label className={styles.formLabel} htmlFor="messageDate">
        {errorDate}
      </label>
      <div className={styles.formDiv2}>
        <h3>Notes</h3>
        <Input
          name="notes"
          value={notesValue}
          placeholder="Notes"
          onChange={(e) => {
            setNotesValue(e.target.value);
          }}
        />
      </div>
      <div className={styles.buttons}>
        <Link to="/interviews">
          <button className={styles.cancel}>Cancel</button>
        </Link>
        <button type="submit" className={styles.confirm}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CreateForm;