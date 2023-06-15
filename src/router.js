import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './component/home';
import Tpasien from './component/Tpasien';
import Tdokter from './component/Tdokter';
import Tobat from './component/Tobat';
import Tpemeriksaan from './component/Tpemeriksaan';


// Create a browser history instance
const history = createBrowserHistory();

function AppRouter() {
  return (
    <Router history={history}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pasien">Table Pasien</Link>
          </li>
          <li>
            <Link to="/dokter">Table Dokter</Link>
          </li>
          <li>
            <Link to="/obat">Table Obat</Link>
          </li>
          <li>
            <Link to="/pemeriksaan">Table Pemeriksaan</Link>
          </li>
        </ul>
      </nav>

      <Route exact path="/" component={Home} />
      <Route path="/pasien" component={Tpasien} />
      <Route path="/dokter" component={Tdokter} />
      <Route path="/obat" component={Tobat} />
      <Route path="/pemeriksaan" component={Tpemeriksaan} />
    </Router>
  );
}

export default AppRouter;
