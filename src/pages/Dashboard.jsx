
import Header from '../components/Header';
import ConversationList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';
import './Dashboard.css';
import { useState } from 'react';

const Dashboard = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="dashboard">
      <Header />

      <div className="content-container">
        <ConversationList onSelect={setSelected} selectedId={selected?.id} />

        {selected ? (
          <ChatWindow conversation={selected} />
        ) : (
          <div className="empty-state">Select a conversation to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

