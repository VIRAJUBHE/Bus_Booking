package com.busbooking.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "booking_seats")
public class BookingSeat {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingSeatId;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seats seat;

	public BookingSeat() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getBookingSeatId() {
		return bookingSeatId;
	}

	public void setBookingSeatId(Long bookingSeatId) {
		this.bookingSeatId = bookingSeatId;
	}

	public Booking getBooking() {
		return booking;
	}

	public void setBooking(Booking booking) {
		this.booking = booking;
	}

	public Seats getSeat() {
		return seat;
	}

	public void setSeat(Seats seat) {
		this.seat = seat;
	}
    
    

}
