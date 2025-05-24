import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h2>Inbox</h2>
      <div className="header-buttons">
        <button aria-label="Search">🔍</button>
        <button aria-label="Settings">⚙️</button>
      </div>
    </header>
  );
};

export default Header;
