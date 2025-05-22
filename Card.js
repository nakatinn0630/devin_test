/**
 * シンプルなカードコンポーネント
 * 
 * このコンポーネントは、タイトル、コンテンツ、フッターを持つカードを提供します。
 * 様々なスタイルやコンテンツでカスタマイズできます。
 */
class Card {
  /**
   * カードコンポーネントのコンストラクタ
   * @param {Object} options - カードの設定オプション
   * @param {string} options.title - カードのタイトル
   * @param {string} options.content - カードのコンテンツ
   * @param {string} options.footer - カードのフッター
   * @param {string} options.theme - カードのテーマ（'light', 'dark'）（デフォルト: 'light'）
   * @param {boolean} options.shadow - 影を表示するかどうか（デフォルト: true）
   */
  constructor(options = {}) {
    this.title = options.title || '';
    this.content = options.content || '';
    this.footer = options.footer || '';
    this.theme = options.theme || 'light';
    this.shadow = options.shadow !== undefined ? options.shadow : true;
    this.element = null;
  }

  /**
   * カード要素を作成して返す
   * @returns {HTMLElement} - 作成されたカード要素
   */
  render() {
    const card = document.createElement('div');
    card.className = `card ${this.theme} ${this.shadow ? 'shadow' : ''}`;

    if (this.title) {
      const titleElement = document.createElement('div');
      titleElement.className = 'card-title';
      titleElement.textContent = this.title;
      card.appendChild(titleElement);
    }

    if (this.content) {
      const contentElement = document.createElement('div');
      contentElement.className = 'card-content';
      contentElement.innerHTML = this.content;
      card.appendChild(contentElement);
    }

    if (this.footer) {
      const footerElement = document.createElement('div');
      footerElement.className = 'card-footer';
      footerElement.innerHTML = this.footer;
      card.appendChild(footerElement);
    }

    this.element = card;
    return card;
  }

  /**
   * カードのタイトルを更新する
   * @param {string} title - 新しいタイトル
   */
  setTitle(title) {
    this.title = title;
    if (this.element) {
      const titleElement = this.element.querySelector('.card-title');
      if (titleElement) {
        titleElement.textContent = title;
      } else if (title) {
        const newTitleElement = document.createElement('div');
        newTitleElement.className = 'card-title';
        newTitleElement.textContent = title;
        this.element.insertBefore(newTitleElement, this.element.firstChild);
      }
    }
  }

  /**
   * カードのコンテンツを更新する
   * @param {string} content - 新しいコンテンツ
   */
  setContent(content) {
    this.content = content;
    if (this.element) {
      const contentElement = this.element.querySelector('.card-content');
      if (contentElement) {
        contentElement.innerHTML = content;
      } else if (content) {
        const newContentElement = document.createElement('div');
        newContentElement.className = 'card-content';
        newContentElement.innerHTML = content;
        
        const footerElement = this.element.querySelector('.card-footer');
        if (footerElement) {
          this.element.insertBefore(newContentElement, footerElement);
        } else {
          this.element.appendChild(newContentElement);
        }
      }
    }
  }

  /**
   * カードのフッターを更新する
   * @param {string} footer - 新しいフッター
   */
  setFooter(footer) {
    this.footer = footer;
    if (this.element) {
      const footerElement = this.element.querySelector('.card-footer');
      if (footerElement) {
        footerElement.innerHTML = footer;
      } else if (footer) {
        const newFooterElement = document.createElement('div');
        newFooterElement.className = 'card-footer';
        newFooterElement.innerHTML = footer;
        this.element.appendChild(newFooterElement);
      }
    }
  }

  /**
   * カードのテーマを更新する
   * @param {string} theme - 新しいテーマ
   */
  setTheme(theme) {
    this.theme = theme;
    if (this.element) {
      this.element.className = `card ${this.theme} ${this.shadow ? 'shadow' : ''}`;
    }
  }

  /**
   * カードの影を設定する
   * @param {boolean} shadow - 影を表示するかどうか
   */
  setShadow(shadow) {
    this.shadow = shadow;
    if (this.element) {
      this.element.className = `card ${this.theme} ${this.shadow ? 'shadow' : ''}`;
    }
  }
}

function createCard() {
  const card = new Card({
    title: 'カードのタイトル',
    content: '<p>これはカードのコンテンツです。HTMLを含めることができます。</p>',
    footer: '<button>詳細を見る</button>',
    theme: 'light',
    shadow: true
  });
  
  return card.render();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Card, createCard };
}
