export interface Booking {
  bookingId: number;
  totalAmount: number;
  status: string;
  bookingDate: string;

  bus: {
    busName: string;
      source: string;
      destination: string;
      departureTime: string;
      journeyDate: string;
  };

  bookingSeats: {
    seat: {
      seatNumber: number;
    };
  }[];
}
