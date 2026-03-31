package com.busbooking.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.busbooking.entity.Admin;
import com.busbooking.repository.AdminRepository;
import com.busbooking.repository.BookingRepository;
import com.busbooking.repository.BusRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private BusRepository busRepository;
    
    @Autowired
    private BookingRepository bookingRepository;

    public Admin login(String username, String password) {
        Optional<Admin> admin = adminRepository.findByUsername(username);

        if (admin.isPresent() && admin.get().getPassword().equals(password)) {
            return admin.get();
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
    
    public Map<String, Object> getDashboardStats() {

        Map<String, Object> data = new HashMap<>();

        long totalBuses = busRepository.count();
        long totalBookings = bookingRepository.count();

        Double totalRevenue = adminRepository.getTotalRevenue();

        data.put("totalBuses", totalBuses);
        data.put("totalBookings", totalBookings);
        data.put("totalRevenue", totalRevenue);

        return data;
    }
    
    public List<Map<String, Object>> getRevenueChart() {

        List<Object[]> data = adminRepository.getRevenuePerDay();

        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : data) {
            Map<String, Object> map = new HashMap<>();
            map.put("date", row[0]);
            map.put("revenue", row[1]);
            result.add(map);
        }

        return result;
    }
    
    public List<Map<String, Object>> getBookingsChart() {

        List<Object[]> data = adminRepository.getBookingsPerDay();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : data) {
            Map<String, Object> map = new HashMap<>();
            map.put("date", row[0]);
            map.put("count", row[1]);
            result.add(map);
        }

        return result;
    }
    
    public List<Map<String, Object>> getBusTypeChart() {

        List<Object[]> data = adminRepository.getBusTypeStats();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : data) {
            Map<String, Object> map = new HashMap<>();
            map.put("type", row[0]);
            map.put("count", row[1]);
            result.add(map);
        }

        return result;
    }
}
