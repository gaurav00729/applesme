import { MenuItemProps } from "@nextui-org/react";

export type User = {
  name: string;
  email: string;
  user_id: number;
  exp: number;
};

export type StoreType = {
  authToken?: string;
  setAuthToken: (authToken?: string) => void;
  user?: User;
  setUser: (user: User) => void;
};

export type DeviceInfoType = {
  ADP: string;
  AgentName: string;
  BIOSLocked: string;
  BatteryCharging: string;
  BatteryHealth: string;
  BatteryHealthPercentage: string;
  BluetoothConnectivity: string;
  Brand: string;
  CPU: string;
  Camera: string;
  Category: string;
  Charger: string;
  ChargerPowerWattage: string;
  CompanyCode: string;
  CreatedAt: string;
  DamageCharges: string;
  DeletedAt: null | string;
  Fingerprint: string;
  GPUMemory: string;
  GPUName: string;
  Grade: string;
  HDDBrandSerialNumber: string;
  HDDType: string;
  HDMIPort: string;
  Hinge: string;
  ID: number;
  InstalledOS: string;
  Keyboard: string;
  LANPort: string;
  ManualGrade: string;
  ManualGradeComments: string;
  Microphone: string;
  Model: string;
  PanelA: string;
  PanelB: string;
  PanelC: string;
  PanelD: string;
  PowerKey: string;
  QCDate: string;
  QCRemarks: string;
  RAMBrandSerialNumberSlot1: string;
  RAMBrandSerialNumberSlot2: string;
  RAMTotal: string;
  RAMTypeSlot1: string;
  RAMTypeSlot2: string;
  SSDBrandSerialNumber: string;
  SSDType: string;
  ScheduleNumber: string;
  Screen: string;
  ScreenSize: string;
  SerialNumber: string;
  Speaker: string;
  Status: number;
  TouchDisplay: string;
  Touchpad: string;
  USBPort: string;
  UpdatedAt: string;
  Warranty: string;
  WifiConnectivity: string;
  WindowsKey: string;
  OriginalScheduleNumber: string;
  InventoryModelName: string;
  InventoryCPU: string;
  InventoryRAM: string;
  InventoryStorage: string;
  ScheduleAmount: string;
  State: string;
  Location: string;
};

export type ClientInfoType = {
  ID: number;
  Name: string;
  Code: string;
};

export type ClientScheduleNumbersList = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  ScheduleNumber: string;
  Action: string;
  Status: number;
  ClientCode: string;
  TotalAssets: number;
};

export type ClientInvoiceNumbersList = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  InvoiceNumber: string;
  Action: string;
  Status: number;
  ClientCode: string;
  DocumentUrl: string;
  ScheduleNumber: string;
  Year: string;
};

export type ClientVendorInvoiceNumbersList = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  InvoiceNumber: string;
  Action: string;
  Status: number;
  ClientCode: string;
  DocumentUrl: string;
  ScheduleNumber: string;
};
export type ClientAnnexureNumbersList = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Action: string;
  Status: number;
  ClientCode: string;
  DocumentUrl: string;
  ScheduleNumber: string;
};

//rental type
export type ClientRentalNumbersList = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Action: string;
  Status: number;
  ClientCode: string;
  DocumentUrl: string;
  ScheduleNumber: string;
};

export type AssetInfoOEMType = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  NameofVendor: string;
  InvoiceNo: string;
  InvoiceDate: string;
  AssetCategory: string;
  Brand: string;
  ModelName: string;
  CPU: string;
  RAM: string;
  Storage: string;
  AssetDetailsDescription: string;
  QTY: string;
  DeliveryAddress: string;
  Branch: string;
  State: string;
  ScheduleNumber: string;
  ScheduleAmount: string;
  Tenure: string;
  FromDate: string;
  EndDate: string;
  TrancheNo: string;
  SerialNumber: string;
  HSNCode: string;
  Processor: string;
  Generation: string;
  WarrantyStartDate: string;
  Screen: string;
  WarrantyEndDate: string;
  ADP: string;
  AdapterChargerCable: string;
  CompanyCode: string;
};

export type BaseShipmentType = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  PickupAddress: string;
  DeliveryAddress: string;
  TotalAssets: number;
  TotalValue: string;
  DateOfMovement: null | string;
  ShipmentId: string;
  DeliveryCity: string;
  DeliveryCompanyName: string;
  DeliveryPincode: string;
  DeliveryState: string;
  PickupCity: string;
  PickupCompanyName: string;
  PickupPincode: string;
  PickupState: string;
};

export type BaseShipmentsDetails = {
  Category: string;
  SerialNumber: string;
  ScheduleAmount: string;
};

export type ShipmentDetailsType = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  ShipmentId: string;
  AssetCategory: string;
  SerialNumber: string;
  Status: number;
};

// admin = "all"
// transfer = "sanjeev kumar view"
// qc = "kamal view"
// end_of_term = "shradha view"
// bse = "anjali view"
export type Role =
  | "admin"
  | "transfer"
  | "qc"
  | "end_of_term"
  | "bse"
  | "sales";

export type QcStatusTypes = {
  key: number | string;
  value: string | number;
  variant: MenuItemProps["variant"];
  color: MenuItemProps["color"];
};

export type InventoryType = {
  category: string;
  client_code: string;
  schedule_number: string;
  serial_number: string;
  status: number;
  client_name: string;
  updated_at: string;
};

//directory type
export type DirectoryNumbersList = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Action: string;
  Status: number;
  CompanyName: string;
  Name: string;
  Department: string;
  Location: string;
  OfficialEmailId: string;
  ContactNumber: string;
};

export type GstNumbersList = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Action: string;
  Status: number;
  State: string;
  GstNumber: string;
  Address: string;
};

type CategoryWiseCountType = {
  category: string;
  count: number;
};

export type InventoryCountType = {
  total_assets: number;
  categories: CategoryWiseCountType[];
};

// TEXT TYPES

export type FontSize = 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40; // Adjust this list as needed

export type HeadingSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type SubheadingSize = "subheading1" | "subheading2" | "subheading3";

export type Style = {
  [key: string]: React.CSSProperties;
};

// YEAR TYPES
export type DropdownType = {
  key: string;
  value: string | number;
};

export type SelectType = {
  label: string;
  value: string | number;
};

export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export interface InvoiceList {
  invoice_id: string;
  shipment_id: string;
  invoice_url: string;
  pickup_address: string;
  delivery_address: string;
  total_asset: number;
  total_value: string;
  company_name: string;
  delivery_company_name: string;
  delivery_city: string;
  delivery_pincode: string;
  delivery_state: string;
  pickup_city: string;
  pickup_company_name: string;
  pickup_pincode: number;
  pickup_state: string;
}

export interface BaseLeadDetailType {
  client_name: string;
  source: string;
  asset: string;
  industry: string;
  deal_size: number;
}

export interface LeadDetailsListType extends BaseLeadDetailType {
  last_communication: string;
  total_meetings: number;
  stage: string;
  id: string;
  client_id: string;
}

export type MeetingDetailsListType = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  MeetingType: string;
  Status: number;
  Date: string;
  Name: string;
  Uuid: string;
  ClientId: string;
  ClientName: string;
  Remarks: string;
};

export interface ClaimList {
  AgentEmail: string;
  AgentName: string;
  AgentRole: string;
  Amount: string;
  CheckInDate: string;
  CheckOutDate: string;
  ClientId: string;
  ClientName: string;
  CreatedAt: string;
  Date: string;
  DeletedAt: string | null;
  ID: number;
  Kilometers: string;
  Location: string;
  MeetId: string;
  PointOfContact: string;
  ProofUrl: string;
  ReimbursementType: string;
  Remark: string;
  Status: number;
  TripMode: string;
  UpdatedAt: string;
  Uuid: string;
}
