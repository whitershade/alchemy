import { connect } from 'react-redux';
import PlayerList from './Components/List';
import Selector from './Selector';

export default connect(Selector, null)(PlayerList);