package com.nayani.hmis.patientservice.repository;

import com.nayani.hmis.patientservice.model.patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<patient,Long> {
    List<patient> findByNameContainingIgnoreCase(String name);

    Optional<patient> findByPhone(String phone);
    List<patient> findByGenderIgnoreCase(String gender);
}
