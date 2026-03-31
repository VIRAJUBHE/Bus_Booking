package com.busbooking.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "seats")
public class Seats {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seat_id")
    private int seatId;

    @Column(name = "seat_number")
    private int seatNumber;
    
    @Column(name="status")
    private String status;
    
    // ✅ Prevent loop
    @ManyToOne
    @JoinColumn(name = "bus_id")
    @JsonIgnoreProperties({"seats", "bookings"})
    private Bus bus;

    // ✅ Prevent recursion
    @OneToMany(mappedBy = "seat")
    @JsonIgnoreProperties({"seat", "booking"})
    private List<BookingSeat> bookingSeats;

    public Seats() {}

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public int getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(int seatNumber) {
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
    
    
}