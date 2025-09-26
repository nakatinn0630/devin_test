import React, { useState } from 'react';
import { LocationDataService } from '../../services/firebaseService';

export const Auth = ({ user, onUserChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const locationService = new LocationDataService();

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await locationService.signInAnonymously();
      onUserChange(user);
    } catch (err) {
      setError('サインインに失敗しました: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="auth-status">
        <div className="user-info">
          <span>ユーザーID: {user.uid.substring(0, 8)}...</span>
          <span className="auth-indicator">🟢 認証済み</span>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h2>ArrivalNotify</h2>
        <p>位置情報を保存するためにサインインしてください</p>
        
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}
        
        <button 
          onClick={handleSignIn} 
          disabled={loading}
          className="signin-button"
        >
          {loading ? 'サインイン中...' : '匿名でサインイン'}
        </button>
        
        <p className="auth-note">
          匿名認証を使用するため、個人情報は収集されません
        </p>
      </div>
    </div>
  );
};
