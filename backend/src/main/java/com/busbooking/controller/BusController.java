package com.busbooking.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.busbooking.entity.Bus;
import com.busbooking.service.BusService;

@RestController
@RequestMapping("/buses")
@CrossOrigin(origins = "http://localhost:4200")
public class BusController {

    @Autowired
    private BusService busService;

    @GetMapping("/search")
    public List<Bus> searchBus(
        @RequestParam String source,
        @RequestParam String destination,
        @RequestParam LocalDate date) {
        return busService.searchBus(source, destination, date);
    }

    @GetMapping("/{busId}")
    public Bus getBusById(@PathVariable int busId) {
        return busService.getBusById(busId);
    }
    
    @GetMapping("/all")
    public List<Bus> getAllBuses() {
		return busService.getAllBuses();
	}
    
    @GetMapping("/locations")
    public List<String> getLocations(@RequestParam String keyword) {
        return busService.findDistinctLocations(keyword);
    }
    
}
