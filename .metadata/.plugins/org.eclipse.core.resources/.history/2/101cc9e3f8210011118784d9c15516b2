package com.busbooking.controller;

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
    public List<Bus> searchBus(@RequestParam String source,
                               @RequestParam String destination) {

        return busService.searchBus(source, destination);
    }

    @GetMapping("/{busId}")
    public Bus getBusById(@PathVariable Long busId) {
        return busService.getBusById(busId);
    }
}
