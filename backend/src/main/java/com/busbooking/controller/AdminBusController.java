package com.busbooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.busbooking.entity.Bus;
import com.busbooking.service.AdminBusService;

@RestController
@RequestMapping("/admin/buses")
@CrossOrigin
public class AdminBusController {

    @Autowired
    private AdminBusService adminBusService;

    // ADD BUS
    @PostMapping
    public ResponseEntity<?> addBus(@RequestBody Bus bus) {
        return ResponseEntity.ok(adminBusService.addBus(bus));
    }

    // GET ALL BUSES
    @GetMapping
    public ResponseEntity<?> getAllBuses() {
        return ResponseEntity.ok(adminBusService.getAllBuses());
    }

    // UPDATE BUS
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBus(@PathVariable int id, @RequestBody Bus bus) {
        return ResponseEntity.ok(adminBusService.updateBus(id, bus));
    }

    // DELETE BUS
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBus(@PathVariable int id) {
        adminBusService.deleteBus(id);
        return ResponseEntity.ok("Bus deleted successfully");
    }
}
