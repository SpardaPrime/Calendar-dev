import table from './components/table';
import head from './components/head';
import eventWindow from './components/eventWindow/templeteNewEvent';
import deleteModal from './modals/deleteModal';
import rewriteModal from './modals/rewriteModal';

export default ({
  users, days, hours, hoursArr,
}) => {
  const root = document.getElementById('root');

  const body = () => {
    const div = document.createElement('div');
    div.append(head(users));
    div.append(table(days, hours));
    document.body.append(eventWindow(users, days, hoursArr));
    document.body.append(deleteModal());
    document.body.append(rewriteModal());
    return div;
  };
  root.append(body());
};
