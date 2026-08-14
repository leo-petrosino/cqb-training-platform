import { supabase } from './supabase';

export const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!;
export const DISCORD_REDIRECT_URI = typeof window !== 'undefined' 
  ? `${window.location.origin}/auth/callback` 
  : '';

export function getDiscordAuthUrl() {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: 'token',
    scope: 'identify guilds',
    state: generateState(),
  });

  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function fetchDiscordUser(accessToken: string) {
  const response = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch Discord user');
  return response.json();
}

export async function fetchDiscordGuilds(accessToken: string) {
  const response = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch Discord guilds');
  return response.json();
}

export async function syncUserWithDatabase(discordUser: any, role: 'instructor' | 'attendee' = 'attendee') {
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('discord_id', discordUser.id)
    .single();

  if (existingUser) {
    // Update avatar if changed
    if (existingUser.avatar !== discordUser.avatar) {
      await supabase
        .from('users')
        .update({ avatar: discordUser.avatar })
        .eq('id', existingUser.id);
    }
    return existingUser;
  }

  const { data: newUser, error } = await supabase
    .from('users')
    .insert([{
      discord_id: discordUser.id,
      username: discordUser.username,
      avatar: discordUser.avatar,
      role,
    }])
    .select()
    .single();

  if (error) throw error;
  return newUser;
}