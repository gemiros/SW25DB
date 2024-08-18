import React, { useState } from 'react';

const MonsterCreate: React.FC = () => {
  const [race, setRace] = useState('通常');
  const [name, setName] = useState('');

  const handleCreate = () => {
    console.log(`種族: ${race}, モンスター名: ${name}`);
    // Firestore にデータを保存するロジックをここに追加
  };

  const renderForm = () => {
    if (race === '騎獣') {
      return <p>騎獣の特殊作成フォームがここに表示されます。</p>;
    }
    if (race === 'ゴーレム') {
      return <p>ゴーレムの特殊作成フォームがここに表示されます。</p>;
    }
    if (race === 'ファミリア') {
      return <p>ファミリアの特殊作成フォームがここに表示されます。</p>;
    }
    return (
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="モンスター名"
        />
        <button onClick={handleCreate}>作成</button>
      </div>
    );
  };

  return (
    <div>
      <h2>モンスター作成</h2>
      <select value={race} onChange={(e) => setRace(e.target.value)}>
        <option value="通常">通常</option>
        <option value="騎獣">騎獣</option>
        <option value="ゴーレム">ゴーレム</option>
        <option value="ファミリア">ファミリア</option>
      </select>
      {renderForm()}
    </div>
  );
};

export default MonsterCreate;