package com.busbooking.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;


@Entity
@Table(name = "buses")
public class Bus {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "bus_id")
    private int busId;

	@Column(name = "bus_name")
    private String busName;

	@Column(name = "bus_number")
    private String busNumber;

    private String source;

    private String destination;

    @Column(name = "departure_time")
    private LocalTime departureTime;

    @Column(name = "journey_date")
    private LocalDate journeyDate;

    @Column(name = "total_seats")
    private int totalSeats;

    private double price;
    
    @Column(name="bus_type")
    private String busType;
    
    @OneToMany(mappedBy = "bus")
    private List<Seats> seats;

    @OneToMany(mappedBy = "bus")
    @JsonIgnore  
    private List<Booking> bookings;

	public Bus() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getBusId() {
		return busId;
	}

	public void setBusId(int busId) {
		this.busId = busId;
	}

	public String getBusName() {
		return busName;
	}

	public void setBusName(String busName) {
		this.busName = busName;
	}

	public String getBusNumber() {
		return busNumber;
	}

	public void setBusNumber(String busNumber) {
		this.busNumber = busNumber;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public LocalTime getDepartureTime() {
		return departureTime;
	}

	public void setDepartureTime(LocalTime departureTime) {
		this.departureTime = departureTime;
	}

	public LocalDate getJourneyDate() {
		return journeyDate;
	}

	public void setJourneyDate(LocalDate journeyDate) {
		this.journeyDate = journeyDate;
	}

	public int getTotalSeats() {
		return totalSeats;
	}

	public void setTotalSeats(int totalSeats) {
		this.totalSeats = totalSeats;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getBusType() {
		return busType;
	}

	public void setBusType(String busType) {
		this.busType = busType;
	}

	public List<Seats> getSeats() {
		return seats;
	}

	public void setSeats(List<Seats> seats) {
		this.seats = seats;
	}

	public List<Booking> getBookings() {
		return bookings;
	}

	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}
    
    

	
}
