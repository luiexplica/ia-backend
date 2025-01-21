
export interface EmailConfig_I {
  host?: string;
  port?: number;
  service?: string;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  }
}

export interface Email_I {
  // from: string;
  to: string;
  subject: string;
  html: string;
}

