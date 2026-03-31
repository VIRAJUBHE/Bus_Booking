package com.busbooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.busbooking.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByUsername(String username);
    
    @Query("""
    	    SELECT DATE(b.bookingDate), SUM(b.totalAmount)
    	    FROM Booking b
    	    GROUP BY DATE(b.bookingDate)
    	    ORDER BY DATE(b.bookingDate)
    	""")
    	List<Object[]> getRevenuePerDay();
    	
    	@Query("SELECT SUM(b.totalAmount) FROM Booking b")
        Double getTotalRevenue();
    	
    	@Query("""
    		    SELECT DATE(b.bookingDate), COUNT(b)
    		    FROM Booking b
    		    GROUP BY DATE(b.bookingDate)
    		    ORDER BY DATE(b.bookingDate)
    		""")
    		List<Object[]> getBookingsPerDay();
    		
    		@Query("""
    			    SELECT b.busType, COUNT(b)
    			    FROM Bus b
    			    GROUP BY b.busType
    			""")
    		List<Object[]> getBusTypeStats();
}
