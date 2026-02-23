import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase/server';

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || '');
  }
  return _resend;
}

export const resend = {
  emails: {
    send: async (options: Parameters<Resend['emails']['send']>[0]) => {
      return getResend().emails.send(options);
    }
  }
};

export const EMAIL_FROM = 'Hanuman Luge <support@hanumanluge.com>';

// Parse comma-separated emails into array
export function parseEmails(emailString: string): string[] {
  return emailString
    .split(',')
    .map(email => email.trim())
    .filter(email => email.length > 0 && email.includes('@'));
}

// Get notification settings from database
export async function getNotificationSettings() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('value')
      .eq('key', 'notifications')
      .single();

    if (error || !data) {
      return {
        emailNotifications: true,
        bookingNotificationEmails: 'booking@hanumanluge.com',
        contactNotificationEmails: 'contact@hanumanluge.com',
        sendCustomerConfirmation: true,
      };
    }

    return data.value as {
      emailNotifications: boolean;
      bookingNotificationEmails: string;
      contactNotificationEmails: string;
      sendCustomerConfirmation: boolean;
    };
  } catch {
    return {
      emailNotifications: true,
      bookingNotificationEmails: 'booking@hanumanluge.com',
      contactNotificationEmails: 'contact@hanumanluge.com',
      sendCustomerConfirmation: true,
    };
  }
}
