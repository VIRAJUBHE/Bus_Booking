package com.busbooking.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.busbooking.entity.Bus;
import com.busbooking.repository.BusRepository;

@Service
public class AdminBusService {

    @Autowired
    private BusRepository busRepository;

    // CREATE
    public Bus addBus(Bus bus) {

        if (bus.getJourneyDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Cannot add bus for past date");
        }

        return busRepository.save(bus);
    }

    // READ ALL
    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    // UPDATE
    public Bus updateBus(int id, Bus updatedBus) {
    	
    	if (updatedBus.getJourneyDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Cannot set past date");
        }
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        bus.setBusName(updatedBus.getBusName());
        bus.setBusType(updatedBus.getBusType());
        bus.setSource(updatedBus.getSource());
        bus.setDestination(updatedBus.getDestination());
        bus.setDepartureTime(updatedBus.getDepartureTime());
        bus.setPrice(updatedBus.getPrice());
        bus.setTotalSeats(updatedBus.getTotalSeats());
        bus.setJourneyDate(updatedBus.getJourneyDate());

        return busRepository.save(bus);
    }

    // DELETE
    public void deleteBus(int id) {
        if (!busRepository.existsById(id)) {
            throw new RuntimeException("Bus not found");
        }
        busRepository.deleteById(id);
    }
}
