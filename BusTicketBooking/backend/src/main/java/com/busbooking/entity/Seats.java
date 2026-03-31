package com.busbooking.entity;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "seats")
public class Seats {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seatId;

    private String seatNumber;
    
    @ManyToOne
    @JoinColumn(name = "bus_id")
    private Bus bus;

    @OneToMany(mappedBy = "seat")
    private List<BookingSeat> bookingSeats;

	public Seats() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getSeatId() {
		return seatId;
	}

	public void setSeatId(Long seatId) {
		this.seatId = seatId;
	}

	public String getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(String seatNumber) {
		this.seatNumber = seatNumber;
	}

	public Bus getBus() {
		return bus;
	}

	public void setBus(Bus bus) {
		this.bus = bus;
	}

	public List<BookingSeat> getBookingSeats() {
		return bookingSeats;
	}

	public void setBookingSeats(List<BookingSeat> bookingSeats) {
		this.bookingSeats = bookingSeats;
	}
    
    

}
