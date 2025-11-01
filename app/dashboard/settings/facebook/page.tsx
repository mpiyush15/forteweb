'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

export default function FacebookBusinessSettings() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    
    // Trigger Facebook OAuth via NextAuth
    await signIn('facebook', {
      callbackUrl: '/dashboard/settings/facebook/callback'
    });
  };

  const isConnected = session?.facebookAccessToken;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Facebook Business Connection</h1>

      {!isConnected ? (
        <div className="card p-6">
          <h2 className="text-xl mb-4">Connect Your Facebook Business</h2>
          <p className="mb-4 text-gray-600">
            Connect your Facebook Business account to enable:
          </p>
          <ul className="list-disc ml-6 mb-6 space-y-2">
            <li>WhatsApp Business Messaging</li>
            <li>Meta Ads Manager</li>
            <li>Business Analytics</li>
          </ul>

          <Link 
  href="/admin" 
  target="_blank"
  className="inline-flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
>
  Open CMS
</Link>


          <button
            onClick={handleConnect}
            disabled={loading}
            className="btn btn--primary"
          >
            {loading ? 'Connecting...' : 'Connect Facebook Business'}
          </button>
        </div>
      ) : (
        <div className="card p-6">
          <h2 className="text-xl mb-4">✓ Connected</h2>
          <p className="mb-4">Facebook User ID: {session.facebookUserId}</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">WhatsApp Access</h3>
              <p className={session.hasWhatsAppAccess ? 'text-green-600' : 'text-red-600'}>
                {session.hasWhatsAppAccess ? '✓ Enabled' : '✗ Not enabled'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Meta Ads Access</h3>
              <p className={session.hasAdsAccess ? 'text-green-600' : 'text-red-600'}>
                {session.hasAdsAccess ? '✓ Enabled' : '✗ Not enabled'}
              </p>
            </div>
          </div>

          <button
            onClick={handleConnect}
            className="btn btn--secondary mt-6"
          >
            Reconnect
          </button>
  
        </div>
      )}
    </div>
  );
}
