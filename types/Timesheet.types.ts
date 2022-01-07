import { ObjectId } from "mongodb";
import { Nullable } from "mongodb/src/mongo_types";

export interface QrCode {
  light?: string;
  dark?: string;
}

export interface TimesheetDayLog {
  hours: number;
  user_edited: boolean;
  weekend: boolean;
}

export interface ParsedTimesheetDayLog
  extends Omit<TimesheetDayLog, "user_edited" | "weekend"> {
  user_edited: boolean;
  weekend: boolean;
}

export interface Timesheet {
  namespace: string;
  timesheet: TimesheetDayLog[];
  total_hours: number;
  project_number: Nullable<string>;
}

export interface Client {
  id: string;
  client_name: string;
  client_address: string;
  client_contact_person: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  is_alias: boolean;
}

export interface Approver {
  approvers_name: string;
  approvers_email: string;
}

export interface TimesheetProps {
  id: string;
  path: string;
  timesheets: Timesheet[];
  client: Client;
  user: User;
  month_year: string;
  user_sign_qr_code: QrCode;
  approver_sign_qr_code: QrCode;
  user_signature: Nullable<string>;
  approver_signature: Nullable<string>;
}

export interface TimesheetResponseProps {
  _id: ObjectId;
  creation_date: Date;
  month_year: string;
  random_path: string;
  client: Client;
  user: User;
  approver: Approver;
  timesheets: Timesheet[];
  user_signature?: string;
  approver_signature?: string;
}
