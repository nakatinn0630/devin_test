/**
 * コンポーネントライブラリのメインエントリーポイント
 * 
 * このファイルは、すべてのコンポーネントをエクスポートします。
 */

const { Button, createButton } = require('./Button');
const { Card, createCard } = require('./Card');

module.exports = {
  Button,
  createButton,
  Card,
  createCard
};

function example() {
  const button = new Button({
    text: 'クリックしてください',
    color: 'primary',
    size: 'large',
    onClick: function() {
      console.log('ボタンがクリックされました！');
    }
  });
  
  const card = new Card({
    title: 'カードのタイトル',
    content: '<p>これはカードのコンテンツです。HTMLを含めることができます。</p>',
    footer: '<button>詳細を見る</button>',
    theme: 'light',
    shadow: true
  });
  
  if (typeof document !== 'undefined') {
    const container = document.getElementById('app');
    if (container) {
      container.appendChild(button.render());
      container.appendChild(card.render());
    }
  }
}

if (typeof window !== 'undefined') {
  window.ComponentLibrary = {
    Button,
    createButton,
    Card,
    createCard,
    example
  };
}
