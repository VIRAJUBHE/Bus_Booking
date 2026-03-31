package com.busbooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.busbooking.entity.Bus;
import com.busbooking.repository.BusRepository;

@Service
public class BusService {

    @Autowired
    private BusRepository busRepository;

    public List<Bus> searchBus(String source, String destination) {

        return busRepository.findBySourceAndDestination(source, destination);
    }

    public Bus getBusById(Long busId) {

        return busRepository.findById(busId).orElse(null);
    }
}
