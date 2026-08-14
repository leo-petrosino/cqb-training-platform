'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchDiscordUser, fetchDiscordGuilds, syncUserWithDatabase } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Shield, Loader2 } from 'lucide-react';

const GUILD_ID = process.env.NEXT_PUBLIC_DISCORD_GUILD_ID || '';

export default function AuthCallback() {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Authenticating with Discord...');
  const router = useRouter();

  useEffect(() => {
    handleCallback();
  }, []);

  async function handleCallback() {
    try {
      const fragment = window.location.hash.substring(1);
      const params = new URLSearchParams(fragment);
      const accessToken = params.get('access_token');

      if (!accessToken) {
        throw new Error('No access token received');
      }

      setMessage('Fetching Discord profile...');
      const discordUser = await fetchDiscordUser(accessToken);
      
      setMessage('Verifying server membership...');
      const guilds = await fetchDiscordGuilds(accessToken);
      const isInGuild = guilds.some((g: any) => g.id === GUILD_ID);
      
      if (!isInGuild) {
        throw new Error('You must be a member of the GGRP Discord server');
      }

      setMessage('Syncing user data...');
      await syncUserWithDatabase(discordUser, 'attendee');

      // Tenta login
      const email = `${discordUser.id}@discord.local`;
      const password = discordUser.id + (discordUser.discriminator || '0');

      let signInResult = await supabase.auth.signInWithPassword({ email, password });

      // Se il login fallisce, crea l'utente e riprova il login
      if (signInResult.error) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              discord_id: discordUser.id,
              username: discordUser.username,
            },
          },
        });

        if (signUpError) throw signUpError;

        // Ora fai il login
        signInResult = await supabase.auth.signInWithPassword({ email, password });
        if (signInResult.error) throw signInResult.error;
      }

      setStatus('success');
      setMessage('Authentication successful!');
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Authentication failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-panel p-8 max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-accent-green" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">
            {status === 'error' ? 'Authentication Failed' : 'Processing Login'}
          </h2>
          <p className="text-military-300 text-sm">{message}</p>
        </div>

        {status === 'processing' && (
          <Loader2 className="w-6 h-6 text-accent-gold animate-spin mx-auto" />
        )}

        {status === 'success' && (
          <div className="text-accent-green text-sm font-semibold">
            Redirecting to dashboard...
          </div>
        )}

        {status === 'error' && (
          <button
            onClick={() => router.push('/')}
            className="btn-secondary w-full"
          >
            Return to Login
          </button>
        )}
      </div>
    </div>
  );
}