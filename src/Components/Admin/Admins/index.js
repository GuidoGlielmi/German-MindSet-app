import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, deleteAdmin } from '../../../redux/Admins/thunks';
import { adminCloseErrorModal } from '../../../redux/Admins/actions';
import { useHistory } from 'react-router-dom';
import styles from './admins.module.css';
import ButtonCreate from '../../Shared/Buttons/ButtonCreate';
import ButtonDelete from '../../Shared/Buttons/ButtonDelete';
import ButtonUpdate from '../../Shared/Buttons/ButtonUpdate';
import ModalDelete from '../../Shared/Modals/ModalDelete';
import ModalError from '../../Shared/Modals/ModalError';

function Admins() {
  const history = useHistory();
  const dispatch = useDispatch();
  const admins = useSelector((store) => store.admins.admins);
  const [adminId, setAdminId] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const isLoading = useSelector((store) => store.admins.isLoading);
  const error = useSelector((store) => store.admins.error);

  useEffect(() => {
    if (!admins.length) dispatch(getAdmins());
  }, []);

  return (
    <section className={styles.section}>
      <ModalDelete
        show={showDelete}
        title="Delete Admin"
        message="Are you sure you want to delete this Admin?"
        isLoading={isLoading}
        onCancel={() => setShowDelete(false)}
        onConfirm={() => {
          setShowDelete(false);
          dispatch(deleteAdmin(adminId));
        }}
      />
      <ModalError error={error} onConfirm={() => dispatch(adminCloseErrorModal({ show: false }))} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Administrators</h2>
          <ButtonCreate disabled={isLoading} onClick={() => history.push(`/admin/admins/form`)} />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.name}</td>
                <td>{admin.username}</td>
                <td>
                  <ButtonUpdate
                    disabled={isLoading}
                    onClick={() => history.push(`/admin/admins/form?_id=${admin._id}`)}
                  />
                  <ButtonDelete
                    onClick={(event) => {
                      event.stopPropagation();
                      setAdminId(admin._id);
                      setShowDelete(true);
                    }}
                    disabled={isLoading}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && <div className={styles.loader}></div>}
    </section>
  );
}

export default Admins;