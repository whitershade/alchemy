import { connect } from 'react-redux';
import PlayerList from './Components/List';
import Selector from './Selector';
import { reorderCards } from '../Cards/Actions';

const mapDispatchToProps = {
  reorderCards
};

export default connect(Selector, mapDispatchToProps)(PlayerList);