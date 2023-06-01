import mongoose from "mongoose";

export interface INotifications {
  sender: string;
  receivers: string[];
  header: string;
  body: string;
  read: boolean;
}
export default INotifications;