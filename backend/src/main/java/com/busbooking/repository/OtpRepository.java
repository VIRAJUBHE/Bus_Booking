package com.busbooking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.busbooking.entity.OtpVerification;

public interface OtpRepository extends JpaRepository<OtpVerification, Integer> {

    Optional<OtpVerification> findTopByEmailOrderByCreatedAtDesc(String email);
}
