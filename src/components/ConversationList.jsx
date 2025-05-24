
import './ConversationList.css';
import { useState } from 'react';

const conversations = [
  { id: 1, name: 'John Doe', message: 'Hi, I need help with my order.', unread: 2, avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, name: 'Jane Smith', message: 'Billing issues.', unread: 0, avatar: 'https://i.pravatar.cc/40?img=2' },
  { id: 3, name: 'Mike Johnson', message: 'How do I reset my password?', unread: 1, avatar: 'https://i.pravatar.cc/40?img=3' },
];

const ConversationList = ({ onSelect, selectedId }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="conversation-list" role="list" aria-label="Conversations">
      {/* Search Input */}
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search Conversations"
      />

      {/* Filtered Conversation Items */}
      {filteredConversations.map((conv) => (
        <div
          key={conv.id}
          className={`conversation-item ${selectedId === conv.id ? 'selected' : ''}`}
          onClick={() => onSelect(conv)}
          role="listitem"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && onSelect(conv)}
          aria-selected={selectedId === conv.id}
        >
          <img className="avatar" src={conv.avatar} alt={`${conv.name} avatar`} />
          <div className="conv-info">
            <strong>{conv.name}</strong>
            <p>{conv.message}</p>
          </div>
          {conv.unread > 0 && <span className="unread-badge">{conv.unread}</span>}
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
