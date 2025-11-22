export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  image?: string;
}

export interface Quote {
  id: string;
  workshopName: string;
  serviceType: string;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
  amount?: number;
  date: string;
}

export interface Appointment {
  id: string;
  workshopName: string;
  serviceType: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress';
}

export enum ViewState {
  DASHBOARD = 'dashboard',
  GARAGE = 'garage',
  QUOTES = 'quotes',
  FIND_WORKSHOPS = 'find_workshops'
}