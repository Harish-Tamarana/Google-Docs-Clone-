import Texteditor from "./Texteditor";
import { v4 as uuidv4 } from "uuid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/document/${uuidv4()}`} />
        </Route>
        <Route path="/document/:id">
          <Texteditor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
