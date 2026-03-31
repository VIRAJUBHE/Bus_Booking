package com.busbooking.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.busbooking.entity.Bus;

public interface BusRepository extends JpaRepository<Bus, Integer> {

	List<Bus> findBySourceAndDestinationAndJourneyDate(String source, String destination, LocalDate journeyDate);
    
    @Query("SELECT DISTINCT b.source FROM Bus b WHERE LOWER(b.source) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
    	       "UNION " +
    	       "SELECT DISTINCT b.destination FROM Bus b WHERE LOWER(b.destination) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    	List<String> findDistinctLocations(@Param("keyword") String keyword);

}
