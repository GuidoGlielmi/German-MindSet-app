import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from '../Components/Postulants/Home';
import Profile from '../Components/Postulants/Profile';
import Layout from '../Components/Layout';

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout
      routes={[
        { name: 'Home', path: '/postulant/' },
        { name: 'Go to admin app', path: '/admin' },
        { name: 'Postulant Profile', path: '/postulant/profile' }
      ]}
    >
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route path={`${url}/profile`} component={Profile} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;