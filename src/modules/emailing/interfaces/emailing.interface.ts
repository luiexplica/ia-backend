
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

export interface Email_CreatedAccount_I {
  props: Email_I,
  data: {
    name: string,
    key: string
  }
}
export interface Email_ResetPassword_I {
  props: Email_I,
  data: {
    name: string,
    key: string
  }
}
export interface Email_ChangeEmail_I {
  props: Email_I,
  data: {
    name: string,
    new_email: string,
    key: string
  }
}