/**
 * シンプルなボタンコンポーネント
 * 
 * このコンポーネントは、カスタマイズ可能なボタンを提供します。
 * テキスト、色、サイズ、クリックイベントなどをカスタマイズできます。
 */
class Button {
  /**
   * ボタンコンポーネントのコンストラクタ
   * @param {Object} options - ボタンの設定オプション
   * @param {string} options.text - ボタンのテキスト
   * @param {string} options.color - ボタンの色（デフォルト: 'blue'）
   * @param {string} options.size - ボタンのサイズ（'small', 'medium', 'large'）（デフォルト: 'medium'）
   * @param {Function} options.onClick - クリック時のコールバック関数
   */
  constructor(options = {}) {
    this.text = options.text || 'ボタン';
    this.color = options.color || 'blue';
    this.size = options.size || 'medium';
    this.onClick = options.onClick || function() {};
    this.element = null;
  }

  /**
   * ボタン要素を作成して返す
   * @returns {HTMLElement} - 作成されたボタン要素
   */
  render() {
    const button = document.createElement('button');
    button.textContent = this.text;
    button.className = `button ${this.color} ${this.size}`;
    button.addEventListener('click', this.onClick);
    this.element = button;
    return button;
  }

  /**
   * ボタンのテキストを更新する
   * @param {string} text - 新しいボタンテキスト
   */
  setText(text) {
    this.text = text;
    if (this.element) {
      this.element.textContent = text;
    }
  }

  /**
   * ボタンの色を更新する
   * @param {string} color - 新しい色
   */
  setColor(color) {
    this.color = color;
    if (this.element) {
      this.element.className = `button ${this.color} ${this.size}`;
    }
  }

  /**
   * ボタンのサイズを更新する
   * @param {string} size - 新しいサイズ
   */
  setSize(size) {
    this.size = size;
    if (this.element) {
      this.element.className = `button ${this.color} ${this.size}`;
    }
  }

  /**
   * ボタンを無効化する
   * @param {boolean} disabled - 無効化するかどうか
   */
  setDisabled(disabled) {
    if (this.element) {
      this.element.disabled = disabled;
    }
  }
}

function createButton() {
  const button = new Button({
    text: 'クリックしてください',
    color: 'primary',
    size: 'large',
    onClick: function() {
      console.log('ボタンがクリックされました！');
    }
  });
  
  return button.render();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Button, createButton };
}
